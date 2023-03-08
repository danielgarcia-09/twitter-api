import { Request } from "express";

export interface ObjectDynamicI {
    [key: string] : any
}

export interface ExpressRequest extends Request {}
