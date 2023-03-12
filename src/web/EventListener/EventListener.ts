import { AllToUndefined, EventParameters, EventRecord, IEventListener, NormalizeEventParameters } from "../../definition/EventListener/IEventListener";
import { isEqual } from "underscore";

export class EventListener<
    EventList extends Record<number, any>, 
    TypeRecord extends EventRecord<EventList> = {}, 
    DefaultEventCallbackParams extends any[] = [],
    SpecialOnArgs extends any[] = []
> implements IEventListener<EventList, TypeRecord, DefaultEventCallbackParams, SpecialOnArgs> {

    constructor(
        protected eventListeners: Record<keyof EventList, {
            deleted: boolean;
            callback: (...args: any) => any,
            parameters: any[]
        }[]> = {} as any
    ) {
    }

    protected async basicEmit<T extends keyof EventList>(event: T, callbackParams: NormalizeEventParameters<EventParameters<EventList, T, TypeRecord, DefaultEventCallbackParams>>, otherArgs: AllToUndefined<SpecialOnArgs>) {
        const events = Object.entries(this.eventListeners)
            .filter(([key]) => (Number(event) & Number(key)) === Number(key))
            .map(([, events]) => events)
            .flat();

        const eventsToCall = events
            .filter((event) => !event.deleted)
            .filter((event) => {
                if (otherArgs.length === 0) {
                    return true;
                }

                return isEqual(event.parameters.copyWithin(0, otherArgs.length), otherArgs); // TODO: improve this.
            });

        for (const event of eventsToCall) {
            await event.callback(...callbackParams as any[]);
        }
    }

    on(event: keyof EventList, callback: (...args: any) => any, ...otherArgs: any[]) {
        this.eventListeners[event] ||= [];
        this.eventListeners[event].push({
            deleted: false,
            callback,
            parameters: otherArgs
        });
        return this;
    }
    
    off(event: keyof EventList, callback: (...args: any) => any, ...otherArgs: any[]) {
        this.eventListeners[event].filter((eventListener) => {
            return eventListener.callback === callback;
        }).filter((eventListener) => {
            return !eventListener.deleted;
        }).filter((eventListener) => {
            if (otherArgs.length === 0) {
                return true;
            }

            return isEqual(eventListener.parameters.copyWithin(0, otherArgs.length), otherArgs);
        }).forEach((eventListener) => {
            eventListener.deleted = true;
        })
        return this;
    }
}