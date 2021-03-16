export interface IngredientsRecipe {
    ingredient: string;
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

// Fetch to get a recipe by recipeId
export const getOneRecipe = async (idToken: string, recipeId: number): Promise<RecipeInformation> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('Recipe not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.recipe;
};
