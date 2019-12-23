import React from "react";
import "./AddRemoveTurnButton.css"

export const AddRemoveTurnButton = props => (
    <button onClick={props.click}>{props.description}</button>
);