import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { remote } from "electron";
import * as React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
interface IState {
  values: boolean[];
  current: boolean;
  winnerX: number;
  winnerO: number;
  open: boolean;
  winner?: "X" | "O";
}

class App extends React.Component<{}, IState> {
  state: IState = {
    values: Array(9).fill(null),
    current: true,
    winnerX: 0,
    winnerO: 0,
    open: false,
  };

  private calculateWinner() {
    const values = this.state.values.slice();
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
      const [a, b, c] = lines[i];
      if (
        values[a] !== null &&
        values[a] === values[b] &&
        values[a] === values[c]
      ) {
        const winner = values[a] ? "X" : "O";
        if (winner == "X") {
          this.setState((state) => ({ winnerX: state.winnerX + 1 }));
        } else {
          this.setState((state) => ({ winnerO: state.winnerO + 1 }));
        }
        this.setState({
          values: Array(9).fill(null),
          current: true,
          open: true,
          winner,
        });
      }
    }
  }

  render() {
    return (
      <div className="board">
        <div className="navbar">
          <p className="title">Tic Tac Toe</p>
          <button
            className="close-btn"
            onClick={() => remote.getCurrentWindow().close()}
          >
            &times;
          </button>
        </div>
        <div className="players">
          <p>Player X Wins: {this.state.winnerX}</p>
          <p>Player O Wins: {this.state.winnerO}</p>
        </div>
        <div className="container">
          {this.state.values.map((value, index) => (
            <button
              className={value === null ? "btn" : "btn-disabled"}
              key={index}
              onClick={() => {
                const values = this.state.values.slice();
                if (value === null) {
                  values[index] = this.state.current;
                  this.setState(
                    (state) => ({
                      values: values,
                      current: !state.current,
                    }),
                    () => this.calculateWinner()
                  );
                }
              }}
            >
              {value !== null ? (value ? "X" : "O") : "?"}
            </button>
          ))}
        </div>
        <button
          className="reset-btn"
          onClick={() =>
            this.setState({ values: Array(9).fill(null), current: true })
          }
        >
          Reset
        </button>
        <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Winner🎉"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Player ${this.state.winner} Won`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              onClick={() => this.setState({ open: false })}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default hot(module)(App);
