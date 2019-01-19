import React, { Component } from "react";
import BookAppointment from "./BookAppointment";
import CreateAppointment from "./CreateAppointment";
import AddSpecialist from "./AddSpecialist";

class Main extends Component {
  render() {
    return <div>
        {/* Navigation tabs */}
        <div>
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3">
              <a className="" href="#test1">
                  Book appointment
                </a>
              </li>
              <li className="tab col s3">
              <a className="active" href="#CreateAppoiTab">
                  Create appointment
                </a>
              </li>
              <li className="tab col s3">
                <a className="" href="#addSpecialistTab">
                  Add specialist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div id="test1" className="col s12">
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
