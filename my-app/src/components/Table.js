import "../App.scss";

function Table() {
  let parseToSql = (objectToParse) => {
    console.log();
    let values = Object.values(objectToParse);
    let result = "";

    for (let i = 0; i < values.length; i++) {
      console.log(values[i].id);
    }
  };
  let sample = {
    emp: {
      id: { dataType: "int", primary: true, foreign: false },
      name: { dataType: "varchar(255)", primary: false, foreign: false },
      order_id: { dataType: "int", primary: false, foreign: false },
    },
    emp2: {
      id: { primary: true, foreign: false },
      name: { primary: false, foreign: false },
      order_id: { primary: false, foreign: false },
    },
  };
  // console.log(parseToSql(sample));
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
