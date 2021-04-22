import { getApiUrl } from '../host';

export interface Unity {
    id: number;
    name: string;
    downscaling?: string;
    downscaling_factor?: number;
    upscaling?: string;
    upscaling_factor?: number;
    user_id: number;
}

// Fetch request to get all unities from user connected
export const fetchGetAllUnities = async (idToken: string): Promise<Unity[]> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl(`api/unities/getAll/`), { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.unities;
};

export type RequestAddUnity = {
    name: string;
};

// Fetch request to add a unity to user database
export const fetchAddUnity = async (idToken: string, request: RequestAddUnity): Promise<Unity> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/unities/add/`), {
        headers: myHeaders,
        method: 'POST',
        body: JSON.stringify(request),
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Unity not added: ' + err);
    }
    const jsonResponse = await response.json();
    return jsonResponse.unity;
};

export type RequestDeleteUnity = {
    id: number;
};

// Fetch request to delete a unity from user database
export const fetchDeleteUnity = async (idToken: string, unityId: number): Promise<void> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });
    const response = await fetch(getApiUrl(`api/unities/delete/${unityId}`), {
        headers: myHeaders,
        method: 'DELETE',
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('Unity not added: ' + err);
    }
};
