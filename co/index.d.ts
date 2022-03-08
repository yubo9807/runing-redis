import { Key, Value, OverTime, Count } from './cache';
declare type CreateTime = number;
export declare type Cover = boolean;
declare type SortArr = {
    key: Key;
    createTime: CreateTime;
    value: Value;
    overTime: OverTime;
    count: Count;
};
export default class Redis {
    maxCache: number;
    constructor(maxCache?: number);
    /**
     * 储存数据，如果已经存在并且没有过期你会直接获取到该数据
     * @param {string} key 设置存放数据的键
     * @param {*} value 是一个函数时(必须返回数据)：可以进行数据请求，有缓存时并不会执行；其他类型：直接将数据存放进去
     * @param {date} overTime 过期时间，为 -1 时数据不过期。设置更小的数无意义
     * @param {boolean} cover 强制覆盖数据
     * @returns 返回设置的 value
     */
    deposit(key: Key, value?: Value, overTime?: OverTime, cover?: Cover): Promise<any>;
    clearCache(): void;
    deleteOverValue(): void;
    deleteFristValue(arr: SortArr[]): void;
}
export {};
