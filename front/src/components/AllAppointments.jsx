import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import keys from "../keys";

class AllComponents extends Component {
  state = {
    allAppointments: []
  };

  // Loads all appointments on start-up
  componentDidMount() {
    this.getAllAppointments();
  }

  // Function for loading appointments
  getAllAppointments = () => {
    axios.get(keys.serverAddress + `/api/v1/appointment/all?from=0`).then(r => {
      this.setState({ allAppointments: r.data });
    });
  };
  
  render() {
    return (
      <>
        <div className="row">
          <div className="col s12">
            <h3>All appointments</h3>
          </div>
          <div className="col s12">
            <button className="btn green darken-3" onClick={this.getAllAppointments}>
              <i className="material-icons">refresh</i>
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Specialist</th>
                <th>Visitor</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allAppointments.map(a => (
                <tr key={a._id}>
                  <td>{a.specialistName}</td>
                  <td>{a.visitorName}</td>
                  <td>{dateFormat(new Date(a.startTime), "dd/mm/yyyy")}</td>
                  <td>{dateFormat(new Date(a.startTime), "HH:MM")}</td>
                  <td>{dateFormat(new Date(a.endTime), "HH:MM")}</td>
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

export default AllComponents;
