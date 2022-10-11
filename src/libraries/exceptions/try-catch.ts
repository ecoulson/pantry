import { Delegate } from '../../core/interfaces/delegate';
import { Exception } from './exception';

export function tryCatch<T>(
    func: () => T,
    catchDelegate: Delegate<Exception, Exception>
): T {
    try {
        return func();
    } catch (error) {
        handleError(error, catchDelegate);
        throw new Error(
            'Should not reach here. Check the handleError function for cases that are not handled.'
        );
    }
}

function handleError(
    error: any,
    catchDelegate: Delegate<Exception, Exception>
) {
    if (error instanceof Exception) {
        throw catchDelegate(error);
    } else if (error instanceof Error) {
        throw catchDelegate(new Exception(error.message));
    } else if (error instanceof Symbol) {
        throw catchDelegate(new Exception(error.toString()));
    } else if (typeof error === 'string') {
        throw catchDelegate(new Exception(error));
    } else {
        throw catchDelegate(new Exception(String(error)));
    }
}

export async function tryCatchAsync<T>(
    func: (...args: any[]) => Promise<T>,
    catchDelegate: Delegate<Exception, Exception>
): Promise<T> {
    try {
        return await func();
    } catch (error) {
        handleError(error, catchDelegate);
        throw new Error(
            'Should not reach here. Check the handleError function for cases that are not handled.'
        );
    }
}
