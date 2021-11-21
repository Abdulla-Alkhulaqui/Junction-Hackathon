import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
function TableField(props) {
  let [fieldTrigger, setFieldTrigger] = useState(false);
  let [foreignKey, setForeignKey] = useState("");
  let [fieldType, setFieldType] = useState("");

  return (
    <div className="TableField">
      <div className="field-name-arrow">
        <FontAwesomeIcon
          onClick={(e) => {
            setFieldTrigger(!fieldTrigger);
          }}
          icon={faChevronUp}
          className="iconUpArrow"
        />
        <h2 className="h2">{props.field}</h2>
      </div>
      {!fieldTrigger && (
        <div className="field-type-foreignKeys">
          <div className="field-type">
            <span>type</span>
            <select
              onChange={(e) => {
                setFieldType(e.target.value);
                props.func(
                  props.tableName,
                  props.field,
                  "type",
                  e.target.value
                );
              }}
              className="select"
            >
              <option value="int">int</option>
              <option value="varchar2()">varchar2()</option>
              <option value="float">float</option>
              <option value="double">double</option>
              <option value="date">date</option>
            </select>
          </div>
          <div className="table-foreignKeys">
            <span>foreign key in</span>
            <select
              onChange={(e) => {
                setForeignKey(e.target.value);
                props.func(
                  props.tableName,
                  props.field,
                  "foreignKey",
                  e.target.value
                );
              }}
              className="select foreignKeysSelect"
            >
              <option value="dept">restaurant</option>
              <option value="shcool">shcool</option>
            </select>
          </div>
        </div>
      )}

      <div className="delete-save-btns">
        <button className="delete-btn">delete</button>
        {!fieldTrigger ? <button className="save-btn">save</button> : ""}
      </div>
    </div>
  );
}

export default TableField;
