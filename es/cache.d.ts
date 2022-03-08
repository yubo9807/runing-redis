export declare type Key = string | symbol;
export declare type Value = any;
export declare type OverTime = any;
export declare type Count = number;
declare const _default: {
    /**
     * 设置缓存数据
     * @param {string | symbol} key 如果不想覆盖此属性，请将 key 设置为 Symbol 类型
     * @param {*} value
     * @param {number} overTime 过期时间，单位（ms）
     */
    set(key: Key, value: Value, overTime: OverTime): void;
    /**
     * 获取数据
     * @param key 给我一个 key 值
     * @returns
     */
    get(key: Key): any;
    delete(key: Key): void;
    clear(): void;
    length(): number;
    gainAll(): any;
    size(): number;
};
/**
 * 默认导出一些对数据操作的方法
 * 对数据进行临时性缓存，获取即判断数据有无过期。
 */
export default _default;
/**
 * 获取一个对象的字节大小
 * @param obj
 * @returns
 */
export declare function getLSUsedSpace(obj: any): number;
