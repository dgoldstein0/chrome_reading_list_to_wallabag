export class Cache {
    _cache = null;
    enabled = false;

    constructor(enable) {
      this.enabled = enable;
      this._cache = [];
    }

    str(some) {
        return btoa(unescape(encodeURIComponent(some)));
    }

    set(key, data) {
        if (this.enabled) {
            this._cache[this.str(key)] = data;
        }
    }

    clear(key) {
        if (this.enabled) {
            delete this._cache[this.str(key)];
        }
    }

    check(key) {
        return this.enabled && (this._cache[this.str(key)] !== undefined);
    }

    get(key) {
        return this.enabled ? this._cache[this.str(key)] : undefined;
    }
};

