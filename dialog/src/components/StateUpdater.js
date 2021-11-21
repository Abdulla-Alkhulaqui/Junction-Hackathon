import React, {useEffect, useState} from "react";

import Table from "./Table";
function StateUpdater() {
  let [deletedItems, setDeletedItems] = useState([]);
  const [tables, setTables] = useState({});
  const [fetchedTables, setFetchedTables] = useState([]);

  useEffect(async () => {
    const createdTablesNumber = (+localStorage.getItem('createdTablesNumber'));

    if (!isNaN(createdTablesNumber) && createdTablesNumber > 0) {
      /*eslint no-undef-init: "error"*/
      const tables = await window.createViewData();
      await setFetchedTables(tables);
      console.log(tables);
    }

  }, []);

  let updateTableInfo = (id, newData) => {
    setTables({ id: id, newType: newData, deletedItems: deletedItems });
    if (window.updateBoardState) {
      window.updateBoardState(id, newData);
    } else {
      console.error("No update state function")
    }
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
        {fetchedTables.map((table, index) => {
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
