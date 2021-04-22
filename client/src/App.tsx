// Dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { matchPath } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import { useTranslation } from 'react-i18next';
// Slice
import { getAllRecipes } from './slice/recipes/recipesSlice';
import { getAllIngredients } from './slice/ingredients/ingredientsSlice';
import { getAllUnities } from './slice/unity/unitySlice';
import { isLogged, isCreated, loading, getUser, updateFirebaseUser } from './slice/user/userSlice';
import { getAllGroceries } from './slice/groceriesLists/groceriesListsSlice';
import { selectNotification } from './slice/notification/notificationSlice';
// Containers - Components
import Profile from './containers/profil/Profil';
import HomeRecipes from './containers/recipes/Recipes';
import MyRecipe from './containers/recipe/Recipe';
import NewRecipe from './containers/new-recipe/NewRecipe';
import UpdateRecipe from './containers/update-recipe/UpdateRecipe';
import ToolsBar from './containers/toolsbar/Toolsbar';
import GroceryList from './containers/grocery-list/GroceryList';
import Groceries from './containers/groceries-list/GroceriesList';
import GroceryListShare from './containers/grocery-list/GroceryListShare';
import MyIngredients from './containers/my-ingredients/MyIngredients';
import GroceryListStepper from './containers/stepper/GroceryListStepper';
import HomeAccess from './containers/firebase/Firebase';
import SignUp from './containers/create-user/CreateUser';
import MyUnities from './containers/my-unities/MyUnities';
import Notification from './components/Notification';
// Material-ui - Style
import './App.css';
import { Button, Box, Paper, LinearProgress, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

// App component
// Global component of the application that groups all the containers with react-router
//
// It allows to :
// - Charge all user's database when connecting
// - Display the right component depending on the state of several variables

const App = (): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const isLoading = useSelector(loading);
    const logged = useSelector(isLogged);
    const created = useSelector(isCreated);
    const notification = useSelector(selectNotification);

    // Method that dispatchs several actions to load the user's database when connecting or reloading the page
    const onAuthStateChanged = (user: firebase.User | null) => {
        if (user) {
            const newUser = { firebaseId: user.uid, email: user.email };

            dispatch(updateFirebaseUser(newUser));
            dispatch(getUser());
            dispatch(getAllIngredients());
            dispatch(getAllUnities());
            dispatch(getAllRecipes());
            dispatch(getAllGroceries());
        }
    };

    //
    useEffect(() => {
        const subscriber = firebase.auth().onIdTokenChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // What displays when a user is created and logged
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
                    <div className="App">
                        <Route path="/" exact component={HomeRecipes} />
                        <Route path="/recipes" exact component={HomeRecipes} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/groceries" exact component={Groceries} />
                        <Route path={'/recipes/selection'} exact component={GroceryListStepper} />
                        <Route path={'/profile/my_ingredients'} component={MyIngredients} />
                        <Route path={'/profile/my_unities'} component={MyUnities} />
                        <Route path={'/recipes/new_recipe'} exact component={NewRecipe} />
                        <Route path="/recipes/update/:id" exact>
                            <UpdateRecipe />
                        </Route>

                        <Route path="/recipe/:id">
                            <MyRecipe />
                        </Route>
                        <Route path="/groceryList/:id">
                            <GroceryList />
                        </Route>
                    </div>
                    <Notification
                        message={notification.message}
                        severity={notification.severity}
                        id={notification.id}
                    />
                    <CssBaseline />
                    <Paper elevation={3}>
                        <ToolsBar />
                    </Paper>
                </Router>
            </div>
        );
    };

    // Component that displays a loading bar fixed at the top of the screen when a thunk action is 'pending'
    const pending = () => {
        return (
            <div>
                <LinearProgress style={{ top: 0, position: 'fixed', zIndex: 2, width: '100%' }} />
            </div>
        );
    };

    // Component displayed when no one is connected
    const logOut = () => {
        return (
            <>
                <HomeAccess />
            </>
        );
    };

    // Component displayed when a user has a firebase id but not created into database
    const createUser = () => {
        return (
            <>
                <SignUp />
            </>
        );
    };

    // Component that displays of a shared grocery list
    const shareGroceryList = (shareUid: string) => {
        {
            return (
                <>
                    <GroceryListShare uid={shareUid} />
                </>
            );
        }
    };

    type MatchParam = {
        uid: string;
    };

    // url share : '/groceryList/share/:uid'
    const match = matchPath<MatchParam>(window.location.pathname, {
        path: '/groceryList/share/:uid',
        exact: true,
        strict: false,
    });

    // composant : check the conditions to display the right component
    let composant;
    if (match) {
        composant = shareGroceryList(match.params.uid);
    } else if (!logged) {
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
