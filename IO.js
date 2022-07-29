class Chess {
  chessboard = [];
  places = ["A", "B", "C", "D", "E", "F", "G", "H"];
  pieces = {
    Pawn: {
      check: (position, actualIndex) => {
        const [alphabet, positionIndex] = position.split("");
        const alphaIndex = this.places.indexOf(alphabet);
        const moves = [];
        // console.log(alphabet, actualIndex, positionIndex);

        for (let x = 0; x < this.chessboard.length; x++) {
          for (let y = 0; y < this.chessboard[x].length; y++) {
            if (y === alphaIndex) {
              if (typeof this.chessboard[x - 1] !== "undefined") {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x - 1][y]);
                }
              }
            }
          }
        }
        moves.sort();
        return moves.join();
      },
    },
    King: {
      check: (position, actualIndex) => {
        const [alphabet, positionIndex] = position.split("");
        const alphaIndex = this.places.indexOf(alphabet);
        const moves = [];

        for (let x = 0; x < this.chessboard.length; x++) {
          for (let y = 0; y < this.chessboard[x].length; y++) {
            if (y === alphaIndex) {
              // one step east
              if (typeof this.chessboard[x - 1] !== "undefined") {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x - 1][y]);
                }

                // one step for south-east
                if (typeof this.chessboard[x - 1][y + 1] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x - 1][y + 1]);
                  }
                }

                // one step north-east
                if (typeof this.chessboard[x - 1][y - 1] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x - 1][y - 1]);
                  }
                }
              }

              // one step west
              if (typeof this.chessboard[x + 1] !== "undefined") {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x + 1][y]);
                }

                // one step south-west
                if (typeof this.chessboard[x + 1][y + 1] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x + 1][y + 1]);
                  }
                }

                // one step north-west
                if (typeof this.chessboard[x + 1][y - 1] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x + 1][y - 1]);
                  }
                }
              }

              // one step north
              if (typeof this.chessboard[x][y - 1] !== "undefined") {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x][y - 1]);
                }
              }

              // one step south
              if (typeof this.chessboard[x][y + 1] !== "undefined") {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x][y + 1]);
                }
              }
            }
          }
        }

        moves.sort();
        return moves.join();
      },
    },

    Queen: {
      check: (position, actualIndex) => {
        const [alphabet, positionIndex] = position.split("");
        const alphaIndex = this.places.indexOf(alphabet);
        const moves = [];

        for (let x = 0; x < this.chessboard.length; x++) {
          for (let y = 0; y < this.chessboard[x].length; y++) {
            if (y === alphaIndex) {
              for (let p = 1; p <= 7; p++) {
                // one step east
                if (typeof this.chessboard[x - p] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x - p][y]);
                  }

                  // one step for south-east
                  if (typeof this.chessboard[x - p][y + p] !== "undefined") {
                    if (actualIndex === x) {
                      moves.push(this.chessboard[x - p][y + p]);
                    }
                  }

                  // one step north-east
                  if (typeof this.chessboard[x - p][y - p] !== "undefined") {
                    if (actualIndex === x) {
                      moves.push(this.chessboard[x - p][y - p]);
                    }
                  }
                }

                // one step west
                if (typeof this.chessboard[x + p] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x + p][y]);
                  }

                  // one step south-west
                  if (typeof this.chessboard[x + p][y + p] !== "undefined") {
                    if (actualIndex === x) {
                      moves.push(this.chessboard[x + p][y + p]);
                    }
                  }

                  // one step north-west
                  if (typeof this.chessboard[x + p][y - p] !== "undefined") {
                    if (actualIndex === x) {
                      moves.push(this.chessboard[x + p][y - p]);
                    }
                  }
                }

                // one step north
                if (typeof this.chessboard[x][y - p] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x][y - p]);
                  }
                }

                // one step south
                if (typeof this.chessboard[x][y + p] !== "undefined") {
                  if (actualIndex === x) {
                    moves.push(this.chessboard[x][y + p]);
                  }
                }
              }
            }
          }
        }

        moves.sort();
        return moves.join();
      },
    },
  };
  constructor() {
    this.drawConsole("Let's play chess");
  }

  drawConsole = (string) => {
    console.log("\n");
    console.log(
      "------------------------------------------------------------------"
    );
    console.log(`| \t\t\t${string}\t\t\t |`);
    console.log(
      "------------------------------------------------------------------"
    );
  };
  board = () => {
    try {
      const rows = Array.from({ length: 8 }, (v, i) => i);
      const cols = Array.from({ length: 8 }, (v, i) => i);

      for (let x = 0; x < rows.length; x++) {
        this.chessboard[x] = [];
        for (let y = 0; y < cols.length; y++) {
          this.chessboard[x][y] = `${this.places[y]}${x + 1}`;
        }
      }
      this.chessboard.reverse();
      this.drawConsole("It's your chessboard");
      console.table(this.chessboard);
    } catch (error) {
      console.log("error while preparing chess board", error);
    }
  };

  move = (piece, place) => {
    try {
      if (typeof this.pieces[piece] !== "undefined") {
        const indexValue = this.chessboard.findIndex((arr) =>
          arr.includes(place)
        );

        if (indexValue >= 0) {
          const moves = this.pieces[piece].check(place, indexValue);
          if (moves !== "") return moves;
          else return "No moves are available!";
        } else {
          return "Invalid position";
        }
      } else {
        return "Invalid piece";
      }
    } catch (error) {
      console.log("error while moving piece", error);
    }
  };
}

const chess = new Chess();
chess.board();

const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.question("\n\nWhat's your move? > ", (move) => {
  const [piece, position] = move.split(",");
  // console.log(piece, position);
  const possibility = chess.move(piece, position);

  console.log("Your possible moves are > ", possibility);
  readLine.close();
});
