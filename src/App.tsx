import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/profil';
import HomeRecipes from './containers/recipes/recipes';
import MyRecipe from './containers/recipe/recipe';
import SelectionRecipes from './containers/recipes/recipes_selection1';
import SelectionParts from './containers/recipes/recipes_selection2';
import NewRecipe from './containers/new recipe/new_recipe';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ToolsBar from './containers/toolsbar/toolsbar';
import GroceryList from './containers/grocery list/grocery_list';
//import Box from '@material-ui/core/Box';
import MyIngredients from './containers/my-ingredients/my_ingredients';
import Paper from '@material-ui/core/Paper';

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
                    <Route path="/" exact component={HomeRecipes} />
                    <Route path="/profile" component={Profile} />
                    <Route path={'/recipe/:index'} component={MyRecipe} />
                    <Route path={'/recipes/selection_part/1'} component={SelectionRecipes} />
                    <Route path={'/recipes/selection_part/2'} component={SelectionParts} />
                    <Route path={'/my_ingredients'} component={MyIngredients} />
                    {/* <Route path="/groups" component={Groups}/> */}
                    <Route path={'/groceryList'} component={GroceryList} />
                    <Route path={'/new_recipe'} component={NewRecipe} />
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
