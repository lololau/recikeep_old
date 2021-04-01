import { Middleware } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerMiddleware: Middleware = (api) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    const isPending = new RegExp(`pending$`, 'g');
    if (!action.type.match(isPending)) {
        console.log('action not loading: ', action.type.match(isPending));
        return next(action);
    }
    console.log('action loading: ', action.type.match(isPending));
    console.log('payload ', action.payload);
    return next(action);
};

export default loggerMiddleware;
