import { getApiUrl } from '../host';

export type User = {
    id: number;
    firebase_id: string;
    full_name: string;
};

export type ResponseGetUser = {
    user: User;
};

// Fetch request to get user from firebase
export const fetchGetUser = async (idToken: string): Promise<User> => {
    const myHeaders = new Headers({
        Authorization: idToken,
    });
    const response = await fetch(getApiUrl('api/user/getUser'), { headers: myHeaders });
    if (response.status === 404) {
        throw new Error('User not found');
    }
    const jsonResponse = await response.json();
    return jsonResponse.user;
};

export type RequestCreateUser = {
    fullName: string;
};

export type ResponseCreateUser = {
    user: User;
};

// Fetch request to create a user into database
export const fetchCreateUser = async (idToken: string, request: RequestCreateUser): Promise<ResponseCreateUser> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });

    const response = await fetch(getApiUrl('api/user/createUser'), {
        method: 'POST',
        body: JSON.stringify(request),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('User not found: ' + err);
    }

    const body = await response.json();
    return { user: body.user };
};

export type RequestUpdateUser = {
    fullName: string;
};

export type ResponseUpdateUser = {
    user: User;
};

// Fetch request to update user
export const fetchUpdateUser = async (idToken: string, request: RequestUpdateUser): Promise<ResponseUpdateUser> => {
    const myHeaders = new Headers({
        Authorization: idToken,
        'content-type': 'application/json',
    });

    const response = await fetch(getApiUrl('api/user/updateUser'), {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: myHeaders,
    });
    if (response.status < 200 || response.status >= 300) {
        const err = await response.text();
        throw new Error('User not found: ' + err);
    }

    const body = await response.json();
    return { user: body.user };
};
