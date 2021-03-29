import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new-recipe/NewRecipe';
import UpdateRecipe from './containers/update-recipe/UpdateRecipe';
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
import Firebase from './containers/firebase/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAllRecipes } from './slice/recipes/recipesSlice';
import { fetchGetIngredients } from './slice/ingredients/ingredientsSlice';
import { fetchGetUnities } from './slice/unity/unitySlice';
import { isLogged, isCreated, updateIdToken, fetchGetUser, updateFirebaseUser } from './slice/user/userSlice';
import { fetchGetLatestGroceryList } from './slice/groceryList/groceryListSlice';
import firebase from 'firebase/app';
import SignUp from './containers/create-user/CreateUser';
import MyUnities from './containers/my-unities/MyUnities';

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
    const created = useSelector(isCreated);

    const onAuthStateChanged = (user: firebase.User | null) => {
        console.log('User: ', user);
        if (user) {
            const newUser = { firebaseId: user.uid, email: user.email };
            console.log(user);
            dispatch(updateFirebaseUser(newUser));

            user.getIdToken()
                .then((idToken) => {
                    dispatch(updateIdToken(idToken));
                    return idToken;
                })
                .then((idToken) => {
                    dispatch(fetchGetUser(idToken));
                    dispatch(fetchGetIngredients(idToken));
                    dispatch(fetchGetUnities(idToken));
                    dispatch(fetchGetAllRecipes(idToken));
                    dispatch(fetchGetLatestGroceryList(idToken));
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
                            dispatch(updateFirebaseUser(''));
                        }}
                    >
                        Sign Out
                    </Button>
                </Box>
                <Router>
                    <div className="App">
                        <Route path="/recipes" exact component={HomeRecipes} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/recipe/:id">
                            <MyRecipe />
                        </Route>
                        <Route path="/recipes/update/:id" exact>
                            <UpdateRecipe />
                        </Route>
                        <Route path={'/recipes/selection'} exact component={RecipesSelectionStepper} />
                        <Route path={'/profile/my_ingredients'} component={MyIngredients} />
                        <Route path={'/profile/my_unities'} component={MyUnities} />
                        <Route path="/groups" component={Groups} />
                        <Route path="/groceryList/:id">
                            <GroceryList />
                        </Route>
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
