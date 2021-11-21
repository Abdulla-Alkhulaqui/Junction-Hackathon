import "../App.scss";
import Field from "./Field";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function BoardGenarator() {
  const [schemaName, setsSchemaName] = useState("");
  const [tableFields, setsTableFields] = useState({});
  const [fieldsComp, setFieldsComp] = useState([]);
  let table = { tableName: schemaName, tableFields: tableFields };

  let genarateBoard = () => {
    localStorage.setItem('tableData', JSON.stringify(table));
      /*eslint no-undef-init: "error"*/
      window.init();
  };
  let updateTableFields = async (data, childKey) => {
    let tempTableField = tableFields;
    tempTableField[childKey] = data;
    await setsTableFields(tempTableField);
  };


  useEffect(() => {
      setFieldsComp([
          ...fieldsComp,
          <Field
              func={updateTableFields}
              icon={fieldsComp.length === 0}
              fieldKey={fieldsComp.length + 1 + ""}
              key={fieldsComp.length + 1}
          />,
      ]);
  }, []);

  return (
    <div className="BoardGenerator">
      <div className="title">
        <h1 className="h1 text-medium">SQL schema generator</h1>
      </div>
      <div className="form-group">
        <h2 className="h2 text-normal">Schema Name</h2>
        <input
          onInput={async (e) => await setsSchemaName(e.target.value)}
          className="input"
          type="text"
          placeholder="Schema name"
        />
      </div>

      <div className="schema-values">
        <div className="form-group">
          <h2 className="h2 text-normal">Schema values</h2>
        </div>
          <div className={"schema-values__wrapper"}>
              <div className="fields">{fieldsComp}</div>
          </div>
          <FontAwesomeIcon
              onClick={() => {
                  setFieldsComp([
                      ...fieldsComp,
                      <Field
                          func={updateTableFields}
                          icon={fieldsComp.length === 0}
                          fieldKey={fieldsComp.length + 1 + ""}
                          key={fieldsComp.length + 1}
                      />,
                  ]);
              }}
              className={'icon-add-column'}
              icon={faPlusCircle}
              id="plusIcon"
              size="lg"
          />
      </div>
      <button onClick={(e) => genarateBoard()} className="genarate-btn">
        Generate
      </button>
        <button onClick={(e) => genarateBoard()} className="genarate-btn__secondary">
            Open Tables Editor
        </button>
    </div>
  );
}

export default BoardGenarator;
