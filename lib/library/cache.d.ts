export default class Cache {
    cache: any;
    constructor();
    get(key: string): any;
    set(key: string, value: object | string | object[]): any;
    delete(key: string): any;
}
