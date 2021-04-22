import { getApiUrl } from '../host';

export interface Ingredient {
    id: number;
    name: string;
    user_id?: number;
}

// Fetch request to get all ingredients from user connected
export const fetchGetIngredients = async (idToken: string): Promise<Ingredient[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/ingredients/getAll/`), { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.ingredients;
};

export type RequestAddIngredient = {
    name: string;
};

// Fetch request to add an ingredient to user database when a recipe is created
export const fetchAddIngredient = async (idToken: string, request: RequestAddIngredient): Promise<Ingredient> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/ingredients/add/`), {
        method: 'POST',
        body: JSON.stringify(request),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Ingredient not added: ' + err);
    }
    const ingredient = await response.json();
    return ingredient.ingredient;
};

// Fetch request to delete an ingredient from user database
export const fetchDeleteIngredient = async (idToken: string, ingredientId: number): Promise<void> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/ingredients/delete/${ingredientId}`), {
        headers: myHeaders,
        method: 'DELETE',
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Ingredient not deleted: ' + err);
    }
};

export type RequestGetIngredientsByRecipes = {
    recipe_id: number;
    number_parts: number;
};

export type ResponseGetIngredientsByRecipes = {
    ingredient: string;
    ingredient_id: number;
    unity: string;
    unity_id: number;
    quantity: number;
    checked: number;
    recipe_id: number;
    recipe_number_parts: number;
};

// Fetch request to get the ingredients by recipeId
export const fetchGetIngredientsByRecipes = async (
    idToken: string,
    request: RequestGetIngredientsByRecipes[],
): Promise<ResponseGetIngredientsByRecipes[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/ingredients/getByRecipes`), {
        method: 'POST',
        body: JSON.stringify(request),
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('Recipe not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.ingredientsList;
};
