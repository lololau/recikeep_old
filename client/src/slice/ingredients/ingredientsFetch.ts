export interface Ingredient {
    id: number;
    name: string;
}

// Charge all ingredients in redux when a user is connected
export const getIngredients = async (idToken: string): Promise<Ingredient[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(`http://localhost:3000/api/ingredients/getAll/`, { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.ingredients;
};

export type RequestAddIngredient = {
    name: string;
};

// Add an ingredient into db when a user is creating a recipe
export const addIngredient = async (idToken: string, request: RequestAddIngredient): Promise<Ingredient> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(`http://localhost:3000/api/ingredients/add/`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Ingredient not added: ' + err);
    }
    const ingredient = await response.json();
    return ingredient;
};

export const fetchSearchIngredients = async (idToken: string, searchTerm: string): Promise<string[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(`http://localhost:3000/api/ingredients/search/${searchTerm}`, { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.ingredients.forEach((ingredient: Ingredient) => ingredient.name);
};
