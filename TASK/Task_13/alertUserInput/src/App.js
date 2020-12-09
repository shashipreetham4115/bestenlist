import './App.css';
import React, { useState } from "react";

function App() {
  const [State, setState] = useState({ textEntered: "" }); 
  let getText = () => {
    alert(State.textEntered);
  }
  return (
    <div className="App">
     <input type="text" className="input" onChange={event => setState({ textEntered: event.target.value })} placeholder="  Enter Any Text"/>
     <button onClick={getText} className="button" >get Value</button>
    </div>
  );
}

export default App;
