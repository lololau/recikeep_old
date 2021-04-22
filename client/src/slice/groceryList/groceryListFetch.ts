import { getApiUrl } from '../host';

export interface IngredientsGroceryList {
    recipe_id: number;
    ingredient_id: number;
    ingredient: string;
    unity_id: number;
    unity: string;
    quantity: number;
    checked: number;
}

type recipesGroceryList = {
    name: string;
    presentation: string;
};

export interface GroceryListInformation {
    id: number;
    name: string;
    share_uid: string;
    ingredients: IngredientsGroceryList[];
    recipes: recipesGroceryList[];
}

// Fetch request to get a grocery list by groceryListId and idToken
export const fetchGetGroceryList = async (idToken: string, groceryListId: number): Promise<GroceryListInformation> => {
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

// Fetch request to get a shared grocery list by shareUid
export const fetchGetShareGroceryList = async (shareUid: string): Promise<GroceryListInformation> => {
    const response = await fetch(getApiUrl(`api/groceriesLists/share/${shareUid}`));
    if (response.status === 404) {
        throw new Error('GroceryListShare not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.groceryList;
};
