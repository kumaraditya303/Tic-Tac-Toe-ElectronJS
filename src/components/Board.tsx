import classname from "classnames";
import { remote } from "electron";
import * as React from "react";
import { hot } from "react-hot-loader";
import styles from "./Board.module.scss";
import DialogBox from "./DialogBox";
interface IState {
  values: boolean[];
  current: boolean;
  winnerX: number;
  winnerO: number;
  open: boolean;
  winner?: "X" | "O";
  message?: string;
}

class Board extends React.Component<{}, IState> {
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

    for (const line of lines) {
      const [a, b, c] = line;
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
          message: `Player ${winner} Won`,
          winner,
        });
        return;
      }
    }
    if (Board.arrayEquals(values, Array(9).fill(null))) {
      this.setState({ message: "Game Draw", open: true });
    }
  }
  private static arrayEquals(a: any[], b: any[]) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length == b.length &&
      a.every((val, idx) => val !== b[idx])
    );
  }
  public reset = () => {
    this.setState({ values: Array(9).fill(null), current: true, open: false });
  };

  public render() {
    return (
      <div className={styles.board}>
        <div className={styles.navbar}>
          <p className={styles.navbar__title}>Tic Tac Toe</p>
          <button
            className={styles.navbar__btn}
            onClick={() => remote.getCurrentWindow().close()}
          >
            &times;
          </button>
        </div>
        <div className={styles.board__players}>
          <p>Player X Wins: {this.state.winnerX}</p>
          <p>Player O Wins: {this.state.winnerO}</p>
        </div>
        <div className={styles.container}>
          {this.state.values.map((value, index) => (
            <button
              className={classname(styles.btn, {
                [styles["btn--disabled"]]: value !== null,
              })}
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
        <button className={styles.reset__btn} onClick={() => this.reset()}>
          Reset
        </button>
        <DialogBox
          open={this.state.open}
          message={this.state.message}
          reset={this.reset}
        />
      </div>
    );
  }
}
export default hot(module)(Board);
