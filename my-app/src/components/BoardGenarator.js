import "../App.scss";
import Field from "./Field";

function BoardGenarator() {
  return (
    <div className="BoardGenarator">
      <div className="title">
        <p>SQL Schima Creator</p>
      </div>
      <div className="schima-name-input">
        <label>
          Schima Name
          <br />
          <input type="text" name="name" />
        </label>
      </div>
      <div className="schima-values">
        <label>
          Schima values
          <br />
        </label>
        <div className="">
          <Field fieldId="id" fieldValue="int" />
          <Field fieldId="id" fieldValue="int" />
          <Field fieldId="id" fieldValue="int" />
        </div>
      </div>
    </div>
  );
}

export default BoardGenarator;
