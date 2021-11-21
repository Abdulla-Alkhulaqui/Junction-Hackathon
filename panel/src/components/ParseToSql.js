import React, { useState } from "react";

import { format } from "sql-formatter";
function ParseToSql(props) {
  let sample = {
    emp: {
      id: { dataType: "int", primary: true, foreign: false },
      name: { dataType: "varchar(255)", primary: true, foreign: false },
      order_id: { dataType: "int", primary: false, foreign: false },
    },
    dept: {
      id: { dataType: "int", primary: true, foreign: false },
      deptname: { dataType: "int", primary: false, foreign: false },
      deptno: { dataType: "int", primary: false, foreign: false },
    },
    sal: {
      salcat: { dataType: "int", primary: true, foreign: false },
      value: { dataType: "int", primary: false, foreign: false },
      saltax: { dataType: "int", primary: false, foreign: false },
    },
  };

  const parseToSql = (tableName, objectToParse) => {
    let result = `CREATE TABLE  ${tableName} (`;
    const columnDataArr = [];
    for (let columnData of Object.keys(objectToParse)) {
      let tempRow = "";
      tempRow += `${columnData} ${objectToParse[columnData].dataType} `;
      if (objectToParse[columnData].primary) {
        tempRow += "PRIMARY KEY ";
      }
      columnDataArr.push(tempRow);
    }
    result += `${columnDataArr.join(",")})`;
    return result;
  };
  let parseMap = (tablesToParse) => {
    let listOfTables = Object.keys(tablesToParse);
    let result = [];
    for (let i of listOfTables) {
      result.push(parseToSql(i, tablesToParse[i]));
    }
    return result;
  };

  return (
    <div className="ParseToSql">
      {parseMap(sample).map((table) => format(table))}
    </div>
  );
}
export default ParseToSql;
