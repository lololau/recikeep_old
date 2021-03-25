export interface IngredientsRecipe {
    ingredient_id?: number;
    ingredient: string;
    unity_id?: number;
    unity: string;
    quantity?: number;
}

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
    recipe_id: number;
    recipe_number_parts: number;
};

// Fetch to get a recipe by recipeId
export const fetchGetIngredientsByRecipes = async (
    idToken: string,
    request: RequestGetIngredientsByRecipes[],
): Promise<ResponseGetIngredientsByRecipes[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(`http://localhost:3000/api/ingredients/getByRecipes`, {
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
