export interface Unity {
    id: number;
    name: string;
    custom: number;
    user_id: number;
}

// Charge all unities in redux when a user is connected
export const getUnities = async (idToken: string): Promise<Unity[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(`http://localhost:3000/api/unities/getAll/`, { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.unities;
};

export type RequestAddUnity = {
    name: string;
};

export const addUnity = async (idToken: string, request: RequestAddUnity): Promise<Unity> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(`http://localhost:3000/api/unities/add/`, {
        headers: myHeaders,
        method: 'POST',
        body: JSON.stringify(request),
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Unity not added: ' + err);
    }
    const unity = await response.json();
    return unity;
};
