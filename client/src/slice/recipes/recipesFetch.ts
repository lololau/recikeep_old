export interface Recipe {
    id: number;
    name: string;
    presentation?: string;
    number_parts: number;
    time_presentation?: string;
    time_cooking?: string;
    user_id: number;
    recipe_photo_id?: number;
    recipe_description_id?: number;
}

export type RequestAddRecipe = {
    name: string;
    presentation?: string;
    number_parts: number;
    time_presentation?: string;
    time_cooking?: string;
    user_id: number;
    recipe_photo_id?: number;
    recipe_description_id?: number;
};

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
    return recipe;
};
