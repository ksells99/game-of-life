const gameOfLife = (starter) => {
  // Create copy of starter array - this gets modified at the end of each cycle
  let arr = starter.map((starter) => {
    return starter.slice();
  });

  // Create copy of the above array - this one gets modified when each individual cell changes
  // Can't just directly mutate the above array otherwise the rule for the next cell will be applied on the changed array, not the original
  let newArray = arr.map((arr) => {
    return arr.slice();
  });

  // Helper function works out whether cell should be alive or dead based on total live neighbours
  const checkIfAliveOrDead = (curr, neighbours) => {
    // Calculate total live neighbours by summing neighbours array
    let total = neighbours.reduce((acc, neighbour) => {
      return acc + neighbour;
    });

    // Work out whether cell should be alive or dead based on current state & total live neighbours
    switch (true) {
      case curr == 1 && total < 2:
        return 0;
      case curr == 1 && (total == 2 || total == 3):
        return 1;
      case curr == 1 && total > 3:
        return 0;
      case curr == 0 && total == 3:
        return 1;
      default:
        return 0;
    }
  };

  const stepInTime = () => {
    // For every row
    for (let i = 0; i < arr.length; i++) {
      // Loop through each cell
      for (let j = 0; j < arr[i].length; j++) {
        let neighbours = [];

        switch (true) {
          // TOP ROW
          // Top-left cell
          case i == 0 && j == 0:
            neighbours = [arr[i][j + 1], arr[i + 1][j], arr[i + 1][j + 1]];
            break;
          // Top-right cell
          case i == 0 && j == arr[i].length - 1:
            neighbours = [arr[i][j - 1], arr[i + 1][j], arr[i + 1][j - 1]];
            break;
          // Other cells on top row
          case i == 0:
            neighbours = [
              arr[i][j - 1],
              arr[i][j + 1],
              arr[i + 1][j - 1],
              arr[i + 1][j],
              arr[i + 1][j + 1],
            ];
            break;

          // BOTTOM ROW
          // Bottom-left cell
          case i == arr.length - 1 && j == 0:
            neighbours = [arr[i][j + 1], arr[i - 1][j], arr[i - 1][j + 1]];
            break;
          // Bottom-right cell
          case i == arr.length - 1 && j == arr[i].length - 1:
            neighbours = [arr[i][j - 1], arr[i - 1][j], arr[i - 1][j - 1]];
            break;
          // Other cells on bottom row
          case i == arr.length - 1:
            neighbours = [
              arr[i][j - 1],
              arr[i][j + 1],
              arr[i - 1][j - 1],
              arr[i - 1][j],
              arr[i - 1][j + 1],
            ];
            break;

          // MIDDLE ROWS
          // First cell
          case i != 0 && i != arr.length - 1 && j == 0:
            neighbours = [
              arr[i][j + 1],
              arr[i - 1][j],
              arr[i - 1][j + 1],
              arr[i + 1][j],
              arr[i + 1][j + 1],
            ];
            break;
          // Last cell on middle rows
          case i != 0 && i != arr.length - 1 && j == arr[i].length - 1:
            neighbours = [
              arr[i][j - 1],
              arr[i - 1][j],
              arr[i - 1][j - 1],
              arr[i + 1][j - 1],
              arr[i + 1][j],
            ];
            break;
          // Other cells on middle rows - all have 8 neighbours
          default:
            neighbours = [
              arr[i][j - 1],
              arr[i][j + 1],
              arr[i - 1][j - 1],
              arr[i - 1][j],
              arr[i - 1][j + 1],
              arr[i + 1][j - 1],
              arr[i + 1][j],
              arr[i + 1][j + 1],
            ];
            break;
        }

        // Helper function returns 0 or 1 based on current state & total neighbours
        // Change this cell to whatever is returned
        newArray[i][j] = checkIfAliveOrDead(arr[i][j], neighbours);
      }
    }

    // Display new array
    console.log(newArray);

    // Need to change original array defined at start of function to be this new one
    // Next cycle will then use this new array and not the original
    arr = newArray.map((newArr) => {
      return newArr.slice();
    });

    setTimeout(stepInTime, 3000);
  };

  stepInTime();
};

const starter = [
  [1, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1],
  [0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 1],
];

gameOfLife(starter);
