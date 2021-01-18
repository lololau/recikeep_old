import React, { FunctionComponent }  from "react";
import { Counter } from "./features/counter/counter";
import "./App.css";
import { useSelector } from "react-redux";
import { selectLastError } from "./features/counter/counterSlice";
import Alert, { AlertProps } from '@material-ui/lab/Alert';

const RenderAlert: FunctionComponent<AlertProps> = (props) => {
  return <Alert severity={props.severity}>{props.children}</Alert>;
}

function App() {
  const lastError = useSelector(selectLastError);
  return (
    <div className="App">
      <header className="App-header">
        <p>Counter</p>
        <Counter />
      </header>
    </div>
  );
}

export default App;