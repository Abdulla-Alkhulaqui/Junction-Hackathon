import "../App.scss";

function Table() {
  const parseToSql = (tableName, objectToParse) => {
    let result = `CREATE TABLE  ${tableName} (`;
    const columnDataArr = [];
    for (let columnData of Object.keys(objectToParse)) {
      let tempRow = '';
      console.log('column data: ', columnData);
      tempRow += `${columnData} ${objectToParse[columnData].dataType} `;
      if (objectToParse[columnData].primary) {
        tempRow += 'PRIMARY KEY '
      }
      columnDataArr.push(tempRow)
    }
    result += `${columnDataArr.join(',')})`;
    return result;
  }
  let parseMap = (tablesToParse) => {
    let listOfTables = Object.keys(tablesToParse);

    for (let i of listOfTables) {
      // console.log(i, listOfTables[i][1])
      console.log(tablesToParse[i])
      console.log(parseToSql(i, tablesToParse[i]))
      // console.log(listOfTables[i].map(table => parseToSql(table)))
    }
  };
  /*CREATE TABLE table_name (
  column1 datatype,
  column2 datatype,
  column3 datatype,
....
);
*/
  let sample = {
    emp: {
      id: { dataType: "int", primary: true, foreign: false },
      name: { dataType: "varchar(255)", primary: true, foreign: false },
      order_id: { dataType: "int", primary: false, foreign: false },
    },
    emp2: {
      id: { dataType: "int", primary: true, foreign: false },
      name: { dataType: "int", primary: false, foreign: false },
      order_id: { dataType: "int", primary: false, foreign: false },
    },
    emp3: {
      id: { dataType: "int", primary: true, foreign: false },
      name: { dataType: "int", primary: false, foreign: false },
      order_id: { dataType: "int", primary: false, foreign: false },
    },
  };
  console.log(parseMap(sample));
  return (
    <div className="Table">
      {/* <div className="table-name">
        <h1>Emp</h1>
      </div>
      <table>
        <thead>
          <th>heloo</th>
          <th>heloo</th>
          <th>heloo</th>
          <th>heloo</th>
        </thead>
      </table> */}
    </div>
  );
}

export default Table;
