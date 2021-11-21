import React, { useState } from "react";

import Table from "./Table";
function StateUpdater() {
  let table1 = { tableName: "emp", fields: ["id", "name", "age"] };
  // let table1 = {
  //   tableName: "",
  //   fields: {
  //     id: { type: "", forignKey: "" },
  //     name: { type: "", forignKey: "" },
  //     age: { type: "", forignKey: "" },
  //   },
  // };
  let table2 = { tableName: "dept", fields: ["id", "loc"] };
  let tables2 = [table1, table2];
  let [tables, setTables] = useState([]);
  //Check the value if changed and then change it.
  // let createTablesStructure = (tables) => {
  //   let result = tables.map((table) => {
  //     {
  //       tableName: table.tableName;
  //       fields: table.field.map((field) => {
  //         {
  //           `${field}`:""
  //         }
  //       });
  //     }
  //   });
  // };
  // createTablesStructure(tables2);
  let updateTableInfo = (tableName, field, section, data) => {
    let tempTables = tables;
    // tempTables[tableName][field] = data;
    // table[tableName][field][section] = data

    console.log(tableName, field, section, data);
  };
  return (
    <div className="StateUpdater">
      <div className="header">
        <button className="jsonExport">Export JSON</button>
        <div className="schema-code">
          <span className="schema">schema</span>
          <span className="code">code</span>
        </div>
      </div>
      <div className="tables">
        {tables2.map((table, index) => {
          return <Table table={table} key={index} func={updateTableInfo} />;
        })}
      </div>
    </div>
  );
}

export default StateUpdater;
