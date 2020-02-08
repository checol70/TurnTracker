import React from "react";
import "./TurnPiece.css";

export const TurnPiece = props => (
  <div className="holder">
    <div className="character" style={props.style}>
      <p>Character: {props.name}</p>
    </div>
    <div className="rolled" style={props.style}>
      <p>Total Initiative: {props.rolled + props.modifier}</p>
    </div>
    <div className="mod" style={props.style}>
      <p>Modifier: {props.modifier}</p>
    </div>

    <div className="turns" style={props.style}>
      <p>Turns: {props.count}</p>
    </div>
    <div className = "hp">
      <button onClick={props.damage}>
        Damage
      </button>
      <input type="text"
          className="damage-amount"
          value={props.value}
          onChange={props.numValidate}
          name="damage-amount"
          target={props.name}>

      </input>
      <button onClick={props.heal}>
        Heal
      </button>
      <p>{props.damageTaken}</p>
    </div>
    <div className = "end-turn" style={props.style}>
    <button onClick={props.onClick} className="button">
      End Turn
    </button>
    <button onClick={props.remove}>Remove</button>
    </div>
  </div>
);
