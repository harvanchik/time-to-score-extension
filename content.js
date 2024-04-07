// Get the document object.
var doc = document;
console.log('content.js loaded');

const table = document.querySelector('table');

const data = [];

// Define the filter function.
function filter() {
  let isMySchedule = true;
  // Only return links that contain the specified text.
  console.log('Filtering');
  for (const row of table.rows) {
    const cells = row.cells;
    if (cells[0].localName === 'th') {
      // for each cell, print the text content
      for (const cell of cells) {
        if (cell.innerText.includes('Unassigned')) isMySchedule = false;
        console.log('Header', cell.innerText);
      }
    } else if (cells[0].localName === 'td') {
      // for each cell, print the text content
      for (const cell of cells) {
        // game is requested
        let isRequested = cell.innerText.includes('Unrequest Game');
        if (
          cell.innerText.toLocaleLowerCase().includes('valencia') ||
          cell.innerText.toLocaleLowerCase().includes('simi') ||
          cell.innerText.toLocaleLowerCase().includes('pickwick') ||
          cell.innerText.toLocaleLowerCase().includes('toyota') ||
          // if game is cross ice
          cell.innerText.toLocaleLowerCase().includes('cross')
        ) {
          // hide row
          if (!isMySchedule) row.style.display = 'none';
        }
        // add event listener to each row; when clicked, will strike through entire row
        cell.addEventListener('click', () => {
          if (row.style.textDecoration === 'line-through') {
            row.style.textDecoration = 'none';
          } else {
            row.style.textDecoration = 'line-through';
          }
        });
        // if date contains "mon" or "tue"
        if (cell.innerText.includes('Mon') || cell.innerText.includes('Tue')) {
          // strikethrough entire row
          if (!isMySchedule) row.style.textDecoration = 'line-through';
        }
        // if 8U or 10U games
        if (cell.innerText.includes('8U') || cell.innerText.includes('10U')) {
          // hide row
          if (!isMySchedule) row.style.display = 'none';
        }
        // if game has me already on it
        if (cell.innerText.includes('Jake Harvanchik')) {
          // hide row
          if (!isMySchedule) row.style.display = 'none';
        }
        // bold singles
        if (cell.innerText.includes('Single')) cell.style.fontWeight = 'bold';
        // if time is 10:30PM or later
        // if (isLateGame(cell.innerText)) {
        //   // hide row
        //   row.style.backgroundColor = "#b395d7";
        // }

        // if game is requested
        if (isRequested) {
          row.style.backgroundColor = '#f2a186';
          row.style.display = 'revert';
        }

        // if in "Level" column
        if (cell.cellIndex === 5) {
          // match youth levels
          if (cell.innerText.match(/\d+U/g))
            cell.style.backgroundColor = '#faa5d6';
        }
        if (cell.innerText.includes('TRYHL'))
          cell.style.backgroundColor = '#faa5d6';

        // rink colors
        if (cell.innerText.includes('Yorba'))
          cell.style.backgroundColor = '#e1e58e';
        if (cell.innerText.includes('Anaheim'))
          cell.style.backgroundColor = '#e8c165';
        if (cell.innerText.includes('Great'))
          cell.style.backgroundColor = '#81ec86';
        if (cell.innerText.includes('Lakewood'))
          cell.style.backgroundColor = '#a2e7ee';
        if (cell.innerText.includes('Valencia'))
          cell.style.backgroundColor = '#eb936c';
        if (cell.innerText.includes('KHS Ice'))
          cell.style.backgroundColor = '#8fadf3';
        if (cell.innerText.includes('East West'))
          cell.style.backgroundColor = '#f5a330';
        if (cell.innerText.includes('Lake Forest'))
          cell.style.backgroundColor = '#4ef5b7';
        if (cell.innerText.includes('Icetown'))
          cell.style.backgroundColor = '#c590fa';
      }
    }
  }
}

// Add a button to the top left of the screen.
var button = document.createElement('button');
button.textContent = 'Filter';
button.style.position = 'fixed';
button.style.top = '7';
button.style.left = '10';
button.style.fontSize = '20px';
button.addEventListener('click', () => {
  // Call the filter function and update the DOM.
  filter();
});

// Append the button to the DOM.
document.body.appendChild(button);

// function isLateGame(timeString) {
//   // Convert the time string to a Date object.
//   let time = new Date(cleanString(timeString));
//   // Check if the time is after 10:30pm.
//   return time.getHours() >= 22 && time.getMinutes() >= 30;
// }

// function cleanString(string) {
//   // Remove any leading or trailing whitespace.
//   string = string.trim();

//   // Replace any invisible characters with spaces.
//   string = string.replace(/\s+/g, " ");

//   return string;
// }

/**
 * Parses the table and creates a custom table object with a title and array of custom row objects.
 * It will skip the first two rows of the table because they contain the title and column names.
 */
function parseTable() {
  // define custom table object
  const tableData = {
    title: '',
    rows: [],
  };
  // get the table element
  const newTable = document.querySelector('table');

  // get the table title
  tableData.title = newTable.rows[0].cells[0].innerText;

  // get the table rows
  const tableRows = newTable.rows;

  // get the table data
  for (let i = 2; i < tableRows.length; i++) {
    // create the custom row object
    const row = {
      gameId: tableRows[i]?.cells[0]?.innerText,
      date: tableRows[i]?.cells[1]?.innerText,
      time: tableRows[i]?.cells[2]?.innerText,
      rink: tableRows[i]?.cells[3]?.innerText,
      league: tableRows[i]?.cells[4]?.innerText,
      level: tableRows[i]?.cells[5]?.innerText,
      type: tableRows[i]?.cells[8]?.innerText,
      referee: tableRows[i]?.cells[9]?.innerText,
      referee2: tableRows[i]?.cells[12]?.innerText,
      linesman: tableRows[i]?.cells[10]?.innerText,
      linesman2: tableRows[i]?.cells[11]?.innerText,
      isRequested: tableRows[i]?.cells[15]?.innerText?.includes('Unrequest'),
    };
    // add the row to the table data
    tableData.rows.push(row);
  }
  // return the table
  return tableData;
}

function buildTable(tableData) {
  // create the table element
  const table = document.createElement('table');
  // create the table header
  const tableHeader = document.createElement('thead');
  // create the table body
  const tableBody = document.createElement('tbody');
  // create the table title
  const tableTitle = document.createElement('caption');
  // set the table title
  tableTitle.innerText = tableData.title;
  // append the title to the table
  table.appendChild(tableTitle);
  // create the table header row
  const tableHeaderRow = document.createElement('tr');
  // create the table header cells
  const tableHeaderCells = [];
  // create the table body rows
  const tableBodyRows = [];
  // create the table body cells
  const tableBodyCells = [];
  // create the table header cells
  for (let i = 0; i < 13; i++) {
    // create the table header cell
    const tableHeaderCell = document.createElement('th');
    // set the table header cell text
    tableHeaderCell.innerText = tableData.rows[0][i];
    // append the table header cell to the table header row
    tableHeaderRow.appendChild(tableHeaderCell);
    // append the table header cell to the table header cells array
    tableHeaderCells.push(tableHeaderCell);
  }
  // append the table header row to the table header
  tableHeader.appendChild(tableHeaderRow);
  // append the table header to the table
  table.appendChild(tableHeader);
  // create the table body rows
  for (let i = 1; i < tableData.rows.length; i++) {
    // create the table body row
    const tableBodyRow = document.createElement('tr');
    // create the table body cells
    for (let j = 0; j < 13; j++) {
      // create the table body cell
      const tableBodyCell = document.createElement('td');
      // set the table body cell text
      tableBodyCell.innerText = tableData.rows[i][j];
      // append the table body cell to the table body row
      tableBodyRow.appendChild(tableBodyCell);
      // append the table body cell to the table body cells array
      tableBodyCells.push(tableBodyCell);
    }
    // append the table body row to the table body
    tableBody.appendChild(tableBodyRow);
    // append the table body row to the table body rows array
    tableBodyRows.push(tableBodyRow);
  }
  // append the table body to the table
  table.appendChild(tableBody);
  // append the table to the document body
  document.body.appendChild(table);
}

// console.log(parseTable());
// buildTable(parseTable());
