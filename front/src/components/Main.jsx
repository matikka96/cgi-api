import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";

class Main extends Component {
  state = {
    specialists: [],
    selectedSpecialist: "all",
    appointmenrts: [],
    fromDate: new Date(),
    fromTimeHours: "",
    fromTimeMinutes: "",
    toDate: "",
    toTimeHours: "",
    toTimeMinutes: ""
  };
  componentDidMount() {
    M.AutoInit();
    this.initializePickers();
    console.log("Main – Mounted");
    axios.get("http://localhost:3001/api/specialist-load-all").then(r => {
      this.setState({ specialists: r.data });
      console.log("Specialists loaded");
    });
  }
  initializePickers = () => {
    const fromDateElement = document.getElementById("from-date");
    const fromTimeElement = document.getElementById("from-time");
    const toDateElement = document.getElementById("to-date");
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
    M.Datepicker.init(toDateElement, {
      onSelect: d => {
        this.setState({ toDate: d });
      },
      autoClose: true,
      firstDay: 1,
      minDate: this.state.fromDate
    });
    M.Timepicker.init(toTimeElement, {
      onSelect: (h, m) => this.setState({ toTimeHours: h, toTimeMinutes: m }),
      autoClose: true
    });
  };

  handleSelectedSpecialist = e => {
    this.setState({ selectedSpecialist: e.target.value });
  };
  // Handles appointment search
  handleAppointmentQuery = () => {
    const {
      fromDate,
      fromTimeHours,
      fromTimeMinutes,
      toDate,
      toTimeHours,
      toTimeMinutes,
      selectedSpecialist
    } = this.state;

    let query = "?";
    if (selectedSpecialist !== "all") {
      query += `specialist=${selectedSpecialist}&`;
    }
    const start = new Date(fromDate);
    start.setHours(fromTimeHours);
    start.setMinutes(fromTimeMinutes);
    console.log("Start: " + start);
    query += `from=${start.getTime()}`;
    if (toDate === "") {
      console.log("No TO-date selected");
      console.log(query);
      this.getAppointments(query);
    } else {
      const end = new Date(toDate);
      end.setHours(toTimeHours);
      end.setMinutes(toTimeMinutes);
      query += `&to=${end.getTime()}`;
      console.log("End: " + end);
      if (start < end) {
        console.log(query);
        this.getAppointments(query);
      } else {
        console.log("FROM-date must be nefore TO-date");
      }
    }
  };
  getAppointments = q => {
    axios.get(`http://localhost:3001/api/appointment/free${q}`).then(r => {
      console.log(r.data);
    });
  };

  render() {
    console.log(this.state.specialists);
    return <div>
        <div>
          <div className="">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3">
                  <a className="active" href="#test1">
                    Book appointment
                  </a>
                </li>
                <li className="tab col s3">
                  <a href="#test2">Test 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="test1" className="col s12">
            <div className="">
              <h3>Book appointment</h3>
              <label>Select specialist:</label>
              <select className="browser-default" defaultValue="all" onChange={this.handleSelectedSpecialist}>
                <option value="all">All specialists</option>
                {this.state.specialists.map(s => <option key={s._id} value={s.name}>
                    {s.name}
                  </option>)}
              </select>
            </div>
            <div className="row">
              <div className="col s6">
                <p>From: </p>
                <input placeholder="Select date" type="text" id="from-date" className="datepicker" />
                <input placeholder="Select time" type="text" id="from-time" className="timepicker" />
                <button className="btn" onClick={this.handleAppointmentQuery}>
                  Search
                </button>
              </div>
              <div className="col s6">
                <p>To: </p>
                <input placeholder="Select date" type="text" id="to-date" className="datepicker" />
                <input placeholder="Select time" type="text" id="to-time" className="timepicker" />
              </div>
            </div>
            <div className="row section">
              <div>{/* <p>{this.state}</p> */}</div>
            </div>
          </div>
          <div id="test2" className="col s12">
            {this.state.specialists.map(s => <p key={s._id}>{s.name}</p>)}
          </div>
        </div>
      </div>;
  }
}

export default Main;
