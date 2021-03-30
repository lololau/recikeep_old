const hostname = process.env.REACT_APP_API_ENDPOINT;

export const getApiUrl = (path: string): string => {
    return `${hostname}${path}`;
};
