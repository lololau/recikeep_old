import { getApiUrl } from '../host';
import { IngredientsGroceryList } from '../groceryList/groceryListFetch';

export interface GroceryList {
    id: number;
    user_id: number;
    name: string;
}

export interface RequestAddGroceryList {
    name: string;
    ingredients: IngredientsGroceryList[];
}

// Fetch request to add a grocery list to user database
export const fetchAddGroceryList = async (idToken: string, req: RequestAddGroceryList): Promise<GroceryList> => {
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

// Fetch request to delete a grocery list from user database
export const fetchDeleteGroceryList = async (idToken: string, groceryListId: number): Promise<void> => {
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
    unityId: number;
}

//Fetch request to update ingredient.checked to 1 by groceryListId and ingredientId
export const fetchCheckTrueGroceryList = async (
    idToken: string,
    req: RequestCheckTrueGroceryList,
): Promise<ResponseCheckTrueGroceryList> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/update/true`), {
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
        unityId: req.ingredient.unity_id,
    };
    return ret;
};

export interface RequestCheckFalseGroceryList {
    groceryListId: number;
    ingredient: IngredientsGroceryList;
}

export interface ResponseCheckFalseGroceryList {
    ingredientId: number;
    unityId: number;
}

//Fetch to update ingredient.checked to 0 by groceryListId and ingredientId
export const fetchCheckFalseGroceryList = async (
    idToken: string,
    req: RequestCheckFalseGroceryList,
): Promise<ResponseCheckFalseGroceryList> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/update/false`), {
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
        unityId: req.ingredient.unity_id,
    };
    return ret;
};

export interface RequestCheckShareGroceryList {
    groceryListShareUid: string;
    ingredient: IngredientsGroceryList;
}

//Fetch to update ingredient.checked to 1 by groceryListShareUid and ingredientId
export const fetchCheckTrueShareGroceryList = async (
    req: RequestCheckShareGroceryList,
): Promise<ResponseCheckTrueGroceryList> => {
    const myHeaders = new Headers({
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/updateShare/true`), {
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
        unityId: req.ingredient.unity_id,
    };
    return ret;
};

//Fetch to update ingredient.checked to 0 by groceryListShareUid and ingredientId
export const fetchCheckFalseShareGroceryList = async (
    req: RequestCheckShareGroceryList,
): Promise<ResponseCheckFalseGroceryList> => {
    const myHeaders = new Headers({
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/groceriesLists/updateShare/false`), {
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
        unityId: req.ingredient.unity_id,
    };
    return ret;
};

//Fetch to get all groceries lists by user connected
export const fetchGetAllGroceries = async (idToken: string): Promise<GroceryList[]> => {
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
