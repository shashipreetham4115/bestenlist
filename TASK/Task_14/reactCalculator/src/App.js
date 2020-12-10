import './App.css';
import React, { useState } from "react";

function App() {
  const [State, setState] = useState({ result: "" });
  const [State1, setState1] = useState({ number1: "" });
  const [State2, setState2] = useState({ number2: "" });
  let add = () => {
    setState({ result: (parseInt(State1.number1) + parseInt(State2.number2)) });
  }
  let sub = () => {
    setState({ result: (parseInt(State1.number1) - parseInt(State2.number2)) });
  }
  let multi = () => {
    setState({ result: (parseInt(State1.number1) * parseInt(State2.number2)) });
  }
  let divi = () => {
    setState({ result: (parseInt(State1.number1) / parseInt(State2.number2)) });
  }
  let modulo = () => {
    setState({ result: (parseInt(State1.number1) % parseInt(State2.number2)) });
  }
  return (
    <div className="App">
      <input type="text" className="input" onChange={event => setState1({ number1: event.target.value })} placeholder="Enter First Number" />
      <input type="text" className="input" onChange={event => setState2({ number2: event.target.value })} placeholder="Enter Second Number" />
      <div>
        <button onClick={add} className="button" >+</button>
        <button onClick={sub} className="button" >-</button>
        <button onClick={multi} className="button" >*</button>
        <button onClick={divi} className="button" >/</button>
        <button onClick={modulo} className="button" >%</button>
      </div>
      <input type="text" className="input" value={State.result} placeholder="Result" />
    </div>
  );
}

export default App;
