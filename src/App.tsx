import React, { FunctionComponent } from "react";
import { Counter } from "./containers/counter";
import "./App.css";
import { useSelector } from "react-redux";
import { selectLastError } from "./slice/counterSlice";
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import i18n from './i18n'
import { useTranslation } from 'react-i18next';

const RenderAlert: FunctionComponent<AlertProps> = (props) => {
  return <Alert severity={props.severity}>{props.children}</Alert>;
}

function App() {
  const { t } = useTranslation();
  const lastError = useSelector(selectLastError);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{t('counter.title')}</p>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('fr')}>Français</button>
        <Counter />
      </header>
    </div>
  );
}

export default App;