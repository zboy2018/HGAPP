/*工具类

 */
import {
    debug,
    autoLogin
} from '../api/config.js';

export default {
    /**是否是调试模式 */
    debug: debug,

    /**是否是自动登录模式 */
    autoLogin: autoLogin.open,
    /**
     * 生成UUID
     *
     * @returns
     */
    generateUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    objIsEmpty(val) {
        switch (typeof(val)) {
            case 'string':
                return this.stringTrim(val).length == 0 ? true : false;
                //break;
            case 'number':
                return val == 0;
                //break;
            case 'object':
                return val == null;
                //break;
            case 'array':
                return val.length == 0;
                //break;
            default:
                return true;
        }
    },

    /**是否是数组 */
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    /**字符串清除空格 */
    stringTrim(text) {
        if (typeof(text) == "string") {
            return text.replace(/^\s*|\s*$/g, "");
        } else {
            return text;
        }
    },
    /**字符串 是否是以xxx开头 */
    stringStartWith(text, str) {
        if (typeof(text) == "string") {
            var reg = new RegExp("^" + str);
            return reg.test(text);
        } else {
            return false;
        }
    },
    /**字符串 是否是以xxx结尾 */
    stringEndWith(text, str) {
        if (typeof(text) == "string") {
            var reg = new RegExp(str + "$");
            return reg.test(text);
        } else {
            return false;
        }
    },
    //对象深拷贝
    copyObject: copyObject
}


/*对象深拷贝
 *create by yk 2016/5/19
 */

//util作为判断变量具体类型的辅助模块
var util = (function() {
    var class2type = {};
    ["Null", "Undefined", "Number", "Boolean", "String", "Object", "Function", "Array", "RegExp", "Date"].forEach(function(item) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })

    function isType(obj, type) {
        return getType(obj) === type;
    }

    function getType(obj) {
        return class2type[Object.prototype.toString.call(obj)] || "object";
    }
    return {
        isType: isType,
        getType: getType
    }
})();
/**
 * 对象深copy  浅copy
 */
const copyObject = function(obj, deep) {
    //如果obj不是对象，那么直接返回值就可以了
    if (obj === null || typeof obj !== "object") {
        return obj;
    }　　　　 //定义需要的局部变脸，根据obj的类型来调整target的类型
    var i, target = util.isType(obj, "array") ? [] : {},
        value, valueType;
    for (i in obj) {
        value = obj[i];
        valueType = util.getType(value);　　　　　　　 //只有在明确执行深复制，并且当前的value是数组或对象的情况下才执行递归复制
        if (deep && (valueType === "array" || valueType === "object")) {
            target[i] = copyObject(value);
        } else {
            target[i] = value;
        }
    }
    return target;
}
