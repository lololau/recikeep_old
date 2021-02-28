import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new-recipe/NewRecipe';
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ToolsBar from './containers/toolsbar/Toolsbar';
import GroceryList from './containers/grocery-list/GroceryList';
import MyIngredients from './containers/my-ingredients/MyIngredients';
import Paper from '@material-ui/core/Paper';
import RecipesSelectionStepper from './containers/stepper/RecipesSelection';
import Groups from './containers/groups/Groups';
import Firebase from './Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { isLogged, isCreated, updateFirebaseId, updateIdToken, token, updateFirstName } from './slice/userSlice';
import firebase from 'firebase/app';
import SignUp from './containers/log-in/CreateUser';

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

    const logged = useSelector(isLogged);
    console.log(logged);

    const created = useSelector(isCreated);

    const idToken = useSelector(token);

    const fetchTest = () => {
        const myHeaders = new Headers({
            Authorization: idToken,
        });
        fetch('http://localhost:3000/api/test/get', { headers: myHeaders })
            .then((response) => response.text())
            .then((text) => console.log(text));
    };

    const fetchGetUser = (idToken: string) => {
        const myHeaders = new Headers({
            Authorization: idToken,
        });
        fetch('http://localhost:3000/api/user/getUser', { headers: myHeaders }).then((response) => {
            if (response.status === 404) {
                return;
            }
            return response.json().then((jsonResponse) => {
                const firstName = jsonResponse.firstName;
                dispatch(updateFirstName(firstName));
                return jsonResponse.user;
            });
        });
    };

    const onAuthStateChanged = (user: firebase.User | null) => {
        console.log('User: ', user);
        if (user) {
            dispatch(updateFirebaseId(user.uid));

            user.getIdToken()
                .then((idToken) => {
                    dispatch(updateIdToken(idToken));
                    return idToken;
                })
                .then((idToken) => {
                    fetchGetUser(idToken);
                })
                .catch((error) => console.log(error));
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
            <>
                <Firebase />
            </>
        );
    };

    const createUser = () => {
        return (
            <>
                <SignUp />
            </>
        );
    };

    let composant;
    if (!logged) {
        composant = logOut();
    } else if (logged && created) {
        composant = logIn();
    } else if (logged && !created) {
        composant = createUser();
    }

    return (
        <ThemeProvider theme={theme}>
            <div>{composant}</div>
        </ThemeProvider>
    );
};

export default App;
