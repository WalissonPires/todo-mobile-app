

export class AppError extends Error {

    constructor(public message: string) {
        super(message);
    }

    public static from(error: any, defaultMessage?: string): AppError {

        if (error instanceof AppError) {
            return error;
        }

        const appError = new AppError(error.message || defaultMessage || 'An unexpected error has occurred');
        appError.stack = error.stack;

        return appError;
    }

    public static isAppError(error: any): error is AppError {
        return error instanceof AppError;
    }
}