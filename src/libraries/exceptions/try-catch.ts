import { Delegate } from '../../core/interfaces/delegate';
import { Exception } from './exception';

export function tryCatch(
    func: any,
    catchDelegate: Delegate<Exception, Exception>
) {
    try {
        return func();
    } catch (error) {
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
}
