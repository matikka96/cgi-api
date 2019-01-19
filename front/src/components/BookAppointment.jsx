import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import keys from "../keys";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Book extends Component {
  state = {
    specialists: [],
    selectedSpecialist: "all",
    appointments: [],
    fromDate: new Date(),
    toDate: null
  };
  componentDidMount() {
    M.AutoInit();
    console.log("Book – Mounted");
    this.getSpecialists();
  }

  handleSelectedSpecialist = e => {
    this.setState({ selectedSpecialist: e.target.value });
  };

  // Handles appointment search
  handleAppointmentQuery = () => {
    const { selectedSpecialist, fromDate, toDate } = this.state;
    let query = "?";
    if (selectedSpecialist !== "all") {
      query += `specialist=${selectedSpecialist}&`;
    }
    console.log("Start: " + fromDate);
    query += `from=${fromDate.getTime()}`;
    if (toDate === null) {
      console.log("No TO-date selected");
      console.log(query);
      this.getAppointments(query);
    } else {
      query += `&to=${toDate.getTime()}`;
      console.log("End: " + toDate);
      if (fromDate < toDate) {
        console.log(query);
        this.getAppointments(query);
      } else {
        console.log("FROM-date must be nefore TO-date");
      }
    }
  };

  getSpecialists = () => {
    axios.get(keys.serverAddress + "/api/v1/specialist-load-all").then(r => {
      this.setState({ specialists: r.data });
      console.log("Specialists loaded");
    });
  };
  getAppointments = q => {
    axios.get(keys.serverAddress + `/api/v1/appointment/free${q}`).then(r => {
      console.log(r.data);
      this.setState({ appointments: r.data });
    });
  };

  render() {
    return (
      <>
        {/* Create search query */}
        <div className="">
          <h3>Book appointment</h3>
          <label>Select specialist:</label>
          <select
            className="browser-default"
            defaultValue="all"
            onChange={this.handleSelectedSpecialist}
          >
            <option value="all">All specialists</option>
            {this.state.specialists.map(s => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row section">
          <div className="col s6">
            <DatePicker
              minDate={new Date()}
              placeholderText="From"
              selected={this.state.fromDate}
              onChange={fromDate => this.setState({ fromDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div className="col s6">
            <DatePicker
              minDate={new Date()}
              placeholderText="To"
              selected={this.state.toDate}
              onChange={toDate => this.setState({ toDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <button className="btn" onClick={this.handleAppointmentQuery}>
            Search
          </button>
        </div>

        {/* Search result */}
        <div
          style={this.state.appointments.length === 0 ? { display: "none" } : { display: "block" }}
        >
          <table>
            <thead>
              <tr>
                <th>Specialist</th>

                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.appointments.map(a => (
                <tr key={a._id}>
                  <td>{a.specialistName}</td>

                  <td>{a.startTime}</td>
                  <td>{a.endTime}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Book;
