import React from "react";
//import { Counter } from "./containers/counter/counter";
import "./App.css";
//import { useSelector } from "react-redux";
//import { selectLastError } from "./slice/counterSlice";
//import Alert, { AlertProps } from '@material-ui/lab/Alert';
import i18n from './i18n'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from "./containers/profil/profil";
import HomeRecipes from "./containers/recipes/recipes";
import MyRecipe from "./containers/recipe/recipe";

/* const RenderAlert: FunctionComponent<AlertProps> = (props) => {
  return <Alert severity={props.severity}>{props.children}</Alert>;
} */

function App() {
  //const lastError = useSelector(selectLastError);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  return (
    <Router>
      <div className="App" style={{ width: 400 }}>
        
        <header className="App-header">
          
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('fr')}>Français</button>
        
          <Route path="/" exact component={HomeRecipes}/>
          <Route path="/profile" component={Profile}/>
          <Route path={"/recipes/"} component={MyRecipe}/>
          {/* <Route path="/groups" component={Groups}/>
          <Route path="/groceryList" component={GroceryList}/> */}

        </header>
      </div>
    </Router>
  );
}

export default App;