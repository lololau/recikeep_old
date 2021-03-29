import '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
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
    );
};

export default ToolsBar;
