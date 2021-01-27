import '../../i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Profile = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className="profile">
            <h1>My Profil</h1>

            <div className="recipes_list">
                <img
                    alt="my_picture"
                    src="https://www.vetostore.com/media/wysiwyg/img_fiche_conseil/Alimentation-lapin-sevrage-1.jpg"
                />
                <button>Update</button>

                <h2>Username</h2>
                <h3>Laulau Lapin</h3>
            </div>
            <Link to="/my_ingredients">
                <Button>{t('myIngredients.title-page')}</Button>
            </Link>
        </div>
    );
};

export default Profile;
