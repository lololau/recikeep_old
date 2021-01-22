import React from "react";
import "./App.css";
import i18n from './i18n'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from "./containers/profil/profil";
import HomeRecipes from "./containers/recipes/recipes";
import MyRecipe from "./containers/recipe/recipe";
import SelectionRecipes from "./containers/recipes/recipes_selection1";

/* const RenderAlert: FunctionComponent<AlertProps> = (props) => {
  return <Alert severity={props.severity}>{props.children}</Alert>;
} */

function App() {

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
          <Route path={"/recipe/:index"} component={MyRecipe}/>
          <Route path={"/recipes/selection_part/1"} component={SelectionRecipes}/>
          {/* <Route path="/groups" component={Groups}/>
          <Route path="/groceryList" component={GroceryList}/> */}

        </header>
      </div>
    </Router>
  );
}

export default App;