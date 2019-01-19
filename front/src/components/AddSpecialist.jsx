import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import keys from "../keys";

class AddSpecialist extends Component {
  state = {
    specialistName: "",
    specialistRole: ""
  };
  handleSpecialistInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // API ruquest to add newly created specialist
  handleAddSpecialist = () => {
    const { specialistName, specialistRole } = this.state;
    const specialist = {
      name: specialistName,
      role: specialistRole
    };
    axios
      .post(keys.serverAddress + "/api/v1/specialists", specialist)
      .then(r => {
        console.log(r.data.message);
        M.toast({ html: r.data.message })
      })
      .then(() => {
        document.getElementById("specialist-name").value = "";
        document.getElementById("specialist-role").value = "";
        this.setState({
          specialistName: "",
          specialistRole: ""
        });
      });
  };

  render() {
    return (
      <>
        <div>
          <h3>Add Specialist</h3>
          <div className="row">
            <div className="input-field col s12 m6">
              <input
                id="specialist-name"
                name="specialistName"
                type="text"
                onChange={this.handleSpecialistInfo}
              />
              <label htmlFor="specialist-name">Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                id="specialist-role"
                name="specialistRole"
                type="text"
                onChange={this.handleSpecialistInfo}
              />
              <label htmlFor="specialist-role">Role</label>
            </div>
            <div>
              <button
                className={
                  this.state.specialistName !== "" && this.state.specialistRole !== ""
                    ? "btn"
                    : "btn disabled"
                }
                onClick={this.handleAddSpecialist}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddSpecialist;
