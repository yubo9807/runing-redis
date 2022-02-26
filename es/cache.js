import { createNum } from './utils/number';
var iter = createNum(); // 数字生成器
var map = new Map(); // 禁止导出，防止外部拿到直接修改内部数据
/**
 * 默认导出一些对数据操作的方法
 * 对数据进行临时性缓存，获取即判断数据有无过期。
 */
export default {
    /**
     * 设置缓存数据
     * @param {string | symbol} key 如果不想覆盖此属性，请将 key 设置为 Symbol 类型
     * @param {*} value
     * @param {number} overTime 过期时间，单位（ms）
     */
    set: function (key, value, overTime) {
        if (key === null || key === undefined || key === '')
            return;
        map.set(key, {
            createTime: Date.now(),
            value: value,
            overTime: overTime,
            count: iter.next().value, // 同一毫秒内可能存很多数据，记录一个索引，越小则证明存放时间越早
        });
    },
    /**
     * 获取数据
     * @param key 给我一个 key 值
     * @returns
     */
    get: function (key) {
        var value = map.get(key);
        if (value == null)
            return;
        var time = Date.now();
        (time - value.createTime > value.overTime) && this.delete(key);
        var newValue = map.get(key);
        return newValue && newValue.value;
    },
    // 删除数据
    delete: function (key) {
        map.delete(key);
    },
    // 清空所有数据
    clear: function () {
        map.clear();
    },
    // data.length
    length: function () {
        return map.size;
    },
    // 获取所有缓存数据
    gainAll: function () {
        return Object.fromEntries(map.entries());
    },
    // 获取数据字节大小
    size: function () {
        return getLSUsedSpace(this.gainAll());
    },
};
/**
 * 获取一个对象的字节大小
 * @param obj
 * @returns
 */
export function getLSUsedSpace(obj) {
    var length = Object.keys(obj).reduce(function (total, curKey) {
        if (!obj.hasOwnProperty(curKey))
            return total;
        if (typeof obj[curKey] === 'string')
            total += obj[curKey].length + curKey.length;
        else
            total += JSON.stringify(obj[curKey]).replace(/"/g, '').length + curKey.length;
        return total;
    }, 0);
    var symbolLen = Object.getOwnPropertySymbols(obj).reduce(function (total, curKey) {
        if (!obj.hasOwnProperty(curKey))
            return total;
        if (typeof obj[curKey] === 'string')
            total += obj[curKey].length;
        else
            total += JSON.stringify(obj[curKey]).replace(/"/g, '').length;
        return total;
    }, 0);
    return length + symbolLen;
}
