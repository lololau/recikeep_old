import firebase from 'firebase/app';

export const getAuthToken = async (): Promise<string> => {
    const idToken = await firebase.auth().currentUser?.getIdToken();
    if (!idToken) {
        throw 'Unable to get token';
    }

    return idToken;
};
