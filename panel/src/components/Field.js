import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faKey } from "@fortawesome/free-solid-svg-icons";
function Field(props) {
  const [fieldId, setFieldId] = useState("");
  const [fieldValue, setFieldValue] = useState("int");
  return (
    <div className="Field">
      {props.icon ? <FontAwesomeIcon icon={faKey} className="icon" /> : ""}

      <input
        onInput={async (e) => {
          await setFieldId(e.target.value);
          props.func(
            { fieldId: e.target.value, fieldValue: fieldValue, primary: !!props.icon },
            props.fieldKey
          );
        }}
        id="fieldId"
        type="text"
        placeholder="id"
      />

      <select
        className="select"
        id="fieldValue"
        onChange={async (e) => {
          await setFieldValue(e.target.value);
          props.func(
            { fieldId: fieldId, fieldValue: e.target.value, primary: !!props.icon },
            props.fieldKey
          );
        }}
      >
        <option value="int">int</option>
        <option value="varchar2()">varchar2()</option>
        <option value="float">float</option>
        <option value="double">double</option>
        <option value="date">date</option>
      </select>
    </div>
  );
}

export default Field;
