import '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';

const ToolsBar = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="ToolsBar">
            <ul>
                <Link to="/">
                    <li>{t('toolsbar.recipes')}</li>
                </Link>
                <Link to="/grocerylist">
                    <li>{t('toolsbar.groceryList')}</li>
                </Link>
                <Link to="/groups">
                    <li>{t('toolsbar.groups')}</li>
                </Link>
                <Link to="/profile">
                    <li>{t('toolsbar.profile')}</li>
                </Link>
            </ul>
        </div>
    );
};

export default ToolsBar;
