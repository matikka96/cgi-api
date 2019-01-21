import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import dateFormat from "dateformat";
import keys from "../keys";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateAppointment extends Component {
  state = {
    specialists: [],
    appointmentsToAdd: [],
    selectedSpecialist: null,
    notes: null,
    fromDate: new Date(),
    toDate: null
  };

  componentDidMount() {
    M.AutoInit();
    this.getSpecialists();
  }

  // Loads specialists to state
  getSpecialists = () => {
    axios.get(keys.serverAddress + "/api/v1/specialist-load-all").then(r => {
      this.setState({ specialists: r.data });
      console.log("Specialists loaded");
    });
  };

  // Helper function fot state modifications
  handleSetState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Query for API request is created here
  handleQuery = () => {
    const { selectedSpecialist, fromDate, toDate } = this.state;
    if (selectedSpecialist === null || fromDate === null || toDate === null) {
      M.toast({ html: "Please select specialist, start and end times" });
    } else {
      const query = `?specialist=${selectedSpecialist}&from=${fromDate.getTime()}&to=${toDate.getTime()}`;
      this.checkAvailability(query);
    }
  };

  // API-request that verifies availability of selected timespan
  checkAvailability = q => {
    axios.get(keys.serverAddress + `/api/v1/appointment/available${q}`).then(r => {
      console.log(r.data);
      if (r.data.reserved.length === 0) {
        const newAppointment = {
          specialistName: this.state.selectedSpecialist,
          startTime: this.state.fromDate.getTime(),
          endTime: this.state.toDate.getTime(),
          notes: this.state.notes
        };
        const newArray = [...this.state.appointmentsToAdd, newAppointment];
        this.setState({ appointmentsToAdd: newArray });
      } else {
        M.toast({ html: r.data.message });
      }
    });
  };

  // API-request for actual creation of the appointment
  handleCreateAppointments = () => {
    axios
      .post(keys.serverAddress + "/api/v1/timeslots", {
        appointments: this.state.appointmentsToAdd
      })
      .then(r => {
        console.log(r.data);
        M.toast({ html: r.data.message });
        this.setState({ appointmentsToAdd: [] });
      });
  };

  render() {
    return (
      <>
        <div className="row">
          <h3 className="col">Create appointment</h3>
          <div className="col s12">
            <label>Select specialist:</label>
            <select
              className="browser-default"
              name="selectedSpecialist"
              defaultValue="Select specialist"
              onChange={this.handleSetState}
            >
              <option className="disabled" disabled value="Select specialist">
                Select specialist
              </option>
              {this.state.specialists.map(s => (
                <option key={s._id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6">
            <DatePicker
              minDate={new Date()}
              placeholderText="Start time"
              selected={this.state.fromDate}
              onChange={fromDate => this.setState({ fromDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={20}
              dateFormat="dd/MM/yyyy – HH:mm"
              timeCaption="time"
            />
          </div>
          <div className="col s12 m6">
            <DatePicker
              minDate={this.state.fromDate}
              placeholderText="End time"
              selected={this.state.toDate}
              onChange={toDate => this.setState({ toDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={20}
              dateFormat="dd/MM/yyyy – HH:mm"
              timeCaption="time"
            />
          </div>
          <div className="input-field col s12">
            <input type="text" id="appoi-notes" name="notes" onChange={this.handleSetState} />
            <label htmlFor="appoi-notes">Notes</label>
          </div>
          <div className="col s12">
            <button className="btn right yellow darken-4" onClick={this.handleQuery}>
              <i className="material-icons">queue</i>
            </button>
          </div>
          <div
            className="col s12"
            style={
              this.state.appointmentsToAdd.length === 0 ? { display: "none" } : { display: "block" }
            }
          >
            <table>
              <thead>
                <tr>
                  <th>Specialist</th>
                  <th>Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.appointmentsToAdd.map((a, index) => (
                  <tr key={index}>
                    <td>{a.specialistName}</td>
                    <td>{dateFormat(new Date(a.startTime), "dd/mm/yyyy")}</td>
                    <td>{dateFormat(new Date(a.startTime), "HH:MM")}</td>
                    <td>{dateFormat(new Date(a.endTime), "HH:MM")}</td>
                    <td>{a.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="s12 section">
              <button className="btn right green darken-3" onClick={this.handleCreateAppointments}>
                Create
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateAppointment;
