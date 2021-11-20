import "../App.scss";
import Field from "./Field";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faKey } from "@fortawesome/free-solid-svg-icons";

function BoardGenarator() {
  const [schemaName, setsSchemaName] = useState("");
  const [tableFields, setsTableFields] = useState({});
  const [fieldsComp, setFieldsComp] = useState([]);
  let table = { tableName: schemaName, tableFields: tableFields };

  let genarateBoard = () => {
    console.log(table);
  };
  let updateTableFields = async (data, childKey) => {
    let tempTableField = tableFields;
    tempTableField[childKey] = data;
    await setsTableFields(tempTableField);
  };
  return (
    <div className="BoardGenerator">
      <div className="title">
        <h1 className="h1">SQL schema generator</h1>
      </div>
      <div className="form-group">
        <h2 className="h2">Schema Name</h2>
        <input
          onInput={async (e) => await setsSchemaName(e.target.value)}
          className="input"
          type="text"
          placeholder="Schema name"
        />
      </div>

      <div className="schema-values">
        <div className="form-group">
          <h2 className="h2">Schema values</h2>
        </div>
        <div className="fields">{fieldsComp}</div>
        <FontAwesomeIcon
          onClick={(e) => {
            setFieldsComp([
              ...fieldsComp,
              <Field
                func={updateTableFields}
                icon={fieldsComp.length == 0}
                fieldKey={fieldsComp.length + 1 + ""}
                key={fieldsComp.length + 1}
              />,
            ]);
          }}
          icon={faPlusCircle}
          id="plusIcon"
          size="lg"
        />
      </div>
      <button onClick={(e) => genarateBoard()} className="genarate-btn">
        Genarate
      </button>
    </div>
  );
}

export default BoardGenarator;
