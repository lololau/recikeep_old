import '../../i18n';
import ToolsBar from '../toolsbar/toolsbar'

const Profile = () => {
    return (
        <div className="profile">
            <h1>My Profil</h1>

            <div className="recipes_list">
                <img alt="my_picture" src="https://www.vetostore.com/media/wysiwyg/img_fiche_conseil/Alimentation-lapin-sevrage-1.jpg"/>
                <button>Update</button>
                
                <h2>Username</h2>
                <h3>Laulau Lapin</h3>
            </div>

            <ToolsBar />

        </div>
    )
}

export default Profile;