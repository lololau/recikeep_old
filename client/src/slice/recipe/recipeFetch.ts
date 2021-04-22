import { getApiUrl } from '../host';

export interface IngredientsRecipe {
    ingredient_id: number;
    ingredient: string;
    unity_id: number;
    unity: string;
    quantity: number;
}

export interface RecipeInformation {
    id?: number;
    name: string;
    presentation?: string;
    number_parts: number;
    time_preparation?: string;
    time_cooking?: string;
    recipe_photo_id?: number;
    recipe_description_id?: number;
    ingredients: IngredientsRecipe[];
}

// Fetch request to get a recipe by recipeId from user connected
export const fetchGetOneRecipe = async (idToken: string, recipeId: number): Promise<RecipeInformation> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/recipes/${recipeId}`), {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('Recipe not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.recipe;
};

export type RequestUpdateRecipe = {
    recipe: RecipeInformation;
};

// Fetch request to update a recipe by recipeId from user connected
export const fetchUpdateRecipe = async (idToken: string, req: RequestUpdateRecipe): Promise<RecipeInformation> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });

    if (!req.recipe.id) {
        throw new Error('no id given');
    }

    const response = await fetch(getApiUrl(`api/recipes/update/${req.recipe.id}`), {
        method: 'PUT',
        body: JSON.stringify(req.recipe),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Recipe not updated: ' + err);
    }
    const recipe = await response.json();
    return recipe.recipe;
};
