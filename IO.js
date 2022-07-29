class Chess {
  chessboard = [];
  places = ["A", "B", "C", "D", "E", "F", "G", "H"];
  pieces = {
    Pawn: {
      step: 1,
      east: true,
      west: false,
      north: false,
      south: false,
      northEast: false,
      northWest: false,
      southEast: false,
      southWest: false,
    },
    King: {
      step: 1,
      east: true,
      west: true,
      north: true,
      south: true,
      northEast: true,
      northWest: true,
      southEast: true,
      southWest: true,
    },

    Queen: {
      step: 7,
      east: true,
      west: true,
      north: true,
      south: true,
      northEast: true,
      northWest: true,
      southEast: true,
      southWest: true,
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
          const moves = this.check(place, indexValue, this.pieces[piece]);
          this.drawPosibilities(moves);
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
  check = (position, actualIndex, pieceObj) => {
    const [alphabet, positionIndex] = position.split("");
    const alphaIndex = this.places.indexOf(alphabet);
    const moves = [];
    // console.log(alphabet, actualIndex, positionIndex);

    for (let x = 0; x < this.chessboard.length; x++) {
      for (let y = 0; y < this.chessboard[x].length; y++) {
        if (y === alphaIndex) {
          for (let p = 1; p <= pieceObj.step; p++) {
            // one step east
            if (
              pieceObj.east &&
              typeof this.chessboard[x - p] !== "undefined"
            ) {
              if (actualIndex === x) {
                moves.push(this.chessboard[x - p][y]);
              }

              // one step for south-east
              if (
                pieceObj.southEast &&
                typeof this.chessboard[x - p][y + p] !== "undefined"
              ) {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x - p][y + p]);
                }
              }

              // one step north-east
              if (
                pieceObj.northEast &&
                typeof this.chessboard[x - p][y - p] !== "undefined"
              ) {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x - p][y - p]);
                }
              }
            }

            // one step west
            if (
              pieceObj.west &&
              typeof this.chessboard[x + p] !== "undefined"
            ) {
              if (actualIndex === x) {
                moves.push(this.chessboard[x + p][y]);
              }

              // one step south-west
              if (
                pieceObj.southWest &&
                typeof this.chessboard[x + p][y + p] !== "undefined"
              ) {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x + p][y + p]);
                }
              }

              // one step north-west
              if (
                pieceObj.northWest &&
                typeof this.chessboard[x + p][y - p] !== "undefined"
              ) {
                if (actualIndex === x) {
                  moves.push(this.chessboard[x + p][y - p]);
                }
              }
            }

            // one step north
            if (
              pieceObj.north &&
              typeof this.chessboard[x][y - p] !== "undefined"
            ) {
              if (actualIndex === x) {
                moves.push(this.chessboard[x][y - p]);
              }
            }

            // one step south
            if (
              pieceObj.south &&
              typeof this.chessboard[x][y + p] !== "undefined"
            ) {
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
  };
  drawPosibilities = (moves) => {
    let boardCopy = this.chessboard;
    const movesArr = moves.split(",");

    for (let x = 0; x < this.chessboard.length; x++) {
      for (let y = 0; y < this.chessboard[x].length; y++) {
        if (movesArr.indexOf(this.chessboard[x][y]) <= -1)
          boardCopy[x][y] = "-";
      }
    }
    this.drawConsole("Possible Moves\t");
    console.table(boardCopy);
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
