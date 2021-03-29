export interface IngredientsGroceryList {
    ingredient_id?: number;
    ingredient: string;
    unity_id?: number;
    unity: string;
    quantity?: number;
}

export interface GroceryList {
    id: number;
    user_id: number;
}

export interface RequestAddGroceryList {
    ingredients?: IngredientsGroceryList[];
}

// Fetch to addRecipe into user db
export const addGroceryList = async (idToken: string, req: RequestAddGroceryList): Promise<GroceryList> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(`http://localhost:3000/api/groceriesLists/add/`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('GroceryList not added: ' + err);
    }
    const jsonResponse = await response.json();
    return jsonResponse.groceryList;
};
