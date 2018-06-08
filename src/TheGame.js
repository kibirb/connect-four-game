import React, { Component } from 'react';
import './TheGame.css';

function Hole(props){
  return <div className="Hole"><div className={props.value}></div></div>
}

function Slat(props){
    return <div className="Slat" onClick={() => props.handleClick()}>
      {[...Array(props.holes.length)].map((x, j) => 
        <Hole key={j} value={props.holes[j]}></Hole>)}
      </div>
 }

class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),
      playerTurn: 'Red',
      gameMode: '',
      gameSelected: false,
      winner: '',
      player1: { name: 'Player1', color: 'Red'},
      player2: { name: 'Player2', color: 'Black'}
 
   }
  }

  selectedGame(mode){
    this.setState({
       gameMode: mode,
       gameSelected: true, 
       boardState: new Array(7).fill(new Array(6).fill(null))
    })
  }

  makeMove(slatID){
    const boardCopy = this.state.boardState.map(function(arr) {
      return arr.slice();
    });
    if( boardCopy[slatID].indexOf(null) !== -1 ){
      let newSlat = boardCopy[slatID].reverse()
      newSlat[newSlat.indexOf(null)] = this.state.playerTurn
      newSlat.reverse()
      this.setState({
        playerTurn: (this.state.playerTurn === this.state.player1.color) ? this.state.player2.color : this.state.player1.color,
        boardState: boardCopy
      })
    }
  }

 
  handleClick(slatID) {
    if(this.state.winner === ''){
      this.makeMove(slatID);
    }
  }
 
 
  componentDidUpdate(){
    let winner = checkWinner(this.state.boardState)
    let winner_name = this.state.playerTurn !== this.state.player1.color?this.state.player1.name : this.state.player2.name;
    if(this.state.winner !== winner){
      this.setState({winner: winner_name + "-" + winner})
    } 
  }

  render(){

    /*If a winner exists display the name*/
    let winnerMessageStyle
    if(this.state.winner !== ""){
      winnerMessageStyle = "winnerMessage appear"
    }else {
      winnerMessageStyle = "winnerMessage"
    }

    /*Contruct slats allocating column from board*/
    let slats = [...Array(this.state.boardState.length)].map((x, i) => 
      <Slat 
          key={i}
          holes={this.state.boardState[i]}
          handleClick={() => this.handleClick(i)}
      ></Slat>
    )

   //next implementation idea .. let player choose color from list


   //get player's name who should be playing next....
   let player_name = this.state.playerTurn !== this.state.player2.color?this.state.player1.name : this.state.player2.name;
   return (
      <div>
        {this.state.gameSelected &&
          <div className="Board">
            {slats}
          </div>
        }
        {this.state.gameSelected &&
          <div> Next turn: 
           {player_name} -  {this.state.playerTurn}
          </div>
        }
        <div className={winnerMessageStyle}>{this.state.winner}</div>
        {(!this.state.gameSelected || this.state.winner !== '') &&
	<div>
          <div>
            <button onClick={() => this.selectedGame('human')}>Play</button>
          </div>
          <div><label>Player 1 name (Red): </label>
	<input type='text' onChange={(e) => this.setState({player1: { name: e.target.value, color: 'Red'}})} />
	<label>Player 2 name (Black):</label>
        <input type='text' onChange={(e) => this.setState({player2: { name: e.target.value, color: 'Black'}})} />
          </div>
	</div>
        }
      </div>
    )
  }
}


class TheGame extends Component {
  render() {
    return (
      <div className="App">
        <div className="Game">
          <Board></Board>
        </div>
      </div>
    );
  }
}

function checkLine(a,b,c,d) {
    return ((a !== null) && (a === b) && (a === c) && (a === d));
}

function checkWinner(bs) {
    for (let c = 0; c < 7; c++)
        for (let r = 0; r < 4; r++)
            if (checkLine(bs[c][r], bs[c][r+1], bs[c][r+2], bs[c][r+3]))
                return bs[c][r] + ' wins!'

    for (let r = 0; r < 6; r++)
         for (let c = 0; c < 4; c++)
             if (checkLine(bs[c][r], bs[c+1][r], bs[c+2][r], bs[c+3][r]))
                 return bs[c][r] + ' wins!'

    for (let r = 0; r < 3; r++)
         for (let c = 0; c < 4; c++)
             if (checkLine(bs[c][r], bs[c+1][r+1], bs[c+2][r+2], bs[c+3][r+3]))
                 return bs[c][r] + ' wins!'

    for (let r = 0; r < 4; r++)
         for (let c = 3; c < 6; c++)
             if (checkLine(bs[c][r], bs[c-1][r+1], bs[c-2][r+2], bs[c-3][r+3]))
                 return bs[c][r] + ' wins!'

    return "";
}

export default TheGame;
