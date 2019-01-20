import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import dateFormat from "dateformat";
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
    query += `from=${fromDate.getTime()}`;
    if (toDate === null) {
      this.getAppointments(query);
    } else {
      query += `&to=${toDate.getTime()}`;
      if (fromDate < toDate) {
        this.getAppointments(query);
      } else {
        console.log("FROM-date must be before TO-date");
      }
    }
  };

  getSpecialists = () => {
    axios.get(keys.serverAddress + "/api/v1/specialist-load-all").then(r => {
      this.setState({ specialists: r.data });
      console.log("Book appointment – Specialists loaded");
    });
  };
  getAppointments = q => {
    axios.get(keys.serverAddress + `/api/v1/appointment/free${q}`).then(r => {
      this.setState({ appointments: r.data });
    });
  };
  handleDateFormat = d => {
    const date = new Date(d);
    return dateFormat(date, "dd/mm/yyyy");
  };

  render() {
    return (
      <>
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
            <label>Search from</label>
            <DatePicker
              minDate={new Date()}
              placeholderText="From"
              selected={this.state.fromDate}
              onChange={fromDate => this.setState({ fromDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={20}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div className="col s6">
            <label>To</label>
            <DatePicker
              minDate={this.state.fromDate}
              placeholderText="To"
              selected={this.state.toDate}
              onChange={toDate => this.setState({ toDate })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={20}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div className="col">
            <button className="btn right" onClick={this.handleAppointmentQuery}>
              Search
            </button>
          </div>
        </div>

        {/* Search result */}
        <div
          style={this.state.appointments.length === 0 ? { display: "none" } : { display: "block" }}
        >
          <table>
            <thead>
              <tr>
                <th>Specialist</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.appointments.map(a => (
                <tr key={a._id}>
                  <td>{a.specialistName}</td>
                  <td>{dateFormat(new Date(a.startTime), "dd/mm/yyyy")}</td>
                  <td>{dateFormat(new Date(a.startTime), "HH:MM")}</td>
                  <td>{dateFormat(new Date(a.endTime), "HH:MM")}</td>
                  <td>{a.status}</td>
                  {/* <td>{a.status}</td> */}
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
