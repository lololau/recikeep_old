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
    ingredient_id?: number;
    unity_id?: number;
    quantity?: number;
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

// Fetch to addRecipe into user db
export const addRecipe = async (idToken: string, req: RequestAddRecipe): Promise<Recipe> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(`http://localhost:3000/api/recipes/add/`, {
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

//Fetch to get all recipes by user
export const getAllRecipes = async (idToken: string): Promise<Recipe[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(`http://localhost:3000/api/recipes/getAll/`, {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('Recipes not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.recipes;
};
