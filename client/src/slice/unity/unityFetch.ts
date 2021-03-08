export interface Unity {
    id: number;
    name: string;
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
