/// <reference path="../../src/types/Proxy.d.ts" />
import Registry from './registry';
export declare class Controller {
    protected registry: Registry;
    constructor(registry: Registry);
    get(target: any, name: any): any;
}
