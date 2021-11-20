function Field(props) {
  return (
    <div className="Field">
      <span className="fieldId">{props.fieldId}</span>
      <span className="line"></span>
      <span className="fieldValue">{props.fieldValue}</span>
    </div>
  );
}

export default Field;
