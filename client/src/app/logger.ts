import { Middleware } from '@reduxjs/toolkit';
import { loadingStarted, loadingFinished } from '../slice/user/userSlice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerMiddleware: Middleware = (api) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    const isPending = new RegExp(`pending$`, 'g');
    const isFulfilled = new RegExp(`fulfilled$`, 'g');
    const isRejected = new RegExp(`rejected$`, 'g');

    if (action.type.match(isPending)) {
        console.log('action loading: ', action.type);
        api.dispatch(loadingStarted());
        return next(action);
    } else if (action.type.match(isFulfilled)) {
        console.log('action fulfilled: ', action.type);
        api.dispatch(loadingFinished());

        return next(action);
    } else if (action.type.match(isRejected)) {
        console.log('action rejected: ', action.error.stack);
        console.log('error message: ', action.error);
        api.dispatch(loadingFinished());
        if (action.error.message === 'Unexpected token i in JSON at position 0') {
            document.location.reload();
        }

        return next(action);
    }
    return next(action);
};

export default loggerMiddleware;
