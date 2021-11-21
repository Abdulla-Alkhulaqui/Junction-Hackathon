import "./App.scss";
import BoardGenarator from "./components/BoardGenarator";
import ParseToSql from "./components/ParseToSql";
import StateUpdater from "./components/StateUpdater";

function App() {
  return (
    <div className="App">
      <BoardGenarator />
      <StateUpdater />
      <ParseToSql />
    </div>
  );
}

export default App;
