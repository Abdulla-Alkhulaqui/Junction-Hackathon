import "./App.scss";
// import ParseToSql from "./components/ParseToSql";
import StateUpdater from "./components/StateUpdater";
import {useEffect, useRef} from "react";

function App() {
    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true;
        return () => {
            localStorage.setItem('createdTablesNumber', '0');
            isMounted.current = false;
        }
    }, []);


    return (
    <div className="App">
      <StateUpdater />
      {/*<ParseToSql />*/}
    </div>
  );
}

export default App;
