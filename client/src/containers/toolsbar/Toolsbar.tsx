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
import Hidden from '@material-ui/core/Hidden';

const ToolsBar = (): JSX.Element => {
    const { t } = useTranslation();
    const [button, setButton] = React.useState(0);

    const { pathname } = useLocation();

    return (
        <div>
            <div>
                <Hidden only={['xs']}>
                    <Drawer variant="permanent" anchor="left">
                        <Divider />
                        <List
                            style={{
                                width: '230px',
                            }}
                        >
                            <NavLink
                                to={'/recipes'}
                                style={{ textDecoration: 'none', color: 'rgb(170, 170, 170)' }}
                                isActive={() => ['/recipes', '/'].includes(pathname)}
                                activeStyle={{ color: 'black', fontWeight: 'bolder' }}
                            >
                                <ListItem button>
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item>
                                            <ListItemIcon style={{ color: '#b7e0e5' }}>
                                                <HomeIcon />
                                            </ListItemIcon>
                                        </Grid>
                                        <Grid item>
                                            <ListItemText primary={t('toolsbar.recipes')} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </NavLink>
                            <Divider />
                            <NavLink
                                to={`/groceries`}
                                style={{ textDecoration: 'none', color: 'rgb(170, 170, 170)' }}
                                activeStyle={{ color: 'black' }}
                            >
                                <ListItem button>
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item>
                                            <ListItemIcon style={{ color: '#b7e0e5' }}>
                                                <ListIcon />
                                            </ListItemIcon>
                                        </Grid>
                                        <Grid item>
                                            <ListItemText primary={t('toolsbar.groceriesList')} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </NavLink>
                            <Divider />
                            <NavLink
                                to={'/profile'}
                                style={{ textDecoration: 'none', color: 'rgb(170, 170, 170)' }}
                                activeStyle={{ color: 'black' }}
                            >
                                <ListItem button>
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item>
                                            <ListItemIcon style={{ color: '#b7e0e5' }}>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                        </Grid>
                                        <Grid item>
                                            <ListItemText primary={t('toolsbar.profile')} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Drawer>
                </Hidden>
            </div>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <BottomNavigation
                    value={button}
                    onChange={(event, newValue) => {
                        setButton(newValue);
                    }}
                    showLabels
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        zIndex: 1,
                        width: '100%',
                        borderTop: 'thin solid',
                        background: '#b7e0e5',
                    }}
                >
                    <BottomNavigationAction
                        icon={<HomeIcon />}
                        label={t('toolsbar.recipes')}
                        to={'/recipes'}
                        component={Link}
                    />
                    <BottomNavigationAction
                        icon={<ListIcon />}
                        label={t('toolsbar.groceriesList')}
                        to={`/groceries`}
                        component={Link}
                    />
                    <BottomNavigationAction
                        icon={<AccountCircleIcon />}
                        label={t('toolsbar.profile')}
                        to={'/profile'}
                        component={Link}
                    />
                </BottomNavigation>
            </Hidden>
        </div>
    );
};

export default ToolsBar;
