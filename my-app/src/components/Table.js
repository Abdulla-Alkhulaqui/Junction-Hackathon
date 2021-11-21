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
          <h1 className="h1">{props.table.content}</h1>
        </div>
      </div>
      {tableTrigger
        ? props.table.children.map((child, index) => {
            return (
              <TableField
                child={child}
                key={index}
                func={props.func}
                returnFun={props.returnFun}
                addDeletedFields={props.addDeletedFields}
              />
            );
          })
        : ""}
    </div>
  );
}

export default Table;
