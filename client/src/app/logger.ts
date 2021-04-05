import { Middleware } from '@reduxjs/toolkit';
import { setIsLoadingTrue, setIsLoadingFalse } from '../slice/user/userSlice';

let pending = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerMiddleware: Middleware = (api) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    const isPending = new RegExp(`pending$`, 'g');
    const isFulfilled = new RegExp(`fulfilled$`, 'g');
    //const isRejected = new RegExp(`rejected$`, 'g');
    console.log('pending:', pending);
    if (action.type.match(isPending)) {
        pending++;
        console.log('action loading: ', action.type);
        api.dispatch(setIsLoadingTrue());
        return next(action);
    } else if (action.type.match(isFulfilled)) {
        pending--;
        console.log('action fulfilled: ', action.type);
        if (pending < 1) {
            api.dispatch(setIsLoadingFalse());
            console.log('pending:', pending);
        }
        return next(action);
    }
    return next(action);
};

export default loggerMiddleware;
