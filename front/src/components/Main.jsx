import React, { Component } from "react";
import BookAppointment from "./BookAppointment";
import CreateAppointment from "./CreateAppointment";
import AddSpecialist from "./AddSpecialist";
import AllAppointments from "./AllAppointments";

class Main extends Component {
  render() {
    return <div>

        {/* Navbar */}
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">
              CGI api challenge
            </a>
          </div>
        </nav>

        {/* Navigation tabs */}
        <div>
          <div className="col s12">
            <ul className="tabs center">
              <li className="tab col">
                <a className="active" href="#AllAppoi">
                  All appointments
                </a>
              </li>
              <li className="tab col">
                <a className="" href="#BookAppoi">
                  Book appointment
                </a>
              </li>
              <li className="tab col">
                <a className="" href="#CreateAppoiTab">
                  Create appointment
                </a>
              </li>
              <li className="tab col">
                <a className="" href="#addSpecialistTab">
                  Add specialist
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="container">
          <div id="AllAppoi" className="col s12">
            <AllAppointments />
          </div>
          <div id="BookAppoi" className="col s12">
            <BookAppointment />
          </div>
          <div id="CreateAppoiTab" className="col s12">
            <CreateAppointment />
          </div>
          <div id="addSpecialistTab" className="col s12">
            <AddSpecialist />
          </div>
        </div>
      </div>;
  }
}

export default Main;
