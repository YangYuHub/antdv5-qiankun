/**
 * storage封装
 *  storage.setItem('a',1);
    // 覆盖原有的user模块
    storage.setItem('user',{a:1});
    // 向原有的user追加 adb:{a:1}
    storage.setItem('abc',{a:1},'user');
    // 清除
    storage.clear('a');
    // 清除user模块下面的 abc
    storage.clear('abc','user');
 */

const STORAGE_KEY = 'onebyus-system';
export const sessionStorage = {
  // 存储值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  // 获取值
  // 获取某一模块下面的属性user下面的userName
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },
  //  获取浏览器中的缓存信息
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },

  // 清空
  clear(key, module_name) {
    let val = this.getStorage();
    if (module_name) {
      if (!val[module_name]) return;
      delete val[module_name][key];
    } else {
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
};

//定时 缓存
export const localStorage = {
  /**
   * 总容量5M
   * 存入缓存，支持字符串类型、json对象的存储
   * 页面关闭后依然有效 ie7+都有效
   * @param key 缓存key
   * @param stringVal
   * @time 数字 缓存有效时间（秒） 默认60s
   * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
   * */
  setTime: function (key, stringVal, time) {
    try {
      if (!window.localStorage) {
        return false;
      }
      if (!time || isNaN(time)) {
        time = 60;
      }
      var cacheExpireDate = new Date() - 1 + time * 1000;
      var cacheVal = { val: stringVal, exp: cacheExpireDate };
      window.localStorage.setItem(key, JSON.stringify(cacheVal)); //存入缓存值
    } catch (e) {}
  },
  // 存储值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },

  /**获取缓存*/
  getTime: function (key) {
    try {
      if (!window.localStorage) {
        return false;
      }
      var cacheVal = window.localStorage.getItem(key);
      var result = JSON.parse(cacheVal);
      var now = new Date() - 1;
      if (!result) {
        return null;
      } //缓存不存在
      if (now > result.exp) {
        //缓存过期
        this.remove(key);
        return '';
      }
      return result;
    } catch (e) {
      this.remove(key);
      return null;
    }
  } /**移除缓存，一般情况不手动调用，缓存过期自动调用*/,
  //  获取浏览器中的缓存信息
  getStorage() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
  },
  // 获取值
  // 获取某一模块下面的属性user下面的userName
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },
  remove: function (key) {
    if (!window.localStorage) {
      return false;
    }
    window.localStorage.removeItem(key);
  } /**清空所有缓存*/,
  // 清空
  clear(key, module_name) {
    let val = this.getStorage();
    if (module_name) {
      if (!val[module_name]) return;
      delete val[module_name][key];
    } else {
      delete val[key];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
};
