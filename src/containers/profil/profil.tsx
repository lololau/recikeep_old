import '../../i18n';
import { Link } from 'react-router-dom';

const Profil = () => {
    return (
        <div>
            <h1>My Profil</h1>

            <div className="recipes_list">
                <img alt="my_picture" src="https://www.vetostore.com/media/wysiwyg/img_fiche_conseil/Alimentation-lapin-sevrage-1.jpg"/>
                <button>Update</button>
                
                <h2>Username</h2>
                <h3>Laulau Lapin</h3>
            </div>

            <div className="ToolsBar">
                <ul>
                    <Link to="/">
                        <li>Recipes</li>
                    </Link>
                    <Link to="/grocerylist">
                        <li>GroceryList</li>
                    </Link>
                    <Link to='/groups'>
                        <li>Groups</li>
                    </Link>
                    <Link to='/profil'>
                        <li>Profil</li>
                    </Link>
                </ul>
            </div>

        </div>
    )
}

export default Profil;