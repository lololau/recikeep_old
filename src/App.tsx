import React, { FunctionComponent } from "react";
//import { Counter } from "./containers/counter/counter";
import "./App.css";
import { useSelector } from "react-redux";
import { selectLastError } from "./slice/counterSlice";
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import i18n from './i18n'
import { useTranslation } from 'react-i18next';
import MyRecipe from "./containers/recipe/recipe";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profil from "./containers/profil/profil";

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
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <p>{t('counter.title')}</p>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('fr')}>Français</button>
        <Counter /> */}
          <Route path="/" exact component={MyRecipe}/>
          <Route path="/profil" component={Profil}/>

        </header>
      </div>
    </Router>
  );
}

export default App;