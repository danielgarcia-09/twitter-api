import { Request, Response } from "express";

export interface ObjectDynamicI {
    [key: string] : any
}

export interface ExpressRequest extends Request {}
export interface ExpressResponse extends Response {}
