import '../../i18n';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { fetchGetAGroceryList, selectGroceryList } from '../../slice/groceryList/groceryListSlice';

type ToolbarProps = {
    style?: React.CSSProperties;
};

const ToolsBar = (props: ToolbarProps): JSX.Element => {
    const { t } = useTranslation();
    const [button, setButton] = React.useState(0);

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const groceryList = useSelector(selectGroceryList);

    return (
        <div>
            <div>
                <Hidden only="xs">
                    <Drawer variant="permanent" anchor="left">
                        <Divider />
                        <List
                            style={{
                                width: '200px',
                            }}
                        >
                            <ListItem button>
                                <NavLink
                                    to={'/recipes'}
                                    style={{ textDecoration: 'none', color: 'rgb(170, 170, 170)' }}
                                    isActive={() => ['/recipes', '/'].includes(pathname)}
                                    activeStyle={{ color: 'black', fontWeight: 'bolder' }}
                                >
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item xs>
                                            <ListItemIcon style={{ color: '#b7e0e5' }}>
                                                <HomeIcon />
                                            </ListItemIcon>
                                        </Grid>
                                        <Grid item xs style={{ width: '100%' }}>
                                            <ListItemText primary={t('toolsbar.recipes')} />
                                        </Grid>
                                    </Grid>
                                </NavLink>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <NavLink
                                    to={`/groceryList/${groceryList.id}`}
                                    style={{ textDecoration: 'none', color: 'rgb(170, 170, 170)' }}
                                    activeStyle={{ color: 'black' }}
                                >
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item xs>
                                            <ListItemIcon style={{ color: '#b7e0e5' }}>
                                                <ListIcon />
                                            </ListItemIcon>
                                        </Grid>
                                        <Grid item xs style={{ width: '100%' }}>
                                            <ListItemText
                                                primary={t('toolsbar.groceryList')}
                                                onClick={() => {
                                                    if (groceryList.id) {
                                                        dispatch(fetchGetAGroceryList(groceryList.id));
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </NavLink>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <NavLink
                                    to={'/profile'}
                                    style={{ textDecoration: 'none', color: 'rgb(170, 170, 170)' }}
                                    activeStyle={{ color: 'black' }}
                                >
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item xs>
                                            <ListItemIcon style={{ color: '#b7e0e5' }}>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                        </Grid>
                                        <Grid item xs style={{ width: '100%' }}>
                                            <ListItemText primary={t('toolsbar.profile')} />
                                        </Grid>
                                    </Grid>
                                </NavLink>
                            </ListItem>
                        </List>
                    </Drawer>
                </Hidden>
            </div>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <Drawer variant="permanent" anchor="left">
                    <BottomNavigation
                        value={button}
                        onChange={(event, newValue) => {
                            setButton(newValue);
                        }}
                        showLabels
                        style={props.style}
                    >
                        <BottomNavigationAction
                            icon={<HomeIcon />}
                            label={t('toolsbar.recipes')}
                            to={'/recipes'}
                            component={Link}
                        />
                        <BottomNavigationAction
                            icon={<ListIcon />}
                            label={t('toolsbar.groceryList')}
                            to={`/groceryList/${groceryList.id}`}
                            onClick={() => {
                                if (groceryList.id) {
                                    dispatch(fetchGetAGroceryList(groceryList.id));
                                }
                            }}
                            component={Link}
                        />
                        <BottomNavigationAction
                            icon={<AccountCircleIcon />}
                            label={t('toolsbar.profile')}
                            to={'/profile'}
                            component={Link}
                        />
                    </BottomNavigation>
                </Drawer>
            </Hidden>
        </div>
    );
};

export default ToolsBar;
