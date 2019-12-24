import React, { Component } from "react";
import "./TurnTracker.css";
import { TurnPiece } from "../../Components/TurnPiece";
//import { CycleTurnButton } from "../../Components/CycleTurnButton";
import {AddRemoveTurnButton} from "../../Components/AddRemoveTurnButton";
//import { random } from "node-forge";

class TurnTracker extends Component {
  state = {
    characters: [],
    initiative: [],
    count: 1,
    name: "bill",
    modifier: 3,
    numRolled: 9,
    checkerboard:[{
      color:'whitesmoke',
      'backgroundColor': 'gray'
    },{
      color:'gray',
      'backgroundColor': 'whitesmoke'
    }]
  };

  sortInitiative = initiative => {
    const matcher = /.*[\d*]/i;
    initiative.sort((a, b) => {
      let diff = a.count - b.count;
      // console.log(diff +"first")
      if (diff === 0) {
        diff = (b.numRolled + b.modifier) - (a.numRolled + a.modifier);
        // console.log(diff +"second")
      }
      if (diff === 0) {
        diff = a.modifier - b.modifier;
        // console.log(diff +"third")
      }
      if (diff === 0 && matcher.test(a.name) && matcher.test(b.name) && a.count === b.count) {
        diff = parseInt(matcher.exec(a.name)) - parseInt(matcher.exec(b.name));
        // console.log(diff +"fourth")
      }
      if(diff>0){
        return 1
      }else if (diff < 0){
        return -1
      }else return 0
    });
    return initiative
  };

  addInitiative = (numRolled, modifier, name) => {
    let arr = this.state.initiative;
    let numTurns = this.state.initiative.count > 0 ? Math.min.apply(this.state.initiative.map(e => e.count)):0
    arr.push({
      numRolled: numRolled,
      modifier: modifier,
      name: name,
      count: numTurns
    });
    arr = this.sortInitiative(arr);
    this.setState({
      initiative: arr
    });
  };

  cycleTurn=(index)=>{
    let state = this.state;
    state.initiative[index].count++;
    state.checkerboard = state.checkerboard.reverse(); 
    this.setState(state);
  }

  remove=(index)=>{
    let state = this.state;
    state.initiative.splice(index,1);
    this.setState(state);
  }

  showInitiative = () => {
    let arr = [];
    let sortedArr = this.sortInitiative(this.state.initiative)
    sortedArr.forEach((element,index) => {
      arr.push(
        <TurnPiece key={index} style={this.state.checkerboard[index%2]} name={element.name} count={element.count} rolled={element.numRolled} modifier={element.modifier} onClick={()=>{this.cycleTurn(index)}} remove = {()=>this.remove(index)} />
      );
    });
    return arr;
  };
  addInitiativeBulk = () => {
    for (let i = 0; i < this.state.count; i++) {
      this.addInitiative(
        this.state.numRolled,
        this.state.modifier,
        i>0?this.state.name + i:this.state.name
      );
    }
  };
  numValidate = event => {
    if(event.target.value === "")
    {
      event.target.value = 0;
      if(event.target.name ==="count"){
        event.target.value = 1;
      }
    }
    if (!isNaN(event.target.value)) {
      let state = this.state;
      state[event.target.name] = parseInt(event.target.value);
      this.setState(state);
    }

  };

  handleChange = (event) => {
    let obj = this.state;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  render() {
    return (
      <div>
        <div className="turn-holder">{this.showInitiative()}</div>
        
          <label>Number of Creatures:</label>
          <input
            className="count"
            value={this.state.count}
            type="text"
            onChange={this.numValidate}
            name="count"
          />
          <label>Amount Rolled:</label>
          <input
            className="totalInitiative"
    
            value={this.state.numRolled}
            type="text"
            onChange={this.numValidate}
            name="numRolled"
          />
          <label>Modifier</label>
          <input
            className="modifier"
            value={this.state.modifier}
            type="text"
            onChange={this.numValidate}
            name="modifier"
          />
          <label>Name</label>
          <input 
            className="name"
            value={this.state.name}
            type="text"
            onChange={this.handleChange}
            name="name"/>
          <AddRemoveTurnButton click={this.addInitiativeBulk} description="Add Turn" />

        
                {/* This is for adding characters that are reused.<div className ="Characters">
                    {this.state.characters}
                <div className = 'add-characters'></div>
                </div>  */}
      </div>
    );
  }
}
export default TurnTracker;

