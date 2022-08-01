export function isObject(value: any) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

export function deepMerge<T = any>(def: any = {}, target: any = {}): T {
    for (const key in target) {
        if (!Object.prototype.hasOwnProperty.call(def, key)) continue;
        def[key] = isObject(def[key])
            ? deepMerge(def[key], target[key])
            : (def[key] = target[key]);
    }
    return def;
}
