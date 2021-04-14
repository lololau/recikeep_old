import { getApiUrl } from '../host';

export interface IngredientsGroceryList {
    ingredient_id: number;
    ingredient: string;
    unity_id?: number;
    unity: string;
    quantity?: number;
    checked: number;
}

export interface GroceryList {
    id: number;
    user_id: number;
    name: string;
}

export interface RequestAddGroceryList {
    name: string;
    ingredients?: IngredientsGroceryList[];
}

// Fetch to addRecipe into user db
export const addGroceryList = async (idToken: string, req: RequestAddGroceryList): Promise<GroceryList> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/add/`), {
        method: 'POST',
        body: JSON.stringify(req),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Grocery list not added: ' + err);
    }
    const jsonResponse = await response.json();
    return jsonResponse.groceryList;
};

export const deleteGroceryList = async (idToken: string, groceryListId: number): Promise<void> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/delete/${groceryListId}`), {
        headers: myHeaders,
        method: 'DELETE',
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Grocery list not deleted: ' + err);
    }
};

export interface RequestCheckTrueGroceryList {
    groceryListId: number;
    ingredient: IngredientsGroceryList;
}

export interface ResponseCheckTrueGroceryList {
    ingredientId: number;
}

//Fetch to update ingredient.checked to 1 by groceryListId and ingredientId
export const checkTrueGroceryList = async (
    idToken: string,
    req: RequestCheckTrueGroceryList,
): Promise<ResponseCheckTrueGroceryList> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/updateTrue`), {
        method: 'PUT',
        body: JSON.stringify(req),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Checked not updated' + err);
    }
    const ret = {
        ingredientId: req.ingredient.ingredient_id,
    };
    return ret;
};

export interface RequestCheckFalseGroceryList {
    groceryListId: number;
    ingredient: IngredientsGroceryList;
}

export interface ResponseCheckFalseGroceryList {
    ingredientId: number;
}

//Fetch to update ingredient.checked to 1 by groceryListId and ingredientId
export const checkFalseGroceryList = async (
    idToken: string,
    req: RequestCheckFalseGroceryList,
): Promise<ResponseCheckFalseGroceryList> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/updateFalse`), {
        method: 'PUT',
        body: JSON.stringify(req),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Checked not updated' + err);
    }
    const ret = {
        ingredientId: req.ingredient.ingredient_id,
    };
    return ret;
};

//Fetch to get all recipes by user
export const getAllGroceries = async (idToken: string): Promise<GroceryList[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/getAll/`), {
        headers: myHeaders,
    });
    if (response.status === 404) {
        throw new Error('Groceries lists not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.groceriesLists;
};
