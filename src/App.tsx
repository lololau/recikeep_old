import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new recipe/NewRecipe';
import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ToolsBar from './containers/toolsbar/Toolsbar';
import GroceryList from './containers/grocery list/GroceryList';
import MyIngredients from './containers/my-ingredients/MyIngredients';
import Paper from '@material-ui/core/Paper';
import RecipesSelectionStepper from './containers/stepper/RecipesSelection';
import Groups from './containers/groups/Groups';
import Modal from '@material-ui/core/Modal';
import Firebase from './Firebase';
import { useSelector } from 'react-redux';
import { isLogged } from './slice/userSlice';

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
    const [open, setOpen] = React.useState(false);
    const logged = useSelector(isLogged);
    console.log(logged);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
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
            </div>
            <div>
                <Box style={{ textAlign: 'right' }}>
                    <Button className="logged-in" onClick={handleOpen}>
                        Login
                    </Button>
                    <Button className="logged-in">Sign Up</Button>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Paper>
                        <Firebase />
                    </Paper>
                </Modal>
            </div>
        </ThemeProvider>
    );
};

export default App;
