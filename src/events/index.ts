import { EventEmitter } from "stream";

const eventEmitter = new EventEmitter();

export const subscribeEvent = {
    on: (event: string, listener: (...args: any[]) => void) => {
        eventEmitter.on(event, listener);
    },
    emit: (event: string, ...args: any[]) => {
        eventEmitter.emit(event, ...args);
    }
}