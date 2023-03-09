
/**
 * The connection handler statuses.
 */
export enum ConnectionHandlerStatus {
    /**
     * The application is starting.
     * --> Can switch to STOPPED on error or to started on success.
     */
    STARTING = "STARTING",

    /**
     * The application is started.
     * --> Can switch to STOPPING on stop call.
     */
    STARTED = "STARTED",

    /**
     * The application is stopping / shutting down.
     * --> Will switch to STOPPED, when all actions are done.
     */
    STOPPING = "STOPPING",

    /**
     * The application is stopped. (The default state)
     * --> Will switch to STARTING o
     */
    STOPPED = "STOPPED",
}