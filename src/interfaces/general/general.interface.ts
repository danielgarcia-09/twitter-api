import { Request, Response } from "express";

export interface ExpressRequest extends Request {}
export interface ExpressResponse extends Response {}

export interface ObjectDynamicI {
    [key: string] : any
}

export interface ResponseI extends ObjectDynamicI {
    message: string,
}


export type EntityPick<T extends object, K extends keyof T> = Pick<T, K>
