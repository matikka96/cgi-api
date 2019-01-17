import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  stata = {
    
  }
  componentDidMount() {
    console.log('Main – Mounted')
    axios.get("http://localhost:3001/api/specialist-load-all").then(r => {
      console.log(r.data);
    });
  }
  render() {
    return (
      <div>
        <p>lol</p>
      </div>
    );
  }
}
 
export default Main;