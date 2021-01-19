import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { Link } from 'react-router-dom'; 


const MyRecipe = () => {
    return (
        <div>
            <h1>Pate Carbonara</h1>
            <div className="image_and_time_table">
                <img alt="pate_carbonara" src="https://img.static-rmg.be/a/food/image/q75/w1280/h720/1086366/spaghetti-carbonara.jpg" />
                <div className="time_and_parts_table">
                    <div className="preparation_time">
                        <h3>Preparation</h3>
                        <p>20 min</p>
                    </div>
                    <div className="cooking_time">
                        <h3>Cooking</h3>
                        <p>15 min</p>
                    </div>
                    <div className="parts">
                        <h3>Parts</h3>
                        <p>2</p>
                    </div>
                </div>
            </div>
            <div>
                <h3>Ingredients Component List</h3>
                <p>Ingredient 1</p>
                <p>blublu</p>
            </div>
            <div className="cooking_instructions">
                <h3>Cooking Instructions</h3>
                <img alt="pates_carbonara_instructions" src="../../../public/Capture d’écran 2021-01-14 à 16.37.29.png" />
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
    );
}

export default MyRecipe;