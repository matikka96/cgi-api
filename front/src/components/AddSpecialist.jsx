import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";
import keys from "../keys";

class AddSpecialist extends Component {
  state = {
    specialistName: "",
    specialistRole: "",
    allSpecialists: []
  };

  componentDidMount() {
    // Loads specialist on startup
    this.getSpecialists();
  }

  // Function for loading of specialists
  getSpecialists = () => {
    axios.get(keys.serverAddress + "/api/v1/specialist-load-all").then(r => {
      this.setState({ allSpecialists: r.data });
      console.log("Book appointment – Specialists loaded");
    });
  };

  // Helper function for state editing
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
        M.toast({ html: r.data.message });
      })
      .then(() => {
        document.getElementById("specialist-name").value = "";
        document.getElementById("specialist-role").value = "";
        this.setState({
          specialistName: "",
          specialistRole: ""
        });
      })
      .then(() => {
        this.getSpecialists();
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
          <h3>All specialists</h3>
          <table>
            <thead>
              <tr>
                <th>Specialist</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allSpecialists.map(d => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default AddSpecialist;
