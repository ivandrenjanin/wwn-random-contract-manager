export {};

declare global {
    // Socketlib Error Classes
    class SocketlibError extends Error {
        name: string;
    }

    class SocketlibInternalError extends SocketlibError {
        name: string;
    }

    class SocketlibInvalidUserError extends SocketlibError {
        name: string;
    }

    class SocketlibNoGMConnectedError extends SocketlibError {
        name: string;
    }

    class SocketlibRemoteException extends SocketlibError {
        name: string;
    }

    class SocketlibUnregisteredHandlerError extends SocketlibError {
        name: string;
    }

    // Socketlib Types
    interface SocketlibErrors {
        SocketlibError: typeof SocketlibError;
        SocketlibInternalError: typeof SocketlibInternalError;
        SocketlibInvalidUserError: typeof SocketlibInvalidUserError;
        SocketlibNoGMConnectedError: typeof SocketlibNoGMConnectedError;
        SocketlibRemoteException: typeof SocketlibRemoteException;
        SocketlibUnregisteredHandlerError: typeof SocketlibUnregisteredHandlerError;
    }

    interface SocketlibHandler {
        (...args: any[]): any;
    }

    interface SocketlibSocket {
        /**
         * Register a socket handler function
         * @param name - The name of the handler
         * @param func - The handler function
         */
        register(name: string, func: SocketlibHandler): void;

        /**
         * Execute a handler on the GM client
         * @param handler - Handler name or function
         * @param args - Arguments to pass to the handler
         * @returns Promise resolving to the handler's return value
         */
        executeAsGM(
            handler: string | SocketlibHandler,
            ...args: any[]
        ): Promise<any>;

        /**
         * Execute a handler on a specific user's client
         * @param handler - Handler name or function
         * @param userId - Target user ID
         * @param args - Arguments to pass to the handler
         * @returns Promise resolving to the handler's return value
         */
        executeAsUser(
            handler: string | SocketlibHandler,
            userId: string,
            ...args: any[]
        ): Promise<any>;

        /**
         * Execute a handler on all GM clients (including current if GM)
         * @param handler - Handler name or function
         * @param args - Arguments to pass to the handler
         */
        executeForAllGMs(
            handler: string | SocketlibHandler,
            ...args: any[]
        ): Promise<void>;

        /**
         * Execute a handler on all other GM clients (excluding current)
         * @param handler - Handler name or function
         * @param args - Arguments to pass to the handler
         */
        executeForOtherGMs(
            handler: string | SocketlibHandler,
            ...args: any[]
        ): Promise<void>;

        /**
         * Execute a handler on all clients (including current)
         * @param handler - Handler name or function
         * @param args - Arguments to pass to the handler
         */
        executeForEveryone(
            handler: string | SocketlibHandler,
            ...args: any[]
        ): Promise<void>;

        /**
         * Execute a handler on all other clients (excluding current)
         * @param handler - Handler name or function
         * @param args - Arguments to pass to the handler
         */
        executeForOthers(
            handler: string | SocketlibHandler,
            ...args: any[]
        ): Promise<void>;

        /**
         * Execute a handler on specific users' clients
         * @param handler - Handler name or function
         * @param recipients - Array of user IDs
         * @param args - Arguments to pass to the handler
         */
        executeForUsers(
            handler: string | SocketlibHandler,
            recipients: string[],
            ...args: any[]
        ): Promise<void>;
    }

    interface Socketlib {
        /**
         * Error classes for socketlib exceptions
         */
        errors: SocketlibErrors;

        /**
         * Collection of registered module sockets
         */
        modules: Map<string, SocketlibSocket>;

        /**
         * System socket (if registered)
         */
        system: SocketlibSocket | undefined;

        /**
         * Register a socket for a module
         * @param moduleName - The module ID to register
         * @returns The socket instance, or undefined if registration failed
         */
        registerModule(moduleName: string): SocketlibSocket | undefined;

        /**
         * Register a socket for a system
         * @param systemId - The system ID to register
         * @returns The socket instance, or undefined if registration failed
         */
        registerSystem(systemId: string): SocketlibSocket | undefined;
    }

    // Global socketlib instance
    var socketlib: Socketlib;

    // Window augmentation for socketlib
    interface Window {
        socketlib: Socketlib;
    }
}
