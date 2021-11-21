import React, { useState } from "react";

import Table from "./Table";
function StateUpdater() {
  let [deletedItems, setDeletedItems] = useState([]);
  let [tables, setTables] = useState({});

  let tables2 = [
    {
      id: "3074457368053387488",
      parent: null,
      content: "EMP",
      children: [
        {
          id: "3074457368053387496",
          parent: "EMP",
          content: "id",
          children: [
            {
              id: "3074457368053387497",
              content: "int",
              parent: "3074457368053387496",
              children: [],
            },
            {
              id: "3074457368053387498",
              content: "true",
              parent: "3074457368053387496",
              children: [],
            },
            {
              id: "3074457368053387499",
              content: "default",
              parent: "3074457368053387496",
              children: [],
            },
            {
              id: "3074457368053387501",
              content: "false",
              parent: "3074457368053387499",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "3074457368053387488",
      parent: null,
      content: "EMP",
      children: [
        {
          id: "3074457368053387496",
          parent: "EMP",
          content: "id",
          children: [
            {
              id: "3074457368053387497",
              content: "int",
              parent: "3074457368053387496",
              children: [],
            },
            {
              id: "3074457368053387498",
              content: "true",
              parent: "3074457368053387496",
              children: [],
            },
            {
              id: "3074457368053387499",
              content: "default",
              parent: "3074457368053387496",
              children: [],
            },
            {
              id: "3074457368053387501",
              content: "false",
              parent: "3074457368053387499",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  let updateTableInfo = (id, newData) => {
    setTables({ id: id, newType: newData, deletedItems: deletedItems });
  };
  let addDeletedFields = (deletedFieldId) => {
    setDeletedItems([...deletedItems, deletedFieldId]);
  };
  let returnFun = () => {
    console.log(tables);
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
          return (
            <Table
              table={table}
              key={index}
              func={updateTableInfo}
              returnFun={returnFun}
              addDeletedFields={addDeletedFields}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StateUpdater;
