import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * 
 * @param {properties} props
 * Renders a single button 
 */
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}
  
/**
 * Renders 9 squares
 */
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); // creates copy of squares array
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return ( 
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        }
        else {

            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
         }
  
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
/**
 * Renders a board 
 */
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <h1>Tic Tac Toe</h1>
                    <Board />
                </div>
            </div>
      );
    }
}
// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);

// Helper function to calculate winner
/**
 * 
 * @param {array of 9 squares} squares
 * return 'X', 'O' or null as appropriate
 * 
 *  
 */
function calculateWinner(squares) {
    // Holds all winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        // Create new array with same
        // value as winning combination
        // e.g. [0, 1, 2]
        const [a, b, c] = lines[i];
        // Checks if there are 3 of the same letters
        // for winning combination
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // If all 3 are same return value of square ('X' or 'O')
            // which is player 'X' or 'O' 
            return squares[a];
        }
    }

    return null;
  }
  