import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new recipe/NewRecipe';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ToolsBar from './containers/toolsbar/Toolsbar';
import GroceryList from './containers/grocery list/GroceryList';
import MyIngredients from './containers/my-ingredients/MyIngredients';
import Paper from '@material-ui/core/Paper';
import RecipesSelectionStepper from './containers/stepper/RecipesSelection';
import Groups from './containers/groups/Groups';

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
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Route path="/recipes" exact component={HomeRecipes} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path={'/recipe/:index'} component={MyRecipe} />
                    <Route path={'/recipes/selection'} exact component={RecipesSelectionStepper} />
                    <Route path={'/profile/my_ingredients'} component={MyIngredients} />
                    <Route path="/groups" component={Groups} />
                    <Route path={'/groceryList'} component={GroceryList} />
                    <Route path={'/recipes/new_recipe'} exact component={NewRecipe} />
                </div>
                <Paper elevation={1}>
                    <ToolsBar
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            width: '100%',
                            borderTop: 'thin solid',
                            background: 'grey',
                        }}
                    />
                </Paper>
            </Router>
        </ThemeProvider>
    );
};

export default App;
