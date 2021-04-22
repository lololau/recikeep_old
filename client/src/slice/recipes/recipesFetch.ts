import { getApiUrl } from '../host';

export interface Recipe {
    id: number;
    name: string;
    presentation?: string;
    number_parts: number;
    time_preparation?: string;
    time_cooking?: string;
    user_id: number;
    recipe_photo_id?: number;
    recipe_description_id?: number;
}

interface IngredientsRecipe {
    ingredient_id: number;
    unity_id: number;
    quantity: number | null;
}

export type RequestAddRecipe = {
    name: string;
    presentation?: string;
    number_parts: number;
    time_preparation?: string;
    time_cooking?: string;
    recipe_photo_id?: number;
    recipe_description_id?: number;
    ingredients?: IngredientsRecipe[];
};

// Fetch request to add a recipe into user database
export const fetchAddRecipe = async (idToken: string, req: RequestAddRecipe): Promise<Recipe> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/recipes/add/`), {
        method: 'POST',
        body: JSON.stringify(req),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Recipe not added: ' + err);
    }
    const recipe = await response.json();
    return recipe.recipe;
};

// Fetch request to delete a recipe from user database
export const fetchDeleteRecipe = async (idToken: string, recipeId: number): Promise<void> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/recipes/delete/${recipeId}`), {
        headers: myHeaders,
        method: 'DELETE',
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Recipe not deleted: ' + err);
    }
};

// Fetch request to get all recipes by user connected
export const fetchGetAllRecipes = async (idToken: string): Promise<Recipe[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/recipes/getAll/`), {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('Recipes not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.recipes;
};
