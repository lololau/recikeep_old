import './App.css';
import i18n from './i18n';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/profil';
import HomeRecipes from './containers/recipes/recipes';
import MyRecipe from './containers/recipe/recipe';
import SelectionRecipes from './containers/recipes/recipes_selection1';
import SelectionParts from './containers/recipes/recipes_selection2';
import NewRecipe from './containers/new recipe/new_recipe';
import Button from '@material-ui/core/Button';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff5722',
        },
        secondary: {
            main: '#0d47a1',
        },
    },
});

const App = (): JSX.Element => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Button onClick={() => changeLanguage('en')}>English</Button>
                    <Button onClick={() => changeLanguage('fr')}>Français</Button>
                    <Route path="/" exact component={HomeRecipes} />
                    <Route path="/profile" component={Profile} />
                    <Route path={'/recipe/:index'} component={MyRecipe} />
                    <Route path={'/recipes/selection_part/1'} component={SelectionRecipes} />
                    <Route path={'/recipes/selection_part/2'} component={SelectionParts} />
                    {/* <Route path="/groups" component={Groups}/>
          <Route path="/groceryList" component={GroceryList}/> */}
                    <Route path={'/new_recipe'} component={NewRecipe} />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
