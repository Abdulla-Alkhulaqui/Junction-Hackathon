import "./App.scss";
import BoardGenarator from "./components/BoardGenarator";
import {useEffect, useRef} from "react";
// import ParseToSql from "./components/ParseToSql";

function App() {
    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true;
        return () => {
            localStorage.setItem('createdTablesNumber', '0');
            isMounted.current = false;
        }
        // eslint-disable-next-line
    }, []);


    return (
    <div className="App">
      <BoardGenarator />
      {/*<StateUpdater />*/}
      {/*<ParseToSql />*/}
    </div>
  );
}

export default App;
