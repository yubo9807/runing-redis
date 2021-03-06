var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = __importDefault(require("./cache"));
var Redis = /** @class */ (function () {
    function Redis(maxCache) {
        if (maxCache === void 0) { maxCache = 1024 * 1024 * 2; }
        this.maxCache = maxCache; // ???????????????
    }
    /**
     * ?????????????????????????????????????????????????????????????????????????????????
     * @param {string} key ????????????????????????
     * @param {*} value ??????????????????(??????????????????)??????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param {date} overTime ?????????????????? -1 ????????????????????????????????????????????????
     * @param {boolean} cover ??????????????????
     * @returns ??????????????? value
     */
    Redis.prototype.deposit = function (key, value, overTime, cover) {
        if (overTime === void 0) { overTime = -1; }
        if (cover === void 0) { cover = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, _b, size;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (overTime === -1)
                            overTime = Infinity; // ?????????????????????????????????????????????????????????
                        if (!cover) return [3 /*break*/, 4];
                        if (!(typeof value === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, value()];
                    case 1:
                        _a = value = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = value;
                        _c.label = 3;
                    case 3:
                        _a;
                        cache_1.default.set(key, value, overTime);
                        return [2 /*return*/, cache_1.default.get(key)];
                    case 4:
                        data = cache_1.default.get(key);
                        if (!data) return [3 /*break*/, 5];
                        return [2 /*return*/, { cache: true, data: data }];
                    case 5:
                        if (!(typeof value === 'function')) return [3 /*break*/, 7];
                        return [4 /*yield*/, value()];
                    case 6:
                        _b = value = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _b = value;
                        _c.label = 8;
                    case 8:
                        _b;
                        cache_1.default.set(key, value, overTime); // ???????????????????????????????????????
                        size = cache_1.default.size();
                        // ???????????????????????????????????????????????????????????????
                        size > this.maxCache && this.clearCache();
                        return [2 /*return*/, { cache: false, data: value }];
                }
            });
        });
    };
    // ??????????????????????????????????????????
    Redis.prototype.clearCache = function () {
        var e_1, _a;
        this.deleteOverValue(); // ?????????????????????
        var size = cache_1.default.size();
        if (size < this.maxCache)
            return; // ???????????????????????????
        var obj = cache_1.default.gainAll();
        var arr = [];
        try {
            for (var _b = __values(Object.entries(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (prop[1].overTime === Infinity)
                    continue; // ???????????????????????????
                arr.push(__assign({ key: prop[0] }, prop[1]));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var newArr = choiceSort(arr);
        this.deleteFristValue(newArr);
    };
    // ?????????????????????
    Redis.prototype.deleteOverValue = function () {
        var e_2, _a;
        var obj = cache_1.default.gainAll();
        var curTime = Date.now();
        try {
            for (var _b = __values(Object.entries(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                var createTime = prop[1].createTime;
                var overTime = prop[1].overTime;
                if (curTime - createTime > overTime) {
                    cache_1.default.delete(prop[0]);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    // ???????????????????????????
    Redis.prototype.deleteFristValue = function (arr) {
        var key = arr[0].key;
        arr.shift();
        cache_1.default.delete(key);
        var size = cache_1.default.size();
        if (size <= this.maxCache)
            return;
        this.deleteFristValue(arr); // ??????????????????????????????????????????????????????
    };
    return Redis;
}());
exports.default = Redis;
/**
 * ??????????????????
 * @param arr
 * @returns
 */
function choiceSort(arr) {
    var _a;
    var len = arr.length;
    if (arr == null || len === 0)
        return [];
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1; j++) {
            var minValue = arr[j];
            if (minValue.count > arr[j + 1].count) {
                _a = __read([arr[j + 1], minValue], 2), arr[j] = _a[0], arr[j + 1] = _a[1]; // ????????????
            }
        }
    }
    return arr;
}
