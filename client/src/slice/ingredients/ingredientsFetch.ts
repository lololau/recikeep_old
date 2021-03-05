export interface Ingredient {
    id: number;
    name: string;
}

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
