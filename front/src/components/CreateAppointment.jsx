import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import keys from "../keys";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateAppointment extends Component {
  state = {
    specialists: [],
    selectedSpecialist: "",
    fromDate: null,
    toDate: null
  };

  componentDidMount() {
    M.AutoInit();
    console.log("CreateAppointment – Mounted");
    this.getSpecialists();
  }

  getSpecialists = () => {
    axios.get(keys.serverAddress + "/api/v1/specialist-load-all").then(r => {
      this.setState({ specialists: r.data });
      console.log("Specialists loaded");
    });
  };

  handleSelectedSpecialist = e => {
    this.setState({ selectedSpecialist: e.target.value });
  };

  addToQueue = () => {
    
  }

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
        <div className="row">
          <div className="col s12 m6">
            <DatePicker
              minDate={new Date()}
              placeholderText="Start time"
              selected={this.state.fromDate}
              onChange={fromDate => this.setState({ fromDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div className="col s12 m6">
            <DatePicker
              minDate={new Date()}
              placeholderText="End time"
              selected={this.state.toDate}
              onChange={toDate => this.setState({ toDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div className="col s12">
            <button className="btn right">
              <i class="material-icons">add</i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateAppointment;
