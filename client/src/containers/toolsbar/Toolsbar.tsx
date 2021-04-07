import '../../i18n';
import { Link } from 'react-router-dom';
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

    const dispatch = useDispatch();
    const groceryList = useSelector(selectGroceryList);

    return (
        <div>
            <Hidden only="xs">
                <Drawer variant="permanent" anchor="left">
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Link to={'/recipes'} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItemText primary={t('toolsbar.recipes')} />
                            </Link>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <Link
                                to={`/groceryList/${groceryList.id}`}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <ListItemText
                                    primary={t('toolsbar.groceryList')}
                                    onClick={() => {
                                        if (groceryList.id) {
                                            dispatch(fetchGetAGroceryList(groceryList.id));
                                        }
                                    }}
                                />
                            </Link>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <Link to={'/profile'} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItemText primary={t('toolsbar.profile')} />
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
            </Hidden>
            <Hidden only={['sm', 'lg']}>
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
