import { getApiUrl } from '../host';

export interface IngredientsGroceryList {
    ingredient_id: number;
    ingredient: string;
    unity_id?: number;
    unity: string;
    quantity?: number;
    checked: number;
}

export interface GroceryListInformation {
    id: number;
    name: string;
    ingredients: IngredientsGroceryList[];
}

// Fetch to get a recipe by recipeId
export const getGroceryList = async (idToken: string, groceryListId: number): Promise<GroceryListInformation> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/${groceryListId}`), {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('GroceryList not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.groceryList;
};

// Fetch to get a recipe by recipeId
export const getLatestGroceryList = async (idToken: string): Promise<GroceryListInformation> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/`), {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('GroceryList not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.groceryList;
};
