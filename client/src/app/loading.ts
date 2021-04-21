import { Middleware } from '@reduxjs/toolkit';

// Slice
import { loadingStarted, loadingFinished } from '../slice/user/userSlice';

// Middleware to display a loading bar when an action is pending

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadingMiddleware: Middleware = (api) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    const isPending = new RegExp(`pending$`, 'g');
    const isFulfilled = new RegExp(`fulfilled$`, 'g');
    const isRejected = new RegExp(`rejected$`, 'g');

    if (action.type.match(isPending)) {
        api.dispatch(loadingStarted());
        return next(action);
    } else if (action.type.match(isFulfilled)) {
        api.dispatch(loadingFinished());
        return next(action);
    } else if (action.type.match(isRejected)) {
        api.dispatch(loadingFinished());
        return next(action);
    }
    return next(action);
};

export default loadingMiddleware;
