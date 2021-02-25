import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new recipe/NewRecipe';
import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { isLogged, updateFirebaseId, updateIdToken, token } from './slice/userSlice';
import firebase from 'firebase/app';

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
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const logged = useSelector(isLogged);
    console.log(logged);

    const idToken = useSelector(token);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchTest = () => {
        const myHeaders = new Headers({
            Authorization: idToken,
        });
        fetch('http://localhost:3000/api/test/get', { headers: myHeaders })
            .then((response) => response.text())
            .then((text) => console.log(text));
    };

    const onAuthStateChanged = (user: firebase.User | null) => {
        console.log('User: ', user);
        if (user) {
            dispatch(updateFirebaseId(user.uid));

            user.getIdToken()
                .then((idToken) => {
                    dispatch(updateIdToken(idToken));
                })
                .catch((error) => console.log(error));
        }
    };

    const onAuthStateChangedAsync = async (user: firebase.User | null) => {
        console.log('User: ', user);
        if (user) {
            dispatch(updateFirebaseId(user.uid));
            try {
                const idToken = await user.getIdToken();
                dispatch(updateIdToken(idToken));
            } catch (err) {
                console.error(err);
                throw err;
            }

            throw new Error('prout');
        }
    };

    useEffect(() => {
        const subscriber = firebase.auth().onIdTokenChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const logIn = () => {
        return (
            <div>
                <Box style={{ textAlign: 'right' }}>
                    <Button
                        onClick={() => {
                            firebase.auth().signOut();
                            dispatch(updateFirebaseId(''));
                        }}
                    >
                        Sign Out
                    </Button>
                    <Button className="test" onClick={fetchTest}>
                        Test
                    </Button>
                </Box>
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
        );
    };

    const logOut = () => {
        return (
            <div>
                <Box style={{ textAlign: 'center' }}>
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
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <div>{logged ? logIn() : logOut()}</div>
        </ThemeProvider>
    );
};

export default App;
