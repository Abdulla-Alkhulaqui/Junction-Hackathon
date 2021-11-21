import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import TableField from "./TableField";
function Table(props) {
  let [tableTrigger, setTableTrigger] = useState(false);

  return (
    <div className="table">
      <div className="table-name">
        <div className="table-name-arrow">
          <FontAwesomeIcon
            onClick={(e) => {
              setTableTrigger(!tableTrigger);
            }}
            icon={faChevronUp}
            className="iconUpArrow"
            size="lg"
          />
          <h1 className="h1">{props.table.tableName}</h1>
        </div>
      </div>
      {tableTrigger
        ? props.table.fields.map((field, index) => {
            return (
              <TableField
                field={field}
                tableName={props.table.tableName}
                key={index}
                func={props.func}
              />
            );
          })
        : ""}
    </div>
  );
}

export default Table;
