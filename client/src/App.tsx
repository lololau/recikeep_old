import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new-recipe/NewRecipe';
import UpdateRecipe from './containers/update-recipe/UpdateRecipe';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ToolsBar from './containers/toolsbar/Toolsbar';
import GroceryList from './containers/grocery-list/GroceryList';
import MyIngredients from './containers/my-ingredients/MyIngredients';
import Paper from '@material-ui/core/Paper';
import RecipesSelectionStepper from './containers/stepper/RecipesSelection';
import Firebase from './containers/firebase/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAllRecipes } from './slice/recipes/recipesSlice';
import { fetchGetIngredients } from './slice/ingredients/ingredientsSlice';
import { fetchGetUnities } from './slice/unity/unitySlice';
import { isLogged, isCreated, loading, updateIdToken, fetchGetUser, updateFirebaseUser } from './slice/user/userSlice';
import { fetchGetLatestGroceryList } from './slice/groceryList/groceryListSlice';
import { selectNotification } from './slice/notification/notificationSlice';
import firebase from 'firebase/app';
import SignUp from './containers/create-user/CreateUser';
import MyUnities from './containers/my-unities/MyUnities';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import Notification from './components/Notification';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff8a65',
        },
        secondary: {
            main: '#ff8a65',
        },
    },
});

const App = (): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const isLoading = useSelector(loading);
    const logged = useSelector(isLogged);
    const created = useSelector(isCreated);
    const notification = useSelector(selectNotification);
    console.log(notification);

    const [marginLeft, setMarginLeft] = useState<number>(0);

    const onAuthStateChanged = (user: firebase.User | null) => {
        console.log('On auth change: ', user);
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

    const margin = () => {
        let newMargin;
        if (window.screen.width < 600) {
            newMargin = 0;
        } else {
            newMargin = 200;
        }
        setMarginLeft(newMargin);
    };

    useEffect(() => {
        const subscriber = firebase.auth().onIdTokenChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        margin();
    }, [window.screen.width]);

    const logIn = () => {
        return (
            <div>
                <Box style={{ textAlign: 'right' }}>
                    <Button
                        size="small"
                        onClick={() => {
                            firebase.auth().signOut();
                            dispatch(updateFirebaseUser(''));
                            document.location.reload();
                        }}
                    >
                        {t('app.sign-out')}
                    </Button>
                </Box>
                <Router>
                    <div className="App" style={{ marginLeft: marginLeft }}>
                        <Route path="/" exact component={HomeRecipes} />
                        <Route path="/recipes" exact component={HomeRecipes} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path={'/recipes/selection'} exact component={RecipesSelectionStepper} />
                        <Route path={'/profile/my_ingredients'} component={MyIngredients} />
                        <Route path={'/profile/my_unities'} component={MyUnities} />
                        <Route path="/recipes/update/:id" exact>
                            <UpdateRecipe />
                        </Route>

                        <Route path="/recipe/:id">
                            <MyRecipe />
                        </Route>
                        <Route path="/groceryList/:id">
                            <GroceryList />
                        </Route>
                        <Route path={'/recipes/new_recipe'} exact component={NewRecipe} />
                    </div>
                    <Notification
                        message={notification.message}
                        severity={notification.severity}
                        id={notification.id}
                    />
                    <Paper elevation={1}>
                        <ToolsBar
                            style={{
                                position: 'fixed',
                                bottom: 0,
                                zIndex: 1,
                                width: '100%',
                                borderTop: 'thin solid',
                                background: '#b7e0e5',
                            }}
                        />
                    </Paper>
                </Router>
            </div>
        );
    };

    const pending = () => {
        return (
            <div>
                <LinearProgress style={{ position: 'fixed', zIndex: 2 }} />
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
            <div>{isLoading && pending()}</div>
            <div style={{ marginTop: '10px' }}>{composant}</div>
        </ThemeProvider>
    );
};

export default App;
