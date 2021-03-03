export interface Ingredient {
    id: number;
    name: string;
}

export const GetAllIngredients = async (idToken: string): Promise<Ingredient[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch('http://localhost:3000/api/ingredients/getAllIngredients', { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.user;
};
