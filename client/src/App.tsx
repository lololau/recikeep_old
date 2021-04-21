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
import Groceries from './containers/groceries-list/GroceriesList';
import MyIngredients from './containers/my-ingredients/MyIngredients';
import Paper from '@material-ui/core/Paper';
import RecipesSelectionStepper from './containers/stepper/RecipesSelection';
import Firebase from './containers/firebase/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAllRecipes } from './slice/recipes/recipesSlice';
import { fetchGetIngredients } from './slice/ingredients/ingredientsSlice';
import { fetchGetUnities } from './slice/unity/unitySlice';
import { isLogged, isCreated, loading, fetchGetUser, updateFirebaseUser } from './slice/user/userSlice';
import { fetchGetAllGroceries } from './slice/groceriesLists/groceriesListsSlice';
import { selectNotification } from './slice/notification/notificationSlice';
import firebase from 'firebase/app';
import SignUp from './containers/create-user/CreateUser';
import MyUnities from './containers/my-unities/MyUnities';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import Notification from './components/Notification';
import { matchPath } from 'react-router';
import GroceryListShare from './containers/grocery-list/GroceryListShare';
import CssBaseline from '@material-ui/core/CssBaseline';

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
            dispatch(fetchGetUser());
            dispatch(fetchGetIngredients());
            dispatch(fetchGetUnities());
            dispatch(fetchGetAllRecipes());
            dispatch(fetchGetAllGroceries());
        }
    };

    const margin = () => {
        let newMargin;
        if (window.screen.width < 600) {
            newMargin = 0;
        } else {
            newMargin = 230;
        }
        setMarginLeft(newMargin);
    };

    //TEST

    //

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
                        <Route path="/groceries" exact component={Groceries} />
                        <Route path={'/recipes/selection'} exact component={RecipesSelectionStepper} />
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

    const pending = () => {
        return (
            <div>
                <LinearProgress style={{ top: 0, position: 'fixed', zIndex: 2, width: '100%' }} />
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

    const shareGroceryList = (shareUid: string) => {
        {
            return (
                <>
                    <GroceryListShare uid={shareUid} />
                </>
            );
        }
    };

    console.log('window pathname: ', window.location.pathname);

    type MatchParam = {
        uid: string;
    };
    // url share : '/groceryList/share/:uid'
    const match = matchPath<MatchParam>(window.location.pathname, {
        path: '/groceryList/share/:uid',
        exact: true,
        strict: false,
    });
    console.log('match: ', match?.params);

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
