import firebase from 'firebase/app';

// Method to get the idToken from firebase
export const getAuthToken = async (): Promise<string> => {
    const idToken = await firebase.auth().currentUser?.getIdToken();
    if (!idToken) {
        throw 'Unable to get token';
    }

    return idToken;
};
