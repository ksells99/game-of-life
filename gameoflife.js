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

    // If cell currently alive
    if (curr == 1) {
      // Less than 2 live neighbours
      if (total < 2) {
        // This cell dies
        return 0;

        // Else if 2 or 3 neighbours alive
      } else if (total == 2 || total == 3) {
        // This cell lives
        return 1;
        //
        // Else if more than 3
      } else {
        // This cell dies
        return 0;
      }

      // If this cell is currently dead - becomes alive if 3 live neighbours
    } else {
      if (total == 3) {
        // If dead and had 3 live neighbours
        // Cell becomes live
        return 1;

        // Else stays dead
      } else {
        return 0;
      }
    }
  };

  const stepInTime = () => {
    // For every row
    for (let i = 0; i < arr.length; i++) {
      // Loop through each cell
      for (let j = 0; j < arr[i].length; j++) {
        let neighbours = [];
        // Top-left cell
        if (i == 0 && j == 0) {
          // Get values of neighbours
          neighbours = [arr[i][j + 1], arr[i + 1][j], arr[i + 1][j + 1]];

          // Top-right cell
        } else if (i == 0 && j == arr[i].length - 1) {
          neighbours = [arr[i][j - 1], arr[i + 1][j], arr[i + 1][j - 1]];

          // Other cells on top row
        } else if (i == 0) {
          neighbours = [
            arr[i][j - 1],
            arr[i][j + 1],
            arr[i + 1][j - 1],
            arr[i + 1][j],
            arr[i + 1][j + 1],
          ];

          // Bottom-left cell
        } else if (i == arr.length - 1 && j == 0) {
          neighbours = [arr[i][j + 1], arr[i - 1][j], arr[i - 1][j + 1]];

          // Bottom-right cell
        } else if (i == arr.length - 1 && j == arr[i].length - 1) {
          neighbours = [arr[i][j - 1], arr[i - 1][j], arr[i - 1][j - 1]];

          // Other cells on bottom row
        } else if (i == arr.length - 1) {
          neighbours = [
            arr[i][j - 1],
            arr[i][j + 1],
            arr[i - 1][j - 1],
            arr[i - 1][j],
            arr[i - 1][j + 1],
          ];

          // First cell on middle rows
        } else if (i != 0 && i != arr.length - 1 && j == 0) {
          neighbours = [
            arr[i][j + 1],
            arr[i - 1][j],
            arr[i - 1][j + 1],
            arr[i + 1][j],
            arr[i + 1][j + 1],
          ];

          // Last cell on middle rows
        } else if (i != 0 && i != arr.length - 1 && j == arr[i].length - 1) {
          neighbours = [
            arr[i][j - 1],
            arr[i - 1][j],
            arr[i - 1][j - 1],
            arr[i + 1][j - 1],
            arr[i + 1][j],
          ];

          // Other cells on middle rows
        } else {
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
