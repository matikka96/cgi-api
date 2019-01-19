import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import keys from "../keys";

class CreateAppointment extends Component {
  state = {
    specialists: [],
    selectedSpecialist: "",
    fromDate: new Date(),
    fromTimeHours: "",
    fromTimeMinutes: "",
    toTimeHours: "",
    toTimeMinutes: ""
  };

  componentDidMount() {
    M.AutoInit();
    this.initializePickers();
    console.log("CreateAppointment – Mounted");
    this.getSpecialists();
  }

  initializePickers = () => {
    console.log('picked init')
    const fromDateElement = document.getElementById("from-date");
    const fromTimeElement = document.getElementById("from-time");
    const toTimeElement = document.getElementById("to-time");
    M.Datepicker.init(fromDateElement, {
      onSelect: d => {
        this.setState({ fromDate: d });
      },
      autoClose: true,
      firstDay: 1,
      minDate: this.state.fromDate
    });
    M.Timepicker.init(fromTimeElement, {
      onSelect: (h, m) => this.setState({ fromTimeHours: h, fromTimeMinutes: m }),
      autoClose: true,
      twelveHour: false
    });
    M.Timepicker.init(toTimeElement, {
      onSelect: (h, m) => this.setState({ toTimeHours: h, toTimeMinutes: m }),
      autoClose: true
    });
  };

  getSpecialists = () => {
    axios.get(keys.serverAddress + "/api/v1/specialist-load-all").then(r => {
      this.setState({ specialists: r.data });
      console.log("Specialists loaded");
    });
  };

  handleSelectedSpecialist = e => {
    this.setState({ selectedSpecialist: e.target.value });
  };

  render() {
    return (
      <>
        <div className="row">
          <h3>Create appointment</h3>
          <div className="col s12 m6">
            <label>Select specialist:</label>
            <select
              className="browser-default"
              defaultValue="Select specialist"
              onChange={this.handleSelectedSpecialist}
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
          <div className="input-field col s12 m6">
            <input type="text" id="visitor-name" />
            <label htmlFor="visitor-name">Visitor name</label>
          </div>
        </div>
        <div className="row section">
          <div className="col s12">
            <input placeholder="Select date" type="text" id="from-date" className="datepicker" />
          </div>
          <div className="col s6">
            <input placeholder="Start time" type="text" id="from-time" className="timepicker" />
          </div>
          <div className="col s6">
            <input placeholder="End time" type="text" id="to-time" className="timepicker" />
          </div>
          <div>
            <button className="btn right">+</button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateAppointment;
