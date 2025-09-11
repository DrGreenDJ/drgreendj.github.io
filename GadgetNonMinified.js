var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload"))
    return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]'))
    processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList")
        continue;
      for (const node of mutation.addedNodes)
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$3 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$3.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate$1 = (val) => toTypeString(val) === "[object Date]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction$1(val)) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString$1(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate$1(a);
  let bValidType = isDate$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray$1(a);
  bValidType = isArray$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  const dep = computed2.dep;
  computed2.flags |= 2;
  if (dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
    computed2.flags &= -3;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty$2(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$2;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend$1(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction$1(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction$1(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction$1(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$1(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
    return hasOwn(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref3) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString$1(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data)) ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction$1(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(
      isFunction$1(to) ? to.call(this, this) : to,
      isFunction$1(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend$1(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = extend$1({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render2(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render2(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : extend$1({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction$1(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction$1(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || key !== "_") {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render2 = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend$1({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString$1(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render2,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render2.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (false) ;
      result = normalizeVNode(
        render22.length > 1 ? render22(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString$1(ref3) || isRef(ref3) || isFunction$1(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend$1({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend$1({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
const version = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString$1(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean2 ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}

const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString$1(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const REMOVAL = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, extraOptions, _createApp) {
  const Comp = /* @__PURE__ */ defineComponent(options, extraOptions);
  if (isPlainObject$1(Comp)) extend$1(Comp, extraOptions);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, _createApp);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, _createApp = createApp) {
    super();
    this._def = _def;
    this._props = _props;
    this._createApp = _createApp;
    this._isVueCE = true;
    this._instance = null;
    this._app = null;
    this._nonce = this._def.nonce;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    this._styleChildren = /* @__PURE__ */ new WeakSet();
    this._ob = null;
    if (this.shadowRoot && _createApp !== createApp) {
      this._root = this.shadowRoot;
    } else {
      if (_def.shadowRoot !== false) {
        this.attachShadow({ mode: "open" });
        this._root = this.shadowRoot;
      } else {
        this._root = this;
      }
    }
    if (!this._def.__asyncLoader) {
      this._resolveProps(this._def);
    }
  }
  connectedCallback() {
    if (!this.isConnected) return;
    if (!this.shadowRoot) {
      this._parseSlots();
    }
    this._connected = true;
    let parent = this;
    while (parent = parent && (parent.parentNode || parent.host)) {
      if (parent instanceof VueElement) {
        this._parent = parent;
        break;
      }
    }
    if (!this._instance) {
      if (this._resolved) {
        this._setParent();
        this._update();
      } else {
        if (parent && parent._pendingResolve) {
          this._pendingResolve = parent._pendingResolve.then(() => {
            this._pendingResolve = void 0;
            this._resolveDef();
          });
        } else {
          this._resolveDef();
        }
      }
    }
  }
  _setParent(parent = this._parent) {
    if (parent) {
      this._instance.parent = parent._instance;
      this._instance.provides = parent._instance.provides;
    }
  }
  disconnectedCallback() {
    this._connected = false;
    nextTick(() => {
      if (!this._connected) {
        if (this._ob) {
          this._ob.disconnect();
          this._ob = null;
        }
        this._app && this._app.unmount();
        if (this._instance) this._instance.ce = void 0;
        this._app = this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve) {
      return;
    }
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    this._ob = new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    });
    this._ob.observe(this, { attributes: true });
    const resolve = (def2, isAsync = false) => {
      this._resolved = true;
      this._pendingResolve = void 0;
      const { props, styles } = def2;
      let numberProps;
      if (props && !isArray$1(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      if (isAsync) {
        this._resolveProps(def2);
      }
      if (this.shadowRoot) {
        this._applyStyles(styles);
      }
      this._mount(def2);
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      this._pendingResolve = asyncDef().then(
        (def2) => resolve(this._def = def2, true)
      );
    } else {
      resolve(this._def);
    }
  }
  _mount(def2) {
    this._app = this._createApp(def2);
    if (def2.configureApp) {
      def2.configureApp(this._app);
    }
    this._app._ceVNode = this._createVNode();
    this._app.mount(this._root);
    const exposed = this._instance && this._instance.exposed;
    if (!exposed) return;
    for (const key in exposed) {
      if (!hasOwn(this, key)) {
        Object.defineProperty(this, key, {
          // unwrap ref to be consistent with public instance behavior
          get: () => unref(exposed[key])
        });
      }
    }
  }
  _resolveProps(def2) {
    const { props } = def2;
    const declaredPropKeys = isArray$1(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key]);
      }
    }
    for (const key of declaredPropKeys.map(camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val, true, true);
        }
      });
    }
  }
  _setAttr(key) {
    if (key.startsWith("data-v-")) return;
    const has = this.hasAttribute(key);
    let value = has ? this.getAttribute(key) : REMOVAL;
    const camelKey = camelize(key);
    if (has && this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value);
    }
    this._setProp(camelKey, value, false, true);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = false) {
    if (val !== this._props[key]) {
      if (val === REMOVAL) {
        delete this._props[key];
      } else {
        this._props[key] = val;
        if (key === "key" && this._app) {
          this._app._ceVNode.key = val;
        }
      }
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        const ob = this._ob;
        ob && ob.disconnect();
        if (val === true) {
          this.setAttribute(hyphenate(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(hyphenate(key), val + "");
        } else if (!val) {
          this.removeAttribute(hyphenate(key));
        }
        ob && ob.observe(this, { attributes: true });
      }
    }
  }
  _update() {
    render(this._createVNode(), this._root);
  }
  _createVNode() {
    const baseProps = {};
    if (!this.shadowRoot) {
      baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
    }
    const vnode = createVNode(this._def, extend$1(baseProps, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.ce = this;
        instance.isCE = true;
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(
              event,
              isPlainObject$1(args[0]) ? extend$1({ detail: args }, args[0]) : { detail: args }
            )
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (hyphenate(event) !== event) {
            dispatch(hyphenate(event), args);
          }
        };
        this._setParent();
      };
    }
    return vnode;
  }
  _applyStyles(styles, owner) {
    if (!styles) return;
    if (owner) {
      if (owner === this._def || this._styleChildren.has(owner)) {
        return;
      }
      this._styleChildren.add(owner);
    }
    const nonce = this._nonce;
    for (let i = styles.length - 1; i >= 0; i--) {
      const s = document.createElement("style");
      if (nonce) s.setAttribute("nonce", nonce);
      s.textContent = styles[i];
      this.shadowRoot.prepend(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const slots = this._slots = {};
    let n;
    while (n = this.firstChild) {
      const slotName = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (slots[slotName] || (slots[slotName] = [])).push(n);
      this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const outlets = (this._teleportTarget || this).querySelectorAll("slot");
    const scopeId = this._instance.type.__scopeId;
    for (let i = 0; i < outlets.length; i++) {
      const o = outlets[i];
      const slotName = o.getAttribute("name") || "default";
      const content = this._slots[slotName];
      const parent = o.parentNode;
      if (content) {
        for (const n of content) {
          if (scopeId && n.nodeType === 1) {
            const id = scopeId + "-s";
            const walker = document.createTreeWalker(n, 1);
            n.setAttribute(id, "");
            let child;
            while (child = walker.nextNode()) {
              child.setAttribute(id, "");
            }
          }
          parent.insertBefore(n, o);
        }
      } else {
        while (o.firstChild) parent.insertBefore(o.firstChild, o);
      }
      parent.removeChild(o);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(comp) {
    this._applyStyles(comp.styles, comp);
  }
  /**
   * @internal
   */
  _removeChildStyle(comp) {
  }
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = Symbol("_assign");
const vModelText = {
  created(el, { modifiers: { lazy, trim: trim2, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      let domValue = el.value;
      if (trim2) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim2) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim: trim2, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim2 && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el[assignKey];
      if (isArray$1(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  let checked;
  if (isArray$1(value)) {
    checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    checked = value.has(vnode.props.value);
  } else {
    if (value === oldValue) return;
    checked = looseEqual(value, getCheckboxValue(el, true));
  }
  if (el.checked !== checked) {
    el.checked = checked;
  }
}
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
        (o) => number ? looseToNumber(getValue(o)) : getValue(o)
      );
      el[assignKey](
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
      el._assigning = true;
      nextTick(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    if (!el._assigning) {
      setSelected(el, value);
    }
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  const isArrayValue = isArray$1(value);
  if (isMultiple && !isArrayValue && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === "string" || optionType === "number") {
          option.selected = value.some((v) => String(v) === String(optionValue));
        } else {
          option.selected = looseIndexOf(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else if (looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i) el.selectedIndex = i;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const render = (...args) => {
  ensureRenderer().render(...args);
};
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
var dist = { exports: {} };
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist.exports;
  hasRequiredDist = 1;
  (function(module, exports) {
    !function(e, t) {
      module.exports = t();
    }(window, function() {
      return function(e) {
        var t = {};
        function n(r) {
          if (t[r]) return t[r].exports;
          var i = t[r] = { i: r, l: false, exports: {} };
          return e[r].call(i.exports, i, i.exports, n), i.l = true, i.exports;
        }
        return n.m = e, n.c = t, n.d = function(e2, t2, r) {
          n.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: r });
        }, n.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, n.t = function(e2, t2) {
          if (1 & t2 && (e2 = n(e2)), 8 & t2) return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule) return e2;
          var r = /* @__PURE__ */ Object.create(null);
          if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2) for (var i in e2) n.d(r, i, (function(t3) {
            return e2[t3];
          }).bind(null, i));
          return r;
        }, n.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, n.p = "/", n(n.s = 50);
      }([function(e, t, n) {
        (function(e2, r, i) {
          var o = n(11);
          const { toString: s } = Object.prototype, { getPrototypeOf: a } = Object, u = (c = /* @__PURE__ */ Object.create(null), (e3) => {
            const t2 = s.call(e3);
            return c[t2] || (c[t2] = t2.slice(8, -1).toLowerCase());
          });
          var c;
          const l = (e3) => (e3 = e3.toLowerCase(), (t2) => u(t2) === e3), d = (e3) => (t2) => typeof t2 === e3, { isArray: f } = Array, h = d("undefined");
          const p2 = l("ArrayBuffer");
          const g = d("string"), v = d("function"), m = d("number"), y = (e3) => null !== e3 && "object" == typeof e3, w = (e3) => {
            if ("object" !== u(e3)) return false;
            const t2 = a(e3);
            return !(null !== t2 && t2 !== Object.prototype && null !== Object.getPrototypeOf(t2) || Symbol.toStringTag in e3 || Symbol.iterator in e3);
          }, b = l("Date"), E = l("File"), S = l("Blob"), k = l("FileList"), O = l("URLSearchParams"), [T, C, A, I] = ["ReadableStream", "Request", "Response", "Headers"].map(l);
          function L(e3, t2, { allOwnKeys: n2 = false } = {}) {
            if (null == e3) return;
            let r2, i2;
            if ("object" != typeof e3 && (e3 = [e3]), f(e3)) for (r2 = 0, i2 = e3.length; r2 < i2; r2++) t2.call(null, e3[r2], r2, e3);
            else {
              const i3 = n2 ? Object.getOwnPropertyNames(e3) : Object.keys(e3), o2 = i3.length;
              let s2;
              for (r2 = 0; r2 < o2; r2++) s2 = i3[r2], t2.call(null, e3[s2], s2, e3);
            }
          }
          function R(e3, t2) {
            t2 = t2.toLowerCase();
            const n2 = Object.keys(e3);
            let r2, i2 = n2.length;
            for (; i2-- > 0; ) if (r2 = n2[i2], t2 === r2.toLowerCase()) return r2;
            return null;
          }
          const x = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : e2, _ = (e3) => !h(e3) && e3 !== x;
          const N = (D = "undefined" != typeof Uint8Array && a(Uint8Array), (e3) => D && e3 instanceof D);
          var D;
          const M = l("HTMLFormElement"), P = (({ hasOwnProperty: e3 }) => (t2, n2) => e3.call(t2, n2))(Object.prototype), j = l("RegExp"), V = (e3, t2) => {
            const n2 = Object.getOwnPropertyDescriptors(e3), r2 = {};
            L(n2, (n3, i2) => {
              let o2;
              false !== (o2 = t2(n3, i2, e3)) && (r2[i2] = o2 || n3);
            }), Object.defineProperties(e3, r2);
          }, U = "abcdefghijklmnopqrstuvwxyz", q = { DIGIT: "0123456789", ALPHA: U, ALPHA_DIGIT: U + U.toUpperCase() + "0123456789" };
          const F = l("AsyncFunction"), B = (z = "function" == typeof r, H = v(x.postMessage), z ? r : H ? (J = "axios@" + Math.random(), Z = [], x.addEventListener("message", ({ source: e3, data: t2 }) => {
            e3 === x && t2 === J && Z.length && Z.shift()();
          }, false), (e3) => {
            Z.push(e3), x.postMessage(J, "*");
          }) : (e3) => setTimeout(e3));
          var z, H, J, Z;
          const W = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(x) : void 0 !== i && i.nextTick || B;
          t.a = { isArray: f, isArrayBuffer: p2, isBuffer: function(e3) {
            return null !== e3 && !h(e3) && null !== e3.constructor && !h(e3.constructor) && v(e3.constructor.isBuffer) && e3.constructor.isBuffer(e3);
          }, isFormData: (e3) => {
            let t2;
            return e3 && ("function" == typeof FormData && e3 instanceof FormData || v(e3.append) && ("formdata" === (t2 = u(e3)) || "object" === t2 && v(e3.toString) && "[object FormData]" === e3.toString()));
          }, isArrayBufferView: function(e3) {
            let t2;
            return t2 = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e3) : e3 && e3.buffer && p2(e3.buffer), t2;
          }, isString: g, isNumber: m, isBoolean: (e3) => true === e3 || false === e3, isObject: y, isPlainObject: w, isReadableStream: T, isRequest: C, isResponse: A, isHeaders: I, isUndefined: h, isDate: b, isFile: E, isBlob: S, isRegExp: j, isFunction: v, isStream: (e3) => y(e3) && v(e3.pipe), isURLSearchParams: O, isTypedArray: N, isFileList: k, forEach: L, merge: function e3() {
            const { caseless: t2 } = _(this) && this || {}, n2 = {}, r2 = (r3, i2) => {
              const o2 = t2 && R(n2, i2) || i2;
              w(n2[o2]) && w(r3) ? n2[o2] = e3(n2[o2], r3) : w(r3) ? n2[o2] = e3({}, r3) : f(r3) ? n2[o2] = r3.slice() : n2[o2] = r3;
            };
            for (let e4 = 0, t3 = arguments.length; e4 < t3; e4++) arguments[e4] && L(arguments[e4], r2);
            return n2;
          }, extend: (e3, t2, n2, { allOwnKeys: r2 } = {}) => (L(t2, (t3, r3) => {
            n2 && v(t3) ? e3[r3] = Object(o.a)(t3, n2) : e3[r3] = t3;
          }, { allOwnKeys: r2 }), e3), trim: (e3) => e3.trim ? e3.trim() : e3.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), stripBOM: (e3) => (65279 === e3.charCodeAt(0) && (e3 = e3.slice(1)), e3), inherits: (e3, t2, n2, r2) => {
            e3.prototype = Object.create(t2.prototype, r2), e3.prototype.constructor = e3, Object.defineProperty(e3, "super", { value: t2.prototype }), n2 && Object.assign(e3.prototype, n2);
          }, toFlatObject: (e3, t2, n2, r2) => {
            let i2, o2, s2;
            const u2 = {};
            if (t2 = t2 || {}, null == e3) return t2;
            do {
              for (i2 = Object.getOwnPropertyNames(e3), o2 = i2.length; o2-- > 0; ) s2 = i2[o2], r2 && !r2(s2, e3, t2) || u2[s2] || (t2[s2] = e3[s2], u2[s2] = true);
              e3 = false !== n2 && a(e3);
            } while (e3 && (!n2 || n2(e3, t2)) && e3 !== Object.prototype);
            return t2;
          }, kindOf: u, kindOfTest: l, endsWith: (e3, t2, n2) => {
            e3 = String(e3), (void 0 === n2 || n2 > e3.length) && (n2 = e3.length), n2 -= t2.length;
            const r2 = e3.indexOf(t2, n2);
            return -1 !== r2 && r2 === n2;
          }, toArray: (e3) => {
            if (!e3) return null;
            if (f(e3)) return e3;
            let t2 = e3.length;
            if (!m(t2)) return null;
            const n2 = new Array(t2);
            for (; t2-- > 0; ) n2[t2] = e3[t2];
            return n2;
          }, forEachEntry: (e3, t2) => {
            const n2 = (e3 && e3[Symbol.iterator]).call(e3);
            let r2;
            for (; (r2 = n2.next()) && !r2.done; ) {
              const n3 = r2.value;
              t2.call(e3, n3[0], n3[1]);
            }
          }, matchAll: (e3, t2) => {
            let n2;
            const r2 = [];
            for (; null !== (n2 = e3.exec(t2)); ) r2.push(n2);
            return r2;
          }, isHTMLForm: M, hasOwnProperty: P, hasOwnProp: P, reduceDescriptors: V, freezeMethods: (e3) => {
            V(e3, (t2, n2) => {
              if (v(e3) && -1 !== ["arguments", "caller", "callee"].indexOf(n2)) return false;
              const r2 = e3[n2];
              v(r2) && (t2.enumerable = false, "writable" in t2 ? t2.writable = false : t2.set || (t2.set = () => {
                throw Error("Can not rewrite read-only method '" + n2 + "'");
              }));
            });
          }, toObjectSet: (e3, t2) => {
            const n2 = {}, r2 = (e4) => {
              e4.forEach((e5) => {
                n2[e5] = true;
              });
            };
            return f(e3) ? r2(e3) : r2(String(e3).split(t2)), n2;
          }, toCamelCase: (e3) => e3.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e4, t2, n2) {
            return t2.toUpperCase() + n2;
          }), noop: () => {
          }, toFiniteNumber: (e3, t2) => null != e3 && Number.isFinite(e3 = +e3) ? e3 : t2, findKey: R, global: x, isContextDefined: _, ALPHABET: q, generateString: (e3 = 16, t2 = q.ALPHA_DIGIT) => {
            let n2 = "";
            const { length: r2 } = t2;
            for (; e3--; ) n2 += t2[Math.random() * r2 | 0];
            return n2;
          }, isSpecCompliantForm: function(e3) {
            return !!(e3 && v(e3.append) && "FormData" === e3[Symbol.toStringTag] && e3[Symbol.iterator]);
          }, toJSONObject: (e3) => {
            const t2 = new Array(10), n2 = (e4, r2) => {
              if (y(e4)) {
                if (t2.indexOf(e4) >= 0) return;
                if (!("toJSON" in e4)) {
                  t2[r2] = e4;
                  const i2 = f(e4) ? [] : {};
                  return L(e4, (e5, t3) => {
                    const o2 = n2(e5, r2 + 1);
                    !h(o2) && (i2[t3] = o2);
                  }), t2[r2] = void 0, i2;
                }
              }
              return e4;
            };
            return n2(e3, 0);
          }, isAsyncFn: F, isThenable: (e3) => e3 && (y(e3) || v(e3)) && v(e3.then) && v(e3.catch), setImmediate: B, asap: W };
        }).call(this, n(9), n(40).setImmediate, n(17));
      }, function(e, t, n) {
        var r = n(0);
        function i(e2, t2, n2, r2, i2) {
          Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e2, this.name = "AxiosError", t2 && (this.code = t2), n2 && (this.config = n2), r2 && (this.request = r2), i2 && (this.response = i2, this.status = i2.status ? i2.status : null);
        }
        r.a.inherits(i, Error, { toJSON: function() {
          return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: r.a.toJSONObject(this.config), code: this.code, status: this.status };
        } });
        const o = i.prototype, s = {};
        ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e2) => {
          s[e2] = { value: e2 };
        }), Object.defineProperties(i, s), Object.defineProperty(o, "isAxiosError", { value: true }), i.from = (e2, t2, n2, s2, a, u) => {
          const c = Object.create(o);
          return r.a.toFlatObject(e2, c, function(e3) {
            return e3 !== Error.prototype;
          }, (e3) => "isAxiosError" !== e3), i.call(c, e2.message, t2, n2, s2, a), c.cause = e2, c.name = e2.name, u && Object.assign(c, u), c;
        }, t.a = i;
      }, function(e, t, n) {
        e.exports = function(e2) {
          var t2 = {};
          function n2(r) {
            if (t2[r]) return t2[r].exports;
            var i = t2[r] = { i: r, l: false, exports: {} };
            return e2[r].call(i.exports, i, i.exports, n2), i.l = true, i.exports;
          }
          return n2.m = e2, n2.c = t2, n2.d = function(e3, t3, r) {
            n2.o(e3, t3) || Object.defineProperty(e3, t3, { enumerable: true, get: r });
          }, n2.r = function(e3) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
          }, n2.t = function(e3, t3) {
            if (1 & t3 && (e3 = n2(e3)), 8 & t3) return e3;
            if (4 & t3 && "object" == typeof e3 && e3 && e3.__esModule) return e3;
            var r = /* @__PURE__ */ Object.create(null);
            if (n2.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e3 }), 2 & t3 && "string" != typeof e3) for (var i in e3) n2.d(r, i, (function(t4) {
              return e3[t4];
            }).bind(null, i));
            return r;
          }, n2.n = function(e3) {
            var t3 = e3 && e3.__esModule ? function() {
              return e3.default;
            } : function() {
              return e3;
            };
            return n2.d(t3, "a", t3), t3;
          }, n2.o = function(e3, t3) {
            return Object.prototype.hasOwnProperty.call(e3, t3);
          }, n2.p = "/", n2(n2.s = 8);
        }([function(e2, t2) {
          e2.exports = n(8);
        }, function(e2, t2) {
          e2.exports = n(37);
        }, function(e2, t2) {
          e2.exports = n(15);
        }, function(e2, t2) {
          e2.exports = n(49);
        }, function(e2, t2) {
          e2.exports = n(51);
        }, function(e2, t2) {
          e2.exports = n(52);
        }, function(e2, t2) {
          e2.exports = n(46);
        }, function(e2, t2) {
          e2.exports = n(48);
        }, function(e2, t2, n2) {
          n2.r(t2), n2.d(t2, "BrowserNotification", function() {
            return d;
          }), n2.d(t2, "createBrowserNotifications", function() {
            return h;
          }), n2.d(t2, "Decorator", function() {
            return g;
          }), n2.d(t2, "Err", function() {
            return f;
          }), n2.d(t2, "Evt", function() {
            return y;
          }), n2.d(t2, "createHttp", function() {
            return S;
          }), n2.d(t2, "I18N", function() {
            return k;
          }), n2.d(t2, "createLogger", function() {
            return c;
          }), n2.d(t2, "Logger", function() {
            return u;
          }), n2.d(t2, "NotificationItemsContent", function() {
            return T;
          }), n2.d(t2, "createNotifications", function() {
            return P;
          }), n2.d(t2, "Notifications", function() {
            return _;
          }), n2.d(t2, "Signal", function() {
            return N;
          }), n2.d(t2, "clearInterval", function() {
            return q;
          }), n2.d(t2, "clearTimeout", function() {
            return F;
          }), n2.d(t2, "setInterval", function() {
            return B;
          }), n2.d(t2, "setTimeout", function() {
            return z;
          });
          var r = n2(0), i = n2.n(r), o = n2(1);
          class s {
            constructor(e3) {
              this.maskKeys = e3;
            }
            tryJSONParse(e3) {
              try {
                return JSON.parse(e3);
              } catch (e4) {
                return;
              }
            }
            copiedObj(e3) {
              try {
                return JSON.parse(JSON.stringify(e3));
              } catch (t3) {
                return e3;
              }
            }
            maskObjectProperty(e3) {
              const t3 = e3;
              Object.keys(e3).forEach((n3) => {
                "object" == typeof e3[n3] && null !== e3[n3] ? this.maskObjectProperty(e3[n3]) : t3[n3] = "*********";
              });
            }
            maskLogData(e3) {
              Object.keys(e3).forEach((t3) => {
                "object" == typeof e3[t3] && null !== e3[t3] ? this.maskKeys[t3] ? this.maskObjectProperty(e3[t3]) : this.maskLogData(e3[t3]) : (this.maskKeys[t3] && "string" == typeof e3[t3] || "value" === t3 && this.maskKeys[e3.name]) && (e3[t3] = "*********");
              });
            }
            maskPIIInformation(e3) {
              const t3 = e3[e3.length - 1], n3 = "string" == typeof t3 ? this.tryJSONParse(t3) : this.copiedObj(t3);
              n3 && "object" == typeof n3 && (this.maskLogData(n3), e3.splice(e3.length - 1, 1, n3));
            }
          }
          const a = (...e3) => e3.map((e4) => "string" == typeof e4 ? e4 : JSON.stringify(e4));
          var u;
          function c(e3, t3) {
            const n3 = new u.Service(e3, t3);
            return u.POOL.addLogger(n3), n3;
          }
          !function(e3) {
            e3.MAX_LOGS_SIZE = 1048576, e3.LS_LOGS_KEY = "uuip-client-logs";
            const t3 = /[\u0100-\uFFFF]/g;
            let n3;
            !function(e4) {
              e4[e4.Trace = 1] = "Trace", e4[e4.Debug = 2] = "Debug", e4[e4.Warn = 3] = "Warn", e4[e4.Error = 4] = "Error", e4[e4.Fatal = 5] = "Fatal";
            }(n3 = e3.Level || (e3.Level = {})), e3.Service = class {
              constructor(e4, t4) {
                this.loggerEmitter = i()(), this.prefix = e4, this.maskKeys = t4;
              }
              log(t4, ...n4) {
                this.maskKeys && "object" == typeof this.maskKeys && ((e4, t5) => {
                  new s(t5).maskPIIInformation(e4);
                })(n4, this.maskKeys);
                const r3 = a(this.prefix ? ["" + this.prefix, ...n4] : n4), i2 = Date.now(), u2 = o.DateTime.fromMillis(i2).toFormat("yyyy-LL-dd HH:mm:ss:SSS");
                switch (t4) {
                  case e3.Level.Trace:
                    console.info(u2, ...r3);
                    break;
                  case e3.Level.Debug:
                    console.log(u2, ...r3);
                    break;
                  case e3.Level.Warn:
                    console.warn(u2, ...r3);
                    break;
                  case e3.Level.Error:
                  case e3.Level.Fatal:
                    console.error(u2, ...r3);
                    break;
                  default:
                    console.log(...r3);
                }
                const c2 = { pfx: this.prefix, msgs: [...n4], ts: i2, lvl: t4 };
                this.emit("add", c2);
              }
              info(...e4) {
                this.log(n3.Trace, ...e4);
              }
              debug(...e4) {
                this.log(n3.Debug, ...e4);
              }
              warn(...e4) {
                this.log(n3.Warn, ...e4);
              }
              error(...e4) {
                this.log(n3.Error, ...e4);
              }
              emit(e4, ...t4) {
                this.loggerEmitter.emit(e4, ...t4);
              }
              addEventListener(e4, t4) {
                return this.loggerEmitter.on(e4, t4), () => {
                  this.removeEventListener(e4, t4);
                };
              }
              removeEventListener(e4, t4) {
                this.loggerEmitter.off(e4, t4);
              }
            };
            class r2 {
              constructor() {
                this.loggers = /* @__PURE__ */ new Map(), this.logsCollection = [], this.logsCollectionString = "", this.prefixedLogsCollections = {}, this.logRecordsSerializedLength = 0, this.onLoggerAddRecord = (e4) => {
                  this.addLogRecord(e4), this.save();
                }, this.restore();
              }
              static getSerializedJsonLogRecordBytesSize(e4 = "") {
                const n4 = e4.length;
                if (n4) {
                  const r3 = e4.replace(t3, "").length;
                  return 1 * r3 + 2 * (n4 - r3);
                }
                return n4;
              }
              get serializedJsonLogsBytesSize() {
                const e4 = this.logsCollectionString.split("<uuip-eol>").length;
                return 2 + this.logRecordsSerializedLength + 1 * (e4 - 1);
              }
              save() {
                window.sessionStorage.setItem(e3.LS_LOGS_KEY, this.logsCollectionString);
              }
              restore() {
                try {
                  const t4 = window.sessionStorage.getItem(e3.LS_LOGS_KEY) || "";
                  this.logsCollectionString = t4, this.logRecordsSerializedLength += r2.getSerializedJsonLogRecordBytesSize(this.logsCollectionString), this.restorePreFixedLogs();
                } catch (e4) {
                  console.warn("Logger failed read logs from sessionStorage: ", e4);
                }
              }
              getLogObjectFromString() {
                try {
                  return "" !== this.logsCollectionString ? JSON.parse(`[${this.logsCollectionString.split("<uuip-eol>").join(",")}]`) : [];
                } catch (e4) {
                  console.log("Error parsing local storage data");
                }
              }
              restorePreFixedLogs() {
                const e4 = this.getLogObjectFromString();
                e4 && Array.isArray(e4) && e4.length > 0 && e4.forEach((e5) => {
                  this.addPreFixedLogs(e5), this.removeOversized();
                });
              }
              addPreFixedLogs(e4) {
                this.prefixedLogsCollections[e4.pfx] = this.prefixedLogsCollections[e4.pfx] || /* @__PURE__ */ new Set(), this.prefixedLogsCollections[e4.pfx].add(e4);
              }
              removeOversized() {
                for (; this.serializedJsonLogsBytesSize > e3.MAX_LOGS_SIZE && "" !== this.logsCollectionString; ) this.removeLogRecord();
              }
              removeTextFromString(e4, t4, n4) {
                return `${e4.slice(0, t4)}${e4.slice(n4 + t4)}`;
              }
              addLogRecord(e4) {
                try {
                  const t4 = JSON.stringify(e4), n4 = this.logsCollectionString;
                  this.logsCollectionString = null == n4 ? void 0 : n4.concat(`${"" !== n4.trim() ? "<uuip-eol>" : ""}${t4}`);
                } catch (t4) {
                  const n4 = JSON.stringify(e4);
                  this.logsCollectionString = n4, console.warn("Logger failed read logs from sessionStorage: ", t4);
                }
                this.logRecordsSerializedLength += r2.getSerializedJsonLogRecordBytesSize(JSON.stringify(e4)), this.addPreFixedLogs(e4), this.removeOversized();
              }
              removeLogRecord() {
                if ("" !== this.logsCollectionString) {
                  const e4 = this.logsCollectionString.indexOf("<uuip-eol>");
                  if (-1 !== e4) {
                    const t4 = this.logsCollectionString.substring(0, e4), n4 = e4 + "<uuip-eol>".length, i2 = this.removeTextFromString(this.logsCollectionString, 0, n4);
                    this.logsCollectionString = i2, this.logRecordsSerializedLength -= r2.getSerializedJsonLogRecordBytesSize(t4);
                    try {
                      const e5 = JSON.parse(t4);
                      this.prefixedLogsCollections[e5.pfx] && this.prefixedLogsCollections[e5.pfx].forEach((t5) => {
                        t5.ts === e5.ts && this.prefixedLogsCollections[e5.pfx].delete(t5);
                      });
                    } catch (e5) {
                      console.warn("Logger failed to read/parse the first logs from sessionStorage: ", e5);
                    }
                  }
                }
              }
              removePreFixedLogs(e4) {
                const t4 = this.getLogObjectFromString();
                e4.forEach((e5) => {
                  const n4 = t4.findIndex((t5) => t5.pfx === e5.pfx);
                  -1 !== n4 && (t4.splice(n4, 1), this.logRecordsSerializedLength -= r2.getSerializedJsonLogRecordBytesSize(JSON.stringify(e5)), this.prefixedLogsCollections[e5.pfx] && this.prefixedLogsCollections[e5.pfx].has(e5) && this.prefixedLogsCollections[e5.pfx].delete(e5));
                }), this.logsCollectionString = t4.map((e5) => JSON.stringify(e5)).join("<uuip-eol>");
              }
              static getLogRecordReadable(e4) {
                if (e4.ts) return { prefix: e4.pfx, messages: e4.msgs, timestamp: o.DateTime.fromMillis(e4.ts).toFormat("yyyy-LL-dd HH:mm:ss:SSS"), level: n3[e4.lvl] };
              }
              static getLogsReadableJson(e4) {
                const t4 = (e5) => e5.map((e6) => r2.getLogRecordReadable(e6));
                return JSON.stringify(Array.isArray(e4) ? t4(e4) : Object.keys(e4).reduce((n4, r3) => (n4[r3] = t4(e4[r3]), n4), {}), null, 2);
              }
              static getLogsReadableText(e4) {
                const t4 = (e5) => e5.reduce((e6, t5) => {
                  const n4 = r2.getLogRecordReadable(t5);
                  return n4 && (e6 += n4.timestamp + " " + n4.prefix + " " + n4.level + " " + a(n4.messages).join(" ") + " \r\n"), e6;
                }, "");
                return Array.isArray(e4) ? t4(e4) : Object.keys(e4).reduce((n4, r3) => (n4 += `[SERVICE "${r3}" LOGS]: `) + t4(e4[r3]), "");
              }
              static getLogsUrl(e4) {
                return "data:text/plain;charset=utf-8," + encodeURIComponent(e4);
              }
              static browserDownload(e4, t4) {
                try {
                  if (document && document.createElement) {
                    const n4 = document.createElement("a");
                    n4.setAttribute("href", e4), n4.setAttribute("download", t4), n4.style.display = "none", document.body.appendChild(n4), n4.click(), document.body.removeChild(n4);
                  } else console.warn("Browser is not supported to download logs");
                } catch (e5) {
                }
              }
              addLogger(e4) {
                this.loggers.set(e4.prefix, e4), e4.removeEventListener("add", this.onLoggerAddRecord), e4.addEventListener("add", this.onLoggerAddRecord);
              }
              getAllLogsJsonUrl() {
                return r2.getLogsUrl(r2.getLogsReadableJson(this.getLogObjectFromString()));
              }
              getAllPrefixedLogsJsonUrl() {
                return r2.getLogsUrl(r2.getLogsReadableJson(this.getAllPrefixedLogsCollections()));
              }
              getPrefixedLogsJsonUrl(e4) {
                return r2.getLogsUrl(r2.getLogsReadableJson(this.getPrefixedLogsCollection(e4)));
              }
              getAllLogsTextUrl() {
                return r2.getLogsUrl(r2.getLogsReadableText(this.getLogObjectFromString()));
              }
              getPrefixedLogsTextUrl(e4) {
                return r2.getLogsUrl(r2.getLogsReadableText(this.getPrefixedLogsCollection(e4)));
              }
              browserDownloadAllLogsJson() {
                r2.browserDownload(this.getAllLogsJsonUrl(), /* @__PURE__ */ new Date() + "_all_logs.json");
              }
              browserDownloadAllPrefixedLogsJson() {
                r2.browserDownload(this.getAllPrefixedLogsJsonUrl(), /* @__PURE__ */ new Date() + "_all_prefixed_logs.json");
              }
              browserDownloadPrefixedLogsJson(e4) {
                r2.browserDownload(this.getPrefixedLogsJsonUrl(e4), `${/* @__PURE__ */ new Date()}_${e4}_logs.json`);
              }
              browserDownloadAllLogsText() {
                r2.browserDownload(this.getAllLogsTextUrl(), /* @__PURE__ */ new Date() + "_all_logs.log");
              }
              browserDownloadPrefixedLogsText(e4) {
                r2.browserDownload(this.getPrefixedLogsTextUrl(e4), `${/* @__PURE__ */ new Date()}_${e4}_logs.log`);
              }
              cleanupAllLogs() {
                this.logsCollection.length = 0, this.logRecordsSerializedLength = 0, this.logsCollectionString = "", Object.keys(this.prefixedLogsCollections).forEach((e4) => this.prefixedLogsCollections[e4] = /* @__PURE__ */ new Set()), this.save();
              }
              cleanupPrefixedLogs(e4) {
                const t4 = this.getPrefixedLogsCollection(e4);
                this.removePreFixedLogs(t4), this.prefixedLogsCollections[e4] = /* @__PURE__ */ new Set(), this.save();
              }
              getAllPrefixedLogsCollections() {
                return Object.keys(this.prefixedLogsCollections).reduce((e4, t4) => (e4[t4] = this.getPrefixedLogsCollection(t4), e4), {});
              }
              getPrefixedLogsCollection(e4) {
                return Array.from(this.prefixedLogsCollections[e4] || /* @__PURE__ */ new Set());
              }
            }
            e3.ServicesPool = r2, e3.POOL = new e3.ServicesPool();
          }(u || (u = {}));
          const l = c("unified-ui-platform-sdk", { title: true, text: true });
          var d, f;
          function h(e3) {
            return new d.Service(e3);
          }
          function p2(e3, t3) {
            if (e3.descriptor = e3.descriptor || Object.getOwnPropertyDescriptor(e3.target, e3.key), "function" != typeof e3.descriptor.value) return console.warn(e3.key, "Decorator must be used on function"), e3.descriptor;
            const n3 = e3.descriptor.value, r2 = e3.target.constructor.name;
            return e3.descriptor.value = function() {
              const e4 = [];
              for (let t4 = 0; t4 < arguments.length; t4++) e4[t4] = arguments[t4];
              return t3.call(this, n3, e4, r2);
            }, e3.descriptor;
          }
          !function(e3) {
            class t3 {
              static get isBrowserNotificationPromiseSupported() {
                try {
                  window.Notification.requestPermission().then();
                } catch (e4) {
                  return false;
                }
                return true;
              }
              constructor(e4) {
                this.defaultOptions = e4 || {};
              }
              get isBrowserNotificationSupported() {
                return !!("Notification" in window);
              }
              get isBrowserNotificationIconSupported() {
                return this.isBrowserNotificationSupported && "icon" in window.Notification.prototype;
              }
              get isBrowserNotificationImageSupported() {
                return this.isBrowserNotificationSupported && "image" in window.Notification.prototype;
              }
              get isBrowserNotificationBadgeSupported() {
                return this.isBrowserNotificationSupported && "badge" in window.Notification.prototype;
              }
              get isPermissionGranted() {
                return "granted" === window.Notification.permission;
              }
              get isPermissionDenied() {
                return "denied" === window.Notification.permission;
              }
              get isPermissionUnknown() {
                return !this.isPermissionGranted && !this.isPermissionDenied;
              }
              requestNotificationUserPermission() {
                return function(e4, t4, n3, r2) {
                  return new (n3 || (n3 = Promise))(function(i2, o2) {
                    function s2(e5) {
                      try {
                        u2(r2.next(e5));
                      } catch (e6) {
                        o2(e6);
                      }
                    }
                    function a2(e5) {
                      try {
                        u2(r2.throw(e5));
                      } catch (e6) {
                        o2(e6);
                      }
                    }
                    function u2(e5) {
                      var t5;
                      e5.done ? i2(e5.value) : (t5 = e5.value, t5 instanceof n3 ? t5 : new n3(function(e6) {
                        e6(t5);
                      })).then(s2, a2);
                    }
                    u2((r2 = r2.apply(e4, [])).next());
                  });
                }(this, void 0, void 0, function* () {
                  this.isBrowserNotificationSupported ? t3.isBrowserNotificationPromiseSupported ? yield window.Notification.requestPermission() : yield new Promise((e4) => window.Notification.requestPermission((t4) => e4(t4))) : l.warn("Browser notification is not supported...");
                });
              }
              fire(e4, t4) {
                return new window.Notification(e4, Object.assign(Object.assign({}, this.defaultOptions), t4 || {}));
              }
            }
            e3.Service = t3;
          }(d || (d = {})), function(e3) {
            class t3 extends Error {
              constructor(e4, t4) {
                super(), this.isErr = "yes", this.id = e4, this.stack = new Error().stack, "string" == typeof t4 ? this.message = t4 : t4 instanceof Error ? (this.message = t4.message, this.name = t4.name) : this.message = "";
              }
            }
            e3.Message = t3;
            class n3 extends Error {
              constructor(e4, t4) {
                super(), this.isErr = "yes", this.id = e4, this.stack = new Error().stack, this.details = t4;
              }
            }
            e3.Details = n3;
          }(f || (f = {}));
          var g, v, m = function(e3, t3, n3, r2) {
            return new (n3 || (n3 = Promise))(function(i2, o2) {
              function s2(e4) {
                try {
                  u2(r2.next(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function a2(e4) {
                try {
                  u2(r2.throw(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function u2(e4) {
                var t4;
                e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
                  e5(t4);
                })).then(s2, a2);
              }
              u2((r2 = r2.apply(e3, [])).next());
            });
          };
          (v = g || (g = {})).Debounce = function(e3 = 250) {
            return function(t3, n3, r2) {
              let i2;
              return p2({ target: t3, key: n3, descriptor: r2 }, function(t4, n4) {
                clearTimeout(i2), i2 = window.setTimeout(() => {
                  clearTimeout(i2), t4.apply(this, n4);
                }, e3);
              });
            };
          }, v.Evt = function() {
            return (e3, t3) => {
              const n3 = { get() {
                return new y(this, void 0 !== t3 ? t3 : e3.key);
              }, enumerable: true, configurable: true };
              return void 0 !== t3 ? Object.defineProperty(e3, t3, n3) : { kind: "method", placement: "prototype", key: e3.key, descriptor: n3 };
            };
          }, v.Exec = function(e3, t3 = true) {
            return function(n3, r2, i2) {
              return p2({ target: n3, key: r2, descriptor: i2 }, function(n4, i3) {
                return function(e4, t4, n5, r3) {
                  return new (n5 || (n5 = Promise))(function(i4, o2) {
                    function s2(e5) {
                      try {
                        u2(r3.next(e5));
                      } catch (e6) {
                        o2(e6);
                      }
                    }
                    function a2(e5) {
                      try {
                        u2(r3.throw(e5));
                      } catch (e6) {
                        o2(e6);
                      }
                    }
                    function u2(e5) {
                      var t5;
                      e5.done ? i4(e5.value) : (t5 = e5.value, t5 instanceof n5 ? t5 : new n5(function(e6) {
                        e6(t5);
                      })).then(s2, a2);
                    }
                    u2((r3 = r3.apply(e4, [])).next());
                  });
                }(this, void 0, void 0, function* () {
                  const o2 = "_" + r2 + "_exec_flag";
                  if (t3 && this[o2]) return void console.log("PREVENTING DOUBLE EXECUTION");
                  const s2 = (t4) => {
                    if (this[o2] = t4, "function" == typeof e3) e3.call(this, { isExec: t4, ctx: this });
                    else {
                      const n5 = e3;
                      t4 ? n5.before && n5.before.call(this, this) : n5.after && n5.after.call(this, this);
                    }
                  };
                  s2(true);
                  const a2 = n4.apply(this, i3);
                  return a2 instanceof Promise ? a2.then(() => s2(false)).catch(() => s2(false)) : (console.warn("Must be async function to use [@Executing] decorator"), s2(false)), a2;
                });
              });
            };
          }, v.Handle = function(e3) {
            return function(t3, n3, r2) {
              return p2({ target: t3, key: n3, descriptor: r2 }, function(t4, r3, i2) {
                return m(this, void 0, void 0, function* () {
                  const o2 = this, s2 = (t5) => m(this, void 0, void 0, function* () {
                    t5.id && "string" == typeof t5.id && "yes" === t5.isErr || ("string" == typeof t5 || t5 instanceof Error ? t5 = new f.Message("system", t5) : (console.warn("Err must be 'string' or 'new Error()' instance"), t5 = new f.Message("system", "")));
                    const r4 = t5;
                    r4.ctx = o2;
                    const s3 = `Error] ${i2}.${n3} [${r4.id}]: ${r4.message}`;
                    if ("function" == typeof e3) {
                      const t6 = e3;
                      console.log("[Handled" + s3);
                      const n4 = t6.call(o2, r4);
                      n4 instanceof Promise && (yield n4);
                    } else {
                      const t6 = e3;
                      if (t6[r4.id]) {
                        console.log("[Handled" + s3);
                        const e4 = t6[r4.id].call(o2, r4);
                        e4 instanceof Promise && (yield e4);
                      } else if (t6.handle) {
                        console.log("[Handled" + s3);
                        const e4 = t6.handle.call(o2, r4);
                        e4 instanceof Promise && (yield e4);
                      } else console.warn("[Unhandled " + s3);
                      if (t6.fallback) {
                        const e4 = t6.fallback.call(o2, r4);
                        e4 instanceof Promise && (yield e4);
                      }
                    }
                  });
                  try {
                    const e4 = t4.apply(o2, r3);
                    return e4 instanceof Promise ? new Promise((t5) => {
                      e4.then(t5).catch((e5) => m(this, void 0, void 0, function* () {
                        yield s2(e5), t5(void 0);
                      }));
                    }) : e4;
                  } catch (e4) {
                    return void (yield s2(e4));
                  }
                });
              });
            };
          }, v.Once = function() {
            return function(e3, t3, n3) {
              return p2({ target: e3, key: t3, descriptor: n3 }, function(e4, n4) {
                const r2 = "_" + t3 + "_once_flag";
                if (!this[r2]) return this[r2] = true, e4.call(this, n4);
              });
            };
          }, v.Throttle = function(e3 = 1e3 / 60) {
            return function(t3, n3, r2) {
              let i2 = void 0, o2 = Date.now();
              return p2({ target: t3, key: n3, descriptor: r2 }, function(t4, n4) {
                const r3 = (...n5) => {
                  const s2 = Date.now();
                  window.clearTimeout(i2), !o2 || s2 - o2 >= e3 ? (o2 = s2, t4.apply(this, n5)) : i2 = window.setTimeout(() => r3(...n5), e3 - (s2 - o2));
                };
                r3(...n4);
              });
            };
          };
          class y {
            constructor(e3, t3) {
              this.target = e3, this.eventName = t3;
            }
            emit(e3, t3 = { bubbles: true, composed: true, cancelable: false }) {
              this.target.dispatchEvent(new CustomEvent(this.eventName, Object.assign({ detail: e3 }, t3)));
            }
          }
          var w = n2(3), b = n2.n(w), E = n2(4);
          function S(e3) {
            const t3 = b.a.create();
            return t3.accessToken = e3, t3.interceptors.request.use((e4) => {
              if (!e4.headers.Authorization && t3.accessToken && (e4.headers.Authorization = "Bearer " + t3.accessToken), !e4.headers.TrackingID) {
                const t4 = Object(E.v1)();
                e4.headers.TrackingID = `uuip_${t4}_1.0:1.0`;
              }
              return e4.headers["Content-Type"] || (e4.headers["Content-Type"] = "application/json"), e4;
            }), t3;
          }
          var k, O, T, C = n2(5), A = n2.n(C), I = n2(6), L = n2.n(I), R = n2(7), x = n2.n(R);
          (O = k || (k = {})).createService = (e3) => {
            const t3 = A.a.createInstance();
            {
              const n3 = e3 && e3.backend ? e3.backend : new L.a();
              t3.use(n3);
            }
            {
              const n3 = e3 && e3.languageDetector ? e3.languageDetector : new x.a();
              t3.use(n3);
            }
            return e3 && e3.logger && t3.use({ log: "log" in e3.logger ? e3.logger.log : e3.logger.info, warn: e3.logger.warn, error: e3.logger.error, type: "logger" }), t3;
          }, O.mergeServiceInitOptions = (...e3) => Object.assign.call(null, {}, ...e3), O.createMixin = (e3) => {
            const t3 = "i18n" in e3 ? e3.i18n : O.createService(), n3 = "i18nInitOptions" in e3 ? e3.i18nInitOptions : null;
            n3 || l.info("i18n mixin instance waiting service initialization outside...");
            let r2 = false;
            return (e4) => class extends e4 {
              constructor() {
                super(...arguments), this.onI18NInitialized = (e5) => this.requestUpdate(), this.onI18NLanguageChanged = (e5) => this.requestUpdate();
              }
              connectedCallback() {
                super.connectedCallback && super.connectedCallback(), t3.on("initialized", this.onI18NInitialized), t3.on("languageChanged", this.onI18NLanguageChanged), t3.isInitialized || r2 || !n3 || (r2 = true, t3.init(n3).finally(() => r2 = false));
              }
              disconnectedCallback() {
                t3.off("initialized", this.onI18NInitialized), t3.off("languageChanged", this.onI18NLanguageChanged), super.disconnectedCallback && super.disconnectedCallback();
              }
              t(...e5) {
                return t3.t(...e5);
              }
            };
          }, function(e3) {
            e3.DataController = class {
              constructor(e4) {
                this.localization = { closeButtonText: "Close" }, this.type = e4.type, this.text = e4.text, this.link = e4.link, this.linkName = e4.linkName, this.linkTooltip = e4.linkTooltip, this.iconDetail = e4.iconDetail, this.linkHandler = e4.linkHandler, this.clickHandler = e4.clickHandler, this.errorDetail = e4.errorDetail, this.taskId = e4.taskId, this.localization = e4.localization || this.localization, this.dismissHandler = e4.dismissHandler, this.actions = e4.actions, this.lineClamp = e4.lineClamp;
              }
            };
          }(T || (T = {}));
          var _, N, D = n2(2), M = n2.n(D);
          function P(e3 = {}) {
            const t3 = new _.Service();
            return t3.updateConfig(e3), t3;
          }
          !function(e3) {
            let t3, n3;
            !function(e4) {
              let t4, n4, r3;
              !function(e5) {
                e5.Info = "info", e5.Warn = "warn", e5.Error = "error", e5.Success = "success", e5.Chat = "chat", e5.Default = "default";
              }(t4 = e4.Type || (e4.Type = {})), e4.TYPES = Object.values(t4), function(e5) {
                e5.Silent = "silent", e5.AutoDismiss = "autodismiss", e5.Acknowledge = "acknowledge";
              }(n4 = e4.Mode || (e4.Mode = {})), e4.MODES = Object.values(n4), function(e5) {
                e5.Added = "added", e5.Pended = "pended", e5.Activated = "activated", e5.Deactivated = "deactivated", e5.Removed = "removed";
              }(r3 = e4.Status || (e4.Status = {})), e4.StatusWeight = { [r3.Added]: 0, [r3.Pended]: 1, [r3.Activated]: 2, [r3.Deactivated]: 3, [r3.Removed]: 4 }, e4.STATUSES = Object.values(r3), function(e5) {
                e5.User = "user_add";
              }(e4.AddEventReason || (e4.AddEventReason = {})), function(e5) {
                e5.ServiceAutoPropagate = "service_auto_propagate_pending", e5.ServiceAutoDismiss = "service_autodismiss_pending", e5.UserSilent = "user_silent_pending";
              }(e4.PendingEventReason || (e4.PendingEventReason = {})), function(e5) {
                e5.ServiceAutoPropagate = "service_auto_propagate_activate";
              }(e4.ActivateEventReason || (e4.ActivateEventReason = {})), function(e5) {
                e5.UserNegative = "user_negative_deactivate", e5.UserPositive = "user_positive_deactivate", e5.UserNeutral = "user_neutral_deactivate";
              }(e4.DeactivateEventReason || (e4.DeactivateEventReason = {})), function(e5) {
                e5.User = "user_remove";
              }(e4.RemoveEventReason || (e4.RemoveEventReason = {}));
            }(t3 = e3.ItemMeta || (e3.ItemMeta = {})), function(e4) {
              e4.STATUS_EVENTS = ["add", "pending", "activate", "deactivate", "remove"], e4.STATUS_EVENT_MAP = { add: t3.Status.Added, pending: t3.Status.Pended, activate: t3.Status.Activated, deactivate: t3.Status.Deactivated, remove: t3.Status.Removed }, e4.DISABLED_ITEM_MODE = { [t3.Mode.Silent]: false, [t3.Mode.AutoDismiss]: false, [t3.Mode.Acknowledge]: false }, e4.ACTIVATED_ITEM_MODE_LIMIT = { [t3.Mode.Silent]: 0, [t3.Mode.AutoDismiss]: 10, [t3.Mode.Acknowledge]: 1 }, e4.AUTO_DISMISS_TIMEOUT = 5e3;
            }(n3 = e3.ServiceMeta || (e3.ServiceMeta = {}));
            class r2 {
              constructor() {
                this.hubEmitter = i()();
              }
              emit(e4, ...t4) {
                this.hubEmitter.emit(e4, ...t4);
              }
              addEventListener(e4, t4) {
                this.hubEmitter.on(e4, t4);
              }
              addOnceEventListener(e4, t4) {
                this.hubEmitter.once(e4, t4);
              }
              removeEventListener(e4, t4) {
                this.hubEmitter.off(e4, t4);
              }
              removeAllEventListeners() {
                M()(this.hubEmitter);
              }
            }
            e3.Item = class {
              get status() {
                return this._status;
              }
              get reason() {
                return this._reason;
              }
              get mode() {
                return this._mode;
              }
              validateAuxOptions(e4) {
                let n4 = {};
                return e4 && void 0 !== e4.AUTO_DISMISS_TIMEOUT && this.mode === t3.Mode.AutoDismiss && (n4 = Object.assign(Object.assign({}, n4), { AUTO_DISMISS_TIMEOUT: e4.AUTO_DISMISS_TIMEOUT })), n4;
              }
              constructor(e4, n4) {
                this._serviceHubSubscriptions = [], this._itemEmitter = i()();
                const { type: r3, mode: s3, title: a3, data: u3, timestamp: c2 } = e4.data;
                this.type = r3, this.title = a3, this.data = u3, this._mode = s3, this.timestamp = c2 || (/* @__PURE__ */ new Date()).toISOString(), this.datetime = o.DateTime.fromISO(this.timestamp).toLocaleString(o.DateTime.DATETIME_SHORT_WITH_SECONDS), this.options = Object.freeze(this.validateAuxOptions(e4.options || {})), n4 && (this._serviceHubAdapter = n4, this._status = t3.Status.Added, this._reason = t3.AddEventReason.User, this.bindItemHubListeners());
              }
              bindItemHubListeners() {
                if (this._serviceHubAdapter) {
                  {
                    const e4 = (e5, n5, r3) => {
                      this.timestamp in e5 && (this._status = n5, this._reason = r3, n5 === t3.Status.Removed && (this.unbindItemHubListeners(), this.removeAllEventListeners()), this.emit("statusUpdate", n5, r3));
                    };
                    this._serviceHubAdapter.addEventListener("statusServiceUpdateResponse", e4);
                    const n4 = () => {
                      var t4;
                      null === (t4 = this._serviceHubAdapter) || void 0 === t4 || t4.removeEventListener("statusServiceUpdateResponse", e4);
                    };
                    this._serviceHubSubscriptions.push(n4);
                  }
                  {
                    const e4 = (e5, t5) => {
                      this.timestamp in e5 && (this._mode = t5, this.emit("modeUpdate", t5));
                    };
                    this._serviceHubAdapter.addEventListener("modeStatusUpdateResponse", e4);
                    const t4 = () => {
                      var t5;
                      null === (t5 = this._serviceHubAdapter) || void 0 === t5 || t5.removeEventListener("modeStatusUpdateResponse", e4);
                    };
                    this._serviceHubSubscriptions.push(t4);
                  }
                }
              }
              unbindItemHubListeners() {
                this._serviceHubSubscriptions && (this._serviceHubSubscriptions.forEach((e4) => e4()), this._serviceHubSubscriptions.length = 0);
              }
              deactivate(e4) {
                this._status && t3.StatusWeight[this._status] < t3.StatusWeight[t3.Status.Deactivated] ? this._serviceHubAdapter ? this._serviceHubAdapter.emit("statusServiceUpdateRequest", this, t3.Status.Deactivated, e4) : l.warn("Service hub adapter is not initialized for this notification item instance: ", this) : l.warn(`Notification should have "${t3.Status.Pended}" or "${t3.Status.Activated}" status to be able change status to "${t3.Status.Deactivated}".Current notification status is "${this._status}". Ignoring this change`);
              }
              pending() {
                this._status === t3.Status.Activated || this.mode !== t3.Mode.Silent ? this._serviceHubAdapter ? this._serviceHubAdapter.emit("statusServiceUpdateRequest", this, t3.Status.Pended, t3.PendingEventReason.UserSilent) : l.warn("Service hub adapter is not initialized for this notification item instance: ", this) : l.warn(`Notification should have "${t3.Status.Activated}" status or not "${t3.Mode.Silent}" mode, to be able change status to "${t3.Status.Pended}" and mode to "${t3.Mode.Silent}".Current notification status is "${this._status}" and mode is "${this.mode}". Ignoring this change`);
              }
              emit(e4, ...t4) {
                this._itemEmitter.emit(e4, ...t4);
              }
              addEventListener(e4, t4) {
                this._itemEmitter.on(e4, t4);
              }
              addOnceEventListener(e4, t4) {
                this._itemEmitter.once(e4, t4);
              }
              removeEventListener(e4, t4) {
                this._itemEmitter.off(e4, t4);
              }
              removeAllEventListeners() {
                M()(this._itemEmitter);
              }
            };
            const s2 = (e4, t4, n4 = () => 0) => [...e4, ...t4].sort(n4), a2 = (e4, t4) => e4.reduce((e5, n4) => (-1 === t4.indexOf(n4) && e5.push(n4), e5), []);
            class u2 {
              constructor() {
                this.emitter = i()(), this.map = {}, this.status = u2.createStatus(), this.serviceConfig = { DISABLED_ITEM_MODE: Object.assign({}, n3.DISABLED_ITEM_MODE), ACTIVATED_ITEM_MODE_LIMIT: Object.assign({}, n3.ACTIVATED_ITEM_MODE_LIMIT), AUTO_DISMISS_TIMEOUT: n3.AUTO_DISMISS_TIMEOUT }, this.activeAutoDismissTimeoutRefs = {}, this.serviceHubAdapter = new r2(), this.bindServiceHubEvents();
              }
              static mergeConfig(e4, ...t4) {
                if (!t4.length) return e4;
                const n4 = t4.shift(), r3 = (e5) => e5 && "object" == typeof e5 && !Array.isArray(e5);
                if (r3(e4) && r3(n4)) for (const t5 in n4) r3(n4[t5]) ? (e4[t5] || Object.assign(e4, { [t5]: {} }), this.mergeConfig(e4[t5], n4[t5])) : Object.assign(e4, { [t5]: n4[t5] });
                return this.mergeConfig(e4, ...t4);
              }
              static createStatus() {
                return { [t3.Status.Added]: this.createStatusHolderCollection(), [t3.Status.Pended]: this.createStatusHolderCollection(), [t3.Status.Activated]: this.createStatusHolderCollection(), [t3.Status.Deactivated]: this.createStatusHolderCollection(), [t3.Status.Removed]: this.createStatusHolderCollection() };
              }
              static createStatusHolderCollection() {
                return Object.assign([], Object.assign(Object.assign({ ids: [] }, this.createStatusHolderSubCollections(t3.MODES)), this.createStatusHolderSubCollections(t3.TYPES)));
              }
              static createStatusHolderSubCollections(e4) {
                return Object.assign({}, e4.reduce((e5, t4) => (e5[t4] = [], e5), {}));
              }
              updateNotificationsCollections() {
                const e4 = u2.createStatus();
                this.status.added.ids.forEach((n4) => {
                  const r3 = this.map[n4];
                  t3.STATUSES.forEach((t4) => {
                    -1 !== this.status[t4].ids.indexOf(r3.timestamp) && (e4[t4].push(r3), e4[t4].ids.push(n4), e4[t4][r3.mode].push(r3), e4[t4][r3.type].push(r3));
                  });
                }), this.status = e4;
              }
              setAutoDismiss(e4, n4 = () => {
              }) {
                this.prepareUpdateNotifications(e4).forEach((e5) => {
                  var r3;
                  if (e5.mode === t3.Mode.AutoDismiss) {
                    const t4 = () => n4(e5);
                    this.activeAutoDismissTimeoutRefs[e5.timestamp] = window.setTimeout(t4, null !== (r3 = e5.options.AUTO_DISMISS_TIMEOUT) && void 0 !== r3 ? r3 : this.serviceConfig.AUTO_DISMISS_TIMEOUT);
                  }
                });
              }
              removeAutoDismiss(e4, t4 = () => {
              }) {
                this.prepareUpdateNotifications(e4).forEach((e5) => {
                  e5.timestamp in this.activeAutoDismissTimeoutRefs && (t4(e5), window.clearTimeout(this.activeAutoDismissTimeoutRefs[e5.timestamp]), delete this.activeAutoDismissTimeoutRefs[e5.timestamp]);
                });
              }
              update(e4, t4, n4) {
                const r3 = Array.isArray(n4) ? n4 : [n4];
                if (r3.length) {
                  const n5 = r3.map((e5) => e5.timestamp);
                  switch (e4) {
                    case "add":
                      r3.forEach((e5) => this.map[e5.timestamp] = e5), this.status.added.ids = s2(this.status.added.ids, n5, u2.sortTimestampsFn);
                      break;
                    case "pending":
                      this.status.pended.ids = s2(this.status.pended.ids, n5, u2.sortTimestampsFn), this.status.activated.ids = a2(this.status.activated.ids, n5), this.status.deactivated.ids = a2(this.status.deactivated.ids, n5);
                      break;
                    case "activate":
                      this.status.pended.ids = a2(this.status.pended.ids, n5), this.status.activated.ids = s2(this.status.activated.ids, n5, u2.sortTimestampsFn), this.status.deactivated.ids = a2(this.status.deactivated.ids, n5);
                      break;
                    case "deactivate":
                      this.status.pended.ids = a2(this.status.pended.ids, n5), this.status.activated.ids = a2(this.status.activated.ids, n5), this.status.deactivated.ids = s2(this.status.deactivated.ids, n5, u2.sortTimestampsFn);
                      break;
                    case "remove":
                      this.status.pended.ids = a2(this.status.pended.ids, n5), this.status.activated.ids = a2(this.status.activated.ids, n5), this.status.deactivated.ids = a2(this.status.deactivated.ids, n5), this.status.added.ids = a2(this.status.added.ids, n5), this.status.removed.ids = s2(this.status.removed.ids, n5, u2.sortTimestampsFn), n5.forEach((e5) => delete this.map[e5]);
                  }
                  this.updateNotificationsCollections(), this.emit(e4, r3, t4), this.propagate(e4, t4, r3);
                }
              }
              propagate(e4, n4, r3) {
                const i2 = Array.isArray(r3) ? r3 : [r3];
                if (i2.length) switch (e4) {
                  case "add":
                    this.update("pending", t3.PendingEventReason.ServiceAutoPropagate, i2);
                    break;
                  case "pending":
                    i2.forEach((e5) => {
                      this.removeAutoDismiss(e5);
                    }), this.update("activate", t3.ActivateEventReason.ServiceAutoPropagate, this.prepareActiveCandidatesNotifications(this.status.pended));
                    break;
                  case "activate":
                    i2.forEach((e5) => {
                      this.setAutoDismiss(e5, (e6) => {
                        e6.mode === t3.Mode.AutoDismiss && this.serviceHubAdapter.emit("statusServiceUpdateRequest", e6, t3.Status.Pended, t3.PendingEventReason.ServiceAutoDismiss);
                      });
                    });
                    break;
                  case "deactivate":
                    i2.forEach((e5) => {
                      this.removeAutoDismiss(e5);
                    }), this.update("activate", t3.ActivateEventReason.ServiceAutoPropagate, this.prepareActiveCandidatesNotifications(this.status.pended));
                    break;
                  case "remove":
                    this.update("deactivate", t3.DeactivateEventReason.UserNegative, i2);
                }
              }
              prepareAddNotifications(t4) {
                const n4 = Object.keys(this.serviceConfig.DISABLED_ITEM_MODE).reduce((e4, t5) => (this.serviceConfig.DISABLED_ITEM_MODE[t5] || e4.push(t5), e4), []).map((e4) => `"${e4}"`).join(", ");
                return (Array.isArray(t4) ? t4 : [t4]).filter((e4) => !this.serviceConfig.DISABLED_ITEM_MODE[e4.data.mode] || (l.error(`Trying to .add(...) notification mode "${e4.data.mode}" that is disabled in this notifications service instance by configuration.Current configuration is: "${JSON.stringify(this.config)}"Only ${n4} allowed. Ignoring .add(${JSON.stringify(e4)}) notification...`), false)).map((t5) => new e3.Item(t5, this.serviceHubAdapter));
              }
              prepareUpdateNotifications(e4) {
                return (Array.isArray(e4) ? e4 : [e4]).reduce((e5, t4) => (t4.timestamp in this.map ? e5.push(t4) : l.error("Trying to handle untracked notification. Call .add(...) first...", JSON.stringify(t4)), e5), []);
              }
              prepareActiveCandidatesNotifications(e4) {
                const n4 = (Array.isArray(e4) ? e4 : [e4]).reduce((e5, t4) => (this.status.activated[t4.mode].length + e5[t4.mode].length < this.serviceConfig.ACTIVATED_ITEM_MODE_LIMIT[t4.mode] && e5[t4.mode].push(t4), e5), u2.createStatusHolderSubCollections(t3.MODES));
                return Object.values(n4).reduce((e5, t4) => e5.concat(t4), []);
              }
              static sortByTimestampsFn(e4, t4) {
                return u2.sortTimestampsFn(e4.timestamp, t4.timestamp);
              }
              get added() {
                return this.status.added;
              }
              get pended() {
                return this.status.pended;
              }
              get activated() {
                return this.status.activated;
              }
              get deactivated() {
                return this.status.deactivated;
              }
              getNotificationStatus(e4) {
                return Object.keys(this.status).filter((e5) => e5 !== t3.Status.Added).find((t4) => -1 !== this.status[t4].ids.indexOf(e4.timestamp));
              }
              get config() {
                return Object.freeze(this.serviceConfig);
              }
              static validateUpdateConfig(e4) {
                const r3 = e4;
                if (r3.ACTIVATED_ITEM_MODE_LIMIT && r3.ACTIVATED_ITEM_MODE_LIMIT.acknowledge > n3.ACTIVATED_ITEM_MODE_LIMIT.acknowledge) throw new Error(`
          Max ${t3.Mode.Acknowledge} limit is ${n3.ACTIVATED_ITEM_MODE_LIMIT.acknowledge}
        `);
                if (r3.DISABLED_ITEM_MODE) {
                  if (!Object.keys(r3.DISABLED_ITEM_MODE).reduce((e5, t4) => (r3.DISABLED_ITEM_MODE[t4] && e5++, e5), 0)) throw new Error("At least one notifications mode should be allowed in service instance");
                  Object.keys(r3.ACTIVATED_ITEM_MODE_LIMIT).forEach((e5) => {
                    e5 in r3.DISABLED_ITEM_MODE && r3.DISABLED_ITEM_MODE[e5] && l.warn(`Changing configuration limit count for mode "${e5}" won't have any effect, because this mode is disabled in notifications service instance`);
                  }), "AUTO_DISMISS_TIMEOUT" in r3 && r3.DISABLED_ITEM_MODE[t3.Mode.AutoDismiss] && l.warn(`Changing "AUTO_DISMISS_TIMEOUT" configuration option won't have any effect,because "${t3.Mode.AutoDismiss}" mode is disabled in notifications service instance`);
                }
                return true;
              }
              updateConfig(e4) {
                u2.validateUpdateConfig(e4) && (this.serviceConfig = u2.mergeConfig({}, this.serviceConfig, e4), l.info("Updated notifications service configuration: ", this.config));
              }
              add(e4) {
                const n4 = this.prepareAddNotifications(e4);
                return this.update("add", t3.AddEventReason.User, n4), n4;
              }
              pending(e4) {
                const n4 = this.prepareUpdateNotifications(e4);
                return this.serviceHubAdapter.emit("statusServiceUpdateRequest", n4, t3.Status.Pended, t3.PendingEventReason.UserSilent), n4;
              }
              deactivate(e4, n4) {
                const r3 = this.prepareUpdateNotifications(e4);
                return this.serviceHubAdapter.emit("statusServiceUpdateRequest", r3, t3.Status.Deactivated, n4), r3;
              }
              remove(e4) {
                const n4 = this.prepareUpdateNotifications(e4);
                return this.serviceHubAdapter.emit("statusServiceUpdateRequest", n4, t3.Status.Removed, t3.RemoveEventReason.User), n4;
              }
              pendingAllActivated() {
                return this.pending(this.status.activated);
              }
              pendingAll() {
                return this.pending([...this.status.pended, ...this.status.activated]);
              }
              deactivateAllActivated(e4) {
                return this.deactivate(this.status.activated, e4);
              }
              deactivateAll(e4) {
                return this.deactivate([...this.status.pended, ...this.status.activated], e4);
              }
              removeAllDeactivated() {
                return this.remove(this.status.deactivated);
              }
              removeAll() {
                return this.remove(this.status.added);
              }
              addEventListener(e4, t4) {
                this.emitter.on(e4, t4);
              }
              removeEventListener(e4, t4) {
                this.emitter.off(e4, t4);
              }
              addOnceEventListener(e4, t4) {
                this.emitter.once(e4, t4);
              }
              removeAllEventListeners() {
                M()(this.emitter);
              }
              emit(e4, ...t4) {
                this.emitter.emit(e4, ...t4);
              }
              bindServiceHubEvents() {
                this.serviceHubAdapter.addEventListener("statusServiceUpdateRequest", (e4, n4, r3) => {
                  const i2 = Array.isArray(e4) ? e4 : [e4], o2 = i2.reduce((e5, t4) => (e5[t4.timestamp] = this.getNotificationStatus(t4), e5), {});
                  {
                    const e5 = i2.filter((e6) => (o2[e6.timestamp] === t3.Status.Activated || e6.mode !== t3.Mode.Silent) && n4 === t3.Status.Pended);
                    {
                      const n5 = e5.filter((e6) => e6.mode !== t3.Mode.Silent);
                      n5.length && this.serviceHubAdapter.emit("modeStatusUpdateResponse", n5.reduce((e6, t4) => (e6[t4.timestamp] = t4, e6), {}), t3.Mode.Silent);
                    }
                    e5.length && this.update("pending", r3, e5);
                  }
                  {
                    const e5 = i2.filter((e6) => {
                      const r4 = o2[e6.timestamp];
                      return (r4 === t3.Status.Pended || r4 === t3.Status.Activated) && n4 === t3.Status.Deactivated;
                    });
                    e5.length && this.update("deactivate", r3, e5);
                  }
                  i2.filter((e5) => {
                    const r4 = o2[e5.timestamp];
                    return (r4 === t3.Status.Pended || r4 === t3.Status.Activated || r4 === t3.Status.Deactivated) && n4 === t3.Status.Removed;
                  }).length && this.update("remove", r3, e4);
                }), n3.STATUS_EVENTS.forEach((e4) => {
                  this.addEventListener(e4, (t4, r3) => {
                    const i2 = n3.STATUS_EVENT_MAP[e4], o2 = t4.reduce((e5, t5) => (e5[t5.timestamp] = t5, e5), {});
                    this.serviceHubAdapter.emit("statusServiceUpdateResponse", o2, i2, r3);
                  });
                });
              }
            }
            u2.sortTimestampsFn = (e4, t4) => e4 > t4 ? 1 : e4 < t4 ? -1 : 0, e3.Service = u2;
          }(_ || (_ = {})), function(e3) {
            class t3 {
              constructor() {
                this.listeners = [], this.listenersOnce = [], this.listen = (e4) => (this.listeners.push(e4), { stopListen: () => this.stopListen(e4) }), this.listenOnce = (e4) => (this.listenersOnce.push(e4), { stopListenOnce: () => this.stopListenOnce(e4) }), this.stopListen = (e4) => {
                  const t4 = this.listeners.indexOf(e4, 0);
                  return t4 > -1 && (this.listeners.splice(t4, 1), true);
                }, this.stopListenOnce = (e4) => {
                  const t4 = this.listenersOnce.indexOf(e4, 0);
                  return t4 > -1 && (this.listenersOnce.splice(t4, 1), true);
                }, this.stopListenAll = () => {
                  this.listeners = [], this.listenersOnce = [];
                }, this.send = (e4) => {
                  this.listeners.forEach((t4) => t4(e4)), this.listenersOnce.forEach((t4) => t4(e4)), this.listenersOnce = [];
                };
              }
            }
            class n3 {
              constructor() {
                this.listeners = [], this.listenersOnce = [], this.listen = (e4) => (this.listeners.push(e4), { stopListen: () => this.stopListen(e4) }), this.listenOnce = (e4) => (this.listenersOnce.push(e4), { stopListenOnce: () => this.stopListenOnce(e4) }), this.stopListen = (e4) => {
                  const t4 = this.listeners.indexOf(e4, 0);
                  return t4 > -1 && (this.listeners.splice(t4, 1), true);
                }, this.stopListenOnce = (e4) => {
                  const t4 = this.listenersOnce.indexOf(e4, 0);
                  return t4 > -1 && (this.listenersOnce.splice(t4, 1), true);
                }, this.stopListenAll = () => {
                  this.listeners = [], this.listenersOnce = [];
                }, this.send = () => {
                  this.listeners.forEach((e4) => e4()), this.listenersOnce.forEach((e4) => e4()), this.listenersOnce = [];
                };
              }
            }
            e3.create = new class {
              withData() {
                const e4 = new t3();
                return { signal: e4, send: e4.send, stopListenAll: e4.stopListenAll };
              }
              empty() {
                const e4 = new n3();
                return { signal: e4, send: e4.send, stopListenAll: e4.stopListenAll };
              }
            }();
          }(N || (N = {}));
          let j = null;
          const V = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, U = () => {
            if (null !== j) return j;
            const e3 = new Blob([`(()=>{"use strict";
const e=new Map,t=new Map,r=(e,t)=>
{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);
    return{expected:r+o,remainingDelay:o}},
    o=(e,t,r,i)=>{const s=performance.now();
        s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};
        addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;
        if("interval"===i)
        (t=>{const r=e.get(t);
        if(void 0===r)
        throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));
        clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});
        else{if("timeout"!==i)
        throw new Error('The given type "'.concat(i,'" is not supported'));
        (e=>{const r=t.get(e);if(void 0===r)
        throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));
        clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}
        else{if("set"!==s.method)
        throw new Error('The given method "'.concat(s.method,'" is not supported'));
        {const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;
        if("interval"===d)
        ((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);
        e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);
        else{if("timeout"!==d)
        throw new Error('The given type "'.concat(d,'" is not supported'));
        ((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);
        t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`], { type: "application/javascript; charset=utf-8" }), t3 = URL.createObjectURL(e3);
            return l.info("Worker url established", t3), j = ((e4) => {
              const t4 = /* @__PURE__ */ new Map([[0, () => {
              }]]), n3 = /* @__PURE__ */ new Map([[0, () => {
              }]]), r2 = /* @__PURE__ */ new Map(), i2 = new Worker(e4);
              l.info("worker created ", i2);
              const o2 = /* @__PURE__ */ new WeakMap();
              var s2;
              const a2 = /* @__PURE__ */ ((e5, t5) => (n4) => {
                const r3 = t5.get(n4);
                let i3 = void 0 === r3 ? n4.size : r3 < 1073741824 ? r3 + 1 : 0;
                if (!n4.has(i3)) return e5(n4, i3);
                if (n4.size < 536870912) {
                  for (; n4.has(i3); ) i3 = Math.floor(1073741824 * Math.random());
                  return e5(n4, i3);
                }
                if (n4.size > V) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
                for (; n4.has(i3); ) i3 = Math.floor(Math.random() * V);
                return e5(n4, i3);
              })((s2 = o2, (e5, t5) => (s2.set(e5, t5), t5)), o2);
              return i2.addEventListener("message", ({ data: e5 }) => {
                if (void 0 !== (i3 = e5).method && "call" === i3.method) {
                  const { params: { timerId: i4, timerType: o3 } } = e5;
                  if ("interval" === o3) {
                    const e6 = t4.get(i4);
                    if ("number" == typeof e6) {
                      const t5 = r2.get(e6);
                      if (void 0 === t5 || t5.timerId !== i4 || t5.timerType !== o3) throw new Error("The timer is in an undefined state.");
                    } else {
                      if (void 0 === e6) throw new Error("The timer is in an undefined state.");
                      e6();
                    }
                  } else if ("timeout" === o3) {
                    const e6 = n3.get(i4);
                    if ("number" == typeof e6) {
                      const t5 = r2.get(e6);
                      if (void 0 === t5 || t5.timerId !== i4 || t5.timerType !== o3) throw new Error("The timer is in an undefined state.");
                    } else {
                      if (void 0 === e6) throw new Error("The timer is in an undefined state.");
                      e6(), n3.delete(i4);
                    }
                  }
                } else if (((e6) => null === e6.error && "number" == typeof e6.id)(e5)) {
                  const { id: i4 } = e5, o3 = r2.get(i4);
                  if (void 0 === o3) throw new Error("The timer is in an undefined state.");
                  const { timerId: s3, timerType: a3 } = o3;
                  r2.delete(i4), "interval" === a3 ? t4.delete(s3) : n3.delete(s3);
                } else {
                  const { error: { message: t5 } } = e5;
                }
                var i3;
              }), { clearInterval: (e5) => {
                const n4 = a2(r2);
                r2.set(n4, { timerId: e5, timerType: "interval" }), t4.set(e5, n4), i2.postMessage({ id: n4, method: "clear", params: { timerId: e5, timerType: "interval" } });
              }, clearTimeout: (e5) => {
                const t5 = a2(r2);
                r2.set(t5, { timerId: e5, timerType: "timeout" }), n3.set(e5, t5), i2.postMessage({ id: t5, method: "clear", params: { timerId: e5, timerType: "timeout" } });
              }, setInterval: (e5, n4) => {
                const r3 = a2(t4);
                return t4.set(r3, () => {
                  e5(), "function" == typeof t4.get(r3) && i2.postMessage({ id: null, method: "set", params: { delay: n4, now: performance.now(), timerId: r3, timerType: "interval" } });
                }), i2.postMessage({ id: null, method: "set", params: { delay: n4, now: performance.now(), timerId: r3, timerType: "interval" } }), r3;
              }, setTimeout: (e5, t5) => {
                const r3 = a2(n3);
                return n3.set(r3, e5), i2.postMessage({ id: null, method: "set", params: { delay: t5, now: performance.now(), timerId: r3, timerType: "timeout" } }), r3;
              } };
            })(t3), j.setTimeout(() => URL.revokeObjectURL(t3), 0), j;
          }, q = (e3) => U().clearInterval(e3), F = (e3) => U().clearTimeout(e3), B = (e3, t3) => U().setInterval(e3, t3), z = (e3, t3) => U().setTimeout(e3, t3);
        }]);
      }, function(e, t, n) {
        function r(e2) {
          return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        n.d(t, "a", function() {
          return r;
        });
      }, function(e, t, n) {
        function r(e2, t2) {
          if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
        }
        n.d(t, "a", function() {
          return r;
        });
      }, function(e, t, n) {
        n.d(t, "a", function() {
          return o;
        });
        var r = n(13);
        function i(e2, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e2, Object(r.a)(i2.key), i2);
          }
        }
        function o(e2, t2, n2) {
          return t2 && i(e2.prototype, t2), n2 && i(e2, n2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
        }
      }, function(e, t, n) {
        (function(e2) {
          var r = n(0), i = n(1), o = n(12);
          function s(e3) {
            return r.a.isPlainObject(e3) || r.a.isArray(e3);
          }
          function a(e3) {
            return r.a.endsWith(e3, "[]") ? e3.slice(0, -2) : e3;
          }
          function u(e3, t2, n2) {
            return e3 ? e3.concat(t2).map(function(e4, t3) {
              return e4 = a(e4), !n2 && t3 ? "[" + e4 + "]" : e4;
            }).join(n2 ? "." : "") : t2;
          }
          const c = r.a.toFlatObject(r.a, {}, null, function(e3) {
            return /^is[A-Z]/.test(e3);
          });
          t.a = function(t2, n2, l) {
            if (!r.a.isObject(t2)) throw new TypeError("target must be an object");
            n2 = n2 || new (o.a || FormData)();
            const d = (l = r.a.toFlatObject(l, { metaTokens: true, dots: false, indexes: false }, false, function(e3, t3) {
              return !r.a.isUndefined(t3[e3]);
            })).metaTokens, f = l.visitor || m, h = l.dots, p2 = l.indexes, g = (l.Blob || "undefined" != typeof Blob && Blob) && r.a.isSpecCompliantForm(n2);
            if (!r.a.isFunction(f)) throw new TypeError("visitor must be a function");
            function v(t3) {
              if (null === t3) return "";
              if (r.a.isDate(t3)) return t3.toISOString();
              if (!g && r.a.isBlob(t3)) throw new i.a("Blob is not supported. Use a Buffer instead.");
              return r.a.isArrayBuffer(t3) || r.a.isTypedArray(t3) ? g && "function" == typeof Blob ? new Blob([t3]) : e2.from(t3) : t3;
            }
            function m(e3, t3, i2) {
              let o2 = e3;
              if (e3 && !i2 && "object" == typeof e3) {
                if (r.a.endsWith(t3, "{}")) t3 = d ? t3 : t3.slice(0, -2), e3 = JSON.stringify(e3);
                else if (r.a.isArray(e3) && function(e4) {
                  return r.a.isArray(e4) && !e4.some(s);
                }(e3) || (r.a.isFileList(e3) || r.a.endsWith(t3, "[]")) && (o2 = r.a.toArray(e3))) return t3 = a(t3), o2.forEach(function(e4, i3) {
                  !r.a.isUndefined(e4) && null !== e4 && n2.append(true === p2 ? u([t3], i3, h) : null === p2 ? t3 : t3 + "[]", v(e4));
                }), false;
              }
              return !!s(e3) || (n2.append(u(i2, t3, h), v(e3)), false);
            }
            const y = [], w = Object.assign(c, { defaultVisitor: m, convertValue: v, isVisitable: s });
            if (!r.a.isObject(t2)) throw new TypeError("data must be an object");
            return function e3(t3, i2) {
              if (!r.a.isUndefined(t3)) {
                if (-1 !== y.indexOf(t3)) throw Error("Circular reference detected in " + i2.join("."));
                y.push(t3), r.a.forEach(t3, function(t4, o2) {
                  true === (!(r.a.isUndefined(t4) || null === t4) && f.call(n2, t4, r.a.isString(o2) ? o2.trim() : o2, i2, w)) && e3(t4, i2 ? i2.concat(o2) : [o2]);
                }), y.pop();
              }
            }(t2), n2;
          };
        }).call(this, n(42).Buffer);
      }, function(e, t, n) {
        function r(e2) {
          return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        n.d(t, "a", function() {
          return a;
        }), n.d(t, "b", function() {
          return u;
        }), n.d(t, "c", function() {
          return c;
        });
        var i = [], o = i.forEach, s = i.slice;
        function a(e2) {
          return o.call(s.call(arguments, 1), function(t2) {
            if (t2) for (var n2 in t2) void 0 === e2[n2] && (e2[n2] = t2[n2]);
          }), e2;
        }
        function u() {
          return "function" == typeof XMLHttpRequest || "object" === ("undefined" == typeof XMLHttpRequest ? "undefined" : r(XMLHttpRequest));
        }
        function c(e2) {
          return function(e3) {
            return !!e3 && "function" == typeof e3.then;
          }(e2) ? e2 : Promise.resolve(e2);
        }
      }, function(e, t, n) {
        var r, i, o, s, a, u, c, l = n(19), d = n(36), f = Function.prototype.apply, h = Function.prototype.call, p2 = Object.create, g = Object.defineProperty, v = Object.defineProperties, m = Object.prototype.hasOwnProperty, y = { configurable: true, enumerable: false, writable: true };
        i = function(e2, t2) {
          var n2, i2;
          return d(t2), i2 = this, r.call(this, e2, n2 = function() {
            o.call(i2, e2, n2), f.call(t2, this, arguments);
          }), n2.__eeOnceListener__ = t2, this;
        }, a = { on: r = function(e2, t2) {
          var n2;
          return d(t2), m.call(this, "__ee__") ? n2 = this.__ee__ : (n2 = y.value = p2(null), g(this, "__ee__", y), y.value = null), n2[e2] ? "object" == typeof n2[e2] ? n2[e2].push(t2) : n2[e2] = [n2[e2], t2] : n2[e2] = t2, this;
        }, once: i, off: o = function(e2, t2) {
          var n2, r2, i2, o2;
          if (d(t2), !m.call(this, "__ee__")) return this;
          if (!(n2 = this.__ee__)[e2]) return this;
          if ("object" == typeof (r2 = n2[e2])) for (o2 = 0; i2 = r2[o2]; ++o2) i2 !== t2 && i2.__eeOnceListener__ !== t2 || (2 === r2.length ? n2[e2] = r2[o2 ? 0 : 1] : r2.splice(o2, 1));
          else r2 !== t2 && r2.__eeOnceListener__ !== t2 || delete n2[e2];
          return this;
        }, emit: s = function(e2) {
          var t2, n2, r2, i2, o2;
          if (m.call(this, "__ee__") && (i2 = this.__ee__[e2])) if ("object" == typeof i2) {
            for (n2 = arguments.length, o2 = new Array(n2 - 1), t2 = 1; t2 < n2; ++t2) o2[t2 - 1] = arguments[t2];
            for (i2 = i2.slice(), t2 = 0; r2 = i2[t2]; ++t2) f.call(r2, this, o2);
          } else switch (arguments.length) {
            case 1:
              h.call(i2, this);
              break;
            case 2:
              h.call(i2, this, arguments[1]);
              break;
            case 3:
              h.call(i2, this, arguments[1], arguments[2]);
              break;
            default:
              for (n2 = arguments.length, o2 = new Array(n2 - 1), t2 = 1; t2 < n2; ++t2) o2[t2 - 1] = arguments[t2];
              f.call(i2, this, o2);
          }
        } }, u = { on: l(r), once: l(i), off: l(o), emit: l(s) }, c = v({}, u), e.exports = t = function(e2) {
          return null == e2 ? p2(c) : v(Object(e2), u);
        }, t.methods = a;
      }, function(e, t) {
        var n;
        n = /* @__PURE__ */ function() {
          return this;
        }();
        try {
          n = n || new Function("return this")();
        } catch (e2) {
          "object" == typeof window && (n = window);
        }
        e.exports = n;
      }, function(e, t, n) {
        var r = n(30)();
        e.exports = function(e2) {
          return e2 !== r && null !== e2;
        };
      }, function(e, t, n) {
        function r(e2, t2) {
          return function() {
            return e2.apply(t2, arguments);
          };
        }
        n.d(t, "a", function() {
          return r;
        });
      }, function(e, t, n) {
        t.a = null;
      }, function(e, t, n) {
        n.d(t, "a", function() {
          return i;
        });
        var r = n(3);
        function i(e2) {
          var t2 = function(e3, t3) {
            if ("object" != Object(r.a)(e3) || !e3) return e3;
            var n2 = e3[Symbol.toPrimitive];
            if (void 0 !== n2) {
              var i2 = n2.call(e3, t3);
              if ("object" != Object(r.a)(i2)) return i2;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t3 ? String : Number)(e3);
          }(e2, "string");
          return "symbol" == Object(r.a)(t2) ? t2 : t2 + "";
        }
      }, function(e, t, n) {
        (function(r) {
          var i;
          if ("function" == typeof fetch && (i = void 0 !== r && r.fetch ? r.fetch : "undefined" != typeof window && window.fetch ? window.fetch : fetch), "undefined" == typeof window || void 0 === window.document) {
            var o = i || n(47);
            o.default && (o = o.default), t.default = o, e.exports = t.default;
          }
        }).call(this, n(9));
      }, function(e, t, n) {
        var r = n(38), i = Object.prototype.hasOwnProperty;
        e.exports = function(e2) {
          var t2, n2 = arguments[1];
          if (r(e2), void 0 === n2) i.call(e2, "__ee__") && delete e2.__ee__;
          else {
            if (!(t2 = i.call(e2, "__ee__") && e2.__ee__)) return;
            t2[n2] && delete t2[n2];
          }
        };
      }, function(e, t, n) {
        e.exports = function(e2) {
          return null != e2;
        };
      }, function(e, t) {
        var n, r, i = e.exports = {};
        function o() {
          throw new Error("setTimeout has not been defined");
        }
        function s() {
          throw new Error("clearTimeout has not been defined");
        }
        function a(e2) {
          if (n === setTimeout) return setTimeout(e2, 0);
          if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e2, 0);
          try {
            return n(e2, 0);
          } catch (t2) {
            try {
              return n.call(null, e2, 0);
            } catch (t3) {
              return n.call(this, e2, 0);
            }
          }
        }
        !function() {
          try {
            n = "function" == typeof setTimeout ? setTimeout : o;
          } catch (e2) {
            n = o;
          }
          try {
            r = "function" == typeof clearTimeout ? clearTimeout : s;
          } catch (e2) {
            r = s;
          }
        }();
        var u, c = [], l = false, d = -1;
        function f() {
          l && u && (l = false, u.length ? c = u.concat(c) : d = -1, c.length && h());
        }
        function h() {
          if (!l) {
            var e2 = a(f);
            l = true;
            for (var t2 = c.length; t2; ) {
              for (u = c, c = []; ++d < t2; ) u && u[d].run();
              d = -1, t2 = c.length;
            }
            u = null, l = false, function(e3) {
              if (r === clearTimeout) return clearTimeout(e3);
              if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e3);
              try {
                r(e3);
              } catch (t3) {
                try {
                  return r.call(null, e3);
                } catch (t4) {
                  return r.call(this, e3);
                }
              }
            }(e2);
          }
        }
        function p2(e2, t2) {
          this.fun = e2, this.array = t2;
        }
        function g() {
        }
        i.nextTick = function(e2) {
          var t2 = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var n2 = 1; n2 < arguments.length; n2++) t2[n2 - 1] = arguments[n2];
          c.push(new p2(e2, t2)), 1 !== c.length || l || a(h);
        }, p2.prototype.run = function() {
          this.fun.apply(null, this.array);
        }, i.title = "browser", i.browser = true, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function(e2) {
          return [];
        }, i.binding = function(e2) {
          throw new Error("process.binding is not supported");
        }, i.cwd = function() {
          return "/";
        }, i.chdir = function(e2) {
          throw new Error("process.chdir is not supported");
        }, i.umask = function() {
          return 0;
        };
      }, function(e, t, n) {
        (function(e2) {
          var r, i, o, s = n(7), a = n(14), u = n.n(a);
          function c(e3) {
            return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
              return typeof e4;
            } : function(e4) {
              return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
            })(e3);
          }
          "function" == typeof fetch && (r = void 0 !== e2 && e2.fetch ? e2.fetch : "undefined" != typeof window && window.fetch ? window.fetch : fetch), Object(s.b)() && (void 0 !== e2 && e2.XMLHttpRequest ? i = e2.XMLHttpRequest : "undefined" != typeof window && window.XMLHttpRequest && (i = window.XMLHttpRequest)), "function" == typeof ActiveXObject && (void 0 !== e2 && e2.ActiveXObject ? o = e2.ActiveXObject : "undefined" != typeof window && window.ActiveXObject && (o = window.ActiveXObject)), r || !a || i || o || (r = u.a || a), "function" != typeof r && (r = void 0);
          var l = function(e3, t2) {
            if (t2 && "object" === c(t2)) {
              var n2 = "";
              for (var r2 in t2) n2 += "&" + encodeURIComponent(r2) + "=" + encodeURIComponent(t2[r2]);
              if (!n2) return e3;
              e3 = e3 + (-1 !== e3.indexOf("?") ? "&" : "?") + n2.slice(1);
            }
            return e3;
          }, d = function(e3, t2, n2) {
            r(e3, t2).then(function(e4) {
              if (!e4.ok) return n2(e4.statusText || "Error", { status: e4.status });
              e4.text().then(function(t3) {
                n2(null, { status: e4.status, data: t3 });
              }).catch(n2);
            }).catch(n2);
          }, f = false;
          t.a = function(e3, t2, n2, a2) {
            return "function" == typeof n2 && (a2 = n2, n2 = void 0), a2 = a2 || function() {
            }, r ? function(e4, t3, n3, r2) {
              e4.queryStringParams && (t3 = l(t3, e4.queryStringParams));
              var i2 = Object(s.a)({}, "function" == typeof e4.customHeaders ? e4.customHeaders() : e4.customHeaders);
              n3 && (i2["Content-Type"] = "application/json");
              var o2 = "function" == typeof e4.requestOptions ? e4.requestOptions(n3) : e4.requestOptions, a3 = Object(s.a)({ method: n3 ? "POST" : "GET", body: n3 ? e4.stringify(n3) : void 0, headers: i2 }, f ? {} : o2);
              try {
                d(t3, a3, r2);
              } catch (e5) {
                if (!o2 || 0 === Object.keys(o2).length || !e5.message || e5.message.indexOf("not implemented") < 0) return r2(e5);
                try {
                  Object.keys(o2).forEach(function(e6) {
                    delete a3[e6];
                  }), d(t3, a3, r2), f = true;
                } catch (e6) {
                  r2(e6);
                }
              }
            }(e3, t2, n2, a2) : Object(s.b)() || "function" == typeof ActiveXObject ? function(e4, t3, n3, r2) {
              n3 && "object" === c(n3) && (n3 = l("", n3).slice(1)), e4.queryStringParams && (t3 = l(t3, e4.queryStringParams));
              try {
                var s2;
                (s2 = i ? new i() : new o("MSXML2.XMLHTTP.3.0")).open(n3 ? "POST" : "GET", t3, 1), e4.crossDomain || s2.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s2.withCredentials = !!e4.withCredentials, n3 && s2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s2.overrideMimeType && s2.overrideMimeType("application/json");
                var a3 = e4.customHeaders;
                if (a3 = "function" == typeof a3 ? a3() : a3) for (var u2 in a3) s2.setRequestHeader(u2, a3[u2]);
                s2.onreadystatechange = function() {
                  s2.readyState > 3 && r2(s2.status >= 400 ? s2.statusText : null, { status: s2.status, data: s2.responseText });
                }, s2.send(n3);
              } catch (e5) {
                console && console.log(e5);
              }
            }(e3, t2, n2, a2) : void a2(new Error("No fetch and no xhr implementation found!"));
          };
        }).call(this, n(9));
      }, function(e, t, n) {
        var r = n(16), i = n(20), o = n(24), s = n(32), a = n(33);
        (e.exports = function(e2, t2) {
          var n2, i2, u, c, l;
          return arguments.length < 2 || "string" != typeof e2 ? (c = t2, t2 = e2, e2 = null) : c = arguments[2], r(e2) ? (n2 = a.call(e2, "c"), i2 = a.call(e2, "e"), u = a.call(e2, "w")) : (n2 = u = true, i2 = false), l = { value: t2, configurable: n2, enumerable: i2, writable: u }, c ? o(s(c), l) : l;
        }).gs = function(e2, t2, n2) {
          var u, c, l, d;
          return "string" != typeof e2 ? (l = n2, n2 = t2, t2 = e2, e2 = null) : l = arguments[3], r(t2) ? i(t2) ? r(n2) ? i(n2) || (l = n2, n2 = void 0) : n2 = void 0 : (l = t2, t2 = n2 = void 0) : t2 = void 0, r(e2) ? (u = a.call(e2, "c"), c = a.call(e2, "e")) : (u = true, c = false), d = { get: t2, set: n2, configurable: u, enumerable: c }, l ? o(s(l), d) : d;
        };
      }, function(e, t, n) {
        var r = n(21), i = /^\s*class[\s{/}]/, o = Function.prototype.toString;
        e.exports = function(e2) {
          return !!r(e2) && !i.test(o.call(e2));
        };
      }, function(e, t, n) {
        var r = n(22);
        e.exports = function(e2) {
          if ("function" != typeof e2) return false;
          if (!hasOwnProperty.call(e2, "length")) return false;
          try {
            if ("number" != typeof e2.length) return false;
            if ("function" != typeof e2.call) return false;
            if ("function" != typeof e2.apply) return false;
          } catch (e3) {
            return false;
          }
          return !r(e2);
        };
      }, function(e, t, n) {
        var r = n(23);
        e.exports = function(e2) {
          if (!r(e2)) return false;
          try {
            return !!e2.constructor && e2.constructor.prototype === e2;
          } catch (e3) {
            return false;
          }
        };
      }, function(e, t, n) {
        var r = n(16), i = { object: true, function: true, undefined: true };
        e.exports = function(e2) {
          return !!r(e2) && hasOwnProperty.call(i, typeof e2);
        };
      }, function(e, t, n) {
        e.exports = n(25)() ? Object.assign : n(26);
      }, function(e, t, n) {
        e.exports = function() {
          var e2, t2 = Object.assign;
          return "function" == typeof t2 && (t2(e2 = { foo: "raz" }, { bar: "dwa" }, { trzy: "trzy" }), e2.foo + e2.bar + e2.trzy === "razdwatrzy");
        };
      }, function(e, t, n) {
        var r = n(27), i = n(31), o = Math.max;
        e.exports = function(e2, t2) {
          var n2, s, a, u = o(arguments.length, 2);
          for (e2 = Object(i(e2)), a = function(r2) {
            try {
              e2[r2] = t2[r2];
            } catch (e3) {
              n2 || (n2 = e3);
            }
          }, s = 1; s < u; ++s) r(t2 = arguments[s]).forEach(a);
          if (void 0 !== n2) throw n2;
          return e2;
        };
      }, function(e, t, n) {
        e.exports = n(28)() ? Object.keys : n(29);
      }, function(e, t, n) {
        e.exports = function() {
          try {
            return Object.keys("primitive"), true;
          } catch (e2) {
            return false;
          }
        };
      }, function(e, t, n) {
        var r = n(10), i = Object.keys;
        e.exports = function(e2) {
          return i(r(e2) ? Object(e2) : e2);
        };
      }, function(e, t, n) {
        e.exports = function() {
        };
      }, function(e, t, n) {
        var r = n(10);
        e.exports = function(e2) {
          if (!r(e2)) throw new TypeError("Cannot use null or undefined");
          return e2;
        };
      }, function(e, t, n) {
        var r = n(10), i = Array.prototype.forEach, o = Object.create, s = function(e2, t2) {
          var n2;
          for (n2 in e2) t2[n2] = e2[n2];
        };
        e.exports = function(e2) {
          var t2 = o(null);
          return i.call(arguments, function(e3) {
            r(e3) && s(Object(e3), t2);
          }), t2;
        };
      }, function(e, t, n) {
        e.exports = n(34)() ? String.prototype.contains : n(35);
      }, function(e, t, n) {
        var r = "razdwatrzy";
        e.exports = function() {
          return "function" == typeof r.contains && (true === r.contains("dwa") && false === r.contains("foo"));
        };
      }, function(e, t, n) {
        var r = String.prototype.indexOf;
        e.exports = function(e2) {
          return r.call(this, e2, arguments[1]) > -1;
        };
      }, function(e, t, n) {
        e.exports = function(e2) {
          if ("function" != typeof e2) throw new TypeError(e2 + " is not a function");
          return e2;
        };
      }, function(e, t, n) {
        function r(e2, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
          }
        }
        function i(e2, t2, n2) {
          return t2 && r(e2.prototype, t2), n2 && r(e2, n2), e2;
        }
        function o(e2, t2) {
          e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, e2.__proto__ = t2;
        }
        function s(e2) {
          return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function(e3) {
            return e3.__proto__ || Object.getPrototypeOf(e3);
          })(e2);
        }
        function a(e2, t2) {
          return (a = Object.setPrototypeOf || function(e3, t3) {
            return e3.__proto__ = t3, e3;
          })(e2, t2);
        }
        function u() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" == typeof Proxy) return true;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), true;
          } catch (e2) {
            return false;
          }
        }
        function c(e2, t2, n2) {
          return (c = u() ? Reflect.construct : function(e3, t3, n3) {
            var r2 = [null];
            r2.push.apply(r2, t3);
            var i2 = new (Function.bind.apply(e3, r2))();
            return n3 && a(i2, n3.prototype), i2;
          }).apply(null, arguments);
        }
        function l(e2) {
          var t2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return (l = function(e3) {
            if (null === e3 || (n2 = e3, -1 === Function.toString.call(n2).indexOf("[native code]"))) return e3;
            var n2;
            if ("function" != typeof e3) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t2) {
              if (t2.has(e3)) return t2.get(e3);
              t2.set(e3, r2);
            }
            function r2() {
              return c(e3, arguments, s(this).constructor);
            }
            return r2.prototype = Object.create(e3.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }), a(r2, e3);
          })(e2);
        }
        function d(e2, t2) {
          (null == t2 || t2 > e2.length) && (t2 = e2.length);
          for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++) r2[n2] = e2[n2];
          return r2;
        }
        function f(e2) {
          var t2 = 0;
          if ("undefined" == typeof Symbol || null == e2[Symbol.iterator]) {
            if (Array.isArray(e2) || (e2 = function(e3, t3) {
              if (e3) {
                if ("string" == typeof e3) return d(e3, t3);
                var n2 = Object.prototype.toString.call(e3).slice(8, -1);
                return "Object" === n2 && e3.constructor && (n2 = e3.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(n2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? d(e3, t3) : void 0;
              }
            }(e2))) return function() {
              return t2 >= e2.length ? { done: true } : { done: false, value: e2[t2++] };
            };
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          return (t2 = e2[Symbol.iterator]()).next.bind(t2);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var h = function(e2) {
          function t2() {
            return e2.apply(this, arguments) || this;
          }
          return o(t2, e2), t2;
        }(l(Error)), p2 = function(e2) {
          function t2(t3) {
            return e2.call(this, "Invalid DateTime: " + t3.toMessage()) || this;
          }
          return o(t2, e2), t2;
        }(h), g = function(e2) {
          function t2(t3) {
            return e2.call(this, "Invalid Interval: " + t3.toMessage()) || this;
          }
          return o(t2, e2), t2;
        }(h), v = function(e2) {
          function t2(t3) {
            return e2.call(this, "Invalid Duration: " + t3.toMessage()) || this;
          }
          return o(t2, e2), t2;
        }(h), m = function(e2) {
          function t2() {
            return e2.apply(this, arguments) || this;
          }
          return o(t2, e2), t2;
        }(h), y = function(e2) {
          function t2(t3) {
            return e2.call(this, "Invalid unit " + t3) || this;
          }
          return o(t2, e2), t2;
        }(h), w = function(e2) {
          function t2() {
            return e2.apply(this, arguments) || this;
          }
          return o(t2, e2), t2;
        }(h), b = function(e2) {
          function t2() {
            return e2.call(this, "Zone is an abstract class") || this;
          }
          return o(t2, e2), t2;
        }(h), E = "numeric", S = "short", k = "long", O = { year: E, month: E, day: E }, T = { year: E, month: S, day: E }, C = { year: E, month: S, day: E, weekday: S }, A = { year: E, month: k, day: E }, I = { year: E, month: k, day: E, weekday: k }, L = { hour: E, minute: E }, R = { hour: E, minute: E, second: E }, x = { hour: E, minute: E, second: E, timeZoneName: S }, _ = { hour: E, minute: E, second: E, timeZoneName: k }, N = { hour: E, minute: E, hour12: false }, D = { hour: E, minute: E, second: E, hour12: false }, M = { hour: E, minute: E, second: E, hour12: false, timeZoneName: S }, P = { hour: E, minute: E, second: E, hour12: false, timeZoneName: k }, j = { year: E, month: E, day: E, hour: E, minute: E }, V = { year: E, month: E, day: E, hour: E, minute: E, second: E }, U = { year: E, month: S, day: E, hour: E, minute: E }, q = { year: E, month: S, day: E, hour: E, minute: E, second: E }, F = { year: E, month: S, day: E, weekday: S, hour: E, minute: E }, B = { year: E, month: k, day: E, hour: E, minute: E, timeZoneName: S }, z = { year: E, month: k, day: E, hour: E, minute: E, second: E, timeZoneName: S }, H = { year: E, month: k, day: E, weekday: k, hour: E, minute: E, timeZoneName: k }, J = { year: E, month: k, day: E, weekday: k, hour: E, minute: E, second: E, timeZoneName: k };
        function Z(e2) {
          return void 0 === e2;
        }
        function W(e2) {
          return "number" == typeof e2;
        }
        function G(e2) {
          return "number" == typeof e2 && e2 % 1 == 0;
        }
        function Y() {
          try {
            return "undefined" != typeof Intl && Intl.DateTimeFormat;
          } catch (e2) {
            return false;
          }
        }
        function $() {
          return !Z(Intl.DateTimeFormat.prototype.formatToParts);
        }
        function K() {
          try {
            return "undefined" != typeof Intl && !!Intl.RelativeTimeFormat;
          } catch (e2) {
            return false;
          }
        }
        function X(e2, t2, n2) {
          if (0 !== e2.length) return e2.reduce(function(e3, r2) {
            var i2 = [t2(r2), r2];
            return e3 && n2(e3[0], i2[0]) === e3[0] ? e3 : i2;
          }, null)[1];
        }
        function Q(e2, t2) {
          return t2.reduce(function(t3, n2) {
            return t3[n2] = e2[n2], t3;
          }, {});
        }
        function ee(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }
        function te(e2, t2, n2) {
          return G(e2) && e2 >= t2 && e2 <= n2;
        }
        function ne(e2, t2) {
          void 0 === t2 && (t2 = 2);
          var n2 = e2 < 0 ? "-" : "", r2 = n2 ? -1 * e2 : e2;
          return "" + n2 + (r2.toString().length < t2 ? ("0".repeat(t2) + r2).slice(-t2) : r2.toString());
        }
        function re(e2) {
          return Z(e2) || null === e2 || "" === e2 ? void 0 : parseInt(e2, 10);
        }
        function ie(e2) {
          if (!Z(e2) && null !== e2 && "" !== e2) {
            var t2 = 1e3 * parseFloat("0." + e2);
            return Math.floor(t2);
          }
        }
        function oe(e2, t2, n2) {
          void 0 === n2 && (n2 = false);
          var r2 = Math.pow(10, t2);
          return (n2 ? Math.trunc : Math.round)(e2 * r2) / r2;
        }
        function se(e2) {
          return e2 % 4 == 0 && (e2 % 100 != 0 || e2 % 400 == 0);
        }
        function ae(e2) {
          return se(e2) ? 366 : 365;
        }
        function ue(e2, t2) {
          var n2 = function(e3, t3) {
            return e3 - t3 * Math.floor(e3 / t3);
          }(t2 - 1, 12) + 1;
          return 2 === n2 ? se(e2 + (t2 - n2) / 12) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n2 - 1];
        }
        function ce(e2) {
          var t2 = Date.UTC(e2.year, e2.month - 1, e2.day, e2.hour, e2.minute, e2.second, e2.millisecond);
          return e2.year < 100 && e2.year >= 0 && (t2 = new Date(t2)).setUTCFullYear(t2.getUTCFullYear() - 1900), +t2;
        }
        function le(e2) {
          var t2 = (e2 + Math.floor(e2 / 4) - Math.floor(e2 / 100) + Math.floor(e2 / 400)) % 7, n2 = e2 - 1, r2 = (n2 + Math.floor(n2 / 4) - Math.floor(n2 / 100) + Math.floor(n2 / 400)) % 7;
          return 4 === t2 || 3 === r2 ? 53 : 52;
        }
        function de(e2) {
          return e2 > 99 ? e2 : e2 > 60 ? 1900 + e2 : 2e3 + e2;
        }
        function fe(e2, t2, n2, r2) {
          void 0 === r2 && (r2 = null);
          var i2 = new Date(e2), o2 = { hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
          r2 && (o2.timeZone = r2);
          var s2 = Object.assign({ timeZoneName: t2 }, o2), a2 = Y();
          if (a2 && $()) {
            var u2 = new Intl.DateTimeFormat(n2, s2).formatToParts(i2).find(function(e3) {
              return "timezonename" === e3.type.toLowerCase();
            });
            return u2 ? u2.value : null;
          }
          if (a2) {
            var c2 = new Intl.DateTimeFormat(n2, o2).format(i2);
            return new Intl.DateTimeFormat(n2, s2).format(i2).substring(c2.length).replace(/^[, \u200e]+/, "");
          }
          return null;
        }
        function he(e2, t2) {
          var n2 = parseInt(e2, 10);
          Number.isNaN(n2) && (n2 = 0);
          var r2 = parseInt(t2, 10) || 0;
          return 60 * n2 + (n2 < 0 || Object.is(n2, -0) ? -r2 : r2);
        }
        function pe(e2) {
          var t2 = Number(e2);
          if ("boolean" == typeof e2 || "" === e2 || Number.isNaN(t2)) throw new w("Invalid unit value " + e2);
          return t2;
        }
        function ge(e2, t2, n2) {
          var r2 = {};
          for (var i2 in e2) if (ee(e2, i2)) {
            if (n2.indexOf(i2) >= 0) continue;
            var o2 = e2[i2];
            if (null == o2) continue;
            r2[t2(i2)] = pe(o2);
          }
          return r2;
        }
        function ve(e2, t2) {
          var n2 = Math.trunc(Math.abs(e2 / 60)), r2 = Math.trunc(Math.abs(e2 % 60)), i2 = e2 >= 0 ? "+" : "-";
          switch (t2) {
            case "short":
              return "" + i2 + ne(n2, 2) + ":" + ne(r2, 2);
            case "narrow":
              return "" + i2 + n2 + (r2 > 0 ? ":" + r2 : "");
            case "techie":
              return "" + i2 + ne(n2, 2) + ne(r2, 2);
            default:
              throw new RangeError("Value format " + t2 + " is out of range for property format");
          }
        }
        function me(e2) {
          return Q(e2, ["hour", "minute", "second", "millisecond"]);
        }
        var ye = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;
        function we(e2) {
          return JSON.stringify(e2, Object.keys(e2).sort());
        }
        var be = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Ee = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Se = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        function ke(e2) {
          switch (e2) {
            case "narrow":
              return [].concat(Se);
            case "short":
              return [].concat(Ee);
            case "long":
              return [].concat(be);
            case "numeric":
              return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            case "2-digit":
              return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            default:
              return null;
          }
        }
        var Oe = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], Te = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], Ce = ["M", "T", "W", "T", "F", "S", "S"];
        function Ae(e2) {
          switch (e2) {
            case "narrow":
              return [].concat(Ce);
            case "short":
              return [].concat(Te);
            case "long":
              return [].concat(Oe);
            case "numeric":
              return ["1", "2", "3", "4", "5", "6", "7"];
            default:
              return null;
          }
        }
        var Ie = ["AM", "PM"], Le = ["Before Christ", "Anno Domini"], Re = ["BC", "AD"], xe = ["B", "A"];
        function _e(e2) {
          switch (e2) {
            case "narrow":
              return [].concat(xe);
            case "short":
              return [].concat(Re);
            case "long":
              return [].concat(Le);
            default:
              return null;
          }
        }
        function Ne(e2, t2) {
          for (var n2, r2 = "", i2 = f(e2); !(n2 = i2()).done; ) {
            var o2 = n2.value;
            o2.literal ? r2 += o2.val : r2 += t2(o2.val);
          }
          return r2;
        }
        var De = { D: O, DD: T, DDD: A, DDDD: I, t: L, tt: R, ttt: x, tttt: _, T: N, TT: D, TTT: M, TTTT: P, f: j, ff: U, fff: B, ffff: H, F: V, FF: q, FFF: z, FFFF: J }, Me = function() {
          function e2(e3, t3) {
            this.opts = t3, this.loc = e3, this.systemLoc = null;
          }
          e2.create = function(t3, n2) {
            return void 0 === n2 && (n2 = {}), new e2(t3, n2);
          }, e2.parseFormat = function(e3) {
            for (var t3 = null, n2 = "", r2 = false, i2 = [], o2 = 0; o2 < e3.length; o2++) {
              var s2 = e3.charAt(o2);
              "'" === s2 ? (n2.length > 0 && i2.push({ literal: r2, val: n2 }), t3 = null, n2 = "", r2 = !r2) : r2 || s2 === t3 ? n2 += s2 : (n2.length > 0 && i2.push({ literal: false, val: n2 }), n2 = s2, t3 = s2);
            }
            return n2.length > 0 && i2.push({ literal: r2, val: n2 }), i2;
          }, e2.macroTokenToFormatOpts = function(e3) {
            return De[e3];
          };
          var t2 = e2.prototype;
          return t2.formatWithSystemDefault = function(e3, t3) {
            return null === this.systemLoc && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e3, Object.assign({}, this.opts, t3)).format();
          }, t2.formatDateTime = function(e3, t3) {
            return void 0 === t3 && (t3 = {}), this.loc.dtFormatter(e3, Object.assign({}, this.opts, t3)).format();
          }, t2.formatDateTimeParts = function(e3, t3) {
            return void 0 === t3 && (t3 = {}), this.loc.dtFormatter(e3, Object.assign({}, this.opts, t3)).formatToParts();
          }, t2.resolvedOptions = function(e3, t3) {
            return void 0 === t3 && (t3 = {}), this.loc.dtFormatter(e3, Object.assign({}, this.opts, t3)).resolvedOptions();
          }, t2.num = function(e3, t3) {
            if (void 0 === t3 && (t3 = 0), this.opts.forceSimple) return ne(e3, t3);
            var n2 = Object.assign({}, this.opts);
            return t3 > 0 && (n2.padTo = t3), this.loc.numberFormatter(n2).format(e3);
          }, t2.formatDateTimeFromString = function(t3, n2) {
            var r2 = this, i2 = "en" === this.loc.listingMode(), o2 = this.loc.outputCalendar && "gregory" !== this.loc.outputCalendar && $(), s2 = function(e3, n3) {
              return r2.loc.extract(t3, e3, n3);
            }, a2 = function(e3) {
              return t3.isOffsetFixed && 0 === t3.offset && e3.allowZ ? "Z" : t3.isValid ? t3.zone.formatOffset(t3.ts, e3.format) : "";
            }, u2 = function() {
              return i2 ? function(e3) {
                return Ie[e3.hour < 12 ? 0 : 1];
              }(t3) : s2({ hour: "numeric", hour12: true }, "dayperiod");
            }, c2 = function(e3, n3) {
              return i2 ? function(e4, t4) {
                return ke(t4)[e4.month - 1];
              }(t3, e3) : s2(n3 ? { month: e3 } : { month: e3, day: "numeric" }, "month");
            }, l2 = function(e3, n3) {
              return i2 ? function(e4, t4) {
                return Ae(t4)[e4.weekday - 1];
              }(t3, e3) : s2(n3 ? { weekday: e3 } : { weekday: e3, month: "long", day: "numeric" }, "weekday");
            }, d2 = function(e3) {
              return i2 ? function(e4, t4) {
                return _e(t4)[e4.year < 0 ? 0 : 1];
              }(t3, e3) : s2({ era: e3 }, "era");
            };
            return Ne(e2.parseFormat(n2), function(n3) {
              switch (n3) {
                case "S":
                  return r2.num(t3.millisecond);
                case "u":
                case "SSS":
                  return r2.num(t3.millisecond, 3);
                case "s":
                  return r2.num(t3.second);
                case "ss":
                  return r2.num(t3.second, 2);
                case "m":
                  return r2.num(t3.minute);
                case "mm":
                  return r2.num(t3.minute, 2);
                case "h":
                  return r2.num(t3.hour % 12 == 0 ? 12 : t3.hour % 12);
                case "hh":
                  return r2.num(t3.hour % 12 == 0 ? 12 : t3.hour % 12, 2);
                case "H":
                  return r2.num(t3.hour);
                case "HH":
                  return r2.num(t3.hour, 2);
                case "Z":
                  return a2({ format: "narrow", allowZ: r2.opts.allowZ });
                case "ZZ":
                  return a2({ format: "short", allowZ: r2.opts.allowZ });
                case "ZZZ":
                  return a2({ format: "techie", allowZ: r2.opts.allowZ });
                case "ZZZZ":
                  return t3.zone.offsetName(t3.ts, { format: "short", locale: r2.loc.locale });
                case "ZZZZZ":
                  return t3.zone.offsetName(t3.ts, { format: "long", locale: r2.loc.locale });
                case "z":
                  return t3.zoneName;
                case "a":
                  return u2();
                case "d":
                  return o2 ? s2({ day: "numeric" }, "day") : r2.num(t3.day);
                case "dd":
                  return o2 ? s2({ day: "2-digit" }, "day") : r2.num(t3.day, 2);
                case "c":
                  return r2.num(t3.weekday);
                case "ccc":
                  return l2("short", true);
                case "cccc":
                  return l2("long", true);
                case "ccccc":
                  return l2("narrow", true);
                case "E":
                  return r2.num(t3.weekday);
                case "EEE":
                  return l2("short", false);
                case "EEEE":
                  return l2("long", false);
                case "EEEEE":
                  return l2("narrow", false);
                case "L":
                  return o2 ? s2({ month: "numeric", day: "numeric" }, "month") : r2.num(t3.month);
                case "LL":
                  return o2 ? s2({ month: "2-digit", day: "numeric" }, "month") : r2.num(t3.month, 2);
                case "LLL":
                  return c2("short", true);
                case "LLLL":
                  return c2("long", true);
                case "LLLLL":
                  return c2("narrow", true);
                case "M":
                  return o2 ? s2({ month: "numeric" }, "month") : r2.num(t3.month);
                case "MM":
                  return o2 ? s2({ month: "2-digit" }, "month") : r2.num(t3.month, 2);
                case "MMM":
                  return c2("short", false);
                case "MMMM":
                  return c2("long", false);
                case "MMMMM":
                  return c2("narrow", false);
                case "y":
                  return o2 ? s2({ year: "numeric" }, "year") : r2.num(t3.year);
                case "yy":
                  return o2 ? s2({ year: "2-digit" }, "year") : r2.num(t3.year.toString().slice(-2), 2);
                case "yyyy":
                  return o2 ? s2({ year: "numeric" }, "year") : r2.num(t3.year, 4);
                case "yyyyyy":
                  return o2 ? s2({ year: "numeric" }, "year") : r2.num(t3.year, 6);
                case "G":
                  return d2("short");
                case "GG":
                  return d2("long");
                case "GGGGG":
                  return d2("narrow");
                case "kk":
                  return r2.num(t3.weekYear.toString().slice(-2), 2);
                case "kkkk":
                  return r2.num(t3.weekYear, 4);
                case "W":
                  return r2.num(t3.weekNumber);
                case "WW":
                  return r2.num(t3.weekNumber, 2);
                case "o":
                  return r2.num(t3.ordinal);
                case "ooo":
                  return r2.num(t3.ordinal, 3);
                case "q":
                  return r2.num(t3.quarter);
                case "qq":
                  return r2.num(t3.quarter, 2);
                case "X":
                  return r2.num(Math.floor(t3.ts / 1e3));
                case "x":
                  return r2.num(t3.ts);
                default:
                  return function(n4) {
                    var i3 = e2.macroTokenToFormatOpts(n4);
                    return i3 ? r2.formatWithSystemDefault(t3, i3) : n4;
                  }(n3);
              }
            });
          }, t2.formatDurationFromString = function(t3, n2) {
            var r2, i2 = this, o2 = function(e3) {
              switch (e3[0]) {
                case "S":
                  return "millisecond";
                case "s":
                  return "second";
                case "m":
                  return "minute";
                case "h":
                  return "hour";
                case "d":
                  return "day";
                case "M":
                  return "month";
                case "y":
                  return "year";
                default:
                  return null;
              }
            }, s2 = e2.parseFormat(n2), a2 = s2.reduce(function(e3, t4) {
              var n3 = t4.literal, r3 = t4.val;
              return n3 ? e3 : e3.concat(r3);
            }, []), u2 = t3.shiftTo.apply(t3, a2.map(o2).filter(function(e3) {
              return e3;
            }));
            return Ne(s2, (r2 = u2, function(e3) {
              var t4 = o2(e3);
              return t4 ? i2.num(r2.get(t4), e3.length) : e3;
            }));
          }, e2;
        }(), Pe = function() {
          function e2(e3, t2) {
            this.reason = e3, this.explanation = t2;
          }
          return e2.prototype.toMessage = function() {
            return this.explanation ? this.reason + ": " + this.explanation : this.reason;
          }, e2;
        }(), je = function() {
          function e2() {
          }
          var t2 = e2.prototype;
          return t2.offsetName = function(e3, t3) {
            throw new b();
          }, t2.formatOffset = function(e3, t3) {
            throw new b();
          }, t2.offset = function(e3) {
            throw new b();
          }, t2.equals = function(e3) {
            throw new b();
          }, i(e2, [{ key: "type", get: function() {
            throw new b();
          } }, { key: "name", get: function() {
            throw new b();
          } }, { key: "universal", get: function() {
            throw new b();
          } }, { key: "isValid", get: function() {
            throw new b();
          } }]), e2;
        }(), Ve = null, Ue = function(e2) {
          function t2() {
            return e2.apply(this, arguments) || this;
          }
          o(t2, e2);
          var n2 = t2.prototype;
          return n2.offsetName = function(e3, t3) {
            return fe(e3, t3.format, t3.locale);
          }, n2.formatOffset = function(e3, t3) {
            return ve(this.offset(e3), t3);
          }, n2.offset = function(e3) {
            return -new Date(e3).getTimezoneOffset();
          }, n2.equals = function(e3) {
            return "local" === e3.type;
          }, i(t2, [{ key: "type", get: function() {
            return "local";
          } }, { key: "name", get: function() {
            return Y() ? new Intl.DateTimeFormat().resolvedOptions().timeZone : "local";
          } }, { key: "universal", get: function() {
            return false;
          } }, { key: "isValid", get: function() {
            return true;
          } }], [{ key: "instance", get: function() {
            return null === Ve && (Ve = new t2()), Ve;
          } }]), t2;
        }(je), qe = RegExp("^" + ye.source + "$"), Fe = {};
        var Be = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
        var ze = {}, He = function(e2) {
          function t2(n3) {
            var r2;
            return (r2 = e2.call(this) || this).zoneName = n3, r2.valid = t2.isValidZone(n3), r2;
          }
          o(t2, e2), t2.create = function(e3) {
            return ze[e3] || (ze[e3] = new t2(e3)), ze[e3];
          }, t2.resetCache = function() {
            ze = {}, Fe = {};
          }, t2.isValidSpecifier = function(e3) {
            return !(!e3 || !e3.match(qe));
          }, t2.isValidZone = function(e3) {
            try {
              return new Intl.DateTimeFormat("en-US", { timeZone: e3 }).format(), true;
            } catch (e4) {
              return false;
            }
          }, t2.parseGMTOffset = function(e3) {
            if (e3) {
              var t3 = e3.match(/^Etc\/GMT(0|[+-]\d{1,2})$/i);
              if (t3) return -60 * parseInt(t3[1]);
            }
            return null;
          };
          var n2 = t2.prototype;
          return n2.offsetName = function(e3, t3) {
            return fe(e3, t3.format, t3.locale, this.name);
          }, n2.formatOffset = function(e3, t3) {
            return ve(this.offset(e3), t3);
          }, n2.offset = function(e3) {
            var t3 = new Date(e3);
            if (isNaN(t3)) return NaN;
            var n3, r2 = (n3 = this.name, Fe[n3] || (Fe[n3] = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: n3, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })), Fe[n3]), i2 = r2.formatToParts ? function(e4, t4) {
              for (var n4 = e4.formatToParts(t4), r3 = [], i3 = 0; i3 < n4.length; i3++) {
                var o3 = n4[i3], s3 = o3.type, a3 = o3.value, u3 = Be[s3];
                Z(u3) || (r3[u3] = parseInt(a3, 10));
              }
              return r3;
            }(r2, t3) : function(e4, t4) {
              var n4 = e4.format(t4).replace(/\u200E/g, ""), r3 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(n4), i3 = r3[1], o3 = r3[2];
              return [r3[3], i3, o3, r3[4], r3[5], r3[6]];
            }(r2, t3), o2 = i2[0], s2 = i2[1], a2 = i2[2], u2 = i2[3], c2 = +t3, l2 = c2 % 1e3;
            return (ce({ year: o2, month: s2, day: a2, hour: 24 === u2 ? 0 : u2, minute: i2[4], second: i2[5], millisecond: 0 }) - (c2 -= l2 >= 0 ? l2 : 1e3 + l2)) / 6e4;
          }, n2.equals = function(e3) {
            return "iana" === e3.type && e3.name === this.name;
          }, i(t2, [{ key: "type", get: function() {
            return "iana";
          } }, { key: "name", get: function() {
            return this.zoneName;
          } }, { key: "universal", get: function() {
            return false;
          } }, { key: "isValid", get: function() {
            return this.valid;
          } }]), t2;
        }(je), Je = null, Ze = function(e2) {
          function t2(t3) {
            var n3;
            return (n3 = e2.call(this) || this).fixed = t3, n3;
          }
          o(t2, e2), t2.instance = function(e3) {
            return 0 === e3 ? t2.utcInstance : new t2(e3);
          }, t2.parseSpecifier = function(e3) {
            if (e3) {
              var n3 = e3.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
              if (n3) return new t2(he(n3[1], n3[2]));
            }
            return null;
          }, i(t2, null, [{ key: "utcInstance", get: function() {
            return null === Je && (Je = new t2(0)), Je;
          } }]);
          var n2 = t2.prototype;
          return n2.offsetName = function() {
            return this.name;
          }, n2.formatOffset = function(e3, t3) {
            return ve(this.fixed, t3);
          }, n2.offset = function() {
            return this.fixed;
          }, n2.equals = function(e3) {
            return "fixed" === e3.type && e3.fixed === this.fixed;
          }, i(t2, [{ key: "type", get: function() {
            return "fixed";
          } }, { key: "name", get: function() {
            return 0 === this.fixed ? "UTC" : "UTC" + ve(this.fixed, "narrow");
          } }, { key: "universal", get: function() {
            return true;
          } }, { key: "isValid", get: function() {
            return true;
          } }]), t2;
        }(je), We = function(e2) {
          function t2(t3) {
            var n3;
            return (n3 = e2.call(this) || this).zoneName = t3, n3;
          }
          o(t2, e2);
          var n2 = t2.prototype;
          return n2.offsetName = function() {
            return null;
          }, n2.formatOffset = function() {
            return "";
          }, n2.offset = function() {
            return NaN;
          }, n2.equals = function() {
            return false;
          }, i(t2, [{ key: "type", get: function() {
            return "invalid";
          } }, { key: "name", get: function() {
            return this.zoneName;
          } }, { key: "universal", get: function() {
            return false;
          } }, { key: "isValid", get: function() {
            return false;
          } }]), t2;
        }(je);
        function Ge(e2, t2) {
          var n2;
          if (Z(e2) || null === e2) return t2;
          if (e2 instanceof je) return e2;
          if ("string" == typeof e2) {
            var r2 = e2.toLowerCase();
            return "local" === r2 ? t2 : "utc" === r2 || "gmt" === r2 ? Ze.utcInstance : null != (n2 = He.parseGMTOffset(e2)) ? Ze.instance(n2) : He.isValidSpecifier(r2) ? He.create(e2) : Ze.parseSpecifier(r2) || new We(e2);
          }
          return W(e2) ? Ze.instance(e2) : "object" == typeof e2 && e2.offset && "number" == typeof e2.offset ? e2 : new We(e2);
        }
        var Ye = function() {
          return Date.now();
        }, $e = null, Ke = null, Xe = null, Qe = null, et = false, tt2 = function() {
          function e2() {
          }
          return e2.resetCaches = function() {
            ft.resetCache(), He.resetCache();
          }, i(e2, null, [{ key: "now", get: function() {
            return Ye;
          }, set: function(e3) {
            Ye = e3;
          } }, { key: "defaultZoneName", get: function() {
            return e2.defaultZone.name;
          }, set: function(e3) {
            $e = e3 ? Ge(e3) : null;
          } }, { key: "defaultZone", get: function() {
            return $e || Ue.instance;
          } }, { key: "defaultLocale", get: function() {
            return Ke;
          }, set: function(e3) {
            Ke = e3;
          } }, { key: "defaultNumberingSystem", get: function() {
            return Xe;
          }, set: function(e3) {
            Xe = e3;
          } }, { key: "defaultOutputCalendar", get: function() {
            return Qe;
          }, set: function(e3) {
            Qe = e3;
          } }, { key: "throwOnInvalid", get: function() {
            return et;
          }, set: function(e3) {
            et = e3;
          } }]), e2;
        }(), nt = {};
        function rt(e2, t2) {
          void 0 === t2 && (t2 = {});
          var n2 = JSON.stringify([e2, t2]), r2 = nt[n2];
          return r2 || (r2 = new Intl.DateTimeFormat(e2, t2), nt[n2] = r2), r2;
        }
        var it = {};
        var ot = {};
        function st(e2, t2) {
          void 0 === t2 && (t2 = {});
          var n2 = t2, r2 = (n2.base, function(e3, t3) {
            if (null == e3) return {};
            var n3, r3, i3 = {}, o3 = Object.keys(e3);
            for (r3 = 0; r3 < o3.length; r3++) n3 = o3[r3], t3.indexOf(n3) >= 0 || (i3[n3] = e3[n3]);
            return i3;
          }(n2, ["base"])), i2 = JSON.stringify([e2, r2]), o2 = ot[i2];
          return o2 || (o2 = new Intl.RelativeTimeFormat(e2, t2), ot[i2] = o2), o2;
        }
        var at = null;
        function ut(e2, t2, n2, r2, i2) {
          var o2 = e2.listingMode(n2);
          return "error" === o2 ? null : "en" === o2 ? r2(t2) : i2(t2);
        }
        var ct = function() {
          function e2(e3, t2, n2) {
            if (this.padTo = n2.padTo || 0, this.floor = n2.floor || false, !t2 && Y()) {
              var r2 = { useGrouping: false };
              n2.padTo > 0 && (r2.minimumIntegerDigits = n2.padTo), this.inf = function(e4, t3) {
                void 0 === t3 && (t3 = {});
                var n3 = JSON.stringify([e4, t3]), r3 = it[n3];
                return r3 || (r3 = new Intl.NumberFormat(e4, t3), it[n3] = r3), r3;
              }(e3, r2);
            }
          }
          return e2.prototype.format = function(e3) {
            if (this.inf) {
              var t2 = this.floor ? Math.floor(e3) : e3;
              return this.inf.format(t2);
            }
            return ne(this.floor ? Math.floor(e3) : oe(e3, 3), this.padTo);
          }, e2;
        }(), lt = function() {
          function e2(e3, t3, n2) {
            var r2;
            if (this.opts = n2, this.hasIntl = Y(), e3.zone.universal && this.hasIntl) {
              var i2 = e3.offset / 60 * -1, o2 = i2 >= 0 ? "Etc/GMT+" + i2 : "Etc/GMT" + i2, s2 = He.isValidZone(o2);
              0 !== e3.offset && s2 ? (r2 = o2, this.dt = e3) : (r2 = "UTC", n2.timeZoneName ? this.dt = e3 : this.dt = 0 === e3.offset ? e3 : lr.fromMillis(e3.ts + 60 * e3.offset * 1e3));
            } else "local" === e3.zone.type ? this.dt = e3 : (this.dt = e3, r2 = e3.zone.name);
            if (this.hasIntl) {
              var a2 = Object.assign({}, this.opts);
              r2 && (a2.timeZone = r2), this.dtf = rt(t3, a2);
            }
          }
          var t2 = e2.prototype;
          return t2.format = function() {
            if (this.hasIntl) return this.dtf.format(this.dt.toJSDate());
            var e3 = function(e4) {
              switch (we(Q(e4, ["weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "hour12"]))) {
                case we(O):
                  return "M/d/yyyy";
                case we(T):
                  return "LLL d, yyyy";
                case we(C):
                  return "EEE, LLL d, yyyy";
                case we(A):
                  return "LLLL d, yyyy";
                case we(I):
                  return "EEEE, LLLL d, yyyy";
                case we(L):
                  return "h:mm a";
                case we(R):
                  return "h:mm:ss a";
                case we(x):
                case we(_):
                  return "h:mm a";
                case we(N):
                  return "HH:mm";
                case we(D):
                  return "HH:mm:ss";
                case we(M):
                case we(P):
                  return "HH:mm";
                case we(j):
                  return "M/d/yyyy, h:mm a";
                case we(U):
                  return "LLL d, yyyy, h:mm a";
                case we(B):
                  return "LLLL d, yyyy, h:mm a";
                case we(H):
                  return "EEEE, LLLL d, yyyy, h:mm a";
                case we(V):
                  return "M/d/yyyy, h:mm:ss a";
                case we(q):
                  return "LLL d, yyyy, h:mm:ss a";
                case we(F):
                  return "EEE, d LLL yyyy, h:mm a";
                case we(z):
                  return "LLLL d, yyyy, h:mm:ss a";
                case we(J):
                  return "EEEE, LLLL d, yyyy, h:mm:ss a";
                default:
                  return "EEEE, LLLL d, yyyy, h:mm a";
              }
            }(this.opts), t3 = ft.create("en-US");
            return Me.create(t3).formatDateTimeFromString(this.dt, e3);
          }, t2.formatToParts = function() {
            return this.hasIntl && $() ? this.dtf.formatToParts(this.dt.toJSDate()) : [];
          }, t2.resolvedOptions = function() {
            return this.hasIntl ? this.dtf.resolvedOptions() : { locale: "en-US", numberingSystem: "latn", outputCalendar: "gregory" };
          }, e2;
        }(), dt = function() {
          function e2(e3, t3, n2) {
            this.opts = Object.assign({ style: "long" }, n2), !t3 && K() && (this.rtf = st(e3, n2));
          }
          var t2 = e2.prototype;
          return t2.format = function(e3, t3) {
            return this.rtf ? this.rtf.format(e3, t3) : function(e4, t4, n2, r2) {
              void 0 === n2 && (n2 = "always"), void 0 === r2 && (r2 = false);
              var i2 = { years: ["year", "yr."], quarters: ["quarter", "qtr."], months: ["month", "mo."], weeks: ["week", "wk."], days: ["day", "day", "days"], hours: ["hour", "hr."], minutes: ["minute", "min."], seconds: ["second", "sec."] }, o2 = -1 === ["hours", "minutes", "seconds"].indexOf(e4);
              if ("auto" === n2 && o2) {
                var s2 = "days" === e4;
                switch (t4) {
                  case 1:
                    return s2 ? "tomorrow" : "next " + i2[e4][0];
                  case -1:
                    return s2 ? "yesterday" : "last " + i2[e4][0];
                  case 0:
                    return s2 ? "today" : "this " + i2[e4][0];
                }
              }
              var a2 = Object.is(t4, -0) || t4 < 0, u2 = Math.abs(t4), c2 = 1 === u2, l2 = i2[e4], d2 = r2 ? c2 ? l2[1] : l2[2] || l2[1] : c2 ? i2[e4][0] : e4;
              return a2 ? u2 + " " + d2 + " ago" : "in " + u2 + " " + d2;
            }(t3, e3, this.opts.numeric, "long" !== this.opts.style);
          }, t2.formatToParts = function(e3, t3) {
            return this.rtf ? this.rtf.formatToParts(e3, t3) : [];
          }, e2;
        }(), ft = function() {
          function e2(e3, t3, n2, r2) {
            var i2 = function(e4) {
              var t4 = e4.indexOf("-u-");
              if (-1 === t4) return [e4];
              var n3, r3 = e4.substring(0, t4);
              try {
                n3 = rt(e4).resolvedOptions();
              } catch (e5) {
                n3 = rt(r3).resolvedOptions();
              }
              var i3 = n3;
              return [r3, i3.numberingSystem, i3.calendar];
            }(e3), o2 = i2[0], s2 = i2[1], a2 = i2[2];
            this.locale = o2, this.numberingSystem = t3 || s2 || null, this.outputCalendar = n2 || a2 || null, this.intl = function(e4, t4, n3) {
              return Y() ? n3 || t4 ? (e4 += "-u", n3 && (e4 += "-ca-" + n3), t4 && (e4 += "-nu-" + t4), e4) : e4 : [];
            }(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = r2, this.fastNumbersCached = null;
          }
          e2.fromOpts = function(t3) {
            return e2.create(t3.locale, t3.numberingSystem, t3.outputCalendar, t3.defaultToEN);
          }, e2.create = function(t3, n2, r2, i2) {
            void 0 === i2 && (i2 = false);
            var o2 = t3 || tt2.defaultLocale;
            return new e2(o2 || (i2 ? "en-US" : function() {
              if (at) return at;
              if (Y()) {
                var e3 = new Intl.DateTimeFormat().resolvedOptions().locale;
                return at = e3 && "und" !== e3 ? e3 : "en-US";
              }
              return at = "en-US";
            }()), n2 || tt2.defaultNumberingSystem, r2 || tt2.defaultOutputCalendar, o2);
          }, e2.resetCache = function() {
            at = null, nt = {}, it = {}, ot = {};
          }, e2.fromObject = function(t3) {
            var n2 = void 0 === t3 ? {} : t3, r2 = n2.locale, i2 = n2.numberingSystem, o2 = n2.outputCalendar;
            return e2.create(r2, i2, o2);
          };
          var t2 = e2.prototype;
          return t2.listingMode = function(e3) {
            void 0 === e3 && (e3 = true);
            var t3 = Y() && $(), n2 = this.isEnglish(), r2 = !(null !== this.numberingSystem && "latn" !== this.numberingSystem || null !== this.outputCalendar && "gregory" !== this.outputCalendar);
            return t3 || n2 && r2 || e3 ? !t3 || n2 && r2 ? "en" : "intl" : "error";
          }, t2.clone = function(t3) {
            return t3 && 0 !== Object.getOwnPropertyNames(t3).length ? e2.create(t3.locale || this.specifiedLocale, t3.numberingSystem || this.numberingSystem, t3.outputCalendar || this.outputCalendar, t3.defaultToEN || false) : this;
          }, t2.redefaultToEN = function(e3) {
            return void 0 === e3 && (e3 = {}), this.clone(Object.assign({}, e3, { defaultToEN: true }));
          }, t2.redefaultToSystem = function(e3) {
            return void 0 === e3 && (e3 = {}), this.clone(Object.assign({}, e3, { defaultToEN: false }));
          }, t2.months = function(e3, t3, n2) {
            var r2 = this;
            return void 0 === t3 && (t3 = false), void 0 === n2 && (n2 = true), ut(this, e3, n2, ke, function() {
              var n3 = t3 ? { month: e3, day: "numeric" } : { month: e3 }, i2 = t3 ? "format" : "standalone";
              return r2.monthsCache[i2][e3] || (r2.monthsCache[i2][e3] = function(e4) {
                for (var t4 = [], n4 = 1; n4 <= 12; n4++) {
                  var r3 = lr.utc(2016, n4, 1);
                  t4.push(e4(r3));
                }
                return t4;
              }(function(e4) {
                return r2.extract(e4, n3, "month");
              })), r2.monthsCache[i2][e3];
            });
          }, t2.weekdays = function(e3, t3, n2) {
            var r2 = this;
            return void 0 === t3 && (t3 = false), void 0 === n2 && (n2 = true), ut(this, e3, n2, Ae, function() {
              var n3 = t3 ? { weekday: e3, year: "numeric", month: "long", day: "numeric" } : { weekday: e3 }, i2 = t3 ? "format" : "standalone";
              return r2.weekdaysCache[i2][e3] || (r2.weekdaysCache[i2][e3] = function(e4) {
                for (var t4 = [], n4 = 1; n4 <= 7; n4++) {
                  var r3 = lr.utc(2016, 11, 13 + n4);
                  t4.push(e4(r3));
                }
                return t4;
              }(function(e4) {
                return r2.extract(e4, n3, "weekday");
              })), r2.weekdaysCache[i2][e3];
            });
          }, t2.meridiems = function(e3) {
            var t3 = this;
            return void 0 === e3 && (e3 = true), ut(this, void 0, e3, function() {
              return Ie;
            }, function() {
              if (!t3.meridiemCache) {
                var e4 = { hour: "numeric", hour12: true };
                t3.meridiemCache = [lr.utc(2016, 11, 13, 9), lr.utc(2016, 11, 13, 19)].map(function(n2) {
                  return t3.extract(n2, e4, "dayperiod");
                });
              }
              return t3.meridiemCache;
            });
          }, t2.eras = function(e3, t3) {
            var n2 = this;
            return void 0 === t3 && (t3 = true), ut(this, e3, t3, _e, function() {
              var t4 = { era: e3 };
              return n2.eraCache[e3] || (n2.eraCache[e3] = [lr.utc(-40, 1, 1), lr.utc(2017, 1, 1)].map(function(e4) {
                return n2.extract(e4, t4, "era");
              })), n2.eraCache[e3];
            });
          }, t2.extract = function(e3, t3, n2) {
            var r2 = this.dtFormatter(e3, t3).formatToParts().find(function(e4) {
              return e4.type.toLowerCase() === n2;
            });
            return r2 ? r2.value : null;
          }, t2.numberFormatter = function(e3) {
            return void 0 === e3 && (e3 = {}), new ct(this.intl, e3.forceSimple || this.fastNumbers, e3);
          }, t2.dtFormatter = function(e3, t3) {
            return void 0 === t3 && (t3 = {}), new lt(e3, this.intl, t3);
          }, t2.relFormatter = function(e3) {
            return void 0 === e3 && (e3 = {}), new dt(this.intl, this.isEnglish(), e3);
          }, t2.isEnglish = function() {
            return "en" === this.locale || "en-us" === this.locale.toLowerCase() || Y() && new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
          }, t2.equals = function(e3) {
            return this.locale === e3.locale && this.numberingSystem === e3.numberingSystem && this.outputCalendar === e3.outputCalendar;
          }, i(e2, [{ key: "fastNumbers", get: function() {
            var e3;
            return null == this.fastNumbersCached && (this.fastNumbersCached = (!(e3 = this).numberingSystem || "latn" === e3.numberingSystem) && ("latn" === e3.numberingSystem || !e3.locale || e3.locale.startsWith("en") || Y() && "latn" === new Intl.DateTimeFormat(e3.intl).resolvedOptions().numberingSystem)), this.fastNumbersCached;
          } }]), e2;
        }();
        function ht() {
          for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
          var r2 = t2.reduce(function(e3, t3) {
            return e3 + t3.source;
          }, "");
          return RegExp("^" + r2 + "$");
        }
        function pt() {
          for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
          return function(e3) {
            return t2.reduce(function(t3, n3) {
              var r2 = t3[0], i2 = t3[1], o2 = t3[2], s2 = n3(e3, o2), a2 = s2[0], u2 = s2[1], c2 = s2[2];
              return [Object.assign(r2, a2), i2 || u2, c2];
            }, [{}, null, 1]).slice(0, 2);
          };
        }
        function gt(e2) {
          if (null == e2) return [null, null];
          for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
          for (var i2 = 0, o2 = n2; i2 < o2.length; i2++) {
            var s2 = o2[i2], a2 = s2[0], u2 = s2[1], c2 = a2.exec(e2);
            if (c2) return u2(c2);
          }
          return [null, null];
        }
        function vt() {
          for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
          return function(e3, n3) {
            var r2, i2 = {};
            for (r2 = 0; r2 < t2.length; r2++) i2[t2[r2]] = re(e3[n3 + r2]);
            return [i2, null, n3 + r2];
          };
        }
        var mt = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, yt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, wt = RegExp("" + yt.source + mt.source + "?"), bt = RegExp("(?:T" + wt.source + ")?"), Et = vt("weekYear", "weekNumber", "weekDay"), St = vt("year", "ordinal"), kt = RegExp(yt.source + " ?(?:" + mt.source + "|(" + ye.source + "))?"), Ot = RegExp("(?: " + kt.source + ")?");
        function Tt(e2, t2, n2) {
          var r2 = e2[t2];
          return Z(r2) ? n2 : re(r2);
        }
        function Ct(e2, t2) {
          return [{ year: Tt(e2, t2), month: Tt(e2, t2 + 1, 1), day: Tt(e2, t2 + 2, 1) }, null, t2 + 3];
        }
        function At(e2, t2) {
          return [{ hours: Tt(e2, t2, 0), minutes: Tt(e2, t2 + 1, 0), seconds: Tt(e2, t2 + 2, 0), milliseconds: ie(e2[t2 + 3]) }, null, t2 + 4];
        }
        function It(e2, t2) {
          var n2 = !e2[t2] && !e2[t2 + 1], r2 = he(e2[t2 + 1], e2[t2 + 2]);
          return [{}, n2 ? null : Ze.instance(r2), t2 + 3];
        }
        function Lt(e2, t2) {
          return [{}, e2[t2] ? He.create(e2[t2]) : null, t2 + 1];
        }
        var Rt = RegExp("^T?" + yt.source + "$"), xt = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
        function _t(e2) {
          var t2 = e2[0], n2 = e2[1], r2 = e2[2], i2 = e2[3], o2 = e2[4], s2 = e2[5], a2 = e2[6], u2 = e2[7], c2 = e2[8], l2 = "-" === t2[0], d2 = u2 && "-" === u2[0], f2 = function(e3, t3) {
            return void 0 === t3 && (t3 = false), void 0 !== e3 && (t3 || e3 && l2) ? -e3 : e3;
          };
          return [{ years: f2(re(n2)), months: f2(re(r2)), weeks: f2(re(i2)), days: f2(re(o2)), hours: f2(re(s2)), minutes: f2(re(a2)), seconds: f2(re(u2), "-0" === u2), milliseconds: f2(ie(c2), d2) }];
        }
        var Nt = { GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
        function Dt(e2, t2, n2, r2, i2, o2, s2) {
          var a2 = { year: 2 === t2.length ? de(re(t2)) : re(t2), month: Ee.indexOf(n2) + 1, day: re(r2), hour: re(i2), minute: re(o2) };
          return s2 && (a2.second = re(s2)), e2 && (a2.weekday = e2.length > 3 ? Oe.indexOf(e2) + 1 : Te.indexOf(e2) + 1), a2;
        }
        var Mt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
        function Pt(e2) {
          var t2, n2 = e2[1], r2 = e2[2], i2 = e2[3], o2 = e2[4], s2 = e2[5], a2 = e2[6], u2 = e2[7], c2 = e2[8], l2 = e2[9], d2 = e2[10], f2 = e2[11], h2 = Dt(n2, o2, i2, r2, s2, a2, u2);
          return t2 = c2 ? Nt[c2] : l2 ? 0 : he(d2, f2), [h2, new Ze(t2)];
        }
        var jt = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, Vt = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Ut = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
        function qt(e2) {
          var t2 = e2[1], n2 = e2[2], r2 = e2[3];
          return [Dt(t2, e2[4], r2, n2, e2[5], e2[6], e2[7]), Ze.utcInstance];
        }
        function Ft(e2) {
          var t2 = e2[1], n2 = e2[2], r2 = e2[3], i2 = e2[4], o2 = e2[5], s2 = e2[6];
          return [Dt(t2, e2[7], n2, r2, i2, o2, s2), Ze.utcInstance];
        }
        var Bt = ht(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, bt), zt = ht(/(\d{4})-?W(\d\d)(?:-?(\d))?/, bt), Ht = ht(/(\d{4})-?(\d{3})/, bt), Jt = ht(wt), Zt = pt(Ct, At, It), Wt = pt(Et, At, It), Gt = pt(St, At, It), Yt = pt(At, It);
        var $t = pt(At);
        var Kt = ht(/(\d{4})-(\d\d)-(\d\d)/, Ot), Xt = ht(kt), Qt = pt(Ct, At, It, Lt), en = pt(At, It, Lt);
        var tn = { weeks: { days: 7, hours: 168, minutes: 10080, seconds: 604800, milliseconds: 6048e5 }, days: { hours: 24, minutes: 1440, seconds: 86400, milliseconds: 864e5 }, hours: { minutes: 60, seconds: 3600, milliseconds: 36e5 }, minutes: { seconds: 60, milliseconds: 6e4 }, seconds: { milliseconds: 1e3 } }, nn = Object.assign({ years: { quarters: 4, months: 12, weeks: 52, days: 365, hours: 8760, minutes: 525600, seconds: 31536e3, milliseconds: 31536e6 }, quarters: { months: 3, weeks: 13, days: 91, hours: 2184, minutes: 131040, seconds: 7862400, milliseconds: 78624e5 }, months: { weeks: 4, days: 30, hours: 720, minutes: 43200, seconds: 2592e3, milliseconds: 2592e6 } }, tn), rn = Object.assign({ years: { quarters: 4, months: 12, weeks: 52.1775, days: 365.2425, hours: 8765.82, minutes: 525949.2, seconds: 525949.2 * 60, milliseconds: 525949.2 * 60 * 1e3 }, quarters: { months: 3, weeks: 13.044375, days: 91.310625, hours: 2191.455, minutes: 131487.3, seconds: 525949.2 * 60 / 4, milliseconds: 7889237999999999e-6 }, months: { weeks: 30.436875 / 7, days: 30.436875, hours: 730.485, minutes: 43829.1, seconds: 2629746, milliseconds: 2629746e3 } }, tn), on = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], sn = on.slice(0).reverse();
        function an(e2, t2, n2) {
          void 0 === n2 && (n2 = false);
          var r2 = { values: n2 ? t2.values : Object.assign({}, e2.values, t2.values || {}), loc: e2.loc.clone(t2.loc), conversionAccuracy: t2.conversionAccuracy || e2.conversionAccuracy };
          return new cn(r2);
        }
        function un(e2, t2, n2, r2, i2) {
          var o2 = e2[i2][n2], s2 = t2[n2] / o2, a2 = !(Math.sign(s2) === Math.sign(r2[i2])) && 0 !== r2[i2] && Math.abs(s2) <= 1 ? function(e3) {
            return e3 < 0 ? Math.floor(e3) : Math.ceil(e3);
          }(s2) : Math.trunc(s2);
          r2[i2] += a2, t2[n2] -= a2 * o2;
        }
        var cn = function() {
          function e2(e3) {
            var t3 = "longterm" === e3.conversionAccuracy || false;
            this.values = e3.values, this.loc = e3.loc || ft.create(), this.conversionAccuracy = t3 ? "longterm" : "casual", this.invalid = e3.invalid || null, this.matrix = t3 ? rn : nn, this.isLuxonDuration = true;
          }
          e2.fromMillis = function(t3, n2) {
            return e2.fromObject(Object.assign({ milliseconds: t3 }, n2));
          }, e2.fromObject = function(t3) {
            if (null == t3 || "object" != typeof t3) throw new w("Duration.fromObject: argument expected to be an object, got " + (null === t3 ? "null" : typeof t3));
            return new e2({ values: ge(t3, e2.normalizeUnit, ["locale", "numberingSystem", "conversionAccuracy", "zone"]), loc: ft.fromObject(t3), conversionAccuracy: t3.conversionAccuracy });
          }, e2.fromISO = function(t3, n2) {
            var r2 = function(e3) {
              return gt(e3, [xt, _t]);
            }(t3)[0];
            if (r2) {
              var i2 = Object.assign(r2, n2);
              return e2.fromObject(i2);
            }
            return e2.invalid("unparsable", 'the input "' + t3 + `" can't be parsed as ISO 8601`);
          }, e2.fromISOTime = function(t3, n2) {
            var r2 = function(e3) {
              return gt(e3, [Rt, $t]);
            }(t3)[0];
            if (r2) {
              var i2 = Object.assign(r2, n2);
              return e2.fromObject(i2);
            }
            return e2.invalid("unparsable", 'the input "' + t3 + `" can't be parsed as ISO 8601`);
          }, e2.invalid = function(t3, n2) {
            if (void 0 === n2 && (n2 = null), !t3) throw new w("need to specify a reason the Duration is invalid");
            var r2 = t3 instanceof Pe ? t3 : new Pe(t3, n2);
            if (tt2.throwOnInvalid) throw new v(r2);
            return new e2({ invalid: r2 });
          }, e2.normalizeUnit = function(e3) {
            var t3 = { year: "years", years: "years", quarter: "quarters", quarters: "quarters", month: "months", months: "months", week: "weeks", weeks: "weeks", day: "days", days: "days", hour: "hours", hours: "hours", minute: "minutes", minutes: "minutes", second: "seconds", seconds: "seconds", millisecond: "milliseconds", milliseconds: "milliseconds" }[e3 ? e3.toLowerCase() : e3];
            if (!t3) throw new y(e3);
            return t3;
          }, e2.isDuration = function(e3) {
            return e3 && e3.isLuxonDuration || false;
          };
          var t2 = e2.prototype;
          return t2.toFormat = function(e3, t3) {
            void 0 === t3 && (t3 = {});
            var n2 = Object.assign({}, t3, { floor: false !== t3.round && false !== t3.floor });
            return this.isValid ? Me.create(this.loc, n2).formatDurationFromString(this, e3) : "Invalid Duration";
          }, t2.toObject = function(e3) {
            if (void 0 === e3 && (e3 = {}), !this.isValid) return {};
            var t3 = Object.assign({}, this.values);
            return e3.includeConfig && (t3.conversionAccuracy = this.conversionAccuracy, t3.numberingSystem = this.loc.numberingSystem, t3.locale = this.loc.locale), t3;
          }, t2.toISO = function() {
            if (!this.isValid) return null;
            var e3 = "P";
            return 0 !== this.years && (e3 += this.years + "Y"), 0 === this.months && 0 === this.quarters || (e3 += this.months + 3 * this.quarters + "M"), 0 !== this.weeks && (e3 += this.weeks + "W"), 0 !== this.days && (e3 += this.days + "D"), 0 === this.hours && 0 === this.minutes && 0 === this.seconds && 0 === this.milliseconds || (e3 += "T"), 0 !== this.hours && (e3 += this.hours + "H"), 0 !== this.minutes && (e3 += this.minutes + "M"), 0 === this.seconds && 0 === this.milliseconds || (e3 += oe(this.seconds + this.milliseconds / 1e3, 3) + "S"), "P" === e3 && (e3 += "T0S"), e3;
          }, t2.toISOTime = function(e3) {
            if (void 0 === e3 && (e3 = {}), !this.isValid) return null;
            var t3 = this.toMillis();
            if (t3 < 0 || t3 >= 864e5) return null;
            e3 = Object.assign({ suppressMilliseconds: false, suppressSeconds: false, includePrefix: false, format: "extended" }, e3);
            var n2 = this.shiftTo("hours", "minutes", "seconds", "milliseconds"), r2 = "basic" === e3.format ? "hhmm" : "hh:mm";
            e3.suppressSeconds && 0 === n2.seconds && 0 === n2.milliseconds || (r2 += "basic" === e3.format ? "ss" : ":ss", e3.suppressMilliseconds && 0 === n2.milliseconds || (r2 += ".SSS"));
            var i2 = n2.toFormat(r2);
            return e3.includePrefix && (i2 = "T" + i2), i2;
          }, t2.toJSON = function() {
            return this.toISO();
          }, t2.toString = function() {
            return this.toISO();
          }, t2.toMillis = function() {
            return this.as("milliseconds");
          }, t2.valueOf = function() {
            return this.toMillis();
          }, t2.plus = function(e3) {
            if (!this.isValid) return this;
            for (var t3, n2 = ln(e3), r2 = {}, i2 = f(on); !(t3 = i2()).done; ) {
              var o2 = t3.value;
              (ee(n2.values, o2) || ee(this.values, o2)) && (r2[o2] = n2.get(o2) + this.get(o2));
            }
            return an(this, { values: r2 }, true);
          }, t2.minus = function(e3) {
            if (!this.isValid) return this;
            var t3 = ln(e3);
            return this.plus(t3.negate());
          }, t2.mapUnits = function(e3) {
            if (!this.isValid) return this;
            for (var t3 = {}, n2 = 0, r2 = Object.keys(this.values); n2 < r2.length; n2++) {
              var i2 = r2[n2];
              t3[i2] = pe(e3(this.values[i2], i2));
            }
            return an(this, { values: t3 }, true);
          }, t2.get = function(t3) {
            return this[e2.normalizeUnit(t3)];
          }, t2.set = function(t3) {
            return this.isValid ? an(this, { values: Object.assign(this.values, ge(t3, e2.normalizeUnit, [])) }) : this;
          }, t2.reconfigure = function(e3) {
            var t3 = void 0 === e3 ? {} : e3, n2 = t3.locale, r2 = t3.numberingSystem, i2 = t3.conversionAccuracy, o2 = { loc: this.loc.clone({ locale: n2, numberingSystem: r2 }) };
            return i2 && (o2.conversionAccuracy = i2), an(this, o2);
          }, t2.as = function(e3) {
            return this.isValid ? this.shiftTo(e3).get(e3) : NaN;
          }, t2.normalize = function() {
            if (!this.isValid) return this;
            var e3 = this.toObject();
            return function(e4, t3) {
              sn.reduce(function(n2, r2) {
                return Z(t3[r2]) ? n2 : (n2 && un(e4, t3, n2, t3, r2), r2);
              }, null);
            }(this.matrix, e3), an(this, { values: e3 }, true);
          }, t2.shiftTo = function() {
            for (var t3 = arguments.length, n2 = new Array(t3), r2 = 0; r2 < t3; r2++) n2[r2] = arguments[r2];
            if (!this.isValid) return this;
            if (0 === n2.length) return this;
            n2 = n2.map(function(t4) {
              return e2.normalizeUnit(t4);
            });
            for (var i2, o2, s2 = {}, a2 = {}, u2 = this.toObject(), c2 = f(on); !(o2 = c2()).done; ) {
              var l2 = o2.value;
              if (n2.indexOf(l2) >= 0) {
                i2 = l2;
                var d2 = 0;
                for (var h2 in a2) d2 += this.matrix[h2][l2] * a2[h2], a2[h2] = 0;
                W(u2[l2]) && (d2 += u2[l2]);
                var p3 = Math.trunc(d2);
                for (var g2 in s2[l2] = p3, a2[l2] = d2 - p3, u2) on.indexOf(g2) > on.indexOf(l2) && un(this.matrix, u2, g2, s2, l2);
              } else W(u2[l2]) && (a2[l2] = u2[l2]);
            }
            for (var v2 in a2) 0 !== a2[v2] && (s2[i2] += v2 === i2 ? a2[v2] : a2[v2] / this.matrix[i2][v2]);
            return an(this, { values: s2 }, true).normalize();
          }, t2.negate = function() {
            if (!this.isValid) return this;
            for (var e3 = {}, t3 = 0, n2 = Object.keys(this.values); t3 < n2.length; t3++) {
              var r2 = n2[t3];
              e3[r2] = -this.values[r2];
            }
            return an(this, { values: e3 }, true);
          }, t2.equals = function(e3) {
            if (!this.isValid || !e3.isValid) return false;
            if (!this.loc.equals(e3.loc)) return false;
            for (var t3, n2 = f(on); !(t3 = n2()).done; ) {
              var r2 = t3.value;
              if (i2 = this.values[r2], o2 = e3.values[r2], !(void 0 === i2 || 0 === i2 ? void 0 === o2 || 0 === o2 : i2 === o2)) return false;
            }
            var i2, o2;
            return true;
          }, i(e2, [{ key: "locale", get: function() {
            return this.isValid ? this.loc.locale : null;
          } }, { key: "numberingSystem", get: function() {
            return this.isValid ? this.loc.numberingSystem : null;
          } }, { key: "years", get: function() {
            return this.isValid ? this.values.years || 0 : NaN;
          } }, { key: "quarters", get: function() {
            return this.isValid ? this.values.quarters || 0 : NaN;
          } }, { key: "months", get: function() {
            return this.isValid ? this.values.months || 0 : NaN;
          } }, { key: "weeks", get: function() {
            return this.isValid ? this.values.weeks || 0 : NaN;
          } }, { key: "days", get: function() {
            return this.isValid ? this.values.days || 0 : NaN;
          } }, { key: "hours", get: function() {
            return this.isValid ? this.values.hours || 0 : NaN;
          } }, { key: "minutes", get: function() {
            return this.isValid ? this.values.minutes || 0 : NaN;
          } }, { key: "seconds", get: function() {
            return this.isValid ? this.values.seconds || 0 : NaN;
          } }, { key: "milliseconds", get: function() {
            return this.isValid ? this.values.milliseconds || 0 : NaN;
          } }, { key: "isValid", get: function() {
            return null === this.invalid;
          } }, { key: "invalidReason", get: function() {
            return this.invalid ? this.invalid.reason : null;
          } }, { key: "invalidExplanation", get: function() {
            return this.invalid ? this.invalid.explanation : null;
          } }]), e2;
        }();
        function ln(e2) {
          if (W(e2)) return cn.fromMillis(e2);
          if (cn.isDuration(e2)) return e2;
          if ("object" == typeof e2) return cn.fromObject(e2);
          throw new w("Unknown duration argument " + e2 + " of type " + typeof e2);
        }
        var dn = "Invalid Interval";
        function fn(e2, t2) {
          return e2 && e2.isValid ? t2 && t2.isValid ? t2 < e2 ? hn.invalid("end before start", "The end of an interval must be after its start, but you had start=" + e2.toISO() + " and end=" + t2.toISO()) : null : hn.invalid("missing or invalid end") : hn.invalid("missing or invalid start");
        }
        var hn = function() {
          function e2(e3) {
            this.s = e3.start, this.e = e3.end, this.invalid = e3.invalid || null, this.isLuxonInterval = true;
          }
          e2.invalid = function(t3, n2) {
            if (void 0 === n2 && (n2 = null), !t3) throw new w("need to specify a reason the Interval is invalid");
            var r2 = t3 instanceof Pe ? t3 : new Pe(t3, n2);
            if (tt2.throwOnInvalid) throw new g(r2);
            return new e2({ invalid: r2 });
          }, e2.fromDateTimes = function(t3, n2) {
            var r2 = dr(t3), i2 = dr(n2), o2 = fn(r2, i2);
            return null == o2 ? new e2({ start: r2, end: i2 }) : o2;
          }, e2.after = function(t3, n2) {
            var r2 = ln(n2), i2 = dr(t3);
            return e2.fromDateTimes(i2, i2.plus(r2));
          }, e2.before = function(t3, n2) {
            var r2 = ln(n2), i2 = dr(t3);
            return e2.fromDateTimes(i2.minus(r2), i2);
          }, e2.fromISO = function(t3, n2) {
            var r2 = (t3 || "").split("/", 2), i2 = r2[0], o2 = r2[1];
            if (i2 && o2) {
              var s2, a2, u2, c2;
              try {
                a2 = (s2 = lr.fromISO(i2, n2)).isValid;
              } catch (o3) {
                a2 = false;
              }
              try {
                c2 = (u2 = lr.fromISO(o2, n2)).isValid;
              } catch (o3) {
                c2 = false;
              }
              if (a2 && c2) return e2.fromDateTimes(s2, u2);
              if (a2) {
                var l2 = cn.fromISO(o2, n2);
                if (l2.isValid) return e2.after(s2, l2);
              } else if (c2) {
                var d2 = cn.fromISO(i2, n2);
                if (d2.isValid) return e2.before(u2, d2);
              }
            }
            return e2.invalid("unparsable", 'the input "' + t3 + `" can't be parsed as ISO 8601`);
          }, e2.isInterval = function(e3) {
            return e3 && e3.isLuxonInterval || false;
          };
          var t2 = e2.prototype;
          return t2.length = function(e3) {
            return void 0 === e3 && (e3 = "milliseconds"), this.isValid ? this.toDuration.apply(this, [e3]).get(e3) : NaN;
          }, t2.count = function(e3) {
            if (void 0 === e3 && (e3 = "milliseconds"), !this.isValid) return NaN;
            var t3 = this.start.startOf(e3), n2 = this.end.startOf(e3);
            return Math.floor(n2.diff(t3, e3).get(e3)) + 1;
          }, t2.hasSame = function(e3) {
            return !!this.isValid && (this.isEmpty() || this.e.minus(1).hasSame(this.s, e3));
          }, t2.isEmpty = function() {
            return this.s.valueOf() === this.e.valueOf();
          }, t2.isAfter = function(e3) {
            return !!this.isValid && this.s > e3;
          }, t2.isBefore = function(e3) {
            return !!this.isValid && this.e <= e3;
          }, t2.contains = function(e3) {
            return !!this.isValid && (this.s <= e3 && this.e > e3);
          }, t2.set = function(t3) {
            var n2 = void 0 === t3 ? {} : t3, r2 = n2.start, i2 = n2.end;
            return this.isValid ? e2.fromDateTimes(r2 || this.s, i2 || this.e) : this;
          }, t2.splitAt = function() {
            var t3 = this;
            if (!this.isValid) return [];
            for (var n2 = arguments.length, r2 = new Array(n2), i2 = 0; i2 < n2; i2++) r2[i2] = arguments[i2];
            for (var o2 = r2.map(dr).filter(function(e3) {
              return t3.contains(e3);
            }).sort(), s2 = [], a2 = this.s, u2 = 0; a2 < this.e; ) {
              var c2 = o2[u2] || this.e, l2 = +c2 > +this.e ? this.e : c2;
              s2.push(e2.fromDateTimes(a2, l2)), a2 = l2, u2 += 1;
            }
            return s2;
          }, t2.splitBy = function(t3) {
            var n2 = ln(t3);
            if (!this.isValid || !n2.isValid || 0 === n2.as("milliseconds")) return [];
            for (var r2, i2 = this.s, o2 = 1, s2 = []; i2 < this.e; ) {
              var a2 = this.start.plus(n2.mapUnits(function(e3) {
                return e3 * o2;
              }));
              r2 = +a2 > +this.e ? this.e : a2, s2.push(e2.fromDateTimes(i2, r2)), i2 = r2, o2 += 1;
            }
            return s2;
          }, t2.divideEqually = function(e3) {
            return this.isValid ? this.splitBy(this.length() / e3).slice(0, e3) : [];
          }, t2.overlaps = function(e3) {
            return this.e > e3.s && this.s < e3.e;
          }, t2.abutsStart = function(e3) {
            return !!this.isValid && +this.e == +e3.s;
          }, t2.abutsEnd = function(e3) {
            return !!this.isValid && +e3.e == +this.s;
          }, t2.engulfs = function(e3) {
            return !!this.isValid && (this.s <= e3.s && this.e >= e3.e);
          }, t2.equals = function(e3) {
            return !(!this.isValid || !e3.isValid) && (this.s.equals(e3.s) && this.e.equals(e3.e));
          }, t2.intersection = function(t3) {
            if (!this.isValid) return this;
            var n2 = this.s > t3.s ? this.s : t3.s, r2 = this.e < t3.e ? this.e : t3.e;
            return n2 >= r2 ? null : e2.fromDateTimes(n2, r2);
          }, t2.union = function(t3) {
            if (!this.isValid) return this;
            var n2 = this.s < t3.s ? this.s : t3.s, r2 = this.e > t3.e ? this.e : t3.e;
            return e2.fromDateTimes(n2, r2);
          }, e2.merge = function(e3) {
            var t3 = e3.sort(function(e4, t4) {
              return e4.s - t4.s;
            }).reduce(function(e4, t4) {
              var n3 = e4[0], r3 = e4[1];
              return r3 ? r3.overlaps(t4) || r3.abutsStart(t4) ? [n3, r3.union(t4)] : [n3.concat([r3]), t4] : [n3, t4];
            }, [[], null]), n2 = t3[0], r2 = t3[1];
            return r2 && n2.push(r2), n2;
          }, e2.xor = function(t3) {
            for (var n2, r2, i2 = null, o2 = 0, s2 = [], a2 = t3.map(function(e3) {
              return [{ time: e3.s, type: "s" }, { time: e3.e, type: "e" }];
            }), u2 = f((n2 = Array.prototype).concat.apply(n2, a2).sort(function(e3, t4) {
              return e3.time - t4.time;
            })); !(r2 = u2()).done; ) {
              var c2 = r2.value;
              1 === (o2 += "s" === c2.type ? 1 : -1) ? i2 = c2.time : (i2 && +i2 != +c2.time && s2.push(e2.fromDateTimes(i2, c2.time)), i2 = null);
            }
            return e2.merge(s2);
          }, t2.difference = function() {
            for (var t3 = this, n2 = arguments.length, r2 = new Array(n2), i2 = 0; i2 < n2; i2++) r2[i2] = arguments[i2];
            return e2.xor([this].concat(r2)).map(function(e3) {
              return t3.intersection(e3);
            }).filter(function(e3) {
              return e3 && !e3.isEmpty();
            });
          }, t2.toString = function() {
            return this.isValid ? "[" + this.s.toISO() + " – " + this.e.toISO() + ")" : dn;
          }, t2.toISO = function(e3) {
            return this.isValid ? this.s.toISO(e3) + "/" + this.e.toISO(e3) : dn;
          }, t2.toISODate = function() {
            return this.isValid ? this.s.toISODate() + "/" + this.e.toISODate() : dn;
          }, t2.toISOTime = function(e3) {
            return this.isValid ? this.s.toISOTime(e3) + "/" + this.e.toISOTime(e3) : dn;
          }, t2.toFormat = function(e3, t3) {
            var n2 = (void 0 === t3 ? {} : t3).separator, r2 = void 0 === n2 ? " – " : n2;
            return this.isValid ? "" + this.s.toFormat(e3) + r2 + this.e.toFormat(e3) : dn;
          }, t2.toDuration = function(e3, t3) {
            return this.isValid ? this.e.diff(this.s, e3, t3) : cn.invalid(this.invalidReason);
          }, t2.mapEndpoints = function(t3) {
            return e2.fromDateTimes(t3(this.s), t3(this.e));
          }, i(e2, [{ key: "start", get: function() {
            return this.isValid ? this.s : null;
          } }, { key: "end", get: function() {
            return this.isValid ? this.e : null;
          } }, { key: "isValid", get: function() {
            return null === this.invalidReason;
          } }, { key: "invalidReason", get: function() {
            return this.invalid ? this.invalid.reason : null;
          } }, { key: "invalidExplanation", get: function() {
            return this.invalid ? this.invalid.explanation : null;
          } }]), e2;
        }(), pn = function() {
          function e2() {
          }
          return e2.hasDST = function(e3) {
            void 0 === e3 && (e3 = tt2.defaultZone);
            var t2 = lr.now().setZone(e3).set({ month: 12 });
            return !e3.universal && t2.offset !== t2.set({ month: 6 }).offset;
          }, e2.isValidIANAZone = function(e3) {
            return He.isValidSpecifier(e3) && He.isValidZone(e3);
          }, e2.normalizeZone = function(e3) {
            return Ge(e3, tt2.defaultZone);
          }, e2.months = function(e3, t2) {
            void 0 === e3 && (e3 = "long");
            var n2 = void 0 === t2 ? {} : t2, r2 = n2.locale, i2 = void 0 === r2 ? null : r2, o2 = n2.numberingSystem, s2 = void 0 === o2 ? null : o2, a2 = n2.locObj, u2 = void 0 === a2 ? null : a2, c2 = n2.outputCalendar, l2 = void 0 === c2 ? "gregory" : c2;
            return (u2 || ft.create(i2, s2, l2)).months(e3);
          }, e2.monthsFormat = function(e3, t2) {
            void 0 === e3 && (e3 = "long");
            var n2 = void 0 === t2 ? {} : t2, r2 = n2.locale, i2 = void 0 === r2 ? null : r2, o2 = n2.numberingSystem, s2 = void 0 === o2 ? null : o2, a2 = n2.locObj, u2 = void 0 === a2 ? null : a2, c2 = n2.outputCalendar, l2 = void 0 === c2 ? "gregory" : c2;
            return (u2 || ft.create(i2, s2, l2)).months(e3, true);
          }, e2.weekdays = function(e3, t2) {
            void 0 === e3 && (e3 = "long");
            var n2 = void 0 === t2 ? {} : t2, r2 = n2.locale, i2 = void 0 === r2 ? null : r2, o2 = n2.numberingSystem, s2 = void 0 === o2 ? null : o2, a2 = n2.locObj;
            return ((void 0 === a2 ? null : a2) || ft.create(i2, s2, null)).weekdays(e3);
          }, e2.weekdaysFormat = function(e3, t2) {
            void 0 === e3 && (e3 = "long");
            var n2 = void 0 === t2 ? {} : t2, r2 = n2.locale, i2 = void 0 === r2 ? null : r2, o2 = n2.numberingSystem, s2 = void 0 === o2 ? null : o2, a2 = n2.locObj;
            return ((void 0 === a2 ? null : a2) || ft.create(i2, s2, null)).weekdays(e3, true);
          }, e2.meridiems = function(e3) {
            var t2 = (void 0 === e3 ? {} : e3).locale, n2 = void 0 === t2 ? null : t2;
            return ft.create(n2).meridiems();
          }, e2.eras = function(e3, t2) {
            void 0 === e3 && (e3 = "short");
            var n2 = (void 0 === t2 ? {} : t2).locale, r2 = void 0 === n2 ? null : n2;
            return ft.create(r2, null, "gregory").eras(e3);
          }, e2.features = function() {
            var e3 = false, t2 = false, n2 = false, r2 = false;
            if (Y()) {
              e3 = true, t2 = $(), r2 = K();
              try {
                n2 = "America/New_York" === new Intl.DateTimeFormat("en", { timeZone: "America/New_York" }).resolvedOptions().timeZone;
              } catch (e4) {
                n2 = false;
              }
            }
            return { intl: e3, intlTokens: t2, zones: n2, relative: r2 };
          }, e2;
        }();
        function gn(e2, t2) {
          var n2 = function(e3) {
            return e3.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf();
          }, r2 = n2(t2) - n2(e2);
          return Math.floor(cn.fromMillis(r2).as("days"));
        }
        function vn(e2, t2, n2, r2) {
          var i2 = function(e3, t3, n3) {
            for (var r3, i3, o3 = {}, s3 = 0, a3 = [["years", function(e4, t4) {
              return t4.year - e4.year;
            }], ["quarters", function(e4, t4) {
              return t4.quarter - e4.quarter;
            }], ["months", function(e4, t4) {
              return t4.month - e4.month + 12 * (t4.year - e4.year);
            }], ["weeks", function(e4, t4) {
              var n4 = gn(e4, t4);
              return (n4 - n4 % 7) / 7;
            }], ["days", gn]]; s3 < a3.length; s3++) {
              var u3 = a3[s3], c3 = u3[0], l3 = u3[1];
              if (n3.indexOf(c3) >= 0) {
                var d3;
                r3 = c3;
                var f3, h3 = l3(e3, t3);
                if ((i3 = e3.plus(((d3 = {})[c3] = h3, d3))) > t3) e3 = e3.plus(((f3 = {})[c3] = h3 - 1, f3)), h3 -= 1;
                else e3 = i3;
                o3[c3] = h3;
              }
            }
            return [e3, o3, i3, r3];
          }(e2, t2, n2), o2 = i2[0], s2 = i2[1], a2 = i2[2], u2 = i2[3], c2 = t2 - o2, l2 = n2.filter(function(e3) {
            return ["hours", "minutes", "seconds", "milliseconds"].indexOf(e3) >= 0;
          });
          if (0 === l2.length) {
            var d2;
            if (a2 < t2) a2 = o2.plus(((d2 = {})[u2] = 1, d2));
            a2 !== o2 && (s2[u2] = (s2[u2] || 0) + c2 / (a2 - o2));
          }
          var f2, h2 = cn.fromObject(Object.assign(s2, r2));
          return l2.length > 0 ? (f2 = cn.fromMillis(c2, r2)).shiftTo.apply(f2, l2).plus(h2) : h2;
        }
        var mn = { arab: "[٠-٩]", arabext: "[۰-۹]", bali: "[᭐-᭙]", beng: "[০-৯]", deva: "[०-९]", fullwide: "[０-９]", gujr: "[૦-૯]", hanidec: "[〇|一|二|三|四|五|六|七|八|九]", khmr: "[០-៩]", knda: "[೦-೯]", laoo: "[໐-໙]", limb: "[᥆-᥏]", mlym: "[൦-൯]", mong: "[᠐-᠙]", mymr: "[၀-၉]", orya: "[୦-୯]", tamldec: "[௦-௯]", telu: "[౦-౯]", thai: "[๐-๙]", tibt: "[༠-༩]", latn: "\\d" }, yn = { arab: [1632, 1641], arabext: [1776, 1785], bali: [6992, 7001], beng: [2534, 2543], deva: [2406, 2415], fullwide: [65296, 65303], gujr: [2790, 2799], khmr: [6112, 6121], knda: [3302, 3311], laoo: [3792, 3801], limb: [6470, 6479], mlym: [3430, 3439], mong: [6160, 6169], mymr: [4160, 4169], orya: [2918, 2927], tamldec: [3046, 3055], telu: [3174, 3183], thai: [3664, 3673], tibt: [3872, 3881] }, wn = mn.hanidec.replace(/[\[|\]]/g, "").split("");
        function bn(e2, t2) {
          var n2 = e2.numberingSystem;
          return void 0 === t2 && (t2 = ""), new RegExp("" + mn[n2 || "latn"] + t2);
        }
        function En(e2, t2) {
          return void 0 === t2 && (t2 = function(e3) {
            return e3;
          }), { regex: e2, deser: function(e3) {
            var n2 = e3[0];
            return t2(function(e4) {
              var t3 = parseInt(e4, 10);
              if (isNaN(t3)) {
                t3 = "";
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4.charCodeAt(n3);
                  if (-1 !== e4[n3].search(mn.hanidec)) t3 += wn.indexOf(e4[n3]);
                  else for (var i2 in yn) {
                    var o2 = yn[i2], s2 = o2[0], a2 = o2[1];
                    r2 >= s2 && r2 <= a2 && (t3 += r2 - s2);
                  }
                }
                return parseInt(t3, 10);
              }
              return t3;
            }(n2));
          } };
        }
        var Sn = "( |" + String.fromCharCode(160) + ")", kn = new RegExp(Sn, "g");
        function On(e2) {
          return e2.replace(/\./g, "\\.?").replace(kn, Sn);
        }
        function Tn(e2) {
          return e2.replace(/\./g, "").replace(kn, " ").toLowerCase();
        }
        function Cn(e2, t2) {
          return null === e2 ? null : { regex: RegExp(e2.map(On).join("|")), deser: function(n2) {
            var r2 = n2[0];
            return e2.findIndex(function(e3) {
              return Tn(r2) === Tn(e3);
            }) + t2;
          } };
        }
        function An(e2, t2) {
          return { regex: e2, deser: function(e3) {
            return he(e3[1], e3[2]);
          }, groups: t2 };
        }
        function In(e2) {
          return { regex: e2, deser: function(e3) {
            return e3[0];
          } };
        }
        var Ln = { year: { "2-digit": "yy", numeric: "yyyyy" }, month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" }, day: { numeric: "d", "2-digit": "dd" }, weekday: { short: "EEE", long: "EEEE" }, dayperiod: "a", dayPeriod: "a", hour: { numeric: "h", "2-digit": "hh" }, minute: { numeric: "m", "2-digit": "mm" }, second: { numeric: "s", "2-digit": "ss" } };
        var Rn = null;
        function xn(e2, t2) {
          if (e2.literal) return e2;
          var n2 = Me.macroTokenToFormatOpts(e2.val);
          if (!n2) return e2;
          var r2 = Me.create(t2, n2).formatDateTimeParts((Rn || (Rn = lr.fromMillis(1555555555555)), Rn)).map(function(e3) {
            return function(e4, t3, n3) {
              var r3 = e4.type, i2 = e4.value;
              if ("literal" === r3) return { literal: true, val: i2 };
              var o2 = n3[r3], s2 = Ln[r3];
              return "object" == typeof s2 && (s2 = s2[o2]), s2 ? { literal: false, val: s2 } : void 0;
            }(e3, 0, n2);
          });
          return r2.includes(void 0) ? e2 : r2;
        }
        function _n(e2, t2, n2) {
          var r2 = function(e3, t3) {
            var n3;
            return (n3 = Array.prototype).concat.apply(n3, e3.map(function(e4) {
              return xn(e4, t3);
            }));
          }(Me.parseFormat(n2), e2), i2 = r2.map(function(t3) {
            return n3 = t3, i3 = bn(r3 = e2), o3 = bn(r3, "{2}"), s3 = bn(r3, "{3}"), a3 = bn(r3, "{4}"), u3 = bn(r3, "{6}"), c3 = bn(r3, "{1,2}"), l3 = bn(r3, "{1,3}"), d3 = bn(r3, "{1,6}"), f3 = bn(r3, "{1,9}"), h3 = bn(r3, "{2,4}"), p4 = bn(r3, "{4,6}"), g3 = function(e3) {
              return { regex: RegExp((t4 = e3.val, t4.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"))), deser: function(e4) {
                return e4[0];
              }, literal: true };
              var t4;
            }, (v2 = function(e3) {
              if (n3.literal) return g3(e3);
              switch (e3.val) {
                case "G":
                  return Cn(r3.eras("short", false), 0);
                case "GG":
                  return Cn(r3.eras("long", false), 0);
                case "y":
                  return En(d3);
                case "yy":
                  return En(h3, de);
                case "yyyy":
                  return En(a3);
                case "yyyyy":
                  return En(p4);
                case "yyyyyy":
                  return En(u3);
                case "M":
                  return En(c3);
                case "MM":
                  return En(o3);
                case "MMM":
                  return Cn(r3.months("short", true, false), 1);
                case "MMMM":
                  return Cn(r3.months("long", true, false), 1);
                case "L":
                  return En(c3);
                case "LL":
                  return En(o3);
                case "LLL":
                  return Cn(r3.months("short", false, false), 1);
                case "LLLL":
                  return Cn(r3.months("long", false, false), 1);
                case "d":
                  return En(c3);
                case "dd":
                  return En(o3);
                case "o":
                  return En(l3);
                case "ooo":
                  return En(s3);
                case "HH":
                  return En(o3);
                case "H":
                  return En(c3);
                case "hh":
                  return En(o3);
                case "h":
                  return En(c3);
                case "mm":
                  return En(o3);
                case "m":
                case "q":
                  return En(c3);
                case "qq":
                  return En(o3);
                case "s":
                  return En(c3);
                case "ss":
                  return En(o3);
                case "S":
                  return En(l3);
                case "SSS":
                  return En(s3);
                case "u":
                  return In(f3);
                case "a":
                  return Cn(r3.meridiems(), 0);
                case "kkkk":
                  return En(a3);
                case "kk":
                  return En(h3, de);
                case "W":
                  return En(c3);
                case "WW":
                  return En(o3);
                case "E":
                case "c":
                  return En(i3);
                case "EEE":
                  return Cn(r3.weekdays("short", false, false), 1);
                case "EEEE":
                  return Cn(r3.weekdays("long", false, false), 1);
                case "ccc":
                  return Cn(r3.weekdays("short", true, false), 1);
                case "cccc":
                  return Cn(r3.weekdays("long", true, false), 1);
                case "Z":
                case "ZZ":
                  return An(new RegExp("([+-]" + c3.source + ")(?::(" + o3.source + "))?"), 2);
                case "ZZZ":
                  return An(new RegExp("([+-]" + c3.source + ")(" + o3.source + ")?"), 2);
                case "z":
                  return In(/[a-z_+-/]{1,256}?/i);
                default:
                  return g3(e3);
              }
            }(n3) || { invalidReason: "missing Intl.DateTimeFormat.formatToParts support" }).token = n3, v2;
            var n3, r3, i3, o3, s3, a3, u3, c3, l3, d3, f3, h3, p4, g3, v2;
          }), o2 = i2.find(function(e3) {
            return e3.invalidReason;
          });
          if (o2) return { input: t2, tokens: r2, invalidReason: o2.invalidReason };
          var s2 = function(e3) {
            return ["^" + e3.map(function(e4) {
              return e4.regex;
            }).reduce(function(e4, t3) {
              return e4 + "(" + t3.source + ")";
            }, "") + "$", e3];
          }(i2), a2 = s2[0], u2 = s2[1], c2 = RegExp(a2, "i"), l2 = function(e3, t3, n3) {
            var r3 = e3.match(t3);
            if (r3) {
              var i3 = {}, o3 = 1;
              for (var s3 in n3) if (ee(n3, s3)) {
                var a3 = n3[s3], u3 = a3.groups ? a3.groups + 1 : 1;
                !a3.literal && a3.token && (i3[a3.token.val[0]] = a3.deser(r3.slice(o3, o3 + u3))), o3 += u3;
              }
              return [r3, i3];
            }
            return [r3, {}];
          }(t2, c2, u2), d2 = l2[0], f2 = l2[1], h2 = f2 ? function(e3) {
            var t3;
            return t3 = Z(e3.Z) ? Z(e3.z) ? null : He.create(e3.z) : new Ze(e3.Z), Z(e3.q) || (e3.M = 3 * (e3.q - 1) + 1), Z(e3.h) || (e3.h < 12 && 1 === e3.a ? e3.h += 12 : 12 === e3.h && 0 === e3.a && (e3.h = 0)), 0 === e3.G && e3.y && (e3.y = -e3.y), Z(e3.u) || (e3.S = ie(e3.u)), [Object.keys(e3).reduce(function(t4, n3) {
              var r3 = function(e4) {
                switch (e4) {
                  case "S":
                    return "millisecond";
                  case "s":
                    return "second";
                  case "m":
                    return "minute";
                  case "h":
                  case "H":
                    return "hour";
                  case "d":
                    return "day";
                  case "o":
                    return "ordinal";
                  case "L":
                  case "M":
                    return "month";
                  case "y":
                    return "year";
                  case "E":
                  case "c":
                    return "weekday";
                  case "W":
                    return "weekNumber";
                  case "k":
                    return "weekYear";
                  case "q":
                    return "quarter";
                  default:
                    return null;
                }
              }(n3);
              return r3 && (t4[r3] = e3[n3]), t4;
            }, {}), t3];
          }(f2) : [null, null], p3 = h2[0], g2 = h2[1];
          if (ee(f2, "a") && ee(f2, "H")) throw new m("Can't include meridiem when specifying 24-hour format");
          return { input: t2, tokens: r2, regex: c2, rawMatches: d2, matches: f2, result: p3, zone: g2 };
        }
        var Nn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Dn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
        function Mn(e2, t2) {
          return new Pe("unit out of range", "you specified " + t2 + " (of type " + typeof t2 + ") as a " + e2 + ", which is invalid");
        }
        function Pn(e2, t2, n2) {
          var r2 = new Date(Date.UTC(e2, t2 - 1, n2)).getUTCDay();
          return 0 === r2 ? 7 : r2;
        }
        function jn(e2, t2, n2) {
          return n2 + (se(e2) ? Dn : Nn)[t2 - 1];
        }
        function Vn(e2, t2) {
          var n2 = se(e2) ? Dn : Nn, r2 = n2.findIndex(function(e3) {
            return e3 < t2;
          });
          return { month: r2 + 1, day: t2 - n2[r2] };
        }
        function Un(e2) {
          var t2, n2 = e2.year, r2 = e2.month, i2 = e2.day, o2 = jn(n2, r2, i2), s2 = Pn(n2, r2, i2), a2 = Math.floor((o2 - s2 + 10) / 7);
          return a2 < 1 ? a2 = le(t2 = n2 - 1) : a2 > le(n2) ? (t2 = n2 + 1, a2 = 1) : t2 = n2, Object.assign({ weekYear: t2, weekNumber: a2, weekday: s2 }, me(e2));
        }
        function qn(e2) {
          var t2, n2 = e2.weekYear, r2 = e2.weekNumber, i2 = e2.weekday, o2 = Pn(n2, 1, 4), s2 = ae(n2), a2 = 7 * r2 + i2 - o2 - 3;
          a2 < 1 ? a2 += ae(t2 = n2 - 1) : a2 > s2 ? (t2 = n2 + 1, a2 -= ae(n2)) : t2 = n2;
          var u2 = Vn(t2, a2), c2 = u2.month, l2 = u2.day;
          return Object.assign({ year: t2, month: c2, day: l2 }, me(e2));
        }
        function Fn(e2) {
          var t2 = e2.year, n2 = jn(t2, e2.month, e2.day);
          return Object.assign({ year: t2, ordinal: n2 }, me(e2));
        }
        function Bn(e2) {
          var t2 = e2.year, n2 = Vn(t2, e2.ordinal), r2 = n2.month, i2 = n2.day;
          return Object.assign({ year: t2, month: r2, day: i2 }, me(e2));
        }
        function zn(e2) {
          var t2 = G(e2.year), n2 = te(e2.month, 1, 12), r2 = te(e2.day, 1, ue(e2.year, e2.month));
          return t2 ? n2 ? !r2 && Mn("day", e2.day) : Mn("month", e2.month) : Mn("year", e2.year);
        }
        function Hn(e2) {
          var t2 = e2.hour, n2 = e2.minute, r2 = e2.second, i2 = e2.millisecond, o2 = te(t2, 0, 23) || 24 === t2 && 0 === n2 && 0 === r2 && 0 === i2, s2 = te(n2, 0, 59), a2 = te(r2, 0, 59), u2 = te(i2, 0, 999);
          return o2 ? s2 ? a2 ? !u2 && Mn("millisecond", i2) : Mn("second", r2) : Mn("minute", n2) : Mn("hour", t2);
        }
        function Jn(e2) {
          return new Pe("unsupported zone", 'the zone "' + e2.name + '" is not supported');
        }
        function Zn(e2) {
          return null === e2.weekData && (e2.weekData = Un(e2.c)), e2.weekData;
        }
        function Wn(e2, t2) {
          var n2 = { ts: e2.ts, zone: e2.zone, c: e2.c, o: e2.o, loc: e2.loc, invalid: e2.invalid };
          return new lr(Object.assign({}, n2, t2, { old: n2 }));
        }
        function Gn(e2, t2, n2) {
          var r2 = e2 - 60 * t2 * 1e3, i2 = n2.offset(r2);
          if (t2 === i2) return [r2, t2];
          r2 -= 60 * (i2 - t2) * 1e3;
          var o2 = n2.offset(r2);
          return i2 === o2 ? [r2, i2] : [e2 - 60 * Math.min(i2, o2) * 1e3, Math.max(i2, o2)];
        }
        function Yn(e2, t2) {
          var n2 = new Date(e2 += 60 * t2 * 1e3);
          return { year: n2.getUTCFullYear(), month: n2.getUTCMonth() + 1, day: n2.getUTCDate(), hour: n2.getUTCHours(), minute: n2.getUTCMinutes(), second: n2.getUTCSeconds(), millisecond: n2.getUTCMilliseconds() };
        }
        function $n(e2, t2, n2) {
          return Gn(ce(e2), t2, n2);
        }
        function Kn(e2, t2) {
          var n2 = e2.o, r2 = e2.c.year + Math.trunc(t2.years), i2 = e2.c.month + Math.trunc(t2.months) + 3 * Math.trunc(t2.quarters), o2 = Object.assign({}, e2.c, { year: r2, month: i2, day: Math.min(e2.c.day, ue(r2, i2)) + Math.trunc(t2.days) + 7 * Math.trunc(t2.weeks) }), s2 = cn.fromObject({ years: t2.years - Math.trunc(t2.years), quarters: t2.quarters - Math.trunc(t2.quarters), months: t2.months - Math.trunc(t2.months), weeks: t2.weeks - Math.trunc(t2.weeks), days: t2.days - Math.trunc(t2.days), hours: t2.hours, minutes: t2.minutes, seconds: t2.seconds, milliseconds: t2.milliseconds }).as("milliseconds"), a2 = Gn(ce(o2), n2, e2.zone), u2 = a2[0], c2 = a2[1];
          return 0 !== s2 && (u2 += s2, c2 = e2.zone.offset(u2)), { ts: u2, o: c2 };
        }
        function Xn(e2, t2, n2, r2, i2) {
          var o2 = n2.setZone, s2 = n2.zone;
          if (e2 && 0 !== Object.keys(e2).length) {
            var a2 = t2 || s2, u2 = lr.fromObject(Object.assign(e2, n2, { zone: a2, setZone: void 0 }));
            return o2 ? u2 : u2.setZone(s2);
          }
          return lr.invalid(new Pe("unparsable", 'the input "' + i2 + `" can't be parsed as ` + r2));
        }
        function Qn(e2, t2, n2) {
          return void 0 === n2 && (n2 = true), e2.isValid ? Me.create(ft.create("en-US"), { allowZ: n2, forceSimple: true }).formatDateTimeFromString(e2, t2) : null;
        }
        function er(e2, t2) {
          var n2 = t2.suppressSeconds, r2 = void 0 !== n2 && n2, i2 = t2.suppressMilliseconds, o2 = void 0 !== i2 && i2, s2 = t2.includeOffset, a2 = t2.includePrefix, u2 = void 0 !== a2 && a2, c2 = t2.includeZone, l2 = void 0 !== c2 && c2, d2 = t2.spaceZone, f2 = void 0 !== d2 && d2, h2 = t2.format, p3 = void 0 === h2 ? "extended" : h2, g2 = "basic" === p3 ? "HHmm" : "HH:mm";
          r2 && 0 === e2.second && 0 === e2.millisecond || (g2 += "basic" === p3 ? "ss" : ":ss", o2 && 0 === e2.millisecond || (g2 += ".SSS")), (l2 || s2) && f2 && (g2 += " "), l2 ? g2 += "z" : s2 && (g2 += "basic" === p3 ? "ZZZ" : "ZZ");
          var v2 = Qn(e2, g2);
          return u2 && (v2 = "T" + v2), v2;
        }
        var tr = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, nr = { weekNumber: 1, weekday: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, rr = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, ir = ["year", "month", "day", "hour", "minute", "second", "millisecond"], or = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], sr = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
        function ar(e2) {
          var t2 = { year: "year", years: "year", month: "month", months: "month", day: "day", days: "day", hour: "hour", hours: "hour", minute: "minute", minutes: "minute", quarter: "quarter", quarters: "quarter", second: "second", seconds: "second", millisecond: "millisecond", milliseconds: "millisecond", weekday: "weekday", weekdays: "weekday", weeknumber: "weekNumber", weeksnumber: "weekNumber", weeknumbers: "weekNumber", weekyear: "weekYear", weekyears: "weekYear", ordinal: "ordinal" }[e2.toLowerCase()];
          if (!t2) throw new y(e2);
          return t2;
        }
        function ur(e2, t2) {
          for (var n2, r2 = f(ir); !(n2 = r2()).done; ) {
            var i2 = n2.value;
            Z(e2[i2]) && (e2[i2] = tr[i2]);
          }
          var o2 = zn(e2) || Hn(e2);
          if (o2) return lr.invalid(o2);
          var s2 = tt2.now(), a2 = $n(e2, t2.offset(s2), t2), u2 = a2[0], c2 = a2[1];
          return new lr({ ts: u2, zone: t2, o: c2 });
        }
        function cr(e2, t2, n2) {
          var r2 = !!Z(n2.round) || n2.round, i2 = function(e3, i3) {
            return e3 = oe(e3, r2 || n2.calendary ? 0 : 2, true), t2.loc.clone(n2).relFormatter(n2).format(e3, i3);
          }, o2 = function(r3) {
            return n2.calendary ? t2.hasSame(e2, r3) ? 0 : t2.startOf(r3).diff(e2.startOf(r3), r3).get(r3) : t2.diff(e2, r3).get(r3);
          };
          if (n2.unit) return i2(o2(n2.unit), n2.unit);
          for (var s2, a2 = f(n2.units); !(s2 = a2()).done; ) {
            var u2 = s2.value, c2 = o2(u2);
            if (Math.abs(c2) >= 1) return i2(c2, u2);
          }
          return i2(e2 > t2 ? -0 : 0, n2.units[n2.units.length - 1]);
        }
        var lr = function() {
          function e2(e3) {
            var t3 = e3.zone || tt2.defaultZone, n2 = e3.invalid || (Number.isNaN(e3.ts) ? new Pe("invalid input") : null) || (t3.isValid ? null : Jn(t3));
            this.ts = Z(e3.ts) ? tt2.now() : e3.ts;
            var r2 = null, i2 = null;
            if (!n2) if (e3.old && e3.old.ts === this.ts && e3.old.zone.equals(t3)) {
              var o2 = [e3.old.c, e3.old.o];
              r2 = o2[0], i2 = o2[1];
            } else {
              var s2 = t3.offset(this.ts);
              r2 = Yn(this.ts, s2), r2 = (n2 = Number.isNaN(r2.year) ? new Pe("invalid input") : null) ? null : r2, i2 = n2 ? null : s2;
            }
            this._zone = t3, this.loc = e3.loc || ft.create(), this.invalid = n2, this.weekData = null, this.c = r2, this.o = i2, this.isLuxonDateTime = true;
          }
          e2.now = function() {
            return new e2({});
          }, e2.local = function(t3, n2, r2, i2, o2, s2, a2) {
            return Z(t3) ? e2.now() : ur({ year: t3, month: n2, day: r2, hour: i2, minute: o2, second: s2, millisecond: a2 }, tt2.defaultZone);
          }, e2.utc = function(t3, n2, r2, i2, o2, s2, a2) {
            return Z(t3) ? new e2({ ts: tt2.now(), zone: Ze.utcInstance }) : ur({ year: t3, month: n2, day: r2, hour: i2, minute: o2, second: s2, millisecond: a2 }, Ze.utcInstance);
          }, e2.fromJSDate = function(t3, n2) {
            void 0 === n2 && (n2 = {});
            var r2, i2 = (r2 = t3, "[object Date]" === Object.prototype.toString.call(r2) ? t3.valueOf() : NaN);
            if (Number.isNaN(i2)) return e2.invalid("invalid input");
            var o2 = Ge(n2.zone, tt2.defaultZone);
            return o2.isValid ? new e2({ ts: i2, zone: o2, loc: ft.fromObject(n2) }) : e2.invalid(Jn(o2));
          }, e2.fromMillis = function(t3, n2) {
            if (void 0 === n2 && (n2 = {}), W(t3)) return t3 < -864e13 || t3 > 864e13 ? e2.invalid("Timestamp out of range") : new e2({ ts: t3, zone: Ge(n2.zone, tt2.defaultZone), loc: ft.fromObject(n2) });
            throw new w("fromMillis requires a numerical input, but received a " + typeof t3 + " with value " + t3);
          }, e2.fromSeconds = function(t3, n2) {
            if (void 0 === n2 && (n2 = {}), W(t3)) return new e2({ ts: 1e3 * t3, zone: Ge(n2.zone, tt2.defaultZone), loc: ft.fromObject(n2) });
            throw new w("fromSeconds requires a numerical input");
          }, e2.fromObject = function(t3) {
            var n2 = Ge(t3.zone, tt2.defaultZone);
            if (!n2.isValid) return e2.invalid(Jn(n2));
            var r2 = tt2.now(), i2 = n2.offset(r2), o2 = ge(t3, ar, ["zone", "locale", "outputCalendar", "numberingSystem"]), s2 = !Z(o2.ordinal), a2 = !Z(o2.year), u2 = !Z(o2.month) || !Z(o2.day), c2 = a2 || u2, l2 = o2.weekYear || o2.weekNumber, d2 = ft.fromObject(t3);
            if ((c2 || s2) && l2) throw new m("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
            if (u2 && s2) throw new m("Can't mix ordinal dates with month/day");
            var h2, p3, g2 = l2 || o2.weekday && !c2, v2 = Yn(r2, i2);
            g2 ? (h2 = or, p3 = nr, v2 = Un(v2)) : s2 ? (h2 = sr, p3 = rr, v2 = Fn(v2)) : (h2 = ir, p3 = tr);
            for (var y2, w2 = false, b2 = f(h2); !(y2 = b2()).done; ) {
              var E2 = y2.value;
              Z(o2[E2]) ? o2[E2] = w2 ? p3[E2] : v2[E2] : w2 = true;
            }
            var S2 = (g2 ? function(e3) {
              var t4 = G(e3.weekYear), n3 = te(e3.weekNumber, 1, le(e3.weekYear)), r3 = te(e3.weekday, 1, 7);
              return t4 ? n3 ? !r3 && Mn("weekday", e3.weekday) : Mn("week", e3.week) : Mn("weekYear", e3.weekYear);
            }(o2) : s2 ? function(e3) {
              var t4 = G(e3.year), n3 = te(e3.ordinal, 1, ae(e3.year));
              return t4 ? !n3 && Mn("ordinal", e3.ordinal) : Mn("year", e3.year);
            }(o2) : zn(o2)) || Hn(o2);
            if (S2) return e2.invalid(S2);
            var k2 = $n(g2 ? qn(o2) : s2 ? Bn(o2) : o2, i2, n2), O2 = new e2({ ts: k2[0], zone: n2, o: k2[1], loc: d2 });
            return o2.weekday && c2 && t3.weekday !== O2.weekday ? e2.invalid("mismatched weekday", "you can't specify both a weekday of " + o2.weekday + " and a date of " + O2.toISO()) : O2;
          }, e2.fromISO = function(e3, t3) {
            void 0 === t3 && (t3 = {});
            var n2 = function(e4) {
              return gt(e4, [Bt, Zt], [zt, Wt], [Ht, Gt], [Jt, Yt]);
            }(e3);
            return Xn(n2[0], n2[1], t3, "ISO 8601", e3);
          }, e2.fromRFC2822 = function(e3, t3) {
            void 0 === t3 && (t3 = {});
            var n2 = function(e4) {
              return gt(function(e5) {
                return e5.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
              }(e4), [Mt, Pt]);
            }(e3);
            return Xn(n2[0], n2[1], t3, "RFC 2822", e3);
          }, e2.fromHTTP = function(e3, t3) {
            void 0 === t3 && (t3 = {});
            var n2 = function(e4) {
              return gt(e4, [jt, qt], [Vt, qt], [Ut, Ft]);
            }(e3);
            return Xn(n2[0], n2[1], t3, "HTTP", t3);
          }, e2.fromFormat = function(t3, n2, r2) {
            if (void 0 === r2 && (r2 = {}), Z(t3) || Z(n2)) throw new w("fromFormat requires an input string and a format");
            var i2 = r2, o2 = i2.locale, s2 = void 0 === o2 ? null : o2, a2 = i2.numberingSystem, u2 = void 0 === a2 ? null : a2, c2 = function(e3, t4, n3) {
              var r3 = _n(e3, t4, n3);
              return [r3.result, r3.zone, r3.invalidReason];
            }(ft.fromOpts({ locale: s2, numberingSystem: u2, defaultToEN: true }), t3, n2), l2 = c2[0], d2 = c2[1], f2 = c2[2];
            return f2 ? e2.invalid(f2) : Xn(l2, d2, r2, "format " + n2, t3);
          }, e2.fromString = function(t3, n2, r2) {
            return void 0 === r2 && (r2 = {}), e2.fromFormat(t3, n2, r2);
          }, e2.fromSQL = function(e3, t3) {
            void 0 === t3 && (t3 = {});
            var n2 = function(e4) {
              return gt(e4, [Kt, Qt], [Xt, en]);
            }(e3);
            return Xn(n2[0], n2[1], t3, "SQL", e3);
          }, e2.invalid = function(t3, n2) {
            if (void 0 === n2 && (n2 = null), !t3) throw new w("need to specify a reason the DateTime is invalid");
            var r2 = t3 instanceof Pe ? t3 : new Pe(t3, n2);
            if (tt2.throwOnInvalid) throw new p2(r2);
            return new e2({ invalid: r2 });
          }, e2.isDateTime = function(e3) {
            return e3 && e3.isLuxonDateTime || false;
          };
          var t2 = e2.prototype;
          return t2.get = function(e3) {
            return this[e3];
          }, t2.resolvedLocaleOpts = function(e3) {
            void 0 === e3 && (e3 = {});
            var t3 = Me.create(this.loc.clone(e3), e3).resolvedOptions(this);
            return { locale: t3.locale, numberingSystem: t3.numberingSystem, outputCalendar: t3.calendar };
          }, t2.toUTC = function(e3, t3) {
            return void 0 === e3 && (e3 = 0), void 0 === t3 && (t3 = {}), this.setZone(Ze.instance(e3), t3);
          }, t2.toLocal = function() {
            return this.setZone(tt2.defaultZone);
          }, t2.setZone = function(t3, n2) {
            var r2 = void 0 === n2 ? {} : n2, i2 = r2.keepLocalTime, o2 = void 0 !== i2 && i2, s2 = r2.keepCalendarTime, a2 = void 0 !== s2 && s2;
            if ((t3 = Ge(t3, tt2.defaultZone)).equals(this.zone)) return this;
            if (t3.isValid) {
              var u2 = this.ts;
              if (o2 || a2) {
                var c2 = t3.offset(this.ts);
                u2 = $n(this.toObject(), c2, t3)[0];
              }
              return Wn(this, { ts: u2, zone: t3 });
            }
            return e2.invalid(Jn(t3));
          }, t2.reconfigure = function(e3) {
            var t3 = void 0 === e3 ? {} : e3, n2 = t3.locale, r2 = t3.numberingSystem, i2 = t3.outputCalendar;
            return Wn(this, { loc: this.loc.clone({ locale: n2, numberingSystem: r2, outputCalendar: i2 }) });
          }, t2.setLocale = function(e3) {
            return this.reconfigure({ locale: e3 });
          }, t2.set = function(e3) {
            if (!this.isValid) return this;
            var t3, n2 = ge(e3, ar, []), r2 = !Z(n2.weekYear) || !Z(n2.weekNumber) || !Z(n2.weekday), i2 = !Z(n2.ordinal), o2 = !Z(n2.year), s2 = !Z(n2.month) || !Z(n2.day), a2 = o2 || s2, u2 = n2.weekYear || n2.weekNumber;
            if ((a2 || i2) && u2) throw new m("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
            if (s2 && i2) throw new m("Can't mix ordinal dates with month/day");
            r2 ? t3 = qn(Object.assign(Un(this.c), n2)) : Z(n2.ordinal) ? (t3 = Object.assign(this.toObject(), n2), Z(n2.day) && (t3.day = Math.min(ue(t3.year, t3.month), t3.day))) : t3 = Bn(Object.assign(Fn(this.c), n2));
            var c2 = $n(t3, this.o, this.zone);
            return Wn(this, { ts: c2[0], o: c2[1] });
          }, t2.plus = function(e3) {
            return this.isValid ? Wn(this, Kn(this, ln(e3))) : this;
          }, t2.minus = function(e3) {
            return this.isValid ? Wn(this, Kn(this, ln(e3).negate())) : this;
          }, t2.startOf = function(e3) {
            if (!this.isValid) return this;
            var t3 = {}, n2 = cn.normalizeUnit(e3);
            switch (n2) {
              case "years":
                t3.month = 1;
              case "quarters":
              case "months":
                t3.day = 1;
              case "weeks":
              case "days":
                t3.hour = 0;
              case "hours":
                t3.minute = 0;
              case "minutes":
                t3.second = 0;
              case "seconds":
                t3.millisecond = 0;
            }
            if ("weeks" === n2 && (t3.weekday = 1), "quarters" === n2) {
              var r2 = Math.ceil(this.month / 3);
              t3.month = 3 * (r2 - 1) + 1;
            }
            return this.set(t3);
          }, t2.endOf = function(e3) {
            var t3;
            return this.isValid ? this.plus((t3 = {}, t3[e3] = 1, t3)).startOf(e3).minus(1) : this;
          }, t2.toFormat = function(e3, t3) {
            return void 0 === t3 && (t3 = {}), this.isValid ? Me.create(this.loc.redefaultToEN(t3)).formatDateTimeFromString(this, e3) : "Invalid DateTime";
          }, t2.toLocaleString = function(e3) {
            return void 0 === e3 && (e3 = O), this.isValid ? Me.create(this.loc.clone(e3), e3).formatDateTime(this) : "Invalid DateTime";
          }, t2.toLocaleParts = function(e3) {
            return void 0 === e3 && (e3 = {}), this.isValid ? Me.create(this.loc.clone(e3), e3).formatDateTimeParts(this) : [];
          }, t2.toISO = function(e3) {
            return void 0 === e3 && (e3 = {}), this.isValid ? this.toISODate(e3) + "T" + this.toISOTime(e3) : null;
          }, t2.toISODate = function(e3) {
            var t3 = (void 0 === e3 ? {} : e3).format, n2 = "basic" === (void 0 === t3 ? "extended" : t3) ? "yyyyMMdd" : "yyyy-MM-dd";
            return this.year > 9999 && (n2 = "+" + n2), Qn(this, n2);
          }, t2.toISOWeekDate = function() {
            return Qn(this, "kkkk-'W'WW-c");
          }, t2.toISOTime = function(e3) {
            var t3 = void 0 === e3 ? {} : e3, n2 = t3.suppressMilliseconds, r2 = void 0 !== n2 && n2, i2 = t3.suppressSeconds, o2 = void 0 !== i2 && i2, s2 = t3.includeOffset, a2 = void 0 === s2 || s2, u2 = t3.includePrefix, c2 = void 0 !== u2 && u2, l2 = t3.format;
            return er(this, { suppressSeconds: o2, suppressMilliseconds: r2, includeOffset: a2, includePrefix: c2, format: void 0 === l2 ? "extended" : l2 });
          }, t2.toRFC2822 = function() {
            return Qn(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
          }, t2.toHTTP = function() {
            return Qn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
          }, t2.toSQLDate = function() {
            return Qn(this, "yyyy-MM-dd");
          }, t2.toSQLTime = function(e3) {
            var t3 = void 0 === e3 ? {} : e3, n2 = t3.includeOffset, r2 = void 0 === n2 || n2, i2 = t3.includeZone;
            return er(this, { includeOffset: r2, includeZone: void 0 !== i2 && i2, spaceZone: true });
          }, t2.toSQL = function(e3) {
            return void 0 === e3 && (e3 = {}), this.isValid ? this.toSQLDate() + " " + this.toSQLTime(e3) : null;
          }, t2.toString = function() {
            return this.isValid ? this.toISO() : "Invalid DateTime";
          }, t2.valueOf = function() {
            return this.toMillis();
          }, t2.toMillis = function() {
            return this.isValid ? this.ts : NaN;
          }, t2.toSeconds = function() {
            return this.isValid ? this.ts / 1e3 : NaN;
          }, t2.toJSON = function() {
            return this.toISO();
          }, t2.toBSON = function() {
            return this.toJSDate();
          }, t2.toObject = function(e3) {
            if (void 0 === e3 && (e3 = {}), !this.isValid) return {};
            var t3 = Object.assign({}, this.c);
            return e3.includeConfig && (t3.outputCalendar = this.outputCalendar, t3.numberingSystem = this.loc.numberingSystem, t3.locale = this.loc.locale), t3;
          }, t2.toJSDate = function() {
            return new Date(this.isValid ? this.ts : NaN);
          }, t2.diff = function(e3, t3, n2) {
            if (void 0 === t3 && (t3 = "milliseconds"), void 0 === n2 && (n2 = {}), !this.isValid || !e3.isValid) return cn.invalid(this.invalid || e3.invalid, "created by diffing an invalid DateTime");
            var r2, i2 = Object.assign({ locale: this.locale, numberingSystem: this.numberingSystem }, n2), o2 = (r2 = t3, Array.isArray(r2) ? r2 : [r2]).map(cn.normalizeUnit), s2 = e3.valueOf() > this.valueOf(), a2 = vn(s2 ? this : e3, s2 ? e3 : this, o2, i2);
            return s2 ? a2.negate() : a2;
          }, t2.diffNow = function(t3, n2) {
            return void 0 === t3 && (t3 = "milliseconds"), void 0 === n2 && (n2 = {}), this.diff(e2.now(), t3, n2);
          }, t2.until = function(e3) {
            return this.isValid ? hn.fromDateTimes(this, e3) : this;
          }, t2.hasSame = function(e3, t3) {
            if (!this.isValid) return false;
            var n2 = e3.valueOf(), r2 = this.setZone(e3.zone, { keepLocalTime: true });
            return r2.startOf(t3) <= n2 && n2 <= r2.endOf(t3);
          }, t2.equals = function(e3) {
            return this.isValid && e3.isValid && this.valueOf() === e3.valueOf() && this.zone.equals(e3.zone) && this.loc.equals(e3.loc);
          }, t2.toRelative = function(t3) {
            if (void 0 === t3 && (t3 = {}), !this.isValid) return null;
            var n2 = t3.base || e2.fromObject({ zone: this.zone }), r2 = t3.padding ? this < n2 ? -t3.padding : t3.padding : 0, i2 = ["years", "months", "days", "hours", "minutes", "seconds"], o2 = t3.unit;
            return Array.isArray(t3.unit) && (i2 = t3.unit, o2 = void 0), cr(n2, this.plus(r2), Object.assign(t3, { numeric: "always", units: i2, unit: o2 }));
          }, t2.toRelativeCalendar = function(t3) {
            return void 0 === t3 && (t3 = {}), this.isValid ? cr(t3.base || e2.fromObject({ zone: this.zone }), this, Object.assign(t3, { numeric: "auto", units: ["years", "months", "days"], calendary: true })) : null;
          }, e2.min = function() {
            for (var t3 = arguments.length, n2 = new Array(t3), r2 = 0; r2 < t3; r2++) n2[r2] = arguments[r2];
            if (!n2.every(e2.isDateTime)) throw new w("min requires all arguments be DateTimes");
            return X(n2, function(e3) {
              return e3.valueOf();
            }, Math.min);
          }, e2.max = function() {
            for (var t3 = arguments.length, n2 = new Array(t3), r2 = 0; r2 < t3; r2++) n2[r2] = arguments[r2];
            if (!n2.every(e2.isDateTime)) throw new w("max requires all arguments be DateTimes");
            return X(n2, function(e3) {
              return e3.valueOf();
            }, Math.max);
          }, e2.fromFormatExplain = function(e3, t3, n2) {
            void 0 === n2 && (n2 = {});
            var r2 = n2, i2 = r2.locale, o2 = void 0 === i2 ? null : i2, s2 = r2.numberingSystem, a2 = void 0 === s2 ? null : s2;
            return _n(ft.fromOpts({ locale: o2, numberingSystem: a2, defaultToEN: true }), e3, t3);
          }, e2.fromStringExplain = function(t3, n2, r2) {
            return void 0 === r2 && (r2 = {}), e2.fromFormatExplain(t3, n2, r2);
          }, i(e2, [{ key: "isValid", get: function() {
            return null === this.invalid;
          } }, { key: "invalidReason", get: function() {
            return this.invalid ? this.invalid.reason : null;
          } }, { key: "invalidExplanation", get: function() {
            return this.invalid ? this.invalid.explanation : null;
          } }, { key: "locale", get: function() {
            return this.isValid ? this.loc.locale : null;
          } }, { key: "numberingSystem", get: function() {
            return this.isValid ? this.loc.numberingSystem : null;
          } }, { key: "outputCalendar", get: function() {
            return this.isValid ? this.loc.outputCalendar : null;
          } }, { key: "zone", get: function() {
            return this._zone;
          } }, { key: "zoneName", get: function() {
            return this.isValid ? this.zone.name : null;
          } }, { key: "year", get: function() {
            return this.isValid ? this.c.year : NaN;
          } }, { key: "quarter", get: function() {
            return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
          } }, { key: "month", get: function() {
            return this.isValid ? this.c.month : NaN;
          } }, { key: "day", get: function() {
            return this.isValid ? this.c.day : NaN;
          } }, { key: "hour", get: function() {
            return this.isValid ? this.c.hour : NaN;
          } }, { key: "minute", get: function() {
            return this.isValid ? this.c.minute : NaN;
          } }, { key: "second", get: function() {
            return this.isValid ? this.c.second : NaN;
          } }, { key: "millisecond", get: function() {
            return this.isValid ? this.c.millisecond : NaN;
          } }, { key: "weekYear", get: function() {
            return this.isValid ? Zn(this).weekYear : NaN;
          } }, { key: "weekNumber", get: function() {
            return this.isValid ? Zn(this).weekNumber : NaN;
          } }, { key: "weekday", get: function() {
            return this.isValid ? Zn(this).weekday : NaN;
          } }, { key: "ordinal", get: function() {
            return this.isValid ? Fn(this.c).ordinal : NaN;
          } }, { key: "monthShort", get: function() {
            return this.isValid ? pn.months("short", { locObj: this.loc })[this.month - 1] : null;
          } }, { key: "monthLong", get: function() {
            return this.isValid ? pn.months("long", { locObj: this.loc })[this.month - 1] : null;
          } }, { key: "weekdayShort", get: function() {
            return this.isValid ? pn.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
          } }, { key: "weekdayLong", get: function() {
            return this.isValid ? pn.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
          } }, { key: "offset", get: function() {
            return this.isValid ? +this.o : NaN;
          } }, { key: "offsetNameShort", get: function() {
            return this.isValid ? this.zone.offsetName(this.ts, { format: "short", locale: this.locale }) : null;
          } }, { key: "offsetNameLong", get: function() {
            return this.isValid ? this.zone.offsetName(this.ts, { format: "long", locale: this.locale }) : null;
          } }, { key: "isOffsetFixed", get: function() {
            return this.isValid ? this.zone.universal : null;
          } }, { key: "isInDST", get: function() {
            return !this.isOffsetFixed && (this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset);
          } }, { key: "isInLeapYear", get: function() {
            return se(this.year);
          } }, { key: "daysInMonth", get: function() {
            return ue(this.year, this.month);
          } }, { key: "daysInYear", get: function() {
            return this.isValid ? ae(this.year) : NaN;
          } }, { key: "weeksInWeekYear", get: function() {
            return this.isValid ? le(this.weekYear) : NaN;
          } }], [{ key: "DATE_SHORT", get: function() {
            return O;
          } }, { key: "DATE_MED", get: function() {
            return T;
          } }, { key: "DATE_MED_WITH_WEEKDAY", get: function() {
            return C;
          } }, { key: "DATE_FULL", get: function() {
            return A;
          } }, { key: "DATE_HUGE", get: function() {
            return I;
          } }, { key: "TIME_SIMPLE", get: function() {
            return L;
          } }, { key: "TIME_WITH_SECONDS", get: function() {
            return R;
          } }, { key: "TIME_WITH_SHORT_OFFSET", get: function() {
            return x;
          } }, { key: "TIME_WITH_LONG_OFFSET", get: function() {
            return _;
          } }, { key: "TIME_24_SIMPLE", get: function() {
            return N;
          } }, { key: "TIME_24_WITH_SECONDS", get: function() {
            return D;
          } }, { key: "TIME_24_WITH_SHORT_OFFSET", get: function() {
            return M;
          } }, { key: "TIME_24_WITH_LONG_OFFSET", get: function() {
            return P;
          } }, { key: "DATETIME_SHORT", get: function() {
            return j;
          } }, { key: "DATETIME_SHORT_WITH_SECONDS", get: function() {
            return V;
          } }, { key: "DATETIME_MED", get: function() {
            return U;
          } }, { key: "DATETIME_MED_WITH_SECONDS", get: function() {
            return q;
          } }, { key: "DATETIME_MED_WITH_WEEKDAY", get: function() {
            return F;
          } }, { key: "DATETIME_FULL", get: function() {
            return B;
          } }, { key: "DATETIME_FULL_WITH_SECONDS", get: function() {
            return z;
          } }, { key: "DATETIME_HUGE", get: function() {
            return H;
          } }, { key: "DATETIME_HUGE_WITH_SECONDS", get: function() {
            return J;
          } }]), e2;
        }();
        function dr(e2) {
          if (lr.isDateTime(e2)) return e2;
          if (e2 && e2.valueOf && W(e2.valueOf())) return lr.fromJSDate(e2);
          if (e2 && "object" == typeof e2) return lr.fromObject(e2);
          throw new w("Unknown datetime argument: " + e2 + ", of type " + typeof e2);
        }
        t.DateTime = lr, t.Duration = cn, t.FixedOffsetZone = Ze, t.IANAZone = He, t.Info = pn, t.Interval = hn, t.InvalidZone = We, t.LocalZone = Ue, t.Settings = tt2, t.VERSION = "1.28.1", t.Zone = je;
      }, function(e, t, n) {
        var r = n(39);
        e.exports = function(e2) {
          if (!r(e2)) throw new TypeError(e2 + " is not an Object");
          return e2;
        };
      }, function(e, t, n) {
        var r = n(10), i = { function: true, object: true };
        e.exports = function(e2) {
          return r(e2) && i[typeof e2] || false;
        };
      }, function(e, t, n) {
        (function(e2) {
          var r = void 0 !== e2 && e2 || "undefined" != typeof self && self || window, i = Function.prototype.apply;
          function o(e3, t2) {
            this._id = e3, this._clearFn = t2;
          }
          t.setTimeout = function() {
            return new o(i.call(setTimeout, r, arguments), clearTimeout);
          }, t.setInterval = function() {
            return new o(i.call(setInterval, r, arguments), clearInterval);
          }, t.clearTimeout = t.clearInterval = function(e3) {
            e3 && e3.close();
          }, o.prototype.unref = o.prototype.ref = function() {
          }, o.prototype.close = function() {
            this._clearFn.call(r, this._id);
          }, t.enroll = function(e3, t2) {
            clearTimeout(e3._idleTimeoutId), e3._idleTimeout = t2;
          }, t.unenroll = function(e3) {
            clearTimeout(e3._idleTimeoutId), e3._idleTimeout = -1;
          }, t._unrefActive = t.active = function(e3) {
            clearTimeout(e3._idleTimeoutId);
            var t2 = e3._idleTimeout;
            t2 >= 0 && (e3._idleTimeoutId = setTimeout(function() {
              e3._onTimeout && e3._onTimeout();
            }, t2));
          }, n(41), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e2 && e2.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e2 && e2.clearImmediate || this && this.clearImmediate;
        }).call(this, n(9));
      }, function(e, t, n) {
        (function(e2, t2) {
          !function(e3, n2) {
            if (!e3.setImmediate) {
              var r, i, o, s, a, u = 1, c = {}, l = false, d = e3.document, f = Object.getPrototypeOf && Object.getPrototypeOf(e3);
              f = f && f.setTimeout ? f : e3, "[object process]" === {}.toString.call(e3.process) ? r = function(e4) {
                t2.nextTick(function() {
                  p2(e4);
                });
              } : !function() {
                if (e3.postMessage && !e3.importScripts) {
                  var t3 = true, n3 = e3.onmessage;
                  return e3.onmessage = function() {
                    t3 = false;
                  }, e3.postMessage("", "*"), e3.onmessage = n3, t3;
                }
              }() ? e3.MessageChannel ? ((o = new MessageChannel()).port1.onmessage = function(e4) {
                p2(e4.data);
              }, r = function(e4) {
                o.port2.postMessage(e4);
              }) : d && "onreadystatechange" in d.createElement("script") ? (i = d.documentElement, r = function(e4) {
                var t3 = d.createElement("script");
                t3.onreadystatechange = function() {
                  p2(e4), t3.onreadystatechange = null, i.removeChild(t3), t3 = null;
                }, i.appendChild(t3);
              }) : r = function(e4) {
                setTimeout(p2, 0, e4);
              } : (s = "setImmediate$" + Math.random() + "$", a = function(t3) {
                t3.source === e3 && "string" == typeof t3.data && 0 === t3.data.indexOf(s) && p2(+t3.data.slice(s.length));
              }, e3.addEventListener ? e3.addEventListener("message", a, false) : e3.attachEvent("onmessage", a), r = function(t3) {
                e3.postMessage(s + t3, "*");
              }), f.setImmediate = function(e4) {
                "function" != typeof e4 && (e4 = new Function("" + e4));
                for (var t3 = new Array(arguments.length - 1), n3 = 0; n3 < t3.length; n3++) t3[n3] = arguments[n3 + 1];
                var i2 = { callback: e4, args: t3 };
                return c[u] = i2, r(u), u++;
              }, f.clearImmediate = h;
            }
            function h(e4) {
              delete c[e4];
            }
            function p2(e4) {
              if (l) setTimeout(p2, 0, e4);
              else {
                var t3 = c[e4];
                if (t3) {
                  l = true;
                  try {
                    !function(e5) {
                      var t4 = e5.callback, n3 = e5.args;
                      switch (n3.length) {
                        case 0:
                          t4();
                          break;
                        case 1:
                          t4(n3[0]);
                          break;
                        case 2:
                          t4(n3[0], n3[1]);
                          break;
                        case 3:
                          t4(n3[0], n3[1], n3[2]);
                          break;
                        default:
                          t4.apply(void 0, n3);
                      }
                    }(t3);
                  } finally {
                    h(e4), l = false;
                  }
                }
              }
            }
          }("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
        }).call(this, n(9), n(17));
      }, function(e, t, n) {
        (function(e2) {
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <http://feross.org>
           * @license  MIT
           */
          var r = n(43), i = n(44), o = n(45);
          function s() {
            return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
          }
          function a(e3, t2) {
            if (s() < t2) throw new RangeError("Invalid typed array length");
            return u.TYPED_ARRAY_SUPPORT ? (e3 = new Uint8Array(t2)).__proto__ = u.prototype : (null === e3 && (e3 = new u(t2)), e3.length = t2), e3;
          }
          function u(e3, t2, n2) {
            if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e3, t2, n2);
            if ("number" == typeof e3) {
              if ("string" == typeof t2) throw new Error("If encoding is specified then the first argument must be a string");
              return d(this, e3);
            }
            return c(this, e3, t2, n2);
          }
          function c(e3, t2, n2, r2) {
            if ("number" == typeof t2) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t2 instanceof ArrayBuffer ? function(e4, t3, n3, r3) {
              if (t3.byteLength, n3 < 0 || t3.byteLength < n3) throw new RangeError("'offset' is out of bounds");
              if (t3.byteLength < n3 + (r3 || 0)) throw new RangeError("'length' is out of bounds");
              t3 = void 0 === n3 && void 0 === r3 ? new Uint8Array(t3) : void 0 === r3 ? new Uint8Array(t3, n3) : new Uint8Array(t3, n3, r3);
              u.TYPED_ARRAY_SUPPORT ? (e4 = t3).__proto__ = u.prototype : e4 = f(e4, t3);
              return e4;
            }(e3, t2, n2, r2) : "string" == typeof t2 ? function(e4, t3, n3) {
              "string" == typeof n3 && "" !== n3 || (n3 = "utf8");
              if (!u.isEncoding(n3)) throw new TypeError('"encoding" must be a valid string encoding');
              var r3 = 0 | p2(t3, n3), i2 = (e4 = a(e4, r3)).write(t3, n3);
              i2 !== r3 && (e4 = e4.slice(0, i2));
              return e4;
            }(e3, t2, n2) : function(e4, t3) {
              if (u.isBuffer(t3)) {
                var n3 = 0 | h(t3.length);
                return 0 === (e4 = a(e4, n3)).length || t3.copy(e4, 0, 0, n3), e4;
              }
              if (t3) {
                if ("undefined" != typeof ArrayBuffer && t3.buffer instanceof ArrayBuffer || "length" in t3) return "number" != typeof t3.length || (r3 = t3.length) != r3 ? a(e4, 0) : f(e4, t3);
                if ("Buffer" === t3.type && o(t3.data)) return f(e4, t3.data);
              }
              var r3;
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }(e3, t2);
          }
          function l(e3) {
            if ("number" != typeof e3) throw new TypeError('"size" argument must be a number');
            if (e3 < 0) throw new RangeError('"size" argument must not be negative');
          }
          function d(e3, t2) {
            if (l(t2), e3 = a(e3, t2 < 0 ? 0 : 0 | h(t2)), !u.TYPED_ARRAY_SUPPORT) for (var n2 = 0; n2 < t2; ++n2) e3[n2] = 0;
            return e3;
          }
          function f(e3, t2) {
            var n2 = t2.length < 0 ? 0 : 0 | h(t2.length);
            e3 = a(e3, n2);
            for (var r2 = 0; r2 < n2; r2 += 1) e3[r2] = 255 & t2[r2];
            return e3;
          }
          function h(e3) {
            if (e3 >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | e3;
          }
          function p2(e3, t2) {
            if (u.isBuffer(e3)) return e3.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e3) || e3 instanceof ArrayBuffer)) return e3.byteLength;
            "string" != typeof e3 && (e3 = "" + e3);
            var n2 = e3.length;
            if (0 === n2) return 0;
            for (var r2 = false; ; ) switch (t2) {
              case "ascii":
              case "latin1":
              case "binary":
                return n2;
              case "utf8":
              case "utf-8":
              case void 0:
                return q(e3).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * n2;
              case "hex":
                return n2 >>> 1;
              case "base64":
                return F(e3).length;
              default:
                if (r2) return q(e3).length;
                t2 = ("" + t2).toLowerCase(), r2 = true;
            }
          }
          function g(e3, t2, n2) {
            var r2 = false;
            if ((void 0 === t2 || t2 < 0) && (t2 = 0), t2 > this.length) return "";
            if ((void 0 === n2 || n2 > this.length) && (n2 = this.length), n2 <= 0) return "";
            if ((n2 >>>= 0) <= (t2 >>>= 0)) return "";
            for (e3 || (e3 = "utf8"); ; ) switch (e3) {
              case "hex":
                return L(this, t2, n2);
              case "utf8":
              case "utf-8":
                return C(this, t2, n2);
              case "ascii":
                return A(this, t2, n2);
              case "latin1":
              case "binary":
                return I(this, t2, n2);
              case "base64":
                return T(this, t2, n2);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return R(this, t2, n2);
              default:
                if (r2) throw new TypeError("Unknown encoding: " + e3);
                e3 = (e3 + "").toLowerCase(), r2 = true;
            }
          }
          function v(e3, t2, n2) {
            var r2 = e3[t2];
            e3[t2] = e3[n2], e3[n2] = r2;
          }
          function m(e3, t2, n2, r2, i2) {
            if (0 === e3.length) return -1;
            if ("string" == typeof n2 ? (r2 = n2, n2 = 0) : n2 > 2147483647 ? n2 = 2147483647 : n2 < -2147483648 && (n2 = -2147483648), n2 = +n2, isNaN(n2) && (n2 = i2 ? 0 : e3.length - 1), n2 < 0 && (n2 = e3.length + n2), n2 >= e3.length) {
              if (i2) return -1;
              n2 = e3.length - 1;
            } else if (n2 < 0) {
              if (!i2) return -1;
              n2 = 0;
            }
            if ("string" == typeof t2 && (t2 = u.from(t2, r2)), u.isBuffer(t2)) return 0 === t2.length ? -1 : y(e3, t2, n2, r2, i2);
            if ("number" == typeof t2) return t2 &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(e3, t2, n2) : Uint8Array.prototype.lastIndexOf.call(e3, t2, n2) : y(e3, [t2], n2, r2, i2);
            throw new TypeError("val must be string, number or Buffer");
          }
          function y(e3, t2, n2, r2, i2) {
            var o2, s2 = 1, a2 = e3.length, u2 = t2.length;
            if (void 0 !== r2 && ("ucs2" === (r2 = String(r2).toLowerCase()) || "ucs-2" === r2 || "utf16le" === r2 || "utf-16le" === r2)) {
              if (e3.length < 2 || t2.length < 2) return -1;
              s2 = 2, a2 /= 2, u2 /= 2, n2 /= 2;
            }
            function c2(e4, t3) {
              return 1 === s2 ? e4[t3] : e4.readUInt16BE(t3 * s2);
            }
            if (i2) {
              var l2 = -1;
              for (o2 = n2; o2 < a2; o2++) if (c2(e3, o2) === c2(t2, -1 === l2 ? 0 : o2 - l2)) {
                if (-1 === l2 && (l2 = o2), o2 - l2 + 1 === u2) return l2 * s2;
              } else -1 !== l2 && (o2 -= o2 - l2), l2 = -1;
            } else for (n2 + u2 > a2 && (n2 = a2 - u2), o2 = n2; o2 >= 0; o2--) {
              for (var d2 = true, f2 = 0; f2 < u2; f2++) if (c2(e3, o2 + f2) !== c2(t2, f2)) {
                d2 = false;
                break;
              }
              if (d2) return o2;
            }
            return -1;
          }
          function w(e3, t2, n2, r2) {
            n2 = Number(n2) || 0;
            var i2 = e3.length - n2;
            r2 ? (r2 = Number(r2)) > i2 && (r2 = i2) : r2 = i2;
            var o2 = t2.length;
            if (o2 % 2 != 0) throw new TypeError("Invalid hex string");
            r2 > o2 / 2 && (r2 = o2 / 2);
            for (var s2 = 0; s2 < r2; ++s2) {
              var a2 = parseInt(t2.substr(2 * s2, 2), 16);
              if (isNaN(a2)) return s2;
              e3[n2 + s2] = a2;
            }
            return s2;
          }
          function b(e3, t2, n2, r2) {
            return B(q(t2, e3.length - n2), e3, n2, r2);
          }
          function E(e3, t2, n2, r2) {
            return B(function(e4) {
              for (var t3 = [], n3 = 0; n3 < e4.length; ++n3) t3.push(255 & e4.charCodeAt(n3));
              return t3;
            }(t2), e3, n2, r2);
          }
          function S(e3, t2, n2, r2) {
            return E(e3, t2, n2, r2);
          }
          function k(e3, t2, n2, r2) {
            return B(F(t2), e3, n2, r2);
          }
          function O(e3, t2, n2, r2) {
            return B(function(e4, t3) {
              for (var n3, r3, i2, o2 = [], s2 = 0; s2 < e4.length && !((t3 -= 2) < 0); ++s2) n3 = e4.charCodeAt(s2), r3 = n3 >> 8, i2 = n3 % 256, o2.push(i2), o2.push(r3);
              return o2;
            }(t2, e3.length - n2), e3, n2, r2);
          }
          function T(e3, t2, n2) {
            return 0 === t2 && n2 === e3.length ? r.fromByteArray(e3) : r.fromByteArray(e3.slice(t2, n2));
          }
          function C(e3, t2, n2) {
            n2 = Math.min(e3.length, n2);
            for (var r2 = [], i2 = t2; i2 < n2; ) {
              var o2, s2, a2, u2, c2 = e3[i2], l2 = null, d2 = c2 > 239 ? 4 : c2 > 223 ? 3 : c2 > 191 ? 2 : 1;
              if (i2 + d2 <= n2) switch (d2) {
                case 1:
                  c2 < 128 && (l2 = c2);
                  break;
                case 2:
                  128 == (192 & (o2 = e3[i2 + 1])) && (u2 = (31 & c2) << 6 | 63 & o2) > 127 && (l2 = u2);
                  break;
                case 3:
                  o2 = e3[i2 + 1], s2 = e3[i2 + 2], 128 == (192 & o2) && 128 == (192 & s2) && (u2 = (15 & c2) << 12 | (63 & o2) << 6 | 63 & s2) > 2047 && (u2 < 55296 || u2 > 57343) && (l2 = u2);
                  break;
                case 4:
                  o2 = e3[i2 + 1], s2 = e3[i2 + 2], a2 = e3[i2 + 3], 128 == (192 & o2) && 128 == (192 & s2) && 128 == (192 & a2) && (u2 = (15 & c2) << 18 | (63 & o2) << 12 | (63 & s2) << 6 | 63 & a2) > 65535 && u2 < 1114112 && (l2 = u2);
              }
              null === l2 ? (l2 = 65533, d2 = 1) : l2 > 65535 && (l2 -= 65536, r2.push(l2 >>> 10 & 1023 | 55296), l2 = 56320 | 1023 & l2), r2.push(l2), i2 += d2;
            }
            return function(e4) {
              var t3 = e4.length;
              if (t3 <= 4096) return String.fromCharCode.apply(String, e4);
              var n3 = "", r3 = 0;
              for (; r3 < t3; ) n3 += String.fromCharCode.apply(String, e4.slice(r3, r3 += 4096));
              return n3;
            }(r2);
          }
          t.Buffer = u, t.SlowBuffer = function(e3) {
            +e3 != e3 && (e3 = 0);
            return u.alloc(+e3);
          }, t.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== e2.TYPED_ARRAY_SUPPORT ? e2.TYPED_ARRAY_SUPPORT : function() {
            try {
              var e3 = new Uint8Array(1);
              return e3.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                return 42;
              } }, 42 === e3.foo() && "function" == typeof e3.subarray && 0 === e3.subarray(1, 1).byteLength;
            } catch (e4) {
              return false;
            }
          }(), t.kMaxLength = s(), u.poolSize = 8192, u._augment = function(e3) {
            return e3.__proto__ = u.prototype, e3;
          }, u.from = function(e3, t2, n2) {
            return c(null, e3, t2, n2);
          }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: true })), u.alloc = function(e3, t2, n2) {
            return function(e4, t3, n3, r2) {
              return l(t3), t3 <= 0 ? a(e4, t3) : void 0 !== n3 ? "string" == typeof r2 ? a(e4, t3).fill(n3, r2) : a(e4, t3).fill(n3) : a(e4, t3);
            }(null, e3, t2, n2);
          }, u.allocUnsafe = function(e3) {
            return d(null, e3);
          }, u.allocUnsafeSlow = function(e3) {
            return d(null, e3);
          }, u.isBuffer = function(e3) {
            return !(null == e3 || !e3._isBuffer);
          }, u.compare = function(e3, t2) {
            if (!u.isBuffer(e3) || !u.isBuffer(t2)) throw new TypeError("Arguments must be Buffers");
            if (e3 === t2) return 0;
            for (var n2 = e3.length, r2 = t2.length, i2 = 0, o2 = Math.min(n2, r2); i2 < o2; ++i2) if (e3[i2] !== t2[i2]) {
              n2 = e3[i2], r2 = t2[i2];
              break;
            }
            return n2 < r2 ? -1 : r2 < n2 ? 1 : 0;
          }, u.isEncoding = function(e3) {
            switch (String(e3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, u.concat = function(e3, t2) {
            if (!o(e3)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e3.length) return u.alloc(0);
            var n2;
            if (void 0 === t2) for (t2 = 0, n2 = 0; n2 < e3.length; ++n2) t2 += e3[n2].length;
            var r2 = u.allocUnsafe(t2), i2 = 0;
            for (n2 = 0; n2 < e3.length; ++n2) {
              var s2 = e3[n2];
              if (!u.isBuffer(s2)) throw new TypeError('"list" argument must be an Array of Buffers');
              s2.copy(r2, i2), i2 += s2.length;
            }
            return r2;
          }, u.byteLength = p2, u.prototype._isBuffer = true, u.prototype.swap16 = function() {
            var e3 = this.length;
            if (e3 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t2 = 0; t2 < e3; t2 += 2) v(this, t2, t2 + 1);
            return this;
          }, u.prototype.swap32 = function() {
            var e3 = this.length;
            if (e3 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t2 = 0; t2 < e3; t2 += 4) v(this, t2, t2 + 3), v(this, t2 + 1, t2 + 2);
            return this;
          }, u.prototype.swap64 = function() {
            var e3 = this.length;
            if (e3 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t2 = 0; t2 < e3; t2 += 8) v(this, t2, t2 + 7), v(this, t2 + 1, t2 + 6), v(this, t2 + 2, t2 + 5), v(this, t2 + 3, t2 + 4);
            return this;
          }, u.prototype.toString = function() {
            var e3 = 0 | this.length;
            return 0 === e3 ? "" : 0 === arguments.length ? C(this, 0, e3) : g.apply(this, arguments);
          }, u.prototype.equals = function(e3) {
            if (!u.isBuffer(e3)) throw new TypeError("Argument must be a Buffer");
            return this === e3 || 0 === u.compare(this, e3);
          }, u.prototype.inspect = function() {
            var e3 = "", n2 = t.INSPECT_MAX_BYTES;
            return this.length > 0 && (e3 = this.toString("hex", 0, n2).match(/.{2}/g).join(" "), this.length > n2 && (e3 += " ... ")), "<Buffer " + e3 + ">";
          }, u.prototype.compare = function(e3, t2, n2, r2, i2) {
            if (!u.isBuffer(e3)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = e3 ? e3.length : 0), void 0 === r2 && (r2 = 0), void 0 === i2 && (i2 = this.length), t2 < 0 || n2 > e3.length || r2 < 0 || i2 > this.length) throw new RangeError("out of range index");
            if (r2 >= i2 && t2 >= n2) return 0;
            if (r2 >= i2) return -1;
            if (t2 >= n2) return 1;
            if (this === e3) return 0;
            for (var o2 = (i2 >>>= 0) - (r2 >>>= 0), s2 = (n2 >>>= 0) - (t2 >>>= 0), a2 = Math.min(o2, s2), c2 = this.slice(r2, i2), l2 = e3.slice(t2, n2), d2 = 0; d2 < a2; ++d2) if (c2[d2] !== l2[d2]) {
              o2 = c2[d2], s2 = l2[d2];
              break;
            }
            return o2 < s2 ? -1 : s2 < o2 ? 1 : 0;
          }, u.prototype.includes = function(e3, t2, n2) {
            return -1 !== this.indexOf(e3, t2, n2);
          }, u.prototype.indexOf = function(e3, t2, n2) {
            return m(this, e3, t2, n2, true);
          }, u.prototype.lastIndexOf = function(e3, t2, n2) {
            return m(this, e3, t2, n2, false);
          }, u.prototype.write = function(e3, t2, n2, r2) {
            if (void 0 === t2) r2 = "utf8", n2 = this.length, t2 = 0;
            else if (void 0 === n2 && "string" == typeof t2) r2 = t2, n2 = this.length, t2 = 0;
            else {
              if (!isFinite(t2)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              t2 |= 0, isFinite(n2) ? (n2 |= 0, void 0 === r2 && (r2 = "utf8")) : (r2 = n2, n2 = void 0);
            }
            var i2 = this.length - t2;
            if ((void 0 === n2 || n2 > i2) && (n2 = i2), e3.length > 0 && (n2 < 0 || t2 < 0) || t2 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r2 || (r2 = "utf8");
            for (var o2 = false; ; ) switch (r2) {
              case "hex":
                return w(this, e3, t2, n2);
              case "utf8":
              case "utf-8":
                return b(this, e3, t2, n2);
              case "ascii":
                return E(this, e3, t2, n2);
              case "latin1":
              case "binary":
                return S(this, e3, t2, n2);
              case "base64":
                return k(this, e3, t2, n2);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return O(this, e3, t2, n2);
              default:
                if (o2) throw new TypeError("Unknown encoding: " + r2);
                r2 = ("" + r2).toLowerCase(), o2 = true;
            }
          }, u.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          };
          function A(e3, t2, n2) {
            var r2 = "";
            n2 = Math.min(e3.length, n2);
            for (var i2 = t2; i2 < n2; ++i2) r2 += String.fromCharCode(127 & e3[i2]);
            return r2;
          }
          function I(e3, t2, n2) {
            var r2 = "";
            n2 = Math.min(e3.length, n2);
            for (var i2 = t2; i2 < n2; ++i2) r2 += String.fromCharCode(e3[i2]);
            return r2;
          }
          function L(e3, t2, n2) {
            var r2 = e3.length;
            (!t2 || t2 < 0) && (t2 = 0), (!n2 || n2 < 0 || n2 > r2) && (n2 = r2);
            for (var i2 = "", o2 = t2; o2 < n2; ++o2) i2 += U(e3[o2]);
            return i2;
          }
          function R(e3, t2, n2) {
            for (var r2 = e3.slice(t2, n2), i2 = "", o2 = 0; o2 < r2.length; o2 += 2) i2 += String.fromCharCode(r2[o2] + 256 * r2[o2 + 1]);
            return i2;
          }
          function x(e3, t2, n2) {
            if (e3 % 1 != 0 || e3 < 0) throw new RangeError("offset is not uint");
            if (e3 + t2 > n2) throw new RangeError("Trying to access beyond buffer length");
          }
          function _(e3, t2, n2, r2, i2, o2) {
            if (!u.isBuffer(e3)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t2 > i2 || t2 < o2) throw new RangeError('"value" argument is out of bounds');
            if (n2 + r2 > e3.length) throw new RangeError("Index out of range");
          }
          function N(e3, t2, n2, r2) {
            t2 < 0 && (t2 = 65535 + t2 + 1);
            for (var i2 = 0, o2 = Math.min(e3.length - n2, 2); i2 < o2; ++i2) e3[n2 + i2] = (t2 & 255 << 8 * (r2 ? i2 : 1 - i2)) >>> 8 * (r2 ? i2 : 1 - i2);
          }
          function D(e3, t2, n2, r2) {
            t2 < 0 && (t2 = 4294967295 + t2 + 1);
            for (var i2 = 0, o2 = Math.min(e3.length - n2, 4); i2 < o2; ++i2) e3[n2 + i2] = t2 >>> 8 * (r2 ? i2 : 3 - i2) & 255;
          }
          function M(e3, t2, n2, r2, i2, o2) {
            if (n2 + r2 > e3.length) throw new RangeError("Index out of range");
            if (n2 < 0) throw new RangeError("Index out of range");
          }
          function P(e3, t2, n2, r2, o2) {
            return o2 || M(e3, 0, n2, 4), i.write(e3, t2, n2, r2, 23, 4), n2 + 4;
          }
          function j(e3, t2, n2, r2, o2) {
            return o2 || M(e3, 0, n2, 8), i.write(e3, t2, n2, r2, 52, 8), n2 + 8;
          }
          u.prototype.slice = function(e3, t2) {
            var n2, r2 = this.length;
            if ((e3 = ~~e3) < 0 ? (e3 += r2) < 0 && (e3 = 0) : e3 > r2 && (e3 = r2), (t2 = void 0 === t2 ? r2 : ~~t2) < 0 ? (t2 += r2) < 0 && (t2 = 0) : t2 > r2 && (t2 = r2), t2 < e3 && (t2 = e3), u.TYPED_ARRAY_SUPPORT) (n2 = this.subarray(e3, t2)).__proto__ = u.prototype;
            else {
              var i2 = t2 - e3;
              n2 = new u(i2, void 0);
              for (var o2 = 0; o2 < i2; ++o2) n2[o2] = this[o2 + e3];
            }
            return n2;
          }, u.prototype.readUIntLE = function(e3, t2, n2) {
            e3 |= 0, t2 |= 0, n2 || x(e3, t2, this.length);
            for (var r2 = this[e3], i2 = 1, o2 = 0; ++o2 < t2 && (i2 *= 256); ) r2 += this[e3 + o2] * i2;
            return r2;
          }, u.prototype.readUIntBE = function(e3, t2, n2) {
            e3 |= 0, t2 |= 0, n2 || x(e3, t2, this.length);
            for (var r2 = this[e3 + --t2], i2 = 1; t2 > 0 && (i2 *= 256); ) r2 += this[e3 + --t2] * i2;
            return r2;
          }, u.prototype.readUInt8 = function(e3, t2) {
            return t2 || x(e3, 1, this.length), this[e3];
          }, u.prototype.readUInt16LE = function(e3, t2) {
            return t2 || x(e3, 2, this.length), this[e3] | this[e3 + 1] << 8;
          }, u.prototype.readUInt16BE = function(e3, t2) {
            return t2 || x(e3, 2, this.length), this[e3] << 8 | this[e3 + 1];
          }, u.prototype.readUInt32LE = function(e3, t2) {
            return t2 || x(e3, 4, this.length), (this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16) + 16777216 * this[e3 + 3];
          }, u.prototype.readUInt32BE = function(e3, t2) {
            return t2 || x(e3, 4, this.length), 16777216 * this[e3] + (this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3]);
          }, u.prototype.readIntLE = function(e3, t2, n2) {
            e3 |= 0, t2 |= 0, n2 || x(e3, t2, this.length);
            for (var r2 = this[e3], i2 = 1, o2 = 0; ++o2 < t2 && (i2 *= 256); ) r2 += this[e3 + o2] * i2;
            return r2 >= (i2 *= 128) && (r2 -= Math.pow(2, 8 * t2)), r2;
          }, u.prototype.readIntBE = function(e3, t2, n2) {
            e3 |= 0, t2 |= 0, n2 || x(e3, t2, this.length);
            for (var r2 = t2, i2 = 1, o2 = this[e3 + --r2]; r2 > 0 && (i2 *= 256); ) o2 += this[e3 + --r2] * i2;
            return o2 >= (i2 *= 128) && (o2 -= Math.pow(2, 8 * t2)), o2;
          }, u.prototype.readInt8 = function(e3, t2) {
            return t2 || x(e3, 1, this.length), 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
          }, u.prototype.readInt16LE = function(e3, t2) {
            t2 || x(e3, 2, this.length);
            var n2 = this[e3] | this[e3 + 1] << 8;
            return 32768 & n2 ? 4294901760 | n2 : n2;
          }, u.prototype.readInt16BE = function(e3, t2) {
            t2 || x(e3, 2, this.length);
            var n2 = this[e3 + 1] | this[e3] << 8;
            return 32768 & n2 ? 4294901760 | n2 : n2;
          }, u.prototype.readInt32LE = function(e3, t2) {
            return t2 || x(e3, 4, this.length), this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16 | this[e3 + 3] << 24;
          }, u.prototype.readInt32BE = function(e3, t2) {
            return t2 || x(e3, 4, this.length), this[e3] << 24 | this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3];
          }, u.prototype.readFloatLE = function(e3, t2) {
            return t2 || x(e3, 4, this.length), i.read(this, e3, true, 23, 4);
          }, u.prototype.readFloatBE = function(e3, t2) {
            return t2 || x(e3, 4, this.length), i.read(this, e3, false, 23, 4);
          }, u.prototype.readDoubleLE = function(e3, t2) {
            return t2 || x(e3, 8, this.length), i.read(this, e3, true, 52, 8);
          }, u.prototype.readDoubleBE = function(e3, t2) {
            return t2 || x(e3, 8, this.length), i.read(this, e3, false, 52, 8);
          }, u.prototype.writeUIntLE = function(e3, t2, n2, r2) {
            (e3 = +e3, t2 |= 0, n2 |= 0, r2) || _(this, e3, t2, n2, Math.pow(2, 8 * n2) - 1, 0);
            var i2 = 1, o2 = 0;
            for (this[t2] = 255 & e3; ++o2 < n2 && (i2 *= 256); ) this[t2 + o2] = e3 / i2 & 255;
            return t2 + n2;
          }, u.prototype.writeUIntBE = function(e3, t2, n2, r2) {
            (e3 = +e3, t2 |= 0, n2 |= 0, r2) || _(this, e3, t2, n2, Math.pow(2, 8 * n2) - 1, 0);
            var i2 = n2 - 1, o2 = 1;
            for (this[t2 + i2] = 255 & e3; --i2 >= 0 && (o2 *= 256); ) this[t2 + i2] = e3 / o2 & 255;
            return t2 + n2;
          }, u.prototype.writeUInt8 = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e3 = Math.floor(e3)), this[t2] = 255 & e3, t2 + 1;
          }, u.prototype.writeUInt16LE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t2] = 255 & e3, this[t2 + 1] = e3 >>> 8) : N(this, e3, t2, true), t2 + 2;
          }, u.prototype.writeUInt16BE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t2] = e3 >>> 8, this[t2 + 1] = 255 & e3) : N(this, e3, t2, false), t2 + 2;
          }, u.prototype.writeUInt32LE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t2 + 3] = e3 >>> 24, this[t2 + 2] = e3 >>> 16, this[t2 + 1] = e3 >>> 8, this[t2] = 255 & e3) : D(this, e3, t2, true), t2 + 4;
          }, u.prototype.writeUInt32BE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t2] = e3 >>> 24, this[t2 + 1] = e3 >>> 16, this[t2 + 2] = e3 >>> 8, this[t2 + 3] = 255 & e3) : D(this, e3, t2, false), t2 + 4;
          }, u.prototype.writeIntLE = function(e3, t2, n2, r2) {
            if (e3 = +e3, t2 |= 0, !r2) {
              var i2 = Math.pow(2, 8 * n2 - 1);
              _(this, e3, t2, n2, i2 - 1, -i2);
            }
            var o2 = 0, s2 = 1, a2 = 0;
            for (this[t2] = 255 & e3; ++o2 < n2 && (s2 *= 256); ) e3 < 0 && 0 === a2 && 0 !== this[t2 + o2 - 1] && (a2 = 1), this[t2 + o2] = (e3 / s2 >> 0) - a2 & 255;
            return t2 + n2;
          }, u.prototype.writeIntBE = function(e3, t2, n2, r2) {
            if (e3 = +e3, t2 |= 0, !r2) {
              var i2 = Math.pow(2, 8 * n2 - 1);
              _(this, e3, t2, n2, i2 - 1, -i2);
            }
            var o2 = n2 - 1, s2 = 1, a2 = 0;
            for (this[t2 + o2] = 255 & e3; --o2 >= 0 && (s2 *= 256); ) e3 < 0 && 0 === a2 && 0 !== this[t2 + o2 + 1] && (a2 = 1), this[t2 + o2] = (e3 / s2 >> 0) - a2 & 255;
            return t2 + n2;
          }, u.prototype.writeInt8 = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e3 = Math.floor(e3)), e3 < 0 && (e3 = 255 + e3 + 1), this[t2] = 255 & e3, t2 + 1;
          }, u.prototype.writeInt16LE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t2] = 255 & e3, this[t2 + 1] = e3 >>> 8) : N(this, e3, t2, true), t2 + 2;
          }, u.prototype.writeInt16BE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t2] = e3 >>> 8, this[t2 + 1] = 255 & e3) : N(this, e3, t2, false), t2 + 2;
          }, u.prototype.writeInt32LE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t2] = 255 & e3, this[t2 + 1] = e3 >>> 8, this[t2 + 2] = e3 >>> 16, this[t2 + 3] = e3 >>> 24) : D(this, e3, t2, true), t2 + 4;
          }, u.prototype.writeInt32BE = function(e3, t2, n2) {
            return e3 = +e3, t2 |= 0, n2 || _(this, e3, t2, 4, 2147483647, -2147483648), e3 < 0 && (e3 = 4294967295 + e3 + 1), u.TYPED_ARRAY_SUPPORT ? (this[t2] = e3 >>> 24, this[t2 + 1] = e3 >>> 16, this[t2 + 2] = e3 >>> 8, this[t2 + 3] = 255 & e3) : D(this, e3, t2, false), t2 + 4;
          }, u.prototype.writeFloatLE = function(e3, t2, n2) {
            return P(this, e3, t2, true, n2);
          }, u.prototype.writeFloatBE = function(e3, t2, n2) {
            return P(this, e3, t2, false, n2);
          }, u.prototype.writeDoubleLE = function(e3, t2, n2) {
            return j(this, e3, t2, true, n2);
          }, u.prototype.writeDoubleBE = function(e3, t2, n2) {
            return j(this, e3, t2, false, n2);
          }, u.prototype.copy = function(e3, t2, n2, r2) {
            if (n2 || (n2 = 0), r2 || 0 === r2 || (r2 = this.length), t2 >= e3.length && (t2 = e3.length), t2 || (t2 = 0), r2 > 0 && r2 < n2 && (r2 = n2), r2 === n2) return 0;
            if (0 === e3.length || 0 === this.length) return 0;
            if (t2 < 0) throw new RangeError("targetStart out of bounds");
            if (n2 < 0 || n2 >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r2 < 0) throw new RangeError("sourceEnd out of bounds");
            r2 > this.length && (r2 = this.length), e3.length - t2 < r2 - n2 && (r2 = e3.length - t2 + n2);
            var i2, o2 = r2 - n2;
            if (this === e3 && n2 < t2 && t2 < r2) for (i2 = o2 - 1; i2 >= 0; --i2) e3[i2 + t2] = this[i2 + n2];
            else if (o2 < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (i2 = 0; i2 < o2; ++i2) e3[i2 + t2] = this[i2 + n2];
            else Uint8Array.prototype.set.call(e3, this.subarray(n2, n2 + o2), t2);
            return o2;
          }, u.prototype.fill = function(e3, t2, n2, r2) {
            if ("string" == typeof e3) {
              if ("string" == typeof t2 ? (r2 = t2, t2 = 0, n2 = this.length) : "string" == typeof n2 && (r2 = n2, n2 = this.length), 1 === e3.length) {
                var i2 = e3.charCodeAt(0);
                i2 < 256 && (e3 = i2);
              }
              if (void 0 !== r2 && "string" != typeof r2) throw new TypeError("encoding must be a string");
              if ("string" == typeof r2 && !u.isEncoding(r2)) throw new TypeError("Unknown encoding: " + r2);
            } else "number" == typeof e3 && (e3 &= 255);
            if (t2 < 0 || this.length < t2 || this.length < n2) throw new RangeError("Out of range index");
            if (n2 <= t2) return this;
            var o2;
            if (t2 >>>= 0, n2 = void 0 === n2 ? this.length : n2 >>> 0, e3 || (e3 = 0), "number" == typeof e3) for (o2 = t2; o2 < n2; ++o2) this[o2] = e3;
            else {
              var s2 = u.isBuffer(e3) ? e3 : q(new u(e3, r2).toString()), a2 = s2.length;
              for (o2 = 0; o2 < n2 - t2; ++o2) this[o2 + t2] = s2[o2 % a2];
            }
            return this;
          };
          var V = /[^+\/0-9A-Za-z-_]/g;
          function U(e3) {
            return e3 < 16 ? "0" + e3.toString(16) : e3.toString(16);
          }
          function q(e3, t2) {
            var n2;
            t2 = t2 || 1 / 0;
            for (var r2 = e3.length, i2 = null, o2 = [], s2 = 0; s2 < r2; ++s2) {
              if ((n2 = e3.charCodeAt(s2)) > 55295 && n2 < 57344) {
                if (!i2) {
                  if (n2 > 56319) {
                    (t2 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  if (s2 + 1 === r2) {
                    (t2 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  i2 = n2;
                  continue;
                }
                if (n2 < 56320) {
                  (t2 -= 3) > -1 && o2.push(239, 191, 189), i2 = n2;
                  continue;
                }
                n2 = 65536 + (i2 - 55296 << 10 | n2 - 56320);
              } else i2 && (t2 -= 3) > -1 && o2.push(239, 191, 189);
              if (i2 = null, n2 < 128) {
                if ((t2 -= 1) < 0) break;
                o2.push(n2);
              } else if (n2 < 2048) {
                if ((t2 -= 2) < 0) break;
                o2.push(n2 >> 6 | 192, 63 & n2 | 128);
              } else if (n2 < 65536) {
                if ((t2 -= 3) < 0) break;
                o2.push(n2 >> 12 | 224, n2 >> 6 & 63 | 128, 63 & n2 | 128);
              } else {
                if (!(n2 < 1114112)) throw new Error("Invalid code point");
                if ((t2 -= 4) < 0) break;
                o2.push(n2 >> 18 | 240, n2 >> 12 & 63 | 128, n2 >> 6 & 63 | 128, 63 & n2 | 128);
              }
            }
            return o2;
          }
          function F(e3) {
            return r.toByteArray(function(e4) {
              if ((e4 = function(e5) {
                return e5.trim ? e5.trim() : e5.replace(/^\s+|\s+$/g, "");
              }(e4).replace(V, "")).length < 2) return "";
              for (; e4.length % 4 != 0; ) e4 += "=";
              return e4;
            }(e3));
          }
          function B(e3, t2, n2, r2) {
            for (var i2 = 0; i2 < r2 && !(i2 + n2 >= t2.length || i2 >= e3.length); ++i2) t2[i2 + n2] = e3[i2];
            return i2;
          }
        }).call(this, n(9));
      }, function(e, t, n) {
        t.byteLength = function(e2) {
          var t2 = c(e2), n2 = t2[0], r2 = t2[1];
          return 3 * (n2 + r2) / 4 - r2;
        }, t.toByteArray = function(e2) {
          var t2, n2, r2 = c(e2), s2 = r2[0], a2 = r2[1], u2 = new o(function(e3, t3, n3) {
            return 3 * (t3 + n3) / 4 - n3;
          }(0, s2, a2)), l2 = 0, d = a2 > 0 ? s2 - 4 : s2;
          for (n2 = 0; n2 < d; n2 += 4) t2 = i[e2.charCodeAt(n2)] << 18 | i[e2.charCodeAt(n2 + 1)] << 12 | i[e2.charCodeAt(n2 + 2)] << 6 | i[e2.charCodeAt(n2 + 3)], u2[l2++] = t2 >> 16 & 255, u2[l2++] = t2 >> 8 & 255, u2[l2++] = 255 & t2;
          2 === a2 && (t2 = i[e2.charCodeAt(n2)] << 2 | i[e2.charCodeAt(n2 + 1)] >> 4, u2[l2++] = 255 & t2);
          1 === a2 && (t2 = i[e2.charCodeAt(n2)] << 10 | i[e2.charCodeAt(n2 + 1)] << 4 | i[e2.charCodeAt(n2 + 2)] >> 2, u2[l2++] = t2 >> 8 & 255, u2[l2++] = 255 & t2);
          return u2;
        }, t.fromByteArray = function(e2) {
          for (var t2, n2 = e2.length, i2 = n2 % 3, o2 = [], s2 = 0, a2 = n2 - i2; s2 < a2; s2 += 16383) o2.push(l(e2, s2, s2 + 16383 > a2 ? a2 : s2 + 16383));
          1 === i2 ? (t2 = e2[n2 - 1], o2.push(r[t2 >> 2] + r[t2 << 4 & 63] + "==")) : 2 === i2 && (t2 = (e2[n2 - 2] << 8) + e2[n2 - 1], o2.push(r[t2 >> 10] + r[t2 >> 4 & 63] + r[t2 << 2 & 63] + "="));
          return o2.join("");
        };
        for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a) r[a] = s[a], i[s.charCodeAt(a)] = a;
        function c(e2) {
          var t2 = e2.length;
          if (t2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
          var n2 = e2.indexOf("=");
          return -1 === n2 && (n2 = t2), [n2, n2 === t2 ? 0 : 4 - n2 % 4];
        }
        function l(e2, t2, n2) {
          for (var i2, o2, s2 = [], a2 = t2; a2 < n2; a2 += 3) i2 = (e2[a2] << 16 & 16711680) + (e2[a2 + 1] << 8 & 65280) + (255 & e2[a2 + 2]), s2.push(r[(o2 = i2) >> 18 & 63] + r[o2 >> 12 & 63] + r[o2 >> 6 & 63] + r[63 & o2]);
          return s2.join("");
        }
        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
      }, function(e, t) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        t.read = function(e2, t2, n, r, i) {
          var o, s, a = 8 * i - r - 1, u = (1 << a) - 1, c = u >> 1, l = -7, d = n ? i - 1 : 0, f = n ? -1 : 1, h = e2[t2 + d];
          for (d += f, o = h & (1 << -l) - 1, h >>= -l, l += a; l > 0; o = 256 * o + e2[t2 + d], d += f, l -= 8) ;
          for (s = o & (1 << -l) - 1, o >>= -l, l += r; l > 0; s = 256 * s + e2[t2 + d], d += f, l -= 8) ;
          if (0 === o) o = 1 - c;
          else {
            if (o === u) return s ? NaN : 1 / 0 * (h ? -1 : 1);
            s += Math.pow(2, r), o -= c;
          }
          return (h ? -1 : 1) * s * Math.pow(2, o - r);
        }, t.write = function(e2, t2, n, r, i, o) {
          var s, a, u, c = 8 * o - i - 1, l = (1 << c) - 1, d = l >> 1, f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r ? 0 : o - 1, p2 = r ? 1 : -1, g = t2 < 0 || 0 === t2 && 1 / t2 < 0 ? 1 : 0;
          for (t2 = Math.abs(t2), isNaN(t2) || t2 === 1 / 0 ? (a = isNaN(t2) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t2) / Math.LN2), t2 * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t2 += s + d >= 1 ? f / u : f * Math.pow(2, 1 - d)) * u >= 2 && (s++, u /= 2), s + d >= l ? (a = 0, s = l) : s + d >= 1 ? (a = (t2 * u - 1) * Math.pow(2, i), s += d) : (a = t2 * Math.pow(2, d - 1) * Math.pow(2, i), s = 0)); i >= 8; e2[n + h] = 255 & a, h += p2, a /= 256, i -= 8) ;
          for (s = s << i | a, c += i; c > 0; e2[n + h] = 255 & s, h += p2, s /= 256, c -= 8) ;
          e2[n + h - p2] |= 128 * g;
        };
      }, function(e, t) {
        var n = {}.toString;
        e.exports = Array.isArray || function(e2) {
          return "[object Array]" == n.call(e2);
        };
      }, function(e, t, n) {
        n.r(t);
        var r = n(7), i = n(18);
        function o(e2, t2) {
          if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e2, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
          }
        }
        var a = function() {
          return { loadPath: "/locales/{{lng}}/{{ns}}.json", addPath: "/locales/add/{{lng}}/{{ns}}", allowMultiLoading: false, parse: function(e2) {
            return JSON.parse(e2);
          }, stringify: JSON.stringify, parsePayload: function(e2, t2, n2) {
            return function(e3, t3, n3) {
              return t3 in e3 ? Object.defineProperty(e3, t3, { value: n3, enumerable: true, configurable: true, writable: true }) : e3[t3] = n3, e3;
            }({}, t2, n2 || "");
          }, request: i.a, reloadInterval: "undefined" == typeof window && 36e5, customHeaders: {}, queryStringParams: {}, crossDomain: false, withCredentials: false, overrideMimeType: false, requestOptions: { mode: "cors", credentials: "same-origin", cache: "default" } };
        }, u = function() {
          function e2(t3) {
            var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            o(this, e2), this.services = t3, this.options = n3, this.allOptions = r2, this.type = "backend", this.init(t3, n3, r2);
          }
          var t2, n2;
          return t2 = e2, (n2 = [{ key: "init", value: function(e3) {
            var t3 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            this.services = e3, this.options = Object(r.a)(n3, this.options || {}, a()), this.allOptions = i2, this.services && this.options.reloadInterval && setInterval(function() {
              return t3.reload();
            }, this.options.reloadInterval);
          } }, { key: "readMulti", value: function(e3, t3, n3) {
            this._readAny(e3, e3, t3, t3, n3);
          } }, { key: "read", value: function(e3, t3, n3) {
            this._readAny([e3], e3, [t3], t3, n3);
          } }, { key: "_readAny", value: function(e3, t3, n3, i2, o2) {
            var s2 = this, a2 = this.options.loadPath;
            "function" == typeof this.options.loadPath && (a2 = this.options.loadPath(e3, n3)), (a2 = Object(r.c)(a2)).then(function(r2) {
              if (!r2) return o2(null, {});
              var a3 = s2.services.interpolator.interpolate(r2, { lng: e3.join("+"), ns: n3.join("+") });
              s2.loadUrl(a3, o2, t3, i2);
            });
          } }, { key: "loadUrl", value: function(e3, t3, n3, r2) {
            var i2 = this;
            this.options.request(this.options, e3, void 0, function(o2, s2) {
              if (s2 && (s2.status >= 500 && s2.status < 600 || !s2.status)) return t3("failed loading " + e3 + "; status code: " + s2.status, true);
              if (s2 && s2.status >= 400 && s2.status < 500) return t3("failed loading " + e3 + "; status code: " + s2.status, false);
              if (!s2 && o2 && o2.message && o2.message.indexOf("Failed to fetch") > -1) return t3("failed loading " + e3 + ": " + o2.message, true);
              if (o2) return t3(o2, false);
              var a2, u2;
              try {
                a2 = "string" == typeof s2.data ? i2.options.parse(s2.data, n3, r2) : s2.data;
              } catch (t4) {
                u2 = "failed parsing " + e3 + " to json";
              }
              if (u2) return t3(u2, false);
              t3(null, a2);
            });
          } }, { key: "create", value: function(e3, t3, n3, r2, i2) {
            var o2 = this;
            if (this.options.addPath) {
              "string" == typeof e3 && (e3 = [e3]);
              var s2 = this.options.parsePayload(t3, n3, r2), a2 = 0, u2 = [], c = [];
              e3.forEach(function(n4) {
                var r3 = o2.options.addPath;
                "function" == typeof o2.options.addPath && (r3 = o2.options.addPath(n4, t3));
                var l = o2.services.interpolator.interpolate(r3, { lng: n4, ns: t3 });
                o2.options.request(o2.options, l, s2, function(t4, n5) {
                  a2 += 1, u2.push(t4), c.push(n5), a2 === e3.length && i2 && i2(u2, c);
                });
              });
            }
          } }, { key: "reload", value: function() {
            var e3 = this, t3 = this.services, n3 = t3.backendConnector, r2 = t3.languageUtils, i2 = t3.logger, o2 = n3.language;
            if (!o2 || "cimode" !== o2.toLowerCase()) {
              var s2 = [], a2 = function(e4) {
                r2.toResolveHierarchy(e4).forEach(function(e5) {
                  s2.indexOf(e5) < 0 && s2.push(e5);
                });
              };
              a2(o2), this.allOptions.preload && this.allOptions.preload.forEach(function(e4) {
                return a2(e4);
              }), s2.forEach(function(t4) {
                e3.allOptions.ns.forEach(function(e4) {
                  n3.read(t4, e4, "read", null, null, function(r3, o3) {
                    r3 && i2.warn("loading namespace ".concat(e4, " for language ").concat(t4, " failed"), r3), !r3 && o3 && i2.log("loaded namespace ".concat(e4, " for language ").concat(t4), o3), n3.loaded("".concat(t4, "|").concat(e4), r3, o3);
                  });
                });
              });
            }
          } }]) && s(t2.prototype, n2), Object.defineProperty(t2, "prototype", { writable: false }), e2;
        }();
        u.type = "backend", t.default = u;
      }, function(e, t) {
        var n = "undefined" != typeof self ? self : this, r = function() {
          function e2() {
            this.fetch = false, this.DOMException = n.DOMException;
          }
          return e2.prototype = n, new e2();
        }();
        !function(e2) {
          !function(t2) {
            var n2 = "URLSearchParams" in e2, r2 = "Symbol" in e2 && "iterator" in Symbol, i2 = "FileReader" in e2 && "Blob" in e2 && function() {
              try {
                return new Blob(), true;
              } catch (e3) {
                return false;
              }
            }(), o = "FormData" in e2, s = "ArrayBuffer" in e2;
            if (s) var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], u = ArrayBuffer.isView || function(e3) {
              return e3 && a.indexOf(Object.prototype.toString.call(e3)) > -1;
            };
            function c(e3) {
              if ("string" != typeof e3 && (e3 = String(e3)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e3)) throw new TypeError("Invalid character in header field name");
              return e3.toLowerCase();
            }
            function l(e3) {
              return "string" != typeof e3 && (e3 = String(e3)), e3;
            }
            function d(e3) {
              var t3 = { next: function() {
                var t4 = e3.shift();
                return { done: void 0 === t4, value: t4 };
              } };
              return r2 && (t3[Symbol.iterator] = function() {
                return t3;
              }), t3;
            }
            function f(e3) {
              this.map = {}, e3 instanceof f ? e3.forEach(function(e4, t3) {
                this.append(t3, e4);
              }, this) : Array.isArray(e3) ? e3.forEach(function(e4) {
                this.append(e4[0], e4[1]);
              }, this) : e3 && Object.getOwnPropertyNames(e3).forEach(function(t3) {
                this.append(t3, e3[t3]);
              }, this);
            }
            function h(e3) {
              if (e3.bodyUsed) return Promise.reject(new TypeError("Already read"));
              e3.bodyUsed = true;
            }
            function p2(e3) {
              return new Promise(function(t3, n3) {
                e3.onload = function() {
                  t3(e3.result);
                }, e3.onerror = function() {
                  n3(e3.error);
                };
              });
            }
            function g(e3) {
              var t3 = new FileReader(), n3 = p2(t3);
              return t3.readAsArrayBuffer(e3), n3;
            }
            function v(e3) {
              if (e3.slice) return e3.slice(0);
              var t3 = new Uint8Array(e3.byteLength);
              return t3.set(new Uint8Array(e3)), t3.buffer;
            }
            function m() {
              return this.bodyUsed = false, this._initBody = function(e3) {
                var t3;
                this._bodyInit = e3, e3 ? "string" == typeof e3 ? this._bodyText = e3 : i2 && Blob.prototype.isPrototypeOf(e3) ? this._bodyBlob = e3 : o && FormData.prototype.isPrototypeOf(e3) ? this._bodyFormData = e3 : n2 && URLSearchParams.prototype.isPrototypeOf(e3) ? this._bodyText = e3.toString() : s && i2 && ((t3 = e3) && DataView.prototype.isPrototypeOf(t3)) ? (this._bodyArrayBuffer = v(e3.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : s && (ArrayBuffer.prototype.isPrototypeOf(e3) || u(e3)) ? this._bodyArrayBuffer = v(e3) : this._bodyText = e3 = Object.prototype.toString.call(e3) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e3 ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : n2 && URLSearchParams.prototype.isPrototypeOf(e3) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
              }, i2 && (this.blob = function() {
                var e3 = h(this);
                if (e3) return e3;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]));
              }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(g);
              }), this.text = function() {
                var e3, t3, n3, r3 = h(this);
                if (r3) return r3;
                if (this._bodyBlob) return e3 = this._bodyBlob, t3 = new FileReader(), n3 = p2(t3), t3.readAsText(e3), n3;
                if (this._bodyArrayBuffer) return Promise.resolve(function(e4) {
                  for (var t4 = new Uint8Array(e4), n4 = new Array(t4.length), r4 = 0; r4 < t4.length; r4++) n4[r4] = String.fromCharCode(t4[r4]);
                  return n4.join("");
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText);
              }, o && (this.formData = function() {
                return this.text().then(b);
              }), this.json = function() {
                return this.text().then(JSON.parse);
              }, this;
            }
            f.prototype.append = function(e3, t3) {
              e3 = c(e3), t3 = l(t3);
              var n3 = this.map[e3];
              this.map[e3] = n3 ? n3 + ", " + t3 : t3;
            }, f.prototype.delete = function(e3) {
              delete this.map[c(e3)];
            }, f.prototype.get = function(e3) {
              return e3 = c(e3), this.has(e3) ? this.map[e3] : null;
            }, f.prototype.has = function(e3) {
              return this.map.hasOwnProperty(c(e3));
            }, f.prototype.set = function(e3, t3) {
              this.map[c(e3)] = l(t3);
            }, f.prototype.forEach = function(e3, t3) {
              for (var n3 in this.map) this.map.hasOwnProperty(n3) && e3.call(t3, this.map[n3], n3, this);
            }, f.prototype.keys = function() {
              var e3 = [];
              return this.forEach(function(t3, n3) {
                e3.push(n3);
              }), d(e3);
            }, f.prototype.values = function() {
              var e3 = [];
              return this.forEach(function(t3) {
                e3.push(t3);
              }), d(e3);
            }, f.prototype.entries = function() {
              var e3 = [];
              return this.forEach(function(t3, n3) {
                e3.push([n3, t3]);
              }), d(e3);
            }, r2 && (f.prototype[Symbol.iterator] = f.prototype.entries);
            var y = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            function w(e3, t3) {
              var n3, r3, i3 = (t3 = t3 || {}).body;
              if (e3 instanceof w) {
                if (e3.bodyUsed) throw new TypeError("Already read");
                this.url = e3.url, this.credentials = e3.credentials, t3.headers || (this.headers = new f(e3.headers)), this.method = e3.method, this.mode = e3.mode, this.signal = e3.signal, i3 || null == e3._bodyInit || (i3 = e3._bodyInit, e3.bodyUsed = true);
              } else this.url = String(e3);
              if (this.credentials = t3.credentials || this.credentials || "same-origin", !t3.headers && this.headers || (this.headers = new f(t3.headers)), this.method = (n3 = t3.method || this.method || "GET", r3 = n3.toUpperCase(), y.indexOf(r3) > -1 ? r3 : n3), this.mode = t3.mode || this.mode || null, this.signal = t3.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i3) throw new TypeError("Body not allowed for GET or HEAD requests");
              this._initBody(i3);
            }
            function b(e3) {
              var t3 = new FormData();
              return e3.trim().split("&").forEach(function(e4) {
                if (e4) {
                  var n3 = e4.split("="), r3 = n3.shift().replace(/\+/g, " "), i3 = n3.join("=").replace(/\+/g, " ");
                  t3.append(decodeURIComponent(r3), decodeURIComponent(i3));
                }
              }), t3;
            }
            function E(e3, t3) {
              t3 || (t3 = {}), this.type = "default", this.status = void 0 === t3.status ? 200 : t3.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t3 ? t3.statusText : "OK", this.headers = new f(t3.headers), this.url = t3.url || "", this._initBody(e3);
            }
            w.prototype.clone = function() {
              return new w(this, { body: this._bodyInit });
            }, m.call(w.prototype), m.call(E.prototype), E.prototype.clone = function() {
              return new E(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new f(this.headers), url: this.url });
            }, E.error = function() {
              var e3 = new E(null, { status: 0, statusText: "" });
              return e3.type = "error", e3;
            };
            var S = [301, 302, 303, 307, 308];
            E.redirect = function(e3, t3) {
              if (-1 === S.indexOf(t3)) throw new RangeError("Invalid status code");
              return new E(null, { status: t3, headers: { location: e3 } });
            }, t2.DOMException = e2.DOMException;
            try {
              new t2.DOMException();
            } catch (e3) {
              t2.DOMException = function(e4, t3) {
                this.message = e4, this.name = t3;
                var n3 = Error(e4);
                this.stack = n3.stack;
              }, t2.DOMException.prototype = Object.create(Error.prototype), t2.DOMException.prototype.constructor = t2.DOMException;
            }
            function k(e3, n3) {
              return new Promise(function(r3, o2) {
                var s2 = new w(e3, n3);
                if (s2.signal && s2.signal.aborted) return o2(new t2.DOMException("Aborted", "AbortError"));
                var a2 = new XMLHttpRequest();
                function u2() {
                  a2.abort();
                }
                a2.onload = function() {
                  var e4, t3, n4 = { status: a2.status, statusText: a2.statusText, headers: (e4 = a2.getAllResponseHeaders() || "", t3 = new f(), e4.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e5) {
                    var n5 = e5.split(":"), r4 = n5.shift().trim();
                    if (r4) {
                      var i4 = n5.join(":").trim();
                      t3.append(r4, i4);
                    }
                  }), t3) };
                  n4.url = "responseURL" in a2 ? a2.responseURL : n4.headers.get("X-Request-URL");
                  var i3 = "response" in a2 ? a2.response : a2.responseText;
                  r3(new E(i3, n4));
                }, a2.onerror = function() {
                  o2(new TypeError("Network request failed"));
                }, a2.ontimeout = function() {
                  o2(new TypeError("Network request failed"));
                }, a2.onabort = function() {
                  o2(new t2.DOMException("Aborted", "AbortError"));
                }, a2.open(s2.method, s2.url, true), "include" === s2.credentials ? a2.withCredentials = true : "omit" === s2.credentials && (a2.withCredentials = false), "responseType" in a2 && i2 && (a2.responseType = "blob"), s2.headers.forEach(function(e4, t3) {
                  a2.setRequestHeader(t3, e4);
                }), s2.signal && (s2.signal.addEventListener("abort", u2), a2.onreadystatechange = function() {
                  4 === a2.readyState && s2.signal.removeEventListener("abort", u2);
                }), a2.send(void 0 === s2._bodyInit ? null : s2._bodyInit);
              });
            }
            k.polyfill = true, e2.fetch || (e2.fetch = k, e2.Headers = f, e2.Request = w, e2.Response = E), t2.Headers = f, t2.Request = w, t2.Response = E, t2.fetch = k, Object.defineProperty(t2, "__esModule", { value: true });
          }({});
        }(r), r.fetch.ponyfill = true, delete r.fetch.polyfill;
        var i = r;
        (t = i.fetch).default = i.fetch, t.fetch = i.fetch, t.Headers = i.Headers, t.Request = i.Request, t.Response = i.Response, e.exports = t;
      }, function(e, t, n) {
        n.r(t);
        var r = n(4), i = n(5), o = [], s = o.forEach, a = o.slice;
        function u(e2) {
          return s.call(a.call(arguments, 1), function(t2) {
            if (t2) for (var n2 in t2) void 0 === e2[n2] && (e2[n2] = t2[n2]);
          }), e2;
        }
        var c = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, l = function(e2, t2, n2) {
          var r2 = n2 || {};
          r2.path = r2.path || "/";
          var i2 = e2 + "=" + encodeURIComponent(t2);
          if (r2.maxAge > 0) {
            var o2 = r2.maxAge - 0;
            if (isNaN(o2)) throw new Error("maxAge should be a Number");
            i2 += "; Max-Age=" + Math.floor(o2);
          }
          if (r2.domain) {
            if (!c.test(r2.domain)) throw new TypeError("option domain is invalid");
            i2 += "; Domain=" + r2.domain;
          }
          if (r2.path) {
            if (!c.test(r2.path)) throw new TypeError("option path is invalid");
            i2 += "; Path=" + r2.path;
          }
          if (r2.expires) {
            if ("function" != typeof r2.expires.toUTCString) throw new TypeError("option expires is invalid");
            i2 += "; Expires=" + r2.expires.toUTCString();
          }
          if (r2.httpOnly && (i2 += "; HttpOnly"), r2.secure && (i2 += "; Secure"), r2.sameSite) switch ("string" == typeof r2.sameSite ? r2.sameSite.toLowerCase() : r2.sameSite) {
            case true:
              i2 += "; SameSite=Strict";
              break;
            case "lax":
              i2 += "; SameSite=Lax";
              break;
            case "strict":
              i2 += "; SameSite=Strict";
              break;
            case "none":
              i2 += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
          return i2;
        }, d = function(e2, t2, n2, r2) {
          var i2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : { path: "/", sameSite: "strict" };
          n2 && (i2.expires = /* @__PURE__ */ new Date(), i2.expires.setTime(i2.expires.getTime() + 60 * n2 * 1e3)), r2 && (i2.domain = r2), document.cookie = l(e2, encodeURIComponent(t2), i2);
        }, f = function(e2) {
          for (var t2 = e2 + "=", n2 = document.cookie.split(";"), r2 = 0; r2 < n2.length; r2++) {
            for (var i2 = n2[r2]; " " === i2.charAt(0); ) i2 = i2.substring(1, i2.length);
            if (0 === i2.indexOf(t2)) return i2.substring(t2.length, i2.length);
          }
          return null;
        }, h = { name: "cookie", lookup: function(e2) {
          var t2;
          if (e2.lookupCookie && "undefined" != typeof document) {
            var n2 = f(e2.lookupCookie);
            n2 && (t2 = n2);
          }
          return t2;
        }, cacheUserLanguage: function(e2, t2) {
          t2.lookupCookie && "undefined" != typeof document && d(t2.lookupCookie, e2, t2.cookieMinutes, t2.cookieDomain, t2.cookieOptions);
        } }, p2 = { name: "querystring", lookup: function(e2) {
          var t2;
          if ("undefined" != typeof window) for (var n2 = window.location.search.substring(1).split("&"), r2 = 0; r2 < n2.length; r2++) {
            var i2 = n2[r2].indexOf("=");
            if (i2 > 0) n2[r2].substring(0, i2) === e2.lookupQuerystring && (t2 = n2[r2].substring(i2 + 1));
          }
          return t2;
        } }, g = null, v = function() {
          if (null !== g) return g;
          try {
            g = "undefined" !== window && null !== window.localStorage;
            window.localStorage.setItem("i18next.translate.boo", "foo"), window.localStorage.removeItem("i18next.translate.boo");
          } catch (e2) {
            g = false;
          }
          return g;
        }, m = { name: "localStorage", lookup: function(e2) {
          var t2;
          if (e2.lookupLocalStorage && v()) {
            var n2 = window.localStorage.getItem(e2.lookupLocalStorage);
            n2 && (t2 = n2);
          }
          return t2;
        }, cacheUserLanguage: function(e2, t2) {
          t2.lookupLocalStorage && v() && window.localStorage.setItem(t2.lookupLocalStorage, e2);
        } }, y = null, w = function() {
          if (null !== y) return y;
          try {
            y = "undefined" !== window && null !== window.sessionStorage;
            window.sessionStorage.setItem("i18next.translate.boo", "foo"), window.sessionStorage.removeItem("i18next.translate.boo");
          } catch (e2) {
            y = false;
          }
          return y;
        }, b = { name: "sessionStorage", lookup: function(e2) {
          var t2;
          if (e2.lookupSessionStorage && w()) {
            var n2 = window.sessionStorage.getItem(e2.lookupSessionStorage);
            n2 && (t2 = n2);
          }
          return t2;
        }, cacheUserLanguage: function(e2, t2) {
          t2.lookupSessionStorage && w() && window.sessionStorage.setItem(t2.lookupSessionStorage, e2);
        } }, E = { name: "navigator", lookup: function(e2) {
          var t2 = [];
          if ("undefined" != typeof navigator) {
            if (navigator.languages) for (var n2 = 0; n2 < navigator.languages.length; n2++) t2.push(navigator.languages[n2]);
            navigator.userLanguage && t2.push(navigator.userLanguage), navigator.language && t2.push(navigator.language);
          }
          return t2.length > 0 ? t2 : void 0;
        } }, S = { name: "htmlTag", lookup: function(e2) {
          var t2, n2 = e2.htmlTag || ("undefined" != typeof document ? document.documentElement : null);
          return n2 && "function" == typeof n2.getAttribute && (t2 = n2.getAttribute("lang")), t2;
        } }, k = { name: "path", lookup: function(e2) {
          var t2;
          if ("undefined" != typeof window) {
            var n2 = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
            if (n2 instanceof Array) if ("number" == typeof e2.lookupFromPathIndex) {
              if ("string" != typeof n2[e2.lookupFromPathIndex]) return;
              t2 = n2[e2.lookupFromPathIndex].replace("/", "");
            } else t2 = n2[0].replace("/", "");
          }
          return t2;
        } }, O = { name: "subdomain", lookup: function(e2) {
          var t2;
          if ("undefined" != typeof window) {
            var n2 = window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);
            n2 instanceof Array && (t2 = "number" == typeof e2.lookupFromSubdomainIndex ? n2[e2.lookupFromSubdomainIndex].replace("http://", "").replace("https://", "").replace(".", "") : n2[0].replace("http://", "").replace("https://", "").replace(".", ""));
          }
          return t2;
        } };
        var T = function() {
          function e2(t2) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(r.a)(this, e2), this.type = "languageDetector", this.detectors = {}, this.init(t2, n2);
          }
          return Object(i.a)(e2, [{ key: "init", value: function(e3) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            this.services = e3, this.options = u(t2, this.options || {}, { order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"], lookupQuerystring: "lng", lookupCookie: "i18next", lookupLocalStorage: "i18nextLng", lookupSessionStorage: "i18nextLng", caches: ["localStorage"], excludeCacheFor: ["cimode"] }), this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex), this.i18nOptions = n2, this.addDetector(h), this.addDetector(p2), this.addDetector(m), this.addDetector(b), this.addDetector(E), this.addDetector(S), this.addDetector(k), this.addDetector(O);
          } }, { key: "addDetector", value: function(e3) {
            this.detectors[e3.name] = e3;
          } }, { key: "detect", value: function(e3) {
            var t2 = this;
            e3 || (e3 = this.options.order);
            var n2 = [];
            return e3.forEach(function(e4) {
              if (t2.detectors[e4]) {
                var r2 = t2.detectors[e4].lookup(t2.options);
                r2 && "string" == typeof r2 && (r2 = [r2]), r2 && (n2 = n2.concat(r2));
              }
            }), this.services.languageUtils.getBestMatchFromCodes ? n2 : n2.length > 0 ? n2[0] : null;
          } }, { key: "cacheUserLanguage", value: function(e3, t2) {
            var n2 = this;
            t2 || (t2 = this.options.caches), t2 && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(e3) > -1 || t2.forEach(function(t3) {
              n2.detectors[t3] && n2.detectors[t3].cacheUserLanguage(e3, n2.options);
            }));
          } }]), e2;
        }();
        T.type = "languageDetector", t.default = T;
      }, function(e, t, n) {
        n.r(t), n.d(t, "default", function() {
          return Le;
        }), n.d(t, "Axios", function() {
          return Re;
        }), n.d(t, "AxiosError", function() {
          return xe;
        }), n.d(t, "CanceledError", function() {
          return _e;
        }), n.d(t, "isCancel", function() {
          return Ne;
        }), n.d(t, "CancelToken", function() {
          return De;
        }), n.d(t, "VERSION", function() {
          return Me;
        }), n.d(t, "all", function() {
          return Pe;
        }), n.d(t, "Cancel", function() {
          return je;
        }), n.d(t, "isAxiosError", function() {
          return Ve;
        }), n.d(t, "spread", function() {
          return Ue;
        }), n.d(t, "toFormData", function() {
          return qe;
        }), n.d(t, "AxiosHeaders", function() {
          return Fe;
        }), n.d(t, "HttpStatusCode", function() {
          return Be;
        }), n.d(t, "formToJSON", function() {
          return ze;
        }), n.d(t, "getAdapter", function() {
          return He;
        }), n.d(t, "mergeConfig", function() {
          return Je;
        });
        var r = {};
        n.r(r), n.d(r, "hasBrowserEnv", function() {
          return m;
        }), n.d(r, "hasStandardBrowserWebWorkerEnv", function() {
          return b;
        }), n.d(r, "hasStandardBrowserEnv", function() {
          return w;
        }), n.d(r, "navigator", function() {
          return y;
        }), n.d(r, "origin", function() {
          return E;
        });
        var i = n(0), o = n(11), s = n(6);
        function a(e2) {
          const t2 = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
          return encodeURIComponent(e2).replace(/[!'()~]|%20|%00/g, function(e3) {
            return t2[e3];
          });
        }
        function u(e2, t2) {
          this._pairs = [], e2 && Object(s.a)(e2, this, t2);
        }
        const c = u.prototype;
        c.append = function(e2, t2) {
          this._pairs.push([e2, t2]);
        }, c.toString = function(e2) {
          const t2 = e2 ? function(t3) {
            return e2.call(this, t3, a);
          } : a;
          return this._pairs.map(function(e3) {
            return t2(e3[0]) + "=" + t2(e3[1]);
          }, "").join("&");
        };
        var l = u;
        function d(e2) {
          return encodeURIComponent(e2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        function f(e2, t2, n2) {
          if (!t2) return e2;
          const r2 = n2 && n2.encode || d, o2 = n2 && n2.serialize;
          let s2;
          if (s2 = o2 ? o2(t2, n2) : i.a.isURLSearchParams(t2) ? t2.toString() : new l(t2, n2).toString(r2), s2) {
            const t3 = e2.indexOf("#");
            -1 !== t3 && (e2 = e2.slice(0, t3)), e2 += (-1 === e2.indexOf("?") ? "?" : "&") + s2;
          }
          return e2;
        }
        var h = class {
          constructor() {
            this.handlers = [];
          }
          use(e2, t2, n2) {
            return this.handlers.push({ fulfilled: e2, rejected: t2, synchronous: !!n2 && n2.synchronous, runWhen: n2 ? n2.runWhen : null }), this.handlers.length - 1;
          }
          eject(e2) {
            this.handlers[e2] && (this.handlers[e2] = null);
          }
          clear() {
            this.handlers && (this.handlers = []);
          }
          forEach(e2) {
            i.a.forEach(this.handlers, function(t2) {
              null !== t2 && e2(t2);
            });
          }
        }, p2 = n(1), g = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false }, v = { isBrowser: true, classes: { URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : l, FormData: "undefined" != typeof FormData ? FormData : null, Blob: "undefined" != typeof Blob ? Blob : null }, protocols: ["http", "https", "file", "blob", "url", "data"] };
        const m = "undefined" != typeof window && "undefined" != typeof document, y = "object" == typeof navigator && navigator || void 0, w = m && (!y || ["ReactNative", "NativeScript", "NS"].indexOf(y.product) < 0), b = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts, E = m && window.location.href || "http://localhost";
        var S = { ...r, ...v };
        var k = function(e2) {
          function t2(e3, n2, r2, o2) {
            let s2 = e3[o2++];
            if ("__proto__" === s2) return true;
            const a2 = Number.isFinite(+s2), u2 = o2 >= e3.length;
            if (s2 = !s2 && i.a.isArray(r2) ? r2.length : s2, u2) return i.a.hasOwnProp(r2, s2) ? r2[s2] = [r2[s2], n2] : r2[s2] = n2, !a2;
            r2[s2] && i.a.isObject(r2[s2]) || (r2[s2] = []);
            return t2(e3, n2, r2[s2], o2) && i.a.isArray(r2[s2]) && (r2[s2] = function(e4) {
              const t3 = {}, n3 = Object.keys(e4);
              let r3;
              const i2 = n3.length;
              let o3;
              for (r3 = 0; r3 < i2; r3++) o3 = n3[r3], t3[o3] = e4[o3];
              return t3;
            }(r2[s2])), !a2;
          }
          if (i.a.isFormData(e2) && i.a.isFunction(e2.entries)) {
            const n2 = {};
            return i.a.forEachEntry(e2, (e3, r2) => {
              t2(function(e4) {
                return i.a.matchAll(/\w+|\[(\w*)]/g, e4).map((e5) => "[]" === e5[0] ? "" : e5[1] || e5[0]);
              }(e3), r2, n2, 0);
            }), n2;
          }
          return null;
        };
        const O = { transitional: g, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e2, t2) {
          const n2 = t2.getContentType() || "", r2 = n2.indexOf("application/json") > -1, o2 = i.a.isObject(e2);
          o2 && i.a.isHTMLForm(e2) && (e2 = new FormData(e2));
          if (i.a.isFormData(e2)) return r2 ? JSON.stringify(k(e2)) : e2;
          if (i.a.isArrayBuffer(e2) || i.a.isBuffer(e2) || i.a.isStream(e2) || i.a.isFile(e2) || i.a.isBlob(e2) || i.a.isReadableStream(e2)) return e2;
          if (i.a.isArrayBufferView(e2)) return e2.buffer;
          if (i.a.isURLSearchParams(e2)) return t2.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e2.toString();
          let a2;
          if (o2) {
            if (n2.indexOf("application/x-www-form-urlencoded") > -1) return function(e3, t3) {
              return Object(s.a)(e3, new S.classes.URLSearchParams(), Object.assign({ visitor: function(e4, t4, n3, r3) {
                return S.isNode && i.a.isBuffer(e4) ? (this.append(t4, e4.toString("base64")), false) : r3.defaultVisitor.apply(this, arguments);
              } }, t3));
            }(e2, this.formSerializer).toString();
            if ((a2 = i.a.isFileList(e2)) || n2.indexOf("multipart/form-data") > -1) {
              const t3 = this.env && this.env.FormData;
              return Object(s.a)(a2 ? { "files[]": e2 } : e2, t3 && new t3(), this.formSerializer);
            }
          }
          return o2 || r2 ? (t2.setContentType("application/json", false), function(e3, t3, n3) {
            if (i.a.isString(e3)) try {
              return (t3 || JSON.parse)(e3), i.a.trim(e3);
            } catch (e4) {
              if ("SyntaxError" !== e4.name) throw e4;
            }
            return (n3 || JSON.stringify)(e3);
          }(e2)) : e2;
        }], transformResponse: [function(e2) {
          const t2 = this.transitional || O.transitional, n2 = t2 && t2.forcedJSONParsing, r2 = "json" === this.responseType;
          if (i.a.isResponse(e2) || i.a.isReadableStream(e2)) return e2;
          if (e2 && i.a.isString(e2) && (n2 && !this.responseType || r2)) {
            const n3 = !(t2 && t2.silentJSONParsing) && r2;
            try {
              return JSON.parse(e2);
            } catch (e3) {
              if (n3) {
                if ("SyntaxError" === e3.name) throw p2.a.from(e3, p2.a.ERR_BAD_RESPONSE, this, null, this.response);
                throw e3;
              }
            }
          }
          return e2;
        }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: S.classes.FormData, Blob: S.classes.Blob }, validateStatus: function(e2) {
          return e2 >= 200 && e2 < 300;
        }, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
        i.a.forEach(["delete", "get", "head", "post", "put", "patch"], (e2) => {
          O.headers[e2] = {};
        });
        var T = O;
        const C = i.a.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
        const A = Symbol("internals");
        function I(e2) {
          return e2 && String(e2).trim().toLowerCase();
        }
        function L(e2) {
          return false === e2 || null == e2 ? e2 : i.a.isArray(e2) ? e2.map(L) : String(e2);
        }
        function R(e2, t2, n2, r2, o2) {
          return i.a.isFunction(r2) ? r2.call(this, t2, n2) : (o2 && (t2 = n2), i.a.isString(t2) ? i.a.isString(r2) ? -1 !== t2.indexOf(r2) : i.a.isRegExp(r2) ? r2.test(t2) : void 0 : void 0);
        }
        class x {
          constructor(e2) {
            e2 && this.set(e2);
          }
          set(e2, t2, n2) {
            const r2 = this;
            function o2(e3, t3, n3) {
              const o3 = I(t3);
              if (!o3) throw new Error("header name must be a non-empty string");
              const s3 = i.a.findKey(r2, o3);
              (!s3 || void 0 === r2[s3] || true === n3 || void 0 === n3 && false !== r2[s3]) && (r2[s3 || t3] = L(e3));
            }
            const s2 = (e3, t3) => i.a.forEach(e3, (e4, n3) => o2(e4, n3, t3));
            if (i.a.isPlainObject(e2) || e2 instanceof this.constructor) s2(e2, t2);
            else if (i.a.isString(e2) && (e2 = e2.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e2.trim())) s2(((e3) => {
              const t3 = {};
              let n3, r3, i2;
              return e3 && e3.split("\n").forEach(function(e4) {
                i2 = e4.indexOf(":"), n3 = e4.substring(0, i2).trim().toLowerCase(), r3 = e4.substring(i2 + 1).trim(), !n3 || t3[n3] && C[n3] || ("set-cookie" === n3 ? t3[n3] ? t3[n3].push(r3) : t3[n3] = [r3] : t3[n3] = t3[n3] ? t3[n3] + ", " + r3 : r3);
              }), t3;
            })(e2), t2);
            else if (i.a.isHeaders(e2)) for (const [t3, r3] of e2.entries()) o2(r3, t3, n2);
            else null != e2 && o2(t2, e2, n2);
            return this;
          }
          get(e2, t2) {
            if (e2 = I(e2)) {
              const n2 = i.a.findKey(this, e2);
              if (n2) {
                const e3 = this[n2];
                if (!t2) return e3;
                if (true === t2) return function(e4) {
                  const t3 = /* @__PURE__ */ Object.create(null), n3 = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                  let r2;
                  for (; r2 = n3.exec(e4); ) t3[r2[1]] = r2[2];
                  return t3;
                }(e3);
                if (i.a.isFunction(t2)) return t2.call(this, e3, n2);
                if (i.a.isRegExp(t2)) return t2.exec(e3);
                throw new TypeError("parser must be boolean|regexp|function");
              }
            }
          }
          has(e2, t2) {
            if (e2 = I(e2)) {
              const n2 = i.a.findKey(this, e2);
              return !(!n2 || void 0 === this[n2] || t2 && !R(0, this[n2], n2, t2));
            }
            return false;
          }
          delete(e2, t2) {
            const n2 = this;
            let r2 = false;
            function o2(e3) {
              if (e3 = I(e3)) {
                const o3 = i.a.findKey(n2, e3);
                !o3 || t2 && !R(0, n2[o3], o3, t2) || (delete n2[o3], r2 = true);
              }
            }
            return i.a.isArray(e2) ? e2.forEach(o2) : o2(e2), r2;
          }
          clear(e2) {
            const t2 = Object.keys(this);
            let n2 = t2.length, r2 = false;
            for (; n2--; ) {
              const i2 = t2[n2];
              e2 && !R(0, this[i2], i2, e2, true) || (delete this[i2], r2 = true);
            }
            return r2;
          }
          normalize(e2) {
            const t2 = this, n2 = {};
            return i.a.forEach(this, (r2, o2) => {
              const s2 = i.a.findKey(n2, o2);
              if (s2) return t2[s2] = L(r2), void delete t2[o2];
              const a2 = e2 ? function(e3) {
                return e3.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e4, t3, n3) => t3.toUpperCase() + n3);
              }(o2) : String(o2).trim();
              a2 !== o2 && delete t2[o2], t2[a2] = L(r2), n2[a2] = true;
            }), this;
          }
          concat(...e2) {
            return this.constructor.concat(this, ...e2);
          }
          toJSON(e2) {
            const t2 = /* @__PURE__ */ Object.create(null);
            return i.a.forEach(this, (n2, r2) => {
              null != n2 && false !== n2 && (t2[r2] = e2 && i.a.isArray(n2) ? n2.join(", ") : n2);
            }), t2;
          }
          [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]();
          }
          toString() {
            return Object.entries(this.toJSON()).map(([e2, t2]) => e2 + ": " + t2).join("\n");
          }
          get [Symbol.toStringTag]() {
            return "AxiosHeaders";
          }
          static from(e2) {
            return e2 instanceof this ? e2 : new this(e2);
          }
          static concat(e2, ...t2) {
            const n2 = new this(e2);
            return t2.forEach((e3) => n2.set(e3)), n2;
          }
          static accessor(e2) {
            const t2 = (this[A] = this[A] = { accessors: {} }).accessors, n2 = this.prototype;
            function r2(e3) {
              const r3 = I(e3);
              t2[r3] || (!function(e4, t3) {
                const n3 = i.a.toCamelCase(" " + t3);
                ["get", "set", "has"].forEach((r4) => {
                  Object.defineProperty(e4, r4 + n3, { value: function(e5, n4, i2) {
                    return this[r4].call(this, t3, e5, n4, i2);
                  }, configurable: true });
                });
              }(n2, e3), t2[r3] = true);
            }
            return i.a.isArray(e2) ? e2.forEach(r2) : r2(e2), this;
          }
        }
        x.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), i.a.reduceDescriptors(x.prototype, ({ value: e2 }, t2) => {
          let n2 = t2[0].toUpperCase() + t2.slice(1);
          return { get: () => e2, set(e3) {
            this[n2] = e3;
          } };
        }), i.a.freezeMethods(x);
        var _ = x;
        function N(e2, t2) {
          const n2 = this || T, r2 = t2 || n2, o2 = _.from(r2.headers);
          let s2 = r2.data;
          return i.a.forEach(e2, function(e3) {
            s2 = e3.call(n2, s2, o2.normalize(), t2 ? t2.status : void 0);
          }), o2.normalize(), s2;
        }
        function D(e2) {
          return !(!e2 || !e2.__CANCEL__);
        }
        function M(e2, t2, n2) {
          p2.a.call(this, null == e2 ? "canceled" : e2, p2.a.ERR_CANCELED, t2, n2), this.name = "CanceledError";
        }
        i.a.inherits(M, p2.a, { __CANCEL__: true });
        var P = M, j = n(12);
        function V(e2, t2, n2) {
          const r2 = n2.config.validateStatus;
          n2.status && r2 && !r2(n2.status) ? t2(new p2.a("Request failed with status code " + n2.status, [p2.a.ERR_BAD_REQUEST, p2.a.ERR_BAD_RESPONSE][Math.floor(n2.status / 100) - 4], n2.config, n2.request, n2)) : e2(n2);
        }
        var U = function(e2, t2) {
          e2 = e2 || 10;
          const n2 = new Array(e2), r2 = new Array(e2);
          let i2, o2 = 0, s2 = 0;
          return t2 = void 0 !== t2 ? t2 : 1e3, function(a2) {
            const u2 = Date.now(), c2 = r2[s2];
            i2 || (i2 = u2), n2[o2] = a2, r2[o2] = u2;
            let l2 = s2, d2 = 0;
            for (; l2 !== o2; ) d2 += n2[l2++], l2 %= e2;
            if (o2 = (o2 + 1) % e2, o2 === s2 && (s2 = (s2 + 1) % e2), u2 - i2 < t2) return;
            const f2 = c2 && u2 - c2;
            return f2 ? Math.round(1e3 * d2 / f2) : void 0;
          };
        };
        var q = function(e2, t2) {
          let n2, r2, i2 = 0, o2 = 1e3 / t2;
          const s2 = (t3, o3 = Date.now()) => {
            i2 = o3, n2 = null, r2 && (clearTimeout(r2), r2 = null), e2.apply(null, t3);
          };
          return [(...e3) => {
            const t3 = Date.now(), a2 = t3 - i2;
            a2 >= o2 ? s2(e3, t3) : (n2 = e3, r2 || (r2 = setTimeout(() => {
              r2 = null, s2(n2);
            }, o2 - a2)));
          }, () => n2 && s2(n2)];
        };
        const F = (e2, t2, n2 = 3) => {
          let r2 = 0;
          const i2 = U(50, 250);
          return q((n3) => {
            const o2 = n3.loaded, s2 = n3.lengthComputable ? n3.total : void 0, a2 = o2 - r2, u2 = i2(a2);
            r2 = o2;
            e2({ loaded: o2, total: s2, progress: s2 ? o2 / s2 : void 0, bytes: a2, rate: u2 || void 0, estimated: u2 && s2 && o2 <= s2 ? (s2 - o2) / u2 : void 0, event: n3, lengthComputable: null != s2, [t2 ? "download" : "upload"]: true });
          }, n2);
        }, B = (e2, t2) => {
          const n2 = null != e2;
          return [(r2) => t2[0]({ lengthComputable: n2, total: e2, loaded: r2 }), t2[1]];
        }, z = (e2) => (...t2) => i.a.asap(() => e2(...t2));
        var H = S.hasStandardBrowserEnv ? function() {
          const e2 = S.navigator && /(msie|trident)/i.test(S.navigator.userAgent), t2 = document.createElement("a");
          let n2;
          function r2(n3) {
            let r3 = n3;
            return e2 && (t2.setAttribute("href", r3), r3 = t2.href), t2.setAttribute("href", r3), { href: t2.href, protocol: t2.protocol ? t2.protocol.replace(/:$/, "") : "", host: t2.host, search: t2.search ? t2.search.replace(/^\?/, "") : "", hash: t2.hash ? t2.hash.replace(/^#/, "") : "", hostname: t2.hostname, port: t2.port, pathname: "/" === t2.pathname.charAt(0) ? t2.pathname : "/" + t2.pathname };
          }
          return n2 = r2(window.location.href), function(e3) {
            const t3 = i.a.isString(e3) ? r2(e3) : e3;
            return t3.protocol === n2.protocol && t3.host === n2.host;
          };
        }() : function() {
          return true;
        }, J = S.hasStandardBrowserEnv ? { write(e2, t2, n2, r2, o2, s2) {
          const a2 = [e2 + "=" + encodeURIComponent(t2)];
          i.a.isNumber(n2) && a2.push("expires=" + new Date(n2).toGMTString()), i.a.isString(r2) && a2.push("path=" + r2), i.a.isString(o2) && a2.push("domain=" + o2), true === s2 && a2.push("secure"), document.cookie = a2.join("; ");
        }, read(e2) {
          const t2 = document.cookie.match(new RegExp("(^|;\\s*)(" + e2 + ")=([^;]*)"));
          return t2 ? decodeURIComponent(t2[3]) : null;
        }, remove(e2) {
          this.write(e2, "", Date.now() - 864e5);
        } } : { write() {
        }, read: () => null, remove() {
        } };
        function Z(e2, t2) {
          return e2 && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t2) ? function(e3, t3) {
            return t3 ? e3.replace(/\/?\/$/, "") + "/" + t3.replace(/^\/+/, "") : e3;
          }(e2, t2) : t2;
        }
        const W = (e2) => e2 instanceof _ ? { ...e2 } : e2;
        function G(e2, t2) {
          t2 = t2 || {};
          const n2 = {};
          function r2(e3, t3, n3) {
            return i.a.isPlainObject(e3) && i.a.isPlainObject(t3) ? i.a.merge.call({ caseless: n3 }, e3, t3) : i.a.isPlainObject(t3) ? i.a.merge({}, t3) : i.a.isArray(t3) ? t3.slice() : t3;
          }
          function o2(e3, t3, n3) {
            return i.a.isUndefined(t3) ? i.a.isUndefined(e3) ? void 0 : r2(void 0, e3, n3) : r2(e3, t3, n3);
          }
          function s2(e3, t3) {
            if (!i.a.isUndefined(t3)) return r2(void 0, t3);
          }
          function a2(e3, t3) {
            return i.a.isUndefined(t3) ? i.a.isUndefined(e3) ? void 0 : r2(void 0, e3) : r2(void 0, t3);
          }
          function u2(n3, i2, o3) {
            return o3 in t2 ? r2(n3, i2) : o3 in e2 ? r2(void 0, n3) : void 0;
          }
          const c2 = { url: s2, method: s2, data: s2, baseURL: a2, transformRequest: a2, transformResponse: a2, paramsSerializer: a2, timeout: a2, timeoutMessage: a2, withCredentials: a2, withXSRFToken: a2, adapter: a2, responseType: a2, xsrfCookieName: a2, xsrfHeaderName: a2, onUploadProgress: a2, onDownloadProgress: a2, decompress: a2, maxContentLength: a2, maxBodyLength: a2, beforeRedirect: a2, transport: a2, httpAgent: a2, httpsAgent: a2, cancelToken: a2, socketPath: a2, responseEncoding: a2, validateStatus: u2, headers: (e3, t3) => o2(W(e3), W(t3), true) };
          return i.a.forEach(Object.keys(Object.assign({}, e2, t2)), function(r3) {
            const s3 = c2[r3] || o2, a3 = s3(e2[r3], t2[r3], r3);
            i.a.isUndefined(a3) && s3 !== u2 || (n2[r3] = a3);
          }), n2;
        }
        var Y = (e2) => {
          const t2 = G({}, e2);
          let n2, { data: r2, withXSRFToken: o2, xsrfHeaderName: s2, xsrfCookieName: a2, headers: u2, auth: c2 } = t2;
          if (t2.headers = u2 = _.from(u2), t2.url = f(Z(t2.baseURL, t2.url), e2.params, e2.paramsSerializer), c2 && u2.set("Authorization", "Basic " + btoa((c2.username || "") + ":" + (c2.password ? unescape(encodeURIComponent(c2.password)) : ""))), i.a.isFormData(r2)) {
            if (S.hasStandardBrowserEnv || S.hasStandardBrowserWebWorkerEnv) u2.setContentType(void 0);
            else if (false !== (n2 = u2.getContentType())) {
              const [e3, ...t3] = n2 ? n2.split(";").map((e4) => e4.trim()).filter(Boolean) : [];
              u2.setContentType([e3 || "multipart/form-data", ...t3].join("; "));
            }
          }
          if (S.hasStandardBrowserEnv && (o2 && i.a.isFunction(o2) && (o2 = o2(t2)), o2 || false !== o2 && H(t2.url))) {
            const e3 = s2 && a2 && J.read(a2);
            e3 && u2.set(s2, e3);
          }
          return t2;
        };
        var $ = "undefined" != typeof XMLHttpRequest && function(e2) {
          return new Promise(function(t2, n2) {
            const r2 = Y(e2);
            let o2 = r2.data;
            const s2 = _.from(r2.headers).normalize();
            let a2, u2, c2, l2, d2, { responseType: f2, onUploadProgress: h2, onDownloadProgress: v2 } = r2;
            function m2() {
              l2 && l2(), d2 && d2(), r2.cancelToken && r2.cancelToken.unsubscribe(a2), r2.signal && r2.signal.removeEventListener("abort", a2);
            }
            let y2 = new XMLHttpRequest();
            function w2() {
              if (!y2) return;
              const r3 = _.from("getAllResponseHeaders" in y2 && y2.getAllResponseHeaders());
              V(function(e3) {
                t2(e3), m2();
              }, function(e3) {
                n2(e3), m2();
              }, { data: f2 && "text" !== f2 && "json" !== f2 ? y2.response : y2.responseText, status: y2.status, statusText: y2.statusText, headers: r3, config: e2, request: y2 }), y2 = null;
            }
            y2.open(r2.method.toUpperCase(), r2.url, true), y2.timeout = r2.timeout, "onloadend" in y2 ? y2.onloadend = w2 : y2.onreadystatechange = function() {
              y2 && 4 === y2.readyState && (0 !== y2.status || y2.responseURL && 0 === y2.responseURL.indexOf("file:")) && setTimeout(w2);
            }, y2.onabort = function() {
              y2 && (n2(new p2.a("Request aborted", p2.a.ECONNABORTED, e2, y2)), y2 = null);
            }, y2.onerror = function() {
              n2(new p2.a("Network Error", p2.a.ERR_NETWORK, e2, y2)), y2 = null;
            }, y2.ontimeout = function() {
              let t3 = r2.timeout ? "timeout of " + r2.timeout + "ms exceeded" : "timeout exceeded";
              const i2 = r2.transitional || g;
              r2.timeoutErrorMessage && (t3 = r2.timeoutErrorMessage), n2(new p2.a(t3, i2.clarifyTimeoutError ? p2.a.ETIMEDOUT : p2.a.ECONNABORTED, e2, y2)), y2 = null;
            }, void 0 === o2 && s2.setContentType(null), "setRequestHeader" in y2 && i.a.forEach(s2.toJSON(), function(e3, t3) {
              y2.setRequestHeader(t3, e3);
            }), i.a.isUndefined(r2.withCredentials) || (y2.withCredentials = !!r2.withCredentials), f2 && "json" !== f2 && (y2.responseType = r2.responseType), v2 && ([c2, d2] = F(v2, true), y2.addEventListener("progress", c2)), h2 && y2.upload && ([u2, l2] = F(h2), y2.upload.addEventListener("progress", u2), y2.upload.addEventListener("loadend", l2)), (r2.cancelToken || r2.signal) && (a2 = (t3) => {
              y2 && (n2(!t3 || t3.type ? new P(null, e2, y2) : t3), y2.abort(), y2 = null);
            }, r2.cancelToken && r2.cancelToken.subscribe(a2), r2.signal && (r2.signal.aborted ? a2() : r2.signal.addEventListener("abort", a2)));
            const b2 = function(e3) {
              const t3 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e3);
              return t3 && t3[1] || "";
            }(r2.url);
            b2 && -1 === S.protocols.indexOf(b2) ? n2(new p2.a("Unsupported protocol " + b2 + ":", p2.a.ERR_BAD_REQUEST, e2)) : y2.send(o2 || null);
          });
        };
        var K = (e2, t2) => {
          const { length: n2 } = e2 = e2 ? e2.filter(Boolean) : [];
          if (t2 || n2) {
            let n3, r2 = new AbortController();
            const o2 = function(e3) {
              if (!n3) {
                n3 = true, a2();
                const t3 = e3 instanceof Error ? e3 : this.reason;
                r2.abort(t3 instanceof p2.a ? t3 : new P(t3 instanceof Error ? t3.message : t3));
              }
            };
            let s2 = t2 && setTimeout(() => {
              s2 = null, o2(new p2.a(`timeout ${t2} of ms exceeded`, p2.a.ETIMEDOUT));
            }, t2);
            const a2 = () => {
              e2 && (s2 && clearTimeout(s2), s2 = null, e2.forEach((e3) => {
                e3.unsubscribe ? e3.unsubscribe(o2) : e3.removeEventListener("abort", o2);
              }), e2 = null);
            };
            e2.forEach((e3) => e3.addEventListener("abort", o2));
            const { signal: u2 } = r2;
            return u2.unsubscribe = () => i.a.asap(a2), u2;
          }
        };
        const X = function* (e2, t2) {
          let n2 = e2.byteLength;
          if (n2 < t2) return void (yield e2);
          let r2, i2 = 0;
          for (; i2 < n2; ) r2 = i2 + t2, yield e2.slice(i2, r2), i2 = r2;
        }, Q = async function* (e2) {
          if (e2[Symbol.asyncIterator]) return void (yield* e2);
          const t2 = e2.getReader();
          try {
            for (; ; ) {
              const { done: e3, value: n2 } = await t2.read();
              if (e3) break;
              yield n2;
            }
          } finally {
            await t2.cancel();
          }
        }, ee = (e2, t2, n2, r2) => {
          const i2 = async function* (e3, t3) {
            for await (const n3 of Q(e3)) yield* X(n3, t3);
          }(e2, t2);
          let o2, s2 = 0, a2 = (e3) => {
            o2 || (o2 = true, r2 && r2(e3));
          };
          return new ReadableStream({ async pull(e3) {
            try {
              const { done: t3, value: r3 } = await i2.next();
              if (t3) return a2(), void e3.close();
              let o3 = r3.byteLength;
              if (n2) {
                let e4 = s2 += o3;
                n2(e4);
              }
              e3.enqueue(new Uint8Array(r3));
            } catch (e4) {
              throw a2(e4), e4;
            }
          }, cancel: (e3) => (a2(e3), i2.return()) }, { highWaterMark: 2 });
        }, te = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response, ne = te && "function" == typeof ReadableStream, re = te && ("function" == typeof TextEncoder ? (ie = new TextEncoder(), (e2) => ie.encode(e2)) : async (e2) => new Uint8Array(await new Response(e2).arrayBuffer()));
        var ie;
        const oe = (e2, ...t2) => {
          try {
            return !!e2(...t2);
          } catch (e3) {
            return false;
          }
        }, se = ne && oe(() => {
          let e2 = false;
          const t2 = new Request(S.origin, { body: new ReadableStream(), method: "POST", get duplex() {
            return e2 = true, "half";
          } }).headers.has("Content-Type");
          return e2 && !t2;
        }), ae = ne && oe(() => i.a.isReadableStream(new Response("").body)), ue = { stream: ae && ((e2) => e2.body) };
        var ce;
        te && (ce = new Response(), ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e2) => {
          !ue[e2] && (ue[e2] = i.a.isFunction(ce[e2]) ? (t2) => t2[e2]() : (t2, n2) => {
            throw new p2.a(`Response type '${e2}' is not supported`, p2.a.ERR_NOT_SUPPORT, n2);
          });
        }));
        const le = async (e2, t2) => {
          const n2 = i.a.toFiniteNumber(e2.getContentLength());
          return null == n2 ? (async (e3) => {
            if (null == e3) return 0;
            if (i.a.isBlob(e3)) return e3.size;
            if (i.a.isSpecCompliantForm(e3)) {
              const t3 = new Request(S.origin, { method: "POST", body: e3 });
              return (await t3.arrayBuffer()).byteLength;
            }
            return i.a.isArrayBufferView(e3) || i.a.isArrayBuffer(e3) ? e3.byteLength : (i.a.isURLSearchParams(e3) && (e3 += ""), i.a.isString(e3) ? (await re(e3)).byteLength : void 0);
          })(t2) : n2;
        };
        var de = te && (async (e2) => {
          let { url: t2, method: n2, data: r2, signal: o2, cancelToken: s2, timeout: a2, onDownloadProgress: u2, onUploadProgress: c2, responseType: l2, headers: d2, withCredentials: f2 = "same-origin", fetchOptions: h2 } = Y(e2);
          l2 = l2 ? (l2 + "").toLowerCase() : "text";
          let g2, v2 = K([o2, s2 && s2.toAbortSignal()], a2);
          const m2 = v2 && v2.unsubscribe && (() => {
            v2.unsubscribe();
          });
          let y2;
          try {
            if (c2 && se && "get" !== n2 && "head" !== n2 && 0 !== (y2 = await le(d2, r2))) {
              let e3, n3 = new Request(t2, { method: "POST", body: r2, duplex: "half" });
              if (i.a.isFormData(r2) && (e3 = n3.headers.get("content-type")) && d2.setContentType(e3), n3.body) {
                const [e4, t3] = B(y2, F(z(c2)));
                r2 = ee(n3.body, 65536, e4, t3);
              }
            }
            i.a.isString(f2) || (f2 = f2 ? "include" : "omit");
            const o3 = "credentials" in Request.prototype;
            g2 = new Request(t2, { ...h2, signal: v2, method: n2.toUpperCase(), headers: d2.normalize().toJSON(), body: r2, duplex: "half", credentials: o3 ? f2 : void 0 });
            let s3 = await fetch(g2);
            const a3 = ae && ("stream" === l2 || "response" === l2);
            if (ae && (u2 || a3 && m2)) {
              const e3 = {};
              ["status", "statusText", "headers"].forEach((t4) => {
                e3[t4] = s3[t4];
              });
              const t3 = i.a.toFiniteNumber(s3.headers.get("content-length")), [n3, r3] = u2 && B(t3, F(z(u2), true)) || [];
              s3 = new Response(ee(s3.body, 65536, n3, () => {
                r3 && r3(), m2 && m2();
              }), e3);
            }
            l2 = l2 || "text";
            let p3 = await ue[i.a.findKey(ue, l2) || "text"](s3, e2);
            return !a3 && m2 && m2(), await new Promise((t3, n3) => {
              V(t3, n3, { data: p3, headers: _.from(s3.headers), status: s3.status, statusText: s3.statusText, config: e2, request: g2 });
            });
          } catch (t3) {
            if (m2 && m2(), t3 && "TypeError" === t3.name && /fetch/i.test(t3.message)) throw Object.assign(new p2.a("Network Error", p2.a.ERR_NETWORK, e2, g2), { cause: t3.cause || t3 });
            throw p2.a.from(t3, t3 && t3.code, e2, g2);
          }
        });
        const fe = { http: j.a, xhr: $, fetch: de };
        i.a.forEach(fe, (e2, t2) => {
          if (e2) {
            try {
              Object.defineProperty(e2, "name", { value: t2 });
            } catch (e3) {
            }
            Object.defineProperty(e2, "adapterName", { value: t2 });
          }
        });
        const he = (e2) => "- " + e2, pe = (e2) => i.a.isFunction(e2) || null === e2 || false === e2;
        var ge = (e2) => {
          e2 = i.a.isArray(e2) ? e2 : [e2];
          const { length: t2 } = e2;
          let n2, r2;
          const o2 = {};
          for (let i2 = 0; i2 < t2; i2++) {
            let t3;
            if (n2 = e2[i2], r2 = n2, !pe(n2) && (r2 = fe[(t3 = String(n2)).toLowerCase()], void 0 === r2)) throw new p2.a(`Unknown adapter '${t3}'`);
            if (r2) break;
            o2[t3 || "#" + i2] = r2;
          }
          if (!r2) {
            const e3 = Object.entries(o2).map(([e4, t3]) => `adapter ${e4} ` + (false === t3 ? "is not supported by the environment" : "is not available in the build"));
            let n3 = t2 ? e3.length > 1 ? "since :\n" + e3.map(he).join("\n") : " " + he(e3[0]) : "as no adapter specified";
            throw new p2.a("There is no suitable adapter to dispatch the request " + n3, "ERR_NOT_SUPPORT");
          }
          return r2;
        };
        function ve(e2) {
          if (e2.cancelToken && e2.cancelToken.throwIfRequested(), e2.signal && e2.signal.aborted) throw new P(null, e2);
        }
        function me(e2) {
          ve(e2), e2.headers = _.from(e2.headers), e2.data = N.call(e2, e2.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e2.method) && e2.headers.setContentType("application/x-www-form-urlencoded", false);
          return ge(e2.adapter || T.adapter)(e2).then(function(t2) {
            return ve(e2), t2.data = N.call(e2, e2.transformResponse, t2), t2.headers = _.from(t2.headers), t2;
          }, function(t2) {
            return D(t2) || (ve(e2), t2 && t2.response && (t2.response.data = N.call(e2, e2.transformResponse, t2.response), t2.response.headers = _.from(t2.response.headers))), Promise.reject(t2);
          });
        }
        const ye = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach((e2, t2) => {
          ye[e2] = function(n2) {
            return typeof n2 === e2 || "a" + (t2 < 1 ? "n " : " ") + e2;
          };
        });
        const we = {};
        ye.transitional = function(e2, t2, n2) {
          function r2(e3, t3) {
            return "[Axios v1.7.7] Transitional option '" + e3 + "'" + t3 + (n2 ? ". " + n2 : "");
          }
          return (n3, i2, o2) => {
            if (false === e2) throw new p2.a(r2(i2, " has been removed" + (t2 ? " in " + t2 : "")), p2.a.ERR_DEPRECATED);
            return t2 && !we[i2] && (we[i2] = true, console.warn(r2(i2, " has been deprecated since v" + t2 + " and will be removed in the near future"))), !e2 || e2(n3, i2, o2);
          };
        };
        var be = { assertOptions: function(e2, t2, n2) {
          if ("object" != typeof e2) throw new p2.a("options must be an object", p2.a.ERR_BAD_OPTION_VALUE);
          const r2 = Object.keys(e2);
          let i2 = r2.length;
          for (; i2-- > 0; ) {
            const o2 = r2[i2], s2 = t2[o2];
            if (s2) {
              const t3 = e2[o2], n3 = void 0 === t3 || s2(t3, o2, e2);
              if (true !== n3) throw new p2.a("option " + o2 + " must be " + n3, p2.a.ERR_BAD_OPTION_VALUE);
            } else if (true !== n2) throw new p2.a("Unknown option " + o2, p2.a.ERR_BAD_OPTION);
          }
        }, validators: ye };
        const Ee = be.validators;
        class Se {
          constructor(e2) {
            this.defaults = e2, this.interceptors = { request: new h(), response: new h() };
          }
          async request(e2, t2) {
            try {
              return await this._request(e2, t2);
            } catch (e3) {
              if (e3 instanceof Error) {
                let t3;
                Error.captureStackTrace ? Error.captureStackTrace(t3 = {}) : t3 = new Error();
                const n2 = t3.stack ? t3.stack.replace(/^.+\n/, "") : "";
                try {
                  e3.stack ? n2 && !String(e3.stack).endsWith(n2.replace(/^.+\n.+\n/, "")) && (e3.stack += "\n" + n2) : e3.stack = n2;
                } catch (e4) {
                }
              }
              throw e3;
            }
          }
          _request(e2, t2) {
            "string" == typeof e2 ? (t2 = t2 || {}).url = e2 : t2 = e2 || {}, t2 = G(this.defaults, t2);
            const { transitional: n2, paramsSerializer: r2, headers: o2 } = t2;
            void 0 !== n2 && be.assertOptions(n2, { silentJSONParsing: Ee.transitional(Ee.boolean), forcedJSONParsing: Ee.transitional(Ee.boolean), clarifyTimeoutError: Ee.transitional(Ee.boolean) }, false), null != r2 && (i.a.isFunction(r2) ? t2.paramsSerializer = { serialize: r2 } : be.assertOptions(r2, { encode: Ee.function, serialize: Ee.function }, true)), t2.method = (t2.method || this.defaults.method || "get").toLowerCase();
            let s2 = o2 && i.a.merge(o2.common, o2[t2.method]);
            o2 && i.a.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e3) => {
              delete o2[e3];
            }), t2.headers = _.concat(s2, o2);
            const a2 = [];
            let u2 = true;
            this.interceptors.request.forEach(function(e3) {
              "function" == typeof e3.runWhen && false === e3.runWhen(t2) || (u2 = u2 && e3.synchronous, a2.unshift(e3.fulfilled, e3.rejected));
            });
            const c2 = [];
            let l2;
            this.interceptors.response.forEach(function(e3) {
              c2.push(e3.fulfilled, e3.rejected);
            });
            let d2, f2 = 0;
            if (!u2) {
              const e3 = [me.bind(this), void 0];
              for (e3.unshift.apply(e3, a2), e3.push.apply(e3, c2), d2 = e3.length, l2 = Promise.resolve(t2); f2 < d2; ) l2 = l2.then(e3[f2++], e3[f2++]);
              return l2;
            }
            d2 = a2.length;
            let h2 = t2;
            for (f2 = 0; f2 < d2; ) {
              const e3 = a2[f2++], t3 = a2[f2++];
              try {
                h2 = e3(h2);
              } catch (e4) {
                t3.call(this, e4);
                break;
              }
            }
            try {
              l2 = me.call(this, h2);
            } catch (e3) {
              return Promise.reject(e3);
            }
            for (f2 = 0, d2 = c2.length; f2 < d2; ) l2 = l2.then(c2[f2++], c2[f2++]);
            return l2;
          }
          getUri(e2) {
            return f(Z((e2 = G(this.defaults, e2)).baseURL, e2.url), e2.params, e2.paramsSerializer);
          }
        }
        i.a.forEach(["delete", "get", "head", "options"], function(e2) {
          Se.prototype[e2] = function(t2, n2) {
            return this.request(G(n2 || {}, { method: e2, url: t2, data: (n2 || {}).data }));
          };
        }), i.a.forEach(["post", "put", "patch"], function(e2) {
          function t2(t3) {
            return function(n2, r2, i2) {
              return this.request(G(i2 || {}, { method: e2, headers: t3 ? { "Content-Type": "multipart/form-data" } : {}, url: n2, data: r2 }));
            };
          }
          Se.prototype[e2] = t2(), Se.prototype[e2 + "Form"] = t2(true);
        });
        var ke = Se;
        class Oe {
          constructor(e2) {
            if ("function" != typeof e2) throw new TypeError("executor must be a function.");
            let t2;
            this.promise = new Promise(function(e3) {
              t2 = e3;
            });
            const n2 = this;
            this.promise.then((e3) => {
              if (!n2._listeners) return;
              let t3 = n2._listeners.length;
              for (; t3-- > 0; ) n2._listeners[t3](e3);
              n2._listeners = null;
            }), this.promise.then = (e3) => {
              let t3;
              const r2 = new Promise((e4) => {
                n2.subscribe(e4), t3 = e4;
              }).then(e3);
              return r2.cancel = function() {
                n2.unsubscribe(t3);
              }, r2;
            }, e2(function(e3, r2, i2) {
              n2.reason || (n2.reason = new P(e3, r2, i2), t2(n2.reason));
            });
          }
          throwIfRequested() {
            if (this.reason) throw this.reason;
          }
          subscribe(e2) {
            this.reason ? e2(this.reason) : this._listeners ? this._listeners.push(e2) : this._listeners = [e2];
          }
          unsubscribe(e2) {
            if (!this._listeners) return;
            const t2 = this._listeners.indexOf(e2);
            -1 !== t2 && this._listeners.splice(t2, 1);
          }
          toAbortSignal() {
            const e2 = new AbortController(), t2 = (t3) => {
              e2.abort(t3);
            };
            return this.subscribe(t2), e2.signal.unsubscribe = () => this.unsubscribe(t2), e2.signal;
          }
          static source() {
            let e2;
            return { token: new Oe(function(t2) {
              e2 = t2;
            }), cancel: e2 };
          }
        }
        var Te = Oe;
        const Ce = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
        Object.entries(Ce).forEach(([e2, t2]) => {
          Ce[t2] = e2;
        });
        var Ae = Ce;
        const Ie = function e2(t2) {
          const n2 = new ke(t2), r2 = Object(o.a)(ke.prototype.request, n2);
          return i.a.extend(r2, ke.prototype, n2, { allOwnKeys: true }), i.a.extend(r2, n2, null, { allOwnKeys: true }), r2.create = function(n3) {
            return e2(G(t2, n3));
          }, r2;
        }(T);
        Ie.Axios = ke, Ie.CanceledError = P, Ie.CancelToken = Te, Ie.isCancel = D, Ie.VERSION = "1.7.7", Ie.toFormData = s.a, Ie.AxiosError = p2.a, Ie.Cancel = Ie.CanceledError, Ie.all = function(e2) {
          return Promise.all(e2);
        }, Ie.spread = function(e2) {
          return function(t2) {
            return e2.apply(null, t2);
          };
        }, Ie.isAxiosError = function(e2) {
          return i.a.isObject(e2) && true === e2.isAxiosError;
        }, Ie.mergeConfig = G, Ie.AxiosHeaders = _, Ie.formToJSON = (e2) => k(i.a.isHTMLForm(e2) ? new FormData(e2) : e2), Ie.getAdapter = ge, Ie.HttpStatusCode = Ae, Ie.default = Ie;
        var Le = Ie;
        const { Axios: Re, AxiosError: xe, CanceledError: _e, isCancel: Ne, CancelToken: De, VERSION: Me, all: Pe, Cancel: je, isAxiosError: Ve, spread: Ue, toFormData: qe, AxiosHeaders: Fe, HttpStatusCode: Be, formToJSON: ze, getAdapter: He, mergeConfig: Je } = Le;
      }, function(e, t, n) {
        n.r(t), n.d(t, "Desktop", function() {
          return ke;
        });
        var r = n(2);
        const i = Object(r.createLogger)("agentx-js-api"), o = (e2, t2) => ({ info: (...n2) => e2.info(t2, ...n2), warn: (...n2) => e2.warn(t2, ...n2), error: (...n2) => e2.error(t2, ...n2) });
        class s {
          constructor(e2) {
            this.logger = e2.logger;
          }
          check(e2) {
            return e2 ? !!e2.isInited || (this.logger.error("SERVICE still not initialized... Await it's init(...) first."), false) : (this.logger.error("SERVICE is not defined..."), false);
          }
        }
        const a = (e2) => new s(e2);
        var u = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        const c = { rps: 120, tag: "jsapi" }, l = { rps: 0, tag: "jsapi" }, d = { tag: "jsapi" }, f = (e2) => e2.actionsChannels.createSource("fireGeneralSilentNotification/Req", c), h = (e2) => e2.actionsChannels.createSource("fireGeneralAutoDismissNotification/Req", l), p2 = (e2) => e2.actionsChannels.createDestination("fireGeneralAutoDismissNotification/Res", l), g = (e2) => e2.actionsChannels.createSource("fireGeneralAcknowledgeNotification/Req", l), v = (e2) => e2.actionsChannels.createDestination("fireGeneralAcknowledgeNotification/Res", l), m = (e2) => e2.actionsChannels.createSource("addCustomTask", c), y = (e2) => e2.actionsChannels.createSource("getToken/Req", l), w = (e2) => e2.actionsChannels.createDestination("getToken/Res", d), b = (e2) => e2.actionsChannels.createSource("getTaskMap/Req", l), E = (e2) => e2.actionsChannels.createDestination("getTaskMap/Res", d), S = (e2) => e2.actionsChannels.createSource("getMediaTypeQueue/Req", l), k = (e2) => e2.actionsChannels.createDestination("getMediaTypeQueue/Res", d), O = (e2) => e2.actionsChannels.createSource("getIdleCodes/Req", l), T = (e2) => e2.actionsChannels.createDestination("getIdleCodes/Res", d), C = (e2) => e2.actionsChannels.createSource("getWrapUpCodes/Req", l), A = (e2) => e2.actionsChannels.createDestination("getWrapUpCodes/Res", d);
        class I {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          getNextReqId() {
            const e2 = Date.now();
            return this.lastReqTs !== e2 ? (this.lastReqTs = e2, this.lastReqN = 0) : this.lastReqN++, `${this.lastReqTs}_${this.lastReqN}`;
          }
          constructor(e2) {
            this.lastReqTs = Date.now(), this.lastReqN = 0, this.toggleMiximizeRestore = (e3) => {
              var t2;
              if (e3 && e3.target) {
                const n2 = null === (t2 = this.getClosestElement(e3.target, ".dynamic-widget-wrapper")) || void 0 === t2 ? void 0 : t2.id;
                if (n2) {
                  const e4 = new CustomEvent("toggle-maximize-restore", { detail: { widgetId: n2 } });
                  window.dispatchEvent(e4), i.info("Dispatching toggle-maximize-restore event for widgetId:", n2);
                }
              }
            }, this.toggleVoiceInteractionPanel = () => {
              window.dispatchEvent(new CustomEvent("toggle-voice-interaction-panel")), i.info("Dispatching toggl-voice-interaction-panel");
            }, this.toggleMuteUnmuteWebRtcCall = () => {
              const e3 = new CustomEvent("ax-web-call-mute-unmute", {});
              window.dispatchEvent(e3), i.info("Dispatching ax-web-call-mute-unmute event");
            }, this.declineWebRtcCall = () => {
              const e3 = new CustomEvent("ax-web-call-decline", {});
              window.dispatchEvent(e3), i.info("Dispatching ax-web-call-decline event");
            }, this.acceptWebRtcCall = () => {
              const e3 = new CustomEvent("ax-web-call-answer", {});
              window.dispatchEvent(e3), i.info("Dispatching ax-web-call-answer event");
            }, this.logger = e2.logger, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && (this.sourceActionsChannels = { fireGeneralSilentNotification: f(this.SERVICE), fireGeneralAutoDismissNotification: h(this.SERVICE), fireGeneralAcknowledgeNotification: g(this.SERVICE), addCustomTask: m(this.SERVICE), getToken: y(this.SERVICE), getTaskMap: b(this.SERVICE), getMediaTypeQueue: S(this.SERVICE), getIdleCodes: O(this.SERVICE), getWrapUpCodes: C(this.SERVICE) }, this.destinationActionsChannels = { fireGeneralAutoDismissNotification: p2(this.SERVICE), fireGeneralAcknowledgeNotification: v(this.SERVICE), getToken: w(this.SERVICE), getTaskMap: E(this.SERVICE), getMediaTypeQueue: k(this.SERVICE), getIdleCodes: T(this.SERVICE), getWrapUpCodes: A(this.SERVICE) }, this.logger.info("Inited"));
          }
          cleanup() {
            this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          fireGeneralSilentNotification(...e2) {
            this.checkService() && this.sourceActionsChannels.fireGeneralSilentNotification.send(...e2);
          }
          fireGeneralAutoDismissNotification(...e2) {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((t2) => {
                const n2 = this.getNextReqId(), i2 = ({ args: [e3, o2, s2, a2] }) => {
                  a2 === n2 && (s2 !== r.Notifications.ItemMeta.Mode.AutoDismiss && s2 !== r.Notifications.ItemMeta.Mode.Silent || e3 === r.Notifications.ItemMeta.Status.Deactivated && (t2([e3, o2, s2]), this.destinationActionsChannels.fireGeneralAutoDismissNotification.removeListener(i2)));
                };
                this.destinationActionsChannels.fireGeneralAutoDismissNotification.addListener(i2), this.sourceActionsChannels.fireGeneralAutoDismissNotification.send(...e2);
              });
            });
          }
          fireGeneralAcknowledgeNotification(...e2) {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((t2) => {
                const n2 = this.getNextReqId(), i2 = ({ args: [e3, o2, s2, a2] }) => {
                  a2 === n2 && (s2 !== r.Notifications.ItemMeta.Mode.Acknowledge && s2 !== r.Notifications.ItemMeta.Mode.Silent || e3 === r.Notifications.ItemMeta.Status.Deactivated && (t2([e3, o2, s2]), this.destinationActionsChannels.fireGeneralAcknowledgeNotification.removeListener(i2)));
                };
                this.destinationActionsChannels.fireGeneralAcknowledgeNotification.addListener(i2), this.sourceActionsChannels.fireGeneralAcknowledgeNotification.send(...e2);
              });
            });
          }
          addCustomTask(...e2) {
            this.checkService() && this.sourceActionsChannels.addCustomTask.send(...e2);
          }
          getTaskMap() {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((e2) => {
                const t2 = this.getNextReqId(), n2 = ({ args: [r2, i2] }) => {
                  i2 === t2 && (e2(r2), this.destinationActionsChannels.getTaskMap.removeListener(n2));
                };
                this.destinationActionsChannels.getTaskMap.addListener(n2), this.sourceActionsChannels.getTaskMap.send(t2);
              });
            });
          }
          getMediaTypeQueue(e2) {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((t2) => {
                const n2 = this.getNextReqId(), r2 = ({ args: [e3, i2] }) => {
                  i2 === n2 && (t2(e3), this.destinationActionsChannels.getMediaTypeQueue.removeListener(r2));
                };
                this.destinationActionsChannels.getMediaTypeQueue.addListener(r2), this.sourceActionsChannels.getMediaTypeQueue.send(e2, n2);
              });
            });
          }
          getToken() {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((e2) => {
                const t2 = this.getNextReqId(), n2 = ({ args: [r2, i2] }) => {
                  i2 === t2 && (e2(r2), this.destinationActionsChannels.getToken.removeListener(n2));
                };
                this.destinationActionsChannels.getToken.addListener(n2), this.sourceActionsChannels.getToken.send(t2);
              });
            });
          }
          getIdleCodes() {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((e2) => {
                const t2 = this.getNextReqId(), n2 = ({ args: [r2, i2] }) => {
                  i2 === t2 && (e2(r2), this.destinationActionsChannels.getIdleCodes.removeListener(n2));
                };
                this.destinationActionsChannels.getIdleCodes.addListener(n2), this.sourceActionsChannels.getIdleCodes.send(t2);
              });
            });
          }
          getWrapUpCodes() {
            return u(this, void 0, void 0, function* () {
              if (this.checkService()) return yield new Promise((e2) => {
                const t2 = this.getNextReqId(), n2 = ({ args: [r2, i2] }) => {
                  i2 === t2 && (e2(r2), this.destinationActionsChannels.getWrapUpCodes.removeListener(n2));
                };
                this.destinationActionsChannels.getWrapUpCodes.addListener(n2), this.sourceActionsChannels.getWrapUpCodes.send(t2);
              });
            });
          }
          getClosestElement(e2, t2) {
            return e2 && e2 !== document && e2 !== window ? e2 instanceof ShadowRoot ? this.getClosestElement(e2.host, t2) : e2 instanceof HTMLElement && e2.matches(t2) ? e2 : this.getClosestElement(e2.parentNode, t2) : null;
          }
        }
        const L = o(i, "[Actions JSAPI] =>");
        class R {
          constructor(e2) {
            this.isInited = false, this.listeners = /* @__PURE__ */ new Map(), this.listenersOnce = /* @__PURE__ */ new Map(), this.logger = e2.logger;
          }
          init(e2) {
            this.aqmServiceEntity = e2.aqmServiceEntity, this.aqmServiceEntityString = e2.aqmServiceEntityString, this.isInited = true;
          }
          cleanup() {
            this.removeAllEventListeners(), this.aqmServiceEntity = void 0, this.aqmServiceEntityString = void 0, this.isInited = false;
          }
          _addEventListener(e2, t2, n2) {
            var r2, i2, o2;
            const s2 = n2 ? "listenersOnce" : "listeners";
            this[s2].has(e2) || this[s2].set(e2, /* @__PURE__ */ new Map());
            const a2 = this[s2].get(e2), u2 = n2 ? "listenOnce" : "listen", c2 = (r3) => {
              let i3 = null;
              return n2 && (i3 = this.aqmServiceEntity[e2].listenOnce(() => this.removeOnceEventListener(e2, t2))), () => {
                var t3;
                if (r3) {
                  n2 ? (r3.stopListenOnce(), i3 && i3.stopListenOnce()) : r3.stopListen();
                  const o3 = [];
                  o3.push(`UnBound "${e2.toString()}"`), n2 && o3.push("Once"), this.aqmServiceEntityString && o3.push(`from "${this.aqmServiceEntityString}"`), null === (t3 = this.logger) || void 0 === t3 || t3.info(o3.join(" "));
                }
              };
            };
            if (this.aqmServiceEntity) if (e2 in this.aqmServiceEntity && u2 in this.aqmServiceEntity[e2]) {
              const i3 = this.aqmServiceEntity[e2][u2](t2);
              a2.set(t2, c2(i3));
              const o3 = [];
              o3.push(`Bound "${e2.toString()}"`), n2 && o3.push("Once"), this.aqmServiceEntityString && o3.push(`to "${this.aqmServiceEntityString}"`), null === (r2 = this.logger) || void 0 === r2 || r2.info(o3.join(" "));
            } else null === (i2 = this.logger) || void 0 === i2 || i2.warn(`EventName "${e2.toString()}" is not recognized, so won't be subscribed...`);
            else null === (o2 = this.logger) || void 0 === o2 || o2.error(`"${this.aqmServiceEntityString}" is not ready yet. .init(...) first...`);
          }
          _removeEventListener(e2, t2, n2) {
            const r2 = n2 ? "listenersOnce" : "listeners";
            if (this[r2].has(e2)) {
              const n3 = this[r2].get(e2);
              if (n3) {
                if (n3.has(t2)) {
                  n3.get(t2)(), n3.delete(t2);
                }
                n3.size < 1 && this[r2].delete(e2);
              }
            }
          }
          addEventListener(e2, t2) {
            this._addEventListener(e2, t2, false);
          }
          addOnceEventListener(e2, t2) {
            this._addEventListener(e2, t2, true);
          }
          removeEventListener(e2, t2) {
            this._removeEventListener(e2, t2, false);
          }
          removeOnceEventListener(e2, t2) {
            this._removeEventListener(e2, t2, true);
          }
          removeAllEventListeners() {
            ["listeners", "listenersOnce"].forEach((e2) => {
              this[e2].forEach((e3, t2) => {
                e3.forEach((e4, t3) => e4()), e3.clear();
              }), this[e2].clear();
            });
          }
        }
        const x = (e2) => new R(e2);
        var _ = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class N {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.aqmEvents = e2.aqmEvents, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.contact, aqmServiceEntityString: "SERVICE.aqm.contact" }), this.logger.info("Inited"));
          }
          cleanup() {
            this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          sendDtmf(e2) {
            this.checkService() && this.SERVICE.webCalling.sendDTMF(e2);
          }
          accept(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.accept(e2);
            });
          }
          consultAccept(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultAccept(e2);
            });
          }
          buddyAgents(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.buddyAgents(e2);
            });
          }
          end(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.end(e2);
            });
          }
          consultEnd(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultEnd(e2);
            });
          }
          cancelCtq(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.cancelCtq(e2);
            });
          }
          wrapup(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.wrapup(e2);
            });
          }
          vteamTransfer(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.vteamTransfer(e2);
            });
          }
          blindTransfer(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.blindTransfer(e2);
            });
          }
          hold(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.hold(e2);
            });
          }
          unHold(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.unHold(e2);
            });
          }
          consult(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consult(e2);
            });
          }
          consultConference(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultConference(e2);
            });
          }
          decline(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.decline(e2);
            });
          }
          consultTransfer(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultTransfer(e2);
            });
          }
          vteamList(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.vteamList(e2);
            });
          }
          pauseRecording(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.pauseRecording(e2);
            });
          }
          resumeRecording(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.resumeRecording(e2);
            });
          }
          acceptV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.acceptV2(e2);
            });
          }
          endV2(e2) {
            var t2, n2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return (null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.endV2) ? null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.aqm.contact.endV2(e2) : void 0;
            });
          }
          cancelTaskV2(e2) {
            var t2, n2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return (null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.cancelTaskV2) ? null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.aqm.contact.cancelTaskV2(e2) : void 0;
            });
          }
          pauseRecordingV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.pauseRecordingV2(e2);
            });
          }
          resumeRecordingV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.resumeRecordingV2(e2);
            });
          }
          wrapupV2(e2) {
            var t2, n2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return (null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.wrapupV2) ? null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.aqm.contact.wrapupV2(e2) : void 0;
            });
          }
          consultV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultV2(e2);
            });
          }
          consultEndV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultEndV2(e2);
            });
          }
          consultConferenceV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultConferenceV2(e2);
            });
          }
          exitConference(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.exitConference(e2);
            });
          }
          consultTransferV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.consultTransferV2(e2);
            });
          }
          blindTransferV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.blindTransferV2(e2);
            });
          }
          vteamTransferV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.vteamTransferV2(e2);
            });
          }
          buddyAgentsV2(e2) {
            var t2;
            return _(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.contact.buddyAgentsV2(e2);
            });
          }
          addEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addEventListener(e2, t2);
          }
          addOnceEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addOnceEventListener(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.aqmEvents.removeEventListener(e2, t2);
          }
          removeOnceEventListener(e2, t2) {
            this.aqmEvents.removeOnceEventListener(e2, t2);
          }
          removeAllEventListeners() {
            this.aqmEvents.removeAllEventListeners();
          }
        }
        const D = o(i, "[AgentContact JSAPI] =>"), M = o(D, "[AqmServiceEvents: Contact] => ");
        var P = n(8), j = n.n(P), V = n(15), U = n.n(V), q = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        const F = { agentName: void 0, agentProfileID: void 0, agentSessionId: void 0, idleCode: void 0, teamId: void 0, teamName: void 0, dn: void 0, status: void 0, subStatus: void 0, idleCodes: void 0, wrapupCodes: void 0, outDialRegex: void 0, isOutboundEnabledForTenant: void 0, isOutboundEnabledForAgent: void 0, isEndCallEnabled: void 0, isEndConsultEnabled: void 0, allowConsultToQueue: void 0, isAdhocDialingEnabled: void 0, isAgentAvailableAfterOutdial: void 0, isCampaignManagementEnabled: void 0, agentPersonalStatsEnabled: void 0 };
        class B {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          emit(e2, ...t2) {
            this.emitter.emit(e2, ...t2);
          }
          update(e2) {
            const t2 = Object.keys(e2).reduce((t3, n2) => {
              const r2 = e2[n2], i2 = this.latestData[n2];
              return JSON.stringify(r2) !== JSON.stringify(i2) && t3.push({ name: n2, value: r2, oldValue: i2 }), t3;
            }, []);
            t2.length && (t2.forEach((e3) => this.latestData[e3.name] = e3.value), this.emit("updated", t2));
          }
          static getOutdialRegex(e2) {
            if (e2 && e2.dialPlanEntity) {
              const t2 = e2.dialPlanEntity.find((e3) => "Any Format" === e3.name);
              if (t2) return t2.regex;
            }
            return "";
          }
          constructor(e2) {
            this.emitter = j()(), this.listeners = /* @__PURE__ */ new Set(), this.teams = [], this.idleCodes = {}, this.latestData = Object.assign({}, F), this.logger = e2.logger, this.serviceChecker = e2.serviceChecker;
          }
          static findTeamName(e2, t2) {
            const n2 = e2.find((e3) => e3.teamId === t2);
            return (null == n2 ? void 0 : n2.teamName) || "";
          }
          init(e2) {
            return q(this, void 0, void 0, function* () {
              e2 && (this.SERVICE = e2), this.checkService() && (yield this.fetchLatestData(), this.subscribeSelfDataEvents(), this.logger.info("Inited"));
            });
          }
          cleanup() {
            this.unsubscribeSelfDataEvents(), this.removeAllEventListeners(), this.SERVICE = void 0, this.update(Object.assign({}, F)), this.logger.info("Cleaned");
          }
          fetchLatestData() {
            var e2, t2, n2, r2, i2, o2;
            return q(this, void 0, void 0, function* () {
              const s2 = (null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.conf.profile) ? null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.conf.profile : yield null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.conf.fetchProfile();
              if (s2) {
                const { teams: e3, agentName: t3, agentProfileID: n3, defaultDn: a2, agentSubStatus: u2, agentStatus: c2, idleCodes: l2, wrapupCodes: d2, dialPlan: f2, isOutboundEnabledForTenant: h2, isOutboundEnabledForAgent: p3, isAdhocDialingEnabled: g2, isEndCallEnabled: v2, isEndConsultEnabled: m2, allowConsultToQueue: y2, isAgentAvailableAfterOutdial: w2, isCampaignManagementEnabled: b2, agentPersonalStatsEnabled: E2 } = s2;
                let { idleCode: S2 } = s2;
                const k2 = a2;
                let O2 = c2, T2 = u2;
                this.teams = e3, l2.forEach((e4) => {
                  this.idleCodes[e4.id] = { id: e4.id, name: e4.name };
                });
                const C2 = yield null === (r2 = this.SERVICE) || void 0 === r2 ? void 0 : r2.aqm.agent.reload();
                (null == C2 ? void 0 : C2.data) && (S2 = "0" != C2.data.auxCodeId ? this.idleCodes[C2.data.auxCodeId] : void 0, O2 = null === (i2 = null == C2 ? void 0 : C2.data) || void 0 === i2 ? void 0 : i2.status, T2 = null === (o2 = null == C2 ? void 0 : C2.data) || void 0 === o2 ? void 0 : o2.subStatus);
                const A2 = B.getOutdialRegex(f2);
                this.update({ agentName: t3, agentProfileID: n3, dn: k2, status: O2, subStatus: T2, idleCode: S2, idleCodes: l2, wrapupCodes: d2, outDialRegex: A2, isOutboundEnabledForTenant: h2, isOutboundEnabledForAgent: p3, isAdhocDialingEnabled: g2, isEndCallEnabled: v2, isEndConsultEnabled: m2, allowConsultToQueue: y2, isAgentAvailableAfterOutdial: w2, isCampaignManagementEnabled: b2, agentPersonalStatsEnabled: E2 });
              }
            });
          }
          subscribeSelfDataEvents() {
            var e2, t2, n2, r2;
            if (this.checkService()) {
              {
                const t3 = null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.aqm.agent.eAgentReloginSuccess.listen(({ data: { agentSessionId: e3 = "", teamId: t4 = "", dn: n3 = "", status: r3 = "", subStatus: i2 = "", auxCodeId: o2 = "" } }) => {
                  const s2 = B.findTeamName(this.teams, t4);
                  this.update({ agentSessionId: e3, teamId: t4, teamName: s2, dn: n3, status: r3, subStatus: i2, idleCode: this.idleCodes[o2] });
                });
                this.listeners.add(() => null == t3 ? void 0 : t3.stopListen());
              }
              {
                const e3 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.agent.eAgentStationLoginSuccess.listen(({ data: { agentSessionId: e4 = "", teamId: t3 = "", status: n3 = "", subStatus: r3 = "", auxCodeId: i2 = "" } }) => {
                  const o2 = B.findTeamName(this.teams, t3);
                  this.update({ agentSessionId: e4, teamId: t3, teamName: o2, status: n3, subStatus: r3, idleCode: this.idleCodes[i2] });
                });
                this.listeners.add(() => null == e3 ? void 0 : e3.stopListen());
              }
              {
                const e3 = null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.aqm.agent.eAgentStateChangeSuccess.listen(({ data: { agentSessionId: e4 = "", status: t3 = "", subStatus: n3 = "", auxCodeId: r3 = "" } }) => {
                  this.update({ agentSessionId: e4, status: t3, subStatus: n3, idleCode: this.idleCodes[r3] });
                });
                this.listeners.add(() => null == e3 ? void 0 : e3.stopListen());
              }
              {
                const e3 = null === (r2 = this.SERVICE) || void 0 === r2 ? void 0 : r2.aqm.agent.eAgentDNRegistered.listen(({ data: { dn: e4 = "" } }) => {
                  this.update({ dn: e4 });
                });
                this.listeners.add(() => null == e3 ? void 0 : e3.stopListen());
              }
            }
          }
          unsubscribeSelfDataEvents() {
            this.listeners.forEach((e2) => e2()), this.listeners.clear();
          }
          stateChange(e2) {
            var t2;
            return q(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.agent.stateChange({ data: e2 });
            });
          }
          mockOutdialAniList() {
            var e2, t2;
            return q(this, void 0, void 0, function* () {
              if (this.checkService()) return (null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.aqm.agent.mockOutdialAniList) && (null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.agent.mockOutdialAniList());
            });
          }
          fetchAddressBooks() {
            var e2, t2;
            return q(this, void 0, void 0, function* () {
              if (this.checkService()) return (null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.aqm.agent.fetchAddressBooks) && (null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.agent.fetchAddressBooks());
            });
          }
          changeAgentState(e2, t2) {
            var n2;
            return q(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.aqm.supervisor.changeAgentState({ orgId: e2, data: t2 });
            });
          }
          fetchAgentIdleCodes(e2, t2) {
            var n2;
            return q(this, void 0, void 0, function* () {
              if (this.checkService()) return yield null === (n2 = this.SERVICE) || void 0 === n2 ? void 0 : n2.abs.fetchAgentIdleCodes({ orgId: e2, agentId: t2 });
            });
          }
          fetchOrganizationIdleCodes(e2) {
            var t2;
            return q(this, void 0, void 0, function* () {
              if (this.checkService()) return yield null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.abs.fetchIdleCodes({ orgId: e2, accessType: "ALL" });
            });
          }
          addEventListener(e2, t2) {
            this.checkService() && this.emitter.on(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.checkService() && this.emitter.off(e2, t2);
          }
          removeAllEventListeners() {
            U()(this.emitter);
          }
        }
        const z = o(i, "[AgentInfo JSAPI] =>");
        var H = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class J {
          waitUntil(e2) {
            return H(this, void 0, void 0, function* () {
              if ("function" == typeof e2) {
                yield new Promise((e3) => setTimeout(e3, 1e3 / 30));
                !e2() && (yield this.waitUntil(e2));
              }
            });
          }
          constructor(e2) {
            this.initEventType = {}, this.emitter = j()(), this.logger = e2.logger, this.agentxSERVICE = e2.SERVICE;
          }
          checkService(e2) {
            return H(this, void 0, void 0, function* () {
              e2 ? (e2.isInited || (this.logger.warn("SERVICE is not inited. Awaiting it's initAgentxServices(...)..."), yield this.waitUntil(() => e2.isInited)), this.logger.info("SERVICE is inited. Continuing..."), this.emit("inited")) : this.logger.error("SERVICE is not defiend...");
            });
          }
          emit(e2, ...t2) {
            this.emitter.emit(e2, ...t2);
          }
          init(e2) {
            return H(this, void 0, void 0, function* () {
              this.agentxSERVICE ? yield this.checkService(this.agentxSERVICE) : this.logger.error("SERVICE is not defined..."), this.initEventType.widgetName = e2.widgetName, this.initEventType.widgetProvider = e2.widgetProvider, this.publishEvent("agentx-js-sdk-init");
            });
          }
          registerCrmConnector(e2) {
            if (window.self !== window.top) {
              this.initEventType.crmPlatform = e2.crmPlatform, this.initEventType.crmConnectorProvider = e2.crmConnectorProvider || "Cisco", i.info(`CRm Connector registered through JS SDK... [crmPlatform: ${this.initEventType.crmPlatform}, widgetProvider: ${this.initEventType.crmConnectorProvider}]  `);
              const t2 = document.referrer;
              i.info("This Desktop is loaded inside an iframe.", t2), this.publishEvent("agentx-js-sdk-register-crm-connector");
            } else i.warn("This Desktop is not loaded inside an iframe. CRM Connector is not registered.");
          }
          publishEvent(e2) {
            var t2, n2;
            const { crmPlatform: r2, crmConnectorProvider: o2, widgetName: s2, widgetProvider: a2 } = this.initEventType, u2 = Object.assign({}, ...Object.entries(this.initEventType).map(([e3, t3]) => t3 ? { [e3]: t3 } : {}));
            this.logger.info("initEvent", u2), i.info(`Publishing js sdk init ${e2} event : [widgetName: ${s2}, widgetProvider: ${a2}, crmPlatform: ${r2}, crmConnectorProvider: ${o2}]`), (null === (t2 = this.agentxSERVICE) || void 0 === t2 ? void 0 : t2.mixpanel) && (i.info(`tracking mixpanel for ${e2} event `), null === (n2 = this.agentxSERVICE) || void 0 === n2 || n2.mixpanel.track(e2, Object.assign({}, u2)));
          }
          cleanup() {
            this.agentxSERVICE = void 0, this.emit("cleaned"), this.logger.info("Cleaned");
          }
          get clientLocale() {
            return null != window.navigator.languages ? window.navigator.languages[0] : window.navigator.language;
          }
          addEventListener(e2, t2) {
            this.emitter.on(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.emitter.off(e2, t2);
          }
        }
        const Z = o(i, "[Config JSAPI] =>");
        var W = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class G {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.aqmEvents = e2.aqmEvents, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.dialer, aqmServiceEntityString: "SERVICE.aqm.dialer" }), this.logger.info("Inited"));
          }
          cleanup() {
            this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          startOutdial(e2) {
            var t2;
            return W(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.dialer.startOutdial(e2);
            });
          }
          updateCadVariables(e2) {
            var t2;
            return W(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.dialer.updateCadVariables(e2);
            });
          }
          addEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addEventListener(e2, t2);
          }
          addOnceEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addOnceEventListener(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.aqmEvents.removeEventListener(e2, t2);
          }
          removeOnceEventListener(e2, t2) {
            this.aqmEvents.removeOnceEventListener(e2, t2);
          }
          removeAllEventListeners() {
            this.aqmEvents.removeAllEventListeners();
          }
        }
        const Y = o(i, "[Dialer JSAPI] =>"), $ = o(Y, "[AqmServiceEvents: Dialer] =>");
        class K {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && this.logger.info("Inited");
          }
          cleanup() {
            this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          createInstance(e2) {
            return r.I18N.createService(e2);
          }
          createMixin(e2) {
            return r.I18N.createMixin(e2);
          }
          get DEFAULT_INIT_OPTIONS() {
            var e2;
            if (this.checkService()) return null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.i18n.DEFAULT_INIT_OPTIONS;
          }
          getMergedInitOptions(...e2) {
            return r.I18N.mergeServiceInitOptions(...e2);
          }
        }
        const X = o(i, "[I18N JSAPI] =>");
        class Q {
          constructor(e2) {
            this.clientLoggers = /* @__PURE__ */ new Map(), this.logger = e2.logger;
          }
          createLogger(e2) {
            const t2 = Object(r.createLogger)(e2);
            return this.clientLoggers.set(e2, t2), this.logger.info(`Client logger created: "${e2}"`), t2;
          }
          cleanupLogs(e2) {
            this.clientLoggers.has(e2) && r.Logger.POOL.cleanupPrefixedLogs(e2);
          }
          browserDownloadLogsJson(e2) {
            this.clientLoggers.has(e2) && r.Logger.POOL.browserDownloadPrefixedLogsJson(e2);
          }
          browserDownloadLogsText(e2) {
            this.clientLoggers.has(e2) && r.Logger.POOL.browserDownloadPrefixedLogsText(e2);
          }
          getLogsCollection(e2) {
            if (this.clientLoggers.has(e2)) return r.Logger.POOL.getPrefixedLogsCollection(e2);
          }
          getLogsJsonUrl(e2) {
            if (this.clientLoggers.has(e2)) return r.Logger.POOL.getPrefixedLogsJsonUrl(e2);
          }
          getLogsTextUrl(e2) {
            if (this.clientLoggers.has(e2)) return r.Logger.POOL.getPrefixedLogsTextUrl(e2);
          }
        }
        const ee = o(i, "[Logger JSAPI] =>");
        class te {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.aqmEvents = e2.aqmEvents, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.screenpop, aqmServiceEntityString: "SERVICE.aqm.screenpop" }), this.logger.info("Inited"));
          }
          cleanup() {
            this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          addEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addEventListener(e2, t2);
          }
          addOnceEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addOnceEventListener(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.aqmEvents.removeEventListener(e2, t2);
          }
          removeOnceEventListener(e2, t2) {
            this.aqmEvents.removeOnceEventListener(e2, t2);
          }
          removeAllEventListeners() {
            this.aqmEvents.removeAllEventListeners();
          }
        }
        const ne = o(i, "[ScreenPop JSAPI] =>"), re = o(ne, "[AqmServiceEvents: ScreenPop] =>");
        class ie {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && this.logger.info("Inited");
          }
          cleanup() {
            this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          listenKeyPress(...e2) {
            var t2;
            this.checkService() && (null === (t2 = this.SERVICE) || void 0 === t2 || t2.shortcut.event.listenKeyPress(...e2));
          }
          listenKeyConflict(...e2) {
            var t2;
            this.checkService() && (null === (t2 = this.SERVICE) || void 0 === t2 || t2.shortcut.event.listenKeyConflict(...e2));
          }
          listenConflictResolved(...e2) {
            var t2;
            this.checkService() && (null === (t2 = this.SERVICE) || void 0 === t2 || t2.shortcut.event.listenConflictResolved(...e2));
          }
          register(...e2) {
            var t2;
            this.checkService() && (null === (t2 = this.SERVICE) || void 0 === t2 || t2.shortcut.register(...e2));
          }
          unregisterKeys(...e2) {
            var t2;
            this.checkService() && (null === (t2 = this.SERVICE) || void 0 === t2 || t2.shortcut.unregisterKeys(...e2));
          }
          getRegisteredKeys() {
            var e2;
            if (this.checkService()) return null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.shortcut.getRegisteredKeys();
          }
          get DEFAULT_SHORTCUT_KEYS() {
            var e2;
            return null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.shortcut.DEFAULT_SHORTCUT_KEYS;
          }
          get MODIFIERS() {
            var e2;
            return null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.shortcut.MODIFIERS;
          }
          get REGISTERED_KEYS() {
            var e2;
            return null === (e2 = this.SERVICE) || void 0 === e2 ? void 0 : e2.shortcut.REGISTERED_KEYS;
          }
        }
        const oe = o(i, "[ShortcutKey JSAPI] =>");
        var se = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class ae {
          waitUntil(e2) {
            return se(this, void 0, void 0, function* () {
              if ("function" == typeof e2) {
                yield new Promise((e3) => setTimeout(e3, 1e3 / 30));
                !e2() && (yield this.waitUntil(e2));
              }
            });
          }
          checkService() {
            var e2, t2, n2, r2, i2;
            return se(this, void 0, void 0, function* () {
              window.wxcc && (null === (e2 = window.wxcc) || void 0 === e2 ? void 0 : e2.rtdwc) ? ((null === (n2 = null === (t2 = window.wxcc) || void 0 === t2 ? void 0 : t2.rtdwc) || void 0 === n2 ? void 0 : n2.error) && (this.logger.error("RTDWC initialization failed. Awaiting Websocket connection to establish", null === (i2 = null === (r2 = window.wxcc) || void 0 === r2 ? void 0 : r2.rtdwc) || void 0 === i2 ? void 0 : i2.error), yield this.waitUntil(() => {
                var e3, t3;
                return !(null === (t3 = null === (e3 = window.wxcc) || void 0 === e3 ? void 0 : e3.rtdwc) || void 0 === t3 ? void 0 : t3.error);
              })), this.logger.info("Websocket connection established successfully. Continue to subscribe...")) : this.logger.error("issue in loading rtdwc");
            });
          }
          constructor(e2) {
            this.emitter = j()(), this.logger = e2.logger;
          }
          init() {
            return se(this, void 0, void 0, function* () {
              yield this.checkService(), this.logger.info("rtdwc initialized");
            });
          }
          subscribe({ datasetName: e2, update: t2, error: n2 }) {
            var r2, i2;
            return se(this, void 0, void 0, function* () {
              return yield this.checkService(), yield null === (i2 = null === (r2 = window.wxcc) || void 0 === r2 ? void 0 : r2.rtdwc) || void 0 === i2 ? void 0 : i2.subscribe({ datasetName: e2, update: t2, error: n2 });
            });
          }
        }
        const ue = o(i, "[RTDWC JSAPI] =>");
        var ce = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class le {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.aqmEvents = e2.aqmEvents, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.supervisor, aqmServiceEntityString: "SERVICE.aqm.supervisor" }), this.logger.info("[JSAPI] Monitoring Inited"));
          }
          cleanup() {
            this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          startMonitoring(e2) {
            var t2, n2;
            return ce(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.supervisor) || void 0 === n2 ? void 0 : n2.startMonitoring(e2);
            });
          }
          endMonitoring(e2) {
            var t2, n2;
            return ce(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.supervisor) || void 0 === n2 ? void 0 : n2.endMonitoring(e2);
            });
          }
          holdMonitoring(e2) {
            var t2, n2;
            return ce(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.supervisor) || void 0 === n2 ? void 0 : n2.holdMonitoring(e2);
            });
          }
          unHoldMonitoring(e2) {
            var t2, n2;
            return ce(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.supervisor) || void 0 === n2 ? void 0 : n2.unHoldMonitoring(e2);
            });
          }
          bargeIn(e2) {
            var t2, n2;
            return ce(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.supervisor) || void 0 === n2 ? void 0 : n2.bargeIn(e2);
            });
          }
          addEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addEventListener(e2, t2);
          }
          addOnceEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addOnceEventListener(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.aqmEvents.removeEventListener(e2, t2);
          }
          removeOnceEventListener(e2, t2) {
            this.aqmEvents.removeOnceEventListener(e2, t2);
          }
          removeAllEventListeners() {
            this.aqmEvents.removeAllEventListeners();
          }
        }
        const de = o(i, "[Call Monitoring JSAPI] =>"), fe = o(de, "[AqmServiceEvents: Call Monitoring] =>");
        var he = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class pe {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.aqmEvents = e2.aqmEvents, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.agent, aqmServiceEntityString: "SERVICE.aqm.agent" }), this.logger.info("[JSAPI] Logout Inited"));
          }
          cleanup() {
            this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          desktopLogout(e2) {
            var t2, n2;
            return he(this, void 0, void 0, function* () {
              if (!this.checkService()) return;
              const r2 = yield ke.actions.getTaskMap();
              if (0 !== (null == r2 ? void 0 : r2.size)) throw new Error("You cannot sign out now because you have active conversations. Complete them and try again.");
              return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.agent) || void 0 === n2 ? void 0 : n2.logout(e2);
            });
          }
          signoutAgent(e2) {
            var t2, n2;
            return he(this, void 0, void 0, function* () {
              if (this.checkService()) try {
                return i.info("[App:TPW] event=signoutAgentBySupervisor for agent ", e2.data.agentId), null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.aqm.supervisor) || void 0 === n2 ? void 0 : n2.signoutAgent(e2);
              } catch (t3) {
                i.error("[App:TPW] event=signoutAgentBySupervisorFailed for agent ", e2.data.agentId, t3);
              }
            });
          }
          addEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addEventListener(e2, t2);
          }
          addOnceEventListener(e2, t2) {
            this.checkService() && this.aqmEvents.addOnceEventListener(e2, t2);
          }
          removeEventListener(e2, t2) {
            this.aqmEvents.removeEventListener(e2, t2);
          }
          removeOnceEventListener(e2, t2) {
            this.aqmEvents.removeOnceEventListener(e2, t2);
          }
          removeAllEventListeners() {
            this.aqmEvents.removeAllEventListeners();
          }
        }
        const ge = o(i, "[Station Logout JSAPI] =>"), ve = o(ge, "[AqmServiceEvents: Call Monitoring] =>");
        var me = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class ye {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && this.logger.info("[JSAPI] Initialized");
          }
          cleanup() {
            this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          fetchTasks(e2) {
            var t2, n2;
            return me(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.qmw) || void 0 === n2 ? void 0 : n2.fetchTasks(e2);
            });
          }
          fetchCapture(e2) {
            var t2, n2;
            return me(this, void 0, void 0, function* () {
              if (this.checkService()) return null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.qmw) || void 0 === n2 ? void 0 : n2.fetchCapture(e2);
            });
          }
        }
        const we = o(i, "[PI JSAPI] =>");
        var be = function(e2, t2, n2, r2) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function s2(e3) {
              try {
                u2(r2.next(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function a2(e3) {
              try {
                u2(r2.throw(e3));
              } catch (e4) {
                o2(e4);
              }
            }
            function u2(e3) {
              var t3;
              e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
                e4(t3);
              })).then(s2, a2);
            }
            u2((r2 = r2.apply(e2, [])).next());
          });
        };
        class Ee {
          checkService() {
            return this.serviceChecker.check(this.SERVICE);
          }
          constructor(e2) {
            this.logger = e2.logger, this.serviceChecker = e2.serviceChecker;
          }
          init(e2) {
            e2 && (this.SERVICE = e2), this.checkService() && this.logger.info("[JSAPI] AgentConfigJsApi Initialized");
          }
          cleanup() {
            this.SERVICE = void 0, this.logger.info("Cleaned");
          }
          fetchPaginatedAuxCodes(e2) {
            var t2, n2;
            return be(this, void 0, void 0, function* () {
              if (this.checkService()) return yield null === (n2 = null === (t2 = this.SERVICE) || void 0 === t2 ? void 0 : t2.abs) || void 0 === n2 ? void 0 : n2.fetchPaginatedAuxCodes(e2);
            });
          }
        }
        const Se = o(i, "[AGENT CONFIG JSAPI] =>"), ke = (() => {
          AGENTX_SERVICE ? i.info('Found global "AGENTX_SERVICE"!') : i.error('Missed global "AGENTX_SERVICE"...');
          const e2 = (t2 = AGENTX_SERVICE, new J({ logger: Z, SERVICE: t2 }));
          var t2;
          const n2 = new Q({ logger: ee }), r2 = new ie({ logger: oe, serviceChecker: a({ logger: oe }) }), o2 = new I({ logger: L, serviceChecker: a({ logger: L }) }), s2 = new B({ logger: z, serviceChecker: a({ logger: z }) }), u2 = new N({ logger: D, serviceChecker: a({ logger: D }), aqmEvents: x({ logger: M }) }), c2 = new G({ logger: Y, aqmEvents: x({ logger: $ }), serviceChecker: a({ logger: Y }) }), l2 = new le({ logger: de, aqmEvents: x({ logger: fe }), serviceChecker: a({ logger: de }) }), d2 = new te({ logger: ne, aqmEvents: x({ logger: re }), serviceChecker: a({ logger: ne }) }), f2 = new pe({ logger: ge, aqmEvents: x({ logger: ve }), serviceChecker: a({ logger: ge }) }), h2 = new K({ logger: X, serviceChecker: a({ logger: X }) }), p3 = new ae({ logger: ue });
          p3.init();
          const g2 = new ye({ logger: we, serviceChecker: a({ logger: we }) }), v2 = new Ee({ logger: Se, serviceChecker: a({ logger: Se }) });
          return e2.addEventListener("inited", () => {
            u2.init(AGENTX_SERVICE), s2.init(AGENTX_SERVICE), c2.init(AGENTX_SERVICE), l2.init(AGENTX_SERVICE), d2.init(AGENTX_SERVICE), f2.init(AGENTX_SERVICE), g2.init(AGENTX_SERVICE), r2.init(AGENTX_SERVICE), o2.init(AGENTX_SERVICE), h2.init(AGENTX_SERVICE), v2.init(AGENTX_SERVICE);
          }), e2.addEventListener("cleaned", () => {
            u2.cleanup(), s2.cleanup(), c2.cleanup(), l2.cleanup(), d2.cleanup(), f2.cleanup(), g2.cleanup(), r2.cleanup(), h2.cleanup(), o2.cleanup(), v2.cleanup();
          }), { config: e2, logger: n2, monitoring: l2, shortcutKey: r2, actions: o2, agentContact: u2, agentStateInfo: s2, dialer: c2, screenpop: d2, i18n: h2, rtdwc: p3, postInteractions: g2, logout: f2, agentConfigJsApi: v2 };
        })();
      }, function(e, t, n) {
        n.r(t), n.d(t, "v1", function() {
          return h;
        }), n.d(t, "v3", function() {
          return E;
        }), n.d(t, "v4", function() {
          return S;
        }), n.d(t, "v5", function() {
          return T;
        });
        var r = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto), i = new Uint8Array(16);
        function o() {
          if (!r) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          return r(i);
        }
        for (var s = [], a = 0; a < 256; ++a) s[a] = (a + 256).toString(16).substr(1);
        var u, c, l = function(e2, t2) {
          var n2 = 0, r2 = s;
          return [r2[e2[n2++]], r2[e2[n2++]], r2[e2[n2++]], r2[e2[n2++]], "-", r2[e2[n2++]], r2[e2[n2++]], "-", r2[e2[n2++]], r2[e2[n2++]], "-", r2[e2[n2++]], r2[e2[n2++]], "-", r2[e2[n2++]], r2[e2[n2++]], r2[e2[n2++]], r2[e2[n2++]], r2[e2[n2++]], r2[e2[n2++]]].join("");
        }, d = 0, f = 0;
        var h = function(e2, t2, n2) {
          var r2 = t2 && n2 || 0, i2 = t2 || [], s2 = (e2 = e2 || {}).node || u, a2 = void 0 !== e2.clockseq ? e2.clockseq : c;
          if (null == s2 || null == a2) {
            var h2 = e2.random || (e2.rng || o)();
            null == s2 && (s2 = u = [1 | h2[0], h2[1], h2[2], h2[3], h2[4], h2[5]]), null == a2 && (a2 = c = 16383 & (h2[6] << 8 | h2[7]));
          }
          var p3 = void 0 !== e2.msecs ? e2.msecs : (/* @__PURE__ */ new Date()).getTime(), g2 = void 0 !== e2.nsecs ? e2.nsecs : f + 1, v2 = p3 - d + (g2 - f) / 1e4;
          if (v2 < 0 && void 0 === e2.clockseq && (a2 = a2 + 1 & 16383), (v2 < 0 || p3 > d) && void 0 === e2.nsecs && (g2 = 0), g2 >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          d = p3, f = g2, c = a2;
          var m2 = (1e4 * (268435455 & (p3 += 122192928e5)) + g2) % 4294967296;
          i2[r2++] = m2 >>> 24 & 255, i2[r2++] = m2 >>> 16 & 255, i2[r2++] = m2 >>> 8 & 255, i2[r2++] = 255 & m2;
          var y2 = p3 / 4294967296 * 1e4 & 268435455;
          i2[r2++] = y2 >>> 8 & 255, i2[r2++] = 255 & y2, i2[r2++] = y2 >>> 24 & 15 | 16, i2[r2++] = y2 >>> 16 & 255, i2[r2++] = a2 >>> 8 | 128, i2[r2++] = 255 & a2;
          for (var w2 = 0; w2 < 6; ++w2) i2[r2 + w2] = s2[w2];
          return t2 || l(i2);
        };
        var p2 = function(e2, t2, n2) {
          var r2 = function(e3, r3, i2, o2) {
            var s2 = i2 && o2 || 0;
            if ("string" == typeof e3 && (e3 = function(e4) {
              e4 = unescape(encodeURIComponent(e4));
              for (var t3 = new Array(e4.length), n3 = 0; n3 < e4.length; n3++) t3[n3] = e4.charCodeAt(n3);
              return t3;
            }(e3)), "string" == typeof r3 && (r3 = function(e4) {
              var t3 = [];
              return e4.replace(/[a-fA-F0-9]{2}/g, function(e5) {
                t3.push(parseInt(e5, 16));
              }), t3;
            }(r3)), !Array.isArray(e3)) throw TypeError("value must be an array of bytes");
            if (!Array.isArray(r3) || 16 !== r3.length) throw TypeError("namespace must be uuid string or an Array of 16 byte values");
            var a2 = n2(r3.concat(e3));
            if (a2[6] = 15 & a2[6] | t2, a2[8] = 63 & a2[8] | 128, i2) for (var u2 = 0; u2 < 16; ++u2) i2[s2 + u2] = a2[u2];
            return i2 || l(a2);
          };
          try {
            r2.name = e2;
          } catch (e3) {
          }
          return r2.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", r2.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", r2;
        };
        function g(e2, t2) {
          var n2 = (65535 & e2) + (65535 & t2);
          return (e2 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
        }
        function v(e2, t2, n2, r2, i2, o2) {
          return g((s2 = g(g(t2, e2), g(r2, o2))) << (a2 = i2) | s2 >>> 32 - a2, n2);
          var s2, a2;
        }
        function m(e2, t2, n2, r2, i2, o2, s2) {
          return v(t2 & n2 | ~t2 & r2, e2, t2, i2, o2, s2);
        }
        function y(e2, t2, n2, r2, i2, o2, s2) {
          return v(t2 & r2 | n2 & ~r2, e2, t2, i2, o2, s2);
        }
        function w(e2, t2, n2, r2, i2, o2, s2) {
          return v(t2 ^ n2 ^ r2, e2, t2, i2, o2, s2);
        }
        function b(e2, t2, n2, r2, i2, o2, s2) {
          return v(n2 ^ (t2 | ~r2), e2, t2, i2, o2, s2);
        }
        var E = p2("v3", 48, function(e2) {
          if ("string" == typeof e2) {
            var t2 = unescape(encodeURIComponent(e2));
            e2 = new Array(t2.length);
            for (var n2 = 0; n2 < t2.length; n2++) e2[n2] = t2.charCodeAt(n2);
          }
          return function(e3) {
            var t3, n3, r2, i2 = [], o2 = 32 * e3.length;
            for (t3 = 0; t3 < o2; t3 += 8) n3 = e3[t3 >> 5] >>> t3 % 32 & 255, r2 = parseInt("0123456789abcdef".charAt(n3 >>> 4 & 15) + "0123456789abcdef".charAt(15 & n3), 16), i2.push(r2);
            return i2;
          }(function(e3, t3) {
            var n3, r2, i2, o2, s2;
            e3[t3 >> 5] |= 128 << t3 % 32, e3[14 + (t3 + 64 >>> 9 << 4)] = t3;
            var a2 = 1732584193, u2 = -271733879, c2 = -1732584194, l2 = 271733878;
            for (n3 = 0; n3 < e3.length; n3 += 16) r2 = a2, i2 = u2, o2 = c2, s2 = l2, a2 = m(a2, u2, c2, l2, e3[n3], 7, -680876936), l2 = m(l2, a2, u2, c2, e3[n3 + 1], 12, -389564586), c2 = m(c2, l2, a2, u2, e3[n3 + 2], 17, 606105819), u2 = m(u2, c2, l2, a2, e3[n3 + 3], 22, -1044525330), a2 = m(a2, u2, c2, l2, e3[n3 + 4], 7, -176418897), l2 = m(l2, a2, u2, c2, e3[n3 + 5], 12, 1200080426), c2 = m(c2, l2, a2, u2, e3[n3 + 6], 17, -1473231341), u2 = m(u2, c2, l2, a2, e3[n3 + 7], 22, -45705983), a2 = m(a2, u2, c2, l2, e3[n3 + 8], 7, 1770035416), l2 = m(l2, a2, u2, c2, e3[n3 + 9], 12, -1958414417), c2 = m(c2, l2, a2, u2, e3[n3 + 10], 17, -42063), u2 = m(u2, c2, l2, a2, e3[n3 + 11], 22, -1990404162), a2 = m(a2, u2, c2, l2, e3[n3 + 12], 7, 1804603682), l2 = m(l2, a2, u2, c2, e3[n3 + 13], 12, -40341101), c2 = m(c2, l2, a2, u2, e3[n3 + 14], 17, -1502002290), u2 = m(u2, c2, l2, a2, e3[n3 + 15], 22, 1236535329), a2 = y(a2, u2, c2, l2, e3[n3 + 1], 5, -165796510), l2 = y(l2, a2, u2, c2, e3[n3 + 6], 9, -1069501632), c2 = y(c2, l2, a2, u2, e3[n3 + 11], 14, 643717713), u2 = y(u2, c2, l2, a2, e3[n3], 20, -373897302), a2 = y(a2, u2, c2, l2, e3[n3 + 5], 5, -701558691), l2 = y(l2, a2, u2, c2, e3[n3 + 10], 9, 38016083), c2 = y(c2, l2, a2, u2, e3[n3 + 15], 14, -660478335), u2 = y(u2, c2, l2, a2, e3[n3 + 4], 20, -405537848), a2 = y(a2, u2, c2, l2, e3[n3 + 9], 5, 568446438), l2 = y(l2, a2, u2, c2, e3[n3 + 14], 9, -1019803690), c2 = y(c2, l2, a2, u2, e3[n3 + 3], 14, -187363961), u2 = y(u2, c2, l2, a2, e3[n3 + 8], 20, 1163531501), a2 = y(a2, u2, c2, l2, e3[n3 + 13], 5, -1444681467), l2 = y(l2, a2, u2, c2, e3[n3 + 2], 9, -51403784), c2 = y(c2, l2, a2, u2, e3[n3 + 7], 14, 1735328473), u2 = y(u2, c2, l2, a2, e3[n3 + 12], 20, -1926607734), a2 = w(a2, u2, c2, l2, e3[n3 + 5], 4, -378558), l2 = w(l2, a2, u2, c2, e3[n3 + 8], 11, -2022574463), c2 = w(c2, l2, a2, u2, e3[n3 + 11], 16, 1839030562), u2 = w(u2, c2, l2, a2, e3[n3 + 14], 23, -35309556), a2 = w(a2, u2, c2, l2, e3[n3 + 1], 4, -1530992060), l2 = w(l2, a2, u2, c2, e3[n3 + 4], 11, 1272893353), c2 = w(c2, l2, a2, u2, e3[n3 + 7], 16, -155497632), u2 = w(u2, c2, l2, a2, e3[n3 + 10], 23, -1094730640), a2 = w(a2, u2, c2, l2, e3[n3 + 13], 4, 681279174), l2 = w(l2, a2, u2, c2, e3[n3], 11, -358537222), c2 = w(c2, l2, a2, u2, e3[n3 + 3], 16, -722521979), u2 = w(u2, c2, l2, a2, e3[n3 + 6], 23, 76029189), a2 = w(a2, u2, c2, l2, e3[n3 + 9], 4, -640364487), l2 = w(l2, a2, u2, c2, e3[n3 + 12], 11, -421815835), c2 = w(c2, l2, a2, u2, e3[n3 + 15], 16, 530742520), u2 = w(u2, c2, l2, a2, e3[n3 + 2], 23, -995338651), a2 = b(a2, u2, c2, l2, e3[n3], 6, -198630844), l2 = b(l2, a2, u2, c2, e3[n3 + 7], 10, 1126891415), c2 = b(c2, l2, a2, u2, e3[n3 + 14], 15, -1416354905), u2 = b(u2, c2, l2, a2, e3[n3 + 5], 21, -57434055), a2 = b(a2, u2, c2, l2, e3[n3 + 12], 6, 1700485571), l2 = b(l2, a2, u2, c2, e3[n3 + 3], 10, -1894986606), c2 = b(c2, l2, a2, u2, e3[n3 + 10], 15, -1051523), u2 = b(u2, c2, l2, a2, e3[n3 + 1], 21, -2054922799), a2 = b(a2, u2, c2, l2, e3[n3 + 8], 6, 1873313359), l2 = b(l2, a2, u2, c2, e3[n3 + 15], 10, -30611744), c2 = b(c2, l2, a2, u2, e3[n3 + 6], 15, -1560198380), u2 = b(u2, c2, l2, a2, e3[n3 + 13], 21, 1309151649), a2 = b(a2, u2, c2, l2, e3[n3 + 4], 6, -145523070), l2 = b(l2, a2, u2, c2, e3[n3 + 11], 10, -1120210379), c2 = b(c2, l2, a2, u2, e3[n3 + 2], 15, 718787259), u2 = b(u2, c2, l2, a2, e3[n3 + 9], 21, -343485551), a2 = g(a2, r2), u2 = g(u2, i2), c2 = g(c2, o2), l2 = g(l2, s2);
            return [a2, u2, c2, l2];
          }(function(e3) {
            var t3, n3 = [];
            for (n3[(e3.length >> 2) - 1] = void 0, t3 = 0; t3 < n3.length; t3 += 1) n3[t3] = 0;
            var r2 = 8 * e3.length;
            for (t3 = 0; t3 < r2; t3 += 8) n3[t3 >> 5] |= (255 & e3[t3 / 8]) << t3 % 32;
            return n3;
          }(e2), 8 * e2.length));
        });
        var S = function(e2, t2, n2) {
          var r2 = t2 && n2 || 0;
          "string" == typeof e2 && (t2 = "binary" === e2 ? new Array(16) : null, e2 = null);
          var i2 = (e2 = e2 || {}).random || (e2.rng || o)();
          if (i2[6] = 15 & i2[6] | 64, i2[8] = 63 & i2[8] | 128, t2) for (var s2 = 0; s2 < 16; ++s2) t2[r2 + s2] = i2[s2];
          return t2 || l(i2);
        };
        function k(e2, t2, n2, r2) {
          switch (e2) {
            case 0:
              return t2 & n2 ^ ~t2 & r2;
            case 1:
              return t2 ^ n2 ^ r2;
            case 2:
              return t2 & n2 ^ t2 & r2 ^ n2 & r2;
            case 3:
              return t2 ^ n2 ^ r2;
          }
        }
        function O(e2, t2) {
          return e2 << t2 | e2 >>> 32 - t2;
        }
        var T = p2("v5", 80, function(e2) {
          var t2 = [1518500249, 1859775393, 2400959708, 3395469782], n2 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
          if ("string" == typeof e2) {
            var r2 = unescape(encodeURIComponent(e2));
            e2 = new Array(r2.length);
            for (var i2 = 0; i2 < r2.length; i2++) e2[i2] = r2.charCodeAt(i2);
          }
          e2.push(128);
          var o2 = e2.length / 4 + 2, s2 = Math.ceil(o2 / 16), a2 = new Array(s2);
          for (i2 = 0; i2 < s2; i2++) {
            a2[i2] = new Array(16);
            for (var u2 = 0; u2 < 16; u2++) a2[i2][u2] = e2[64 * i2 + 4 * u2] << 24 | e2[64 * i2 + 4 * u2 + 1] << 16 | e2[64 * i2 + 4 * u2 + 2] << 8 | e2[64 * i2 + 4 * u2 + 3];
          }
          for (a2[s2 - 1][14] = 8 * (e2.length - 1) / Math.pow(2, 32), a2[s2 - 1][14] = Math.floor(a2[s2 - 1][14]), a2[s2 - 1][15] = 8 * (e2.length - 1) & 4294967295, i2 = 0; i2 < s2; i2++) {
            for (var c2 = new Array(80), l2 = 0; l2 < 16; l2++) c2[l2] = a2[i2][l2];
            for (l2 = 16; l2 < 80; l2++) c2[l2] = O(c2[l2 - 3] ^ c2[l2 - 8] ^ c2[l2 - 14] ^ c2[l2 - 16], 1);
            var d2 = n2[0], f2 = n2[1], h2 = n2[2], p3 = n2[3], g2 = n2[4];
            for (l2 = 0; l2 < 80; l2++) {
              var v2 = Math.floor(l2 / 20), m2 = O(d2, 5) + k(v2, f2, h2, p3) + g2 + t2[v2] + c2[l2] >>> 0;
              g2 = p3, p3 = h2, h2 = O(f2, 30) >>> 0, f2 = d2, d2 = m2;
            }
            n2[0] = n2[0] + d2 >>> 0, n2[1] = n2[1] + f2 >>> 0, n2[2] = n2[2] + h2 >>> 0, n2[3] = n2[3] + p3 >>> 0, n2[4] = n2[4] + g2 >>> 0;
          }
          return [n2[0] >> 24 & 255, n2[0] >> 16 & 255, n2[0] >> 8 & 255, 255 & n2[0], n2[1] >> 24 & 255, n2[1] >> 16 & 255, n2[1] >> 8 & 255, 255 & n2[1], n2[2] >> 24 & 255, n2[2] >> 16 & 255, n2[2] >> 8 & 255, 255 & n2[2], n2[3] >> 24 & 255, n2[3] >> 16 & 255, n2[3] >> 8 & 255, 255 & n2[3], n2[4] >> 24 & 255, n2[4] >> 16 & 255, n2[4] >> 8 & 255, 255 & n2[4]];
        });
      }, function(e, t, n) {
        n.r(t);
        var r = n(3), i = n(13);
        function o(e2, t2, n2) {
          return (t2 = Object(i.a)(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
        }
        function s(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? Object(arguments[t2]) : {}, r2 = Object.keys(n2);
            "function" == typeof Object.getOwnPropertySymbols && r2.push.apply(r2, Object.getOwnPropertySymbols(n2).filter(function(e3) {
              return Object.getOwnPropertyDescriptor(n2, e3).enumerable;
            })), r2.forEach(function(t3) {
              o(e2, t3, n2[t3]);
            });
          }
          return e2;
        }
        var a = n(4), u = n(5);
        function c(e2) {
          if (void 0 === e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e2;
        }
        function l(e2, t2) {
          if (t2 && ("object" == Object(r.a)(t2) || "function" == typeof t2)) return t2;
          if (void 0 !== t2) throw new TypeError("Derived constructors may only return object or undefined");
          return c(e2);
        }
        function d(e2) {
          return (d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
            return e3.__proto__ || Object.getPrototypeOf(e3);
          })(e2);
        }
        function f(e2, t2) {
          return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
            return e3.__proto__ = t3, e3;
          })(e2, t2);
        }
        function h(e2, t2) {
          if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function");
          e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && f(e2, t2);
        }
        var p2 = { type: "logger", log: function(e2) {
          this.output("log", e2);
        }, warn: function(e2) {
          this.output("warn", e2);
        }, error: function(e2) {
          this.output("error", e2);
        }, output: function(e2, t2) {
          console && console[e2] && console[e2].apply(console, t2);
        } }, g = new (function() {
          function e2(t2) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(a.a)(this, e2), this.init(t2, n2);
          }
          return Object(u.a)(e2, [{ key: "init", value: function(e3) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.prefix = t2.prefix || "i18next:", this.logger = e3 || p2, this.options = t2, this.debug = t2.debug;
          } }, { key: "setDebug", value: function(e3) {
            this.debug = e3;
          } }, { key: "log", value: function() {
            for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
            return this.forward(t2, "log", "", true);
          } }, { key: "warn", value: function() {
            for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
            return this.forward(t2, "warn", "", true);
          } }, { key: "error", value: function() {
            for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
            return this.forward(t2, "error", "");
          } }, { key: "deprecate", value: function() {
            for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
            return this.forward(t2, "warn", "WARNING DEPRECATED: ", true);
          } }, { key: "forward", value: function(e3, t2, n2, r2) {
            return r2 && !this.debug ? null : ("string" == typeof e3[0] && (e3[0] = "".concat(n2).concat(this.prefix, " ").concat(e3[0])), this.logger[t2](e3));
          } }, { key: "create", value: function(t2) {
            return new e2(this.logger, s({}, { prefix: "".concat(this.prefix, ":").concat(t2, ":") }, this.options));
          } }]), e2;
        }())(), v = function() {
          function e2() {
            Object(a.a)(this, e2), this.observers = {};
          }
          return Object(u.a)(e2, [{ key: "on", value: function(e3, t2) {
            var n2 = this;
            return e3.split(" ").forEach(function(e4) {
              n2.observers[e4] = n2.observers[e4] || [], n2.observers[e4].push(t2);
            }), this;
          } }, { key: "off", value: function(e3, t2) {
            this.observers[e3] && (t2 ? this.observers[e3] = this.observers[e3].filter(function(e4) {
              return e4 !== t2;
            }) : delete this.observers[e3]);
          } }, { key: "emit", value: function(e3) {
            for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++) n2[r2 - 1] = arguments[r2];
            if (this.observers[e3]) {
              var i2 = [].concat(this.observers[e3]);
              i2.forEach(function(e4) {
                e4.apply(void 0, n2);
              });
            }
            if (this.observers["*"]) {
              var o2 = [].concat(this.observers["*"]);
              o2.forEach(function(t3) {
                t3.apply(t3, [e3].concat(n2));
              });
            }
          } }]), e2;
        }();
        function m() {
          var e2, t2, n2 = new Promise(function(n3, r2) {
            e2 = n3, t2 = r2;
          });
          return n2.resolve = e2, n2.reject = t2, n2;
        }
        function y(e2) {
          return null == e2 ? "" : "" + e2;
        }
        function w(e2, t2, n2) {
          e2.forEach(function(e3) {
            t2[e3] && (n2[e3] = t2[e3]);
          });
        }
        function b(e2, t2, n2) {
          function r2(e3) {
            return e3 && e3.indexOf("###") > -1 ? e3.replace(/###/g, ".") : e3;
          }
          function i2() {
            return !e2 || "string" == typeof e2;
          }
          for (var o2 = "string" != typeof t2 ? [].concat(t2) : t2.split("."); o2.length > 1; ) {
            if (i2()) return {};
            var s2 = r2(o2.shift());
            !e2[s2] && n2 && (e2[s2] = new n2()), e2 = Object.prototype.hasOwnProperty.call(e2, s2) ? e2[s2] : {};
          }
          return i2() ? {} : { obj: e2, k: r2(o2.shift()) };
        }
        function E(e2, t2, n2) {
          var r2 = b(e2, t2, Object);
          r2.obj[r2.k] = n2;
        }
        function S(e2, t2) {
          var n2 = b(e2, t2), r2 = n2.obj, i2 = n2.k;
          if (r2) return r2[i2];
        }
        function k(e2, t2, n2) {
          var r2 = S(e2, n2);
          return void 0 !== r2 ? r2 : S(t2, n2);
        }
        function O(e2, t2, n2) {
          for (var r2 in t2) "__proto__" !== r2 && "constructor" !== r2 && (r2 in e2 ? "string" == typeof e2[r2] || e2[r2] instanceof String || "string" == typeof t2[r2] || t2[r2] instanceof String ? n2 && (e2[r2] = t2[r2]) : O(e2[r2], t2[r2], n2) : e2[r2] = t2[r2]);
          return e2;
        }
        function T(e2) {
          return e2.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        var C = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
        function A(e2) {
          return "string" == typeof e2 ? e2.replace(/[&<>"'\/]/g, function(e3) {
            return C[e3];
          }) : e2;
        }
        var I = "undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1, L = function(e2) {
          function t2(e3) {
            var n2, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { ns: ["translation"], defaultNS: "translation" };
            return Object(a.a)(this, t2), n2 = l(this, d(t2).call(this)), I && v.call(c(n2)), n2.data = e3 || {}, n2.options = r2, void 0 === n2.options.keySeparator && (n2.options.keySeparator = "."), n2;
          }
          return h(t2, e2), Object(u.a)(t2, [{ key: "addNamespaces", value: function(e3) {
            this.options.ns.indexOf(e3) < 0 && this.options.ns.push(e3);
          } }, { key: "removeNamespaces", value: function(e3) {
            var t3 = this.options.ns.indexOf(e3);
            t3 > -1 && this.options.ns.splice(t3, 1);
          } }, { key: "getResource", value: function(e3, t3, n2) {
            var r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, i2 = void 0 !== r2.keySeparator ? r2.keySeparator : this.options.keySeparator, o2 = [e3, t3];
            return n2 && "string" != typeof n2 && (o2 = o2.concat(n2)), n2 && "string" == typeof n2 && (o2 = o2.concat(i2 ? n2.split(i2) : n2)), e3.indexOf(".") > -1 && (o2 = e3.split(".")), S(this.data, o2);
          } }, { key: "addResource", value: function(e3, t3, n2, r2) {
            var i2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : { silent: false }, o2 = this.options.keySeparator;
            void 0 === o2 && (o2 = ".");
            var s2 = [e3, t3];
            n2 && (s2 = s2.concat(o2 ? n2.split(o2) : n2)), e3.indexOf(".") > -1 && (r2 = t3, t3 = (s2 = e3.split("."))[1]), this.addNamespaces(t3), E(this.data, s2, r2), i2.silent || this.emit("added", e3, t3, n2, r2);
          } }, { key: "addResources", value: function(e3, t3, n2) {
            var r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : { silent: false };
            for (var i2 in n2) "string" != typeof n2[i2] && "[object Array]" !== Object.prototype.toString.apply(n2[i2]) || this.addResource(e3, t3, i2, n2[i2], { silent: true });
            r2.silent || this.emit("added", e3, t3, n2);
          } }, { key: "addResourceBundle", value: function(e3, t3, n2, r2, i2) {
            var o2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : { silent: false }, a2 = [e3, t3];
            e3.indexOf(".") > -1 && (r2 = n2, n2 = t3, t3 = (a2 = e3.split("."))[1]), this.addNamespaces(t3);
            var u2 = S(this.data, a2) || {};
            r2 ? O(u2, n2, i2) : u2 = s({}, u2, n2), E(this.data, a2, u2), o2.silent || this.emit("added", e3, t3, n2);
          } }, { key: "removeResourceBundle", value: function(e3, t3) {
            this.hasResourceBundle(e3, t3) && delete this.data[e3][t3], this.removeNamespaces(t3), this.emit("removed", e3, t3);
          } }, { key: "hasResourceBundle", value: function(e3, t3) {
            return void 0 !== this.getResource(e3, t3);
          } }, { key: "getResourceBundle", value: function(e3, t3) {
            return t3 || (t3 = this.options.defaultNS), "v1" === this.options.compatibilityAPI ? s({}, {}, this.getResource(e3, t3)) : this.getResource(e3, t3);
          } }, { key: "getDataByLanguage", value: function(e3) {
            return this.data[e3];
          } }, { key: "toJSON", value: function() {
            return this.data;
          } }]), t2;
        }(v), R = { processors: {}, addPostProcessor: function(e2) {
          this.processors[e2.name] = e2;
        }, handle: function(e2, t2, n2, r2, i2) {
          var o2 = this;
          return e2.forEach(function(e3) {
            o2.processors[e3] && (t2 = o2.processors[e3].process(t2, n2, r2, i2));
          }), t2;
        } }, x = {}, _ = function(e2) {
          function t2(e3) {
            var n2, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return Object(a.a)(this, t2), n2 = l(this, d(t2).call(this)), I && v.call(c(n2)), w(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e3, c(n2)), n2.options = r2, void 0 === n2.options.keySeparator && (n2.options.keySeparator = "."), n2.logger = g.create("translator"), n2;
          }
          return h(t2, e2), Object(u.a)(t2, [{ key: "changeLanguage", value: function(e3) {
            e3 && (this.language = e3);
          } }, { key: "exists", value: function(e3) {
            var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { interpolation: {} }, n2 = this.resolve(e3, t3);
            return n2 && void 0 !== n2.res;
          } }, { key: "extractFromKey", value: function(e3, t3) {
            var n2 = void 0 !== t3.nsSeparator ? t3.nsSeparator : this.options.nsSeparator;
            void 0 === n2 && (n2 = ":");
            var r2 = void 0 !== t3.keySeparator ? t3.keySeparator : this.options.keySeparator, i2 = t3.ns || this.options.defaultNS;
            if (n2 && e3.indexOf(n2) > -1) {
              var o2 = e3.match(this.interpolator.nestingRegexp);
              if (o2 && o2.length > 0) return { key: e3, namespaces: i2 };
              var s2 = e3.split(n2);
              (n2 !== r2 || n2 === r2 && this.options.ns.indexOf(s2[0]) > -1) && (i2 = s2.shift()), e3 = s2.join(r2);
            }
            return "string" == typeof i2 && (i2 = [i2]), { key: e3, namespaces: i2 };
          } }, { key: "translate", value: function(e3, n2, i2) {
            var o2 = this;
            if ("object" !== Object(r.a)(n2) && this.options.overloadTranslationOptionHandler && (n2 = this.options.overloadTranslationOptionHandler(arguments)), n2 || (n2 = {}), null == e3) return "";
            Array.isArray(e3) || (e3 = [String(e3)]);
            var a2 = void 0 !== n2.keySeparator ? n2.keySeparator : this.options.keySeparator, u2 = this.extractFromKey(e3[e3.length - 1], n2), c2 = u2.key, l2 = u2.namespaces, d2 = l2[l2.length - 1], f2 = n2.lng || this.language, h2 = n2.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
            if (f2 && "cimode" === f2.toLowerCase()) {
              if (h2) {
                var p3 = n2.nsSeparator || this.options.nsSeparator;
                return d2 + p3 + c2;
              }
              return c2;
            }
            var g2 = this.resolve(e3, n2), v2 = g2 && g2.res, m2 = g2 && g2.usedKey || c2, y2 = g2 && g2.exactUsedKey || c2, w2 = Object.prototype.toString.apply(v2), b2 = ["[object Number]", "[object Function]", "[object RegExp]"], E2 = void 0 !== n2.joinArrays ? n2.joinArrays : this.options.joinArrays, S2 = !this.i18nFormat || this.i18nFormat.handleAsObject, k2 = "string" != typeof v2 && "boolean" != typeof v2 && "number" != typeof v2;
            if (S2 && v2 && k2 && b2.indexOf(w2) < 0 && ("string" != typeof E2 || "[object Array]" !== w2)) {
              if (!n2.returnObjects && !this.options.returnObjects) return this.logger.warn("accessing an object - but returnObjects options is not enabled!"), this.options.returnedObjectHandler ? this.options.returnedObjectHandler(m2, v2, n2) : "key '".concat(c2, " (").concat(this.language, ")' returned an object instead of string.");
              if (a2) {
                var O2 = "[object Array]" === w2, T2 = O2 ? [] : {}, C2 = O2 ? y2 : m2;
                for (var A2 in v2) if (Object.prototype.hasOwnProperty.call(v2, A2)) {
                  var I2 = "".concat(C2).concat(a2).concat(A2);
                  T2[A2] = this.translate(I2, s({}, n2, { joinArrays: false, ns: l2 })), T2[A2] === I2 && (T2[A2] = v2[A2]);
                }
                v2 = T2;
              }
            } else if (S2 && "string" == typeof E2 && "[object Array]" === w2) (v2 = v2.join(E2)) && (v2 = this.extendTranslation(v2, e3, n2, i2));
            else {
              var L2 = false, R2 = false, x2 = void 0 !== n2.count && "string" != typeof n2.count, _2 = t2.hasDefaultValue(n2), N2 = x2 ? this.pluralResolver.getSuffix(f2, n2.count) : "", D2 = n2["defaultValue".concat(N2)] || n2.defaultValue;
              !this.isValidLookup(v2) && _2 && (L2 = true, v2 = D2), this.isValidLookup(v2) || (R2 = true, v2 = c2);
              var M2 = _2 && D2 !== v2 && this.options.updateMissing;
              if (R2 || L2 || M2) {
                if (this.logger.log(M2 ? "updateKey" : "missingKey", f2, d2, c2, M2 ? D2 : v2), a2) {
                  var P2 = this.resolve(c2, s({}, n2, { keySeparator: false }));
                  P2 && P2.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
                }
                var j2 = [], V2 = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n2.lng || this.language);
                if ("fallback" === this.options.saveMissingTo && V2 && V2[0]) for (var U2 = 0; U2 < V2.length; U2++) j2.push(V2[U2]);
                else "all" === this.options.saveMissingTo ? j2 = this.languageUtils.toResolveHierarchy(n2.lng || this.language) : j2.push(n2.lng || this.language);
                var q2 = function(e4, t3, r2) {
                  o2.options.missingKeyHandler ? o2.options.missingKeyHandler(e4, d2, t3, M2 ? r2 : v2, M2, n2) : o2.backendConnector && o2.backendConnector.saveMissing && o2.backendConnector.saveMissing(e4, d2, t3, M2 ? r2 : v2, M2, n2), o2.emit("missingKey", e4, d2, t3, v2);
                };
                this.options.saveMissing && (this.options.saveMissingPlurals && x2 ? j2.forEach(function(e4) {
                  o2.pluralResolver.getSuffixes(e4).forEach(function(t3) {
                    q2([e4], c2 + t3, n2["defaultValue".concat(t3)] || D2);
                  });
                }) : q2(j2, c2, D2));
              }
              v2 = this.extendTranslation(v2, e3, n2, g2, i2), R2 && v2 === c2 && this.options.appendNamespaceToMissingKey && (v2 = "".concat(d2, ":").concat(c2)), R2 && this.options.parseMissingKeyHandler && (v2 = this.options.parseMissingKeyHandler(v2));
            }
            return v2;
          } }, { key: "extendTranslation", value: function(e3, t3, n2, r2, i2) {
            var o2 = this;
            if (this.i18nFormat && this.i18nFormat.parse) e3 = this.i18nFormat.parse(e3, n2, r2.usedLng, r2.usedNS, r2.usedKey, { resolved: r2 });
            else if (!n2.skipInterpolation) {
              n2.interpolation && this.interpolator.init(s({}, n2, { interpolation: s({}, this.options.interpolation, n2.interpolation) }));
              var a2, u2 = n2.interpolation && n2.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
              if (u2) {
                var c2 = e3.match(this.interpolator.nestingRegexp);
                a2 = c2 && c2.length;
              }
              var l2 = n2.replace && "string" != typeof n2.replace ? n2.replace : n2;
              if (this.options.interpolation.defaultVariables && (l2 = s({}, this.options.interpolation.defaultVariables, l2)), e3 = this.interpolator.interpolate(e3, l2, n2.lng || this.language, n2), u2) {
                var d2 = e3.match(this.interpolator.nestingRegexp);
                a2 < (d2 && d2.length) && (n2.nest = false);
              }
              false !== n2.nest && (e3 = this.interpolator.nest(e3, function() {
                for (var e4 = arguments.length, r3 = new Array(e4), s2 = 0; s2 < e4; s2++) r3[s2] = arguments[s2];
                return i2 && i2[0] === r3[0] && !n2.context ? (o2.logger.warn("It seems you are nesting recursively key: ".concat(r3[0], " in key: ").concat(t3[0])), null) : o2.translate.apply(o2, r3.concat([t3]));
              }, n2)), n2.interpolation && this.interpolator.reset();
            }
            var f2 = n2.postProcess || this.options.postProcess, h2 = "string" == typeof f2 ? [f2] : f2;
            return null != e3 && h2 && h2.length && false !== n2.applyPostProcessor && (e3 = R.handle(h2, e3, t3, this.options && this.options.postProcessPassResolved ? s({ i18nResolved: r2 }, n2) : n2, this)), e3;
          } }, { key: "resolve", value: function(e3) {
            var t3, n2, r2, i2, o2, s2 = this, a2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return "string" == typeof e3 && (e3 = [e3]), e3.forEach(function(e4) {
              if (!s2.isValidLookup(t3)) {
                var u2 = s2.extractFromKey(e4, a2), c2 = u2.key;
                n2 = c2;
                var l2 = u2.namespaces;
                s2.options.fallbackNS && (l2 = l2.concat(s2.options.fallbackNS));
                var d2 = void 0 !== a2.count && "string" != typeof a2.count, f2 = void 0 !== a2.context && "string" == typeof a2.context && "" !== a2.context, h2 = a2.lngs ? a2.lngs : s2.languageUtils.toResolveHierarchy(a2.lng || s2.language, a2.fallbackLng);
                l2.forEach(function(e5) {
                  s2.isValidLookup(t3) || (o2 = e5, !x["".concat(h2[0], "-").concat(e5)] && s2.utils && s2.utils.hasLoadedNamespace && !s2.utils.hasLoadedNamespace(o2) && (x["".concat(h2[0], "-").concat(e5)] = true, s2.logger.warn('key "'.concat(n2, '" for languages "').concat(h2.join(", "), `" won't get resolved as namespace "`).concat(o2, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), h2.forEach(function(n3) {
                    if (!s2.isValidLookup(t3)) {
                      i2 = n3;
                      var o3, u3, l3 = c2, h3 = [l3];
                      if (s2.i18nFormat && s2.i18nFormat.addLookupKeys) s2.i18nFormat.addLookupKeys(h3, c2, n3, e5, a2);
                      else d2 && (o3 = s2.pluralResolver.getSuffix(n3, a2.count)), d2 && f2 && h3.push(l3 + o3), f2 && h3.push(l3 += "".concat(s2.options.contextSeparator).concat(a2.context)), d2 && h3.push(l3 += o3);
                      for (; u3 = h3.pop(); ) s2.isValidLookup(t3) || (r2 = u3, t3 = s2.getResource(n3, e5, u3, a2));
                    }
                  }));
                });
              }
            }), { res: t3, usedKey: n2, exactUsedKey: r2, usedLng: i2, usedNS: o2 };
          } }, { key: "isValidLookup", value: function(e3) {
            return !(void 0 === e3 || !this.options.returnNull && null === e3 || !this.options.returnEmptyString && "" === e3);
          } }, { key: "getResource", value: function(e3, t3, n2) {
            var r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e3, t3, n2, r2) : this.resourceStore.getResource(e3, t3, n2, r2);
          } }], [{ key: "hasDefaultValue", value: function(e3) {
            for (var t3 in e3) if (Object.prototype.hasOwnProperty.call(e3, t3) && "defaultValue" === t3.substring(0, "defaultValue".length) && void 0 !== e3[t3]) return true;
            return false;
          } }]), t2;
        }(v);
        function N(e2) {
          return e2.charAt(0).toUpperCase() + e2.slice(1);
        }
        var D = function() {
          function e2(t2) {
            Object(a.a)(this, e2), this.options = t2, this.whitelist = this.options.supportedLngs || false, this.supportedLngs = this.options.supportedLngs || false, this.logger = g.create("languageUtils");
          }
          return Object(u.a)(e2, [{ key: "getScriptPartFromCode", value: function(e3) {
            if (!e3 || e3.indexOf("-") < 0) return null;
            var t2 = e3.split("-");
            return 2 === t2.length ? null : (t2.pop(), "x" === t2[t2.length - 1].toLowerCase() ? null : this.formatLanguageCode(t2.join("-")));
          } }, { key: "getLanguagePartFromCode", value: function(e3) {
            if (!e3 || e3.indexOf("-") < 0) return e3;
            var t2 = e3.split("-");
            return this.formatLanguageCode(t2[0]);
          } }, { key: "formatLanguageCode", value: function(e3) {
            if ("string" == typeof e3 && e3.indexOf("-") > -1) {
              var t2 = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"], n2 = e3.split("-");
              return this.options.lowerCaseLng ? n2 = n2.map(function(e4) {
                return e4.toLowerCase();
              }) : 2 === n2.length ? (n2[0] = n2[0].toLowerCase(), n2[1] = n2[1].toUpperCase(), t2.indexOf(n2[1].toLowerCase()) > -1 && (n2[1] = N(n2[1].toLowerCase()))) : 3 === n2.length && (n2[0] = n2[0].toLowerCase(), 2 === n2[1].length && (n2[1] = n2[1].toUpperCase()), "sgn" !== n2[0] && 2 === n2[2].length && (n2[2] = n2[2].toUpperCase()), t2.indexOf(n2[1].toLowerCase()) > -1 && (n2[1] = N(n2[1].toLowerCase())), t2.indexOf(n2[2].toLowerCase()) > -1 && (n2[2] = N(n2[2].toLowerCase()))), n2.join("-");
            }
            return this.options.cleanCode || this.options.lowerCaseLng ? e3.toLowerCase() : e3;
          } }, { key: "isWhitelisted", value: function(e3) {
            return this.logger.deprecate("languageUtils.isWhitelisted", `function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it's usage asap.`), this.isSupportedCode(e3);
          } }, { key: "isSupportedCode", value: function(e3) {
            return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e3 = this.getLanguagePartFromCode(e3)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e3) > -1;
          } }, { key: "getBestMatchFromCodes", value: function(e3) {
            var t2, n2 = this;
            return e3 ? (e3.forEach(function(e4) {
              if (!t2) {
                var r2 = n2.formatLanguageCode(e4);
                n2.options.supportedLngs && !n2.isSupportedCode(r2) || (t2 = r2);
              }
            }), !t2 && this.options.supportedLngs && e3.forEach(function(e4) {
              if (!t2) {
                var r2 = n2.getLanguagePartFromCode(e4);
                if (n2.isSupportedCode(r2)) return t2 = r2;
                t2 = n2.options.supportedLngs.find(function(e5) {
                  if (0 === e5.indexOf(r2)) return e5;
                });
              }
            }), t2 || (t2 = this.getFallbackCodes(this.options.fallbackLng)[0]), t2) : null;
          } }, { key: "getFallbackCodes", value: function(e3, t2) {
            if (!e3) return [];
            if ("function" == typeof e3 && (e3 = e3(t2)), "string" == typeof e3 && (e3 = [e3]), "[object Array]" === Object.prototype.toString.apply(e3)) return e3;
            if (!t2) return e3.default || [];
            var n2 = e3[t2];
            return n2 || (n2 = e3[this.getScriptPartFromCode(t2)]), n2 || (n2 = e3[this.formatLanguageCode(t2)]), n2 || (n2 = e3[this.getLanguagePartFromCode(t2)]), n2 || (n2 = e3.default), n2 || [];
          } }, { key: "toResolveHierarchy", value: function(e3, t2) {
            var n2 = this, r2 = this.getFallbackCodes(t2 || this.options.fallbackLng || [], e3), i2 = [], o2 = function(e4) {
              e4 && (n2.isSupportedCode(e4) ? i2.push(e4) : n2.logger.warn("rejecting language code not found in supportedLngs: ".concat(e4)));
            };
            return "string" == typeof e3 && e3.indexOf("-") > -1 ? ("languageOnly" !== this.options.load && o2(this.formatLanguageCode(e3)), "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && o2(this.getScriptPartFromCode(e3)), "currentOnly" !== this.options.load && o2(this.getLanguagePartFromCode(e3))) : "string" == typeof e3 && o2(this.formatLanguageCode(e3)), r2.forEach(function(e4) {
              i2.indexOf(e4) < 0 && o2(n2.formatLanguageCode(e4));
            }), i2;
          } }]), e2;
        }(), M = [{ lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"], nr: [1, 2], fc: 1 }, { lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"], nr: [1, 2], fc: 2 }, { lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "kk", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"], nr: [1], fc: 3 }, { lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"], nr: [1, 2, 5], fc: 4 }, { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 }, { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 }, { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ["fr"], nr: [1, 2], fc: 9 }, { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ["is"], nr: [1, 2], fc: 12 }, { lngs: ["jv"], nr: [0, 1], fc: 13 }, { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ["lt"], nr: [1, 2, 10], fc: 15 }, { lngs: ["lv"], nr: [1, 2, 0], fc: 16 }, { lngs: ["mk"], nr: [1, 2], fc: 17 }, { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 }, { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ["or"], nr: [2, 1], fc: 2 }, { lngs: ["ro"], nr: [1, 2, 20], fc: 20 }, { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 }, { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 }], P = { 1: function(e2) {
          return Number(e2 > 1);
        }, 2: function(e2) {
          return Number(1 != e2);
        }, 3: function(e2) {
          return 0;
        }, 4: function(e2) {
          return Number(e2 % 10 == 1 && e2 % 100 != 11 ? 0 : e2 % 10 >= 2 && e2 % 10 <= 4 && (e2 % 100 < 10 || e2 % 100 >= 20) ? 1 : 2);
        }, 5: function(e2) {
          return Number(0 == e2 ? 0 : 1 == e2 ? 1 : 2 == e2 ? 2 : e2 % 100 >= 3 && e2 % 100 <= 10 ? 3 : e2 % 100 >= 11 ? 4 : 5);
        }, 6: function(e2) {
          return Number(1 == e2 ? 0 : e2 >= 2 && e2 <= 4 ? 1 : 2);
        }, 7: function(e2) {
          return Number(1 == e2 ? 0 : e2 % 10 >= 2 && e2 % 10 <= 4 && (e2 % 100 < 10 || e2 % 100 >= 20) ? 1 : 2);
        }, 8: function(e2) {
          return Number(1 == e2 ? 0 : 2 == e2 ? 1 : 8 != e2 && 11 != e2 ? 2 : 3);
        }, 9: function(e2) {
          return Number(e2 >= 2);
        }, 10: function(e2) {
          return Number(1 == e2 ? 0 : 2 == e2 ? 1 : e2 < 7 ? 2 : e2 < 11 ? 3 : 4);
        }, 11: function(e2) {
          return Number(1 == e2 || 11 == e2 ? 0 : 2 == e2 || 12 == e2 ? 1 : e2 > 2 && e2 < 20 ? 2 : 3);
        }, 12: function(e2) {
          return Number(e2 % 10 != 1 || e2 % 100 == 11);
        }, 13: function(e2) {
          return Number(0 !== e2);
        }, 14: function(e2) {
          return Number(1 == e2 ? 0 : 2 == e2 ? 1 : 3 == e2 ? 2 : 3);
        }, 15: function(e2) {
          return Number(e2 % 10 == 1 && e2 % 100 != 11 ? 0 : e2 % 10 >= 2 && (e2 % 100 < 10 || e2 % 100 >= 20) ? 1 : 2);
        }, 16: function(e2) {
          return Number(e2 % 10 == 1 && e2 % 100 != 11 ? 0 : 0 !== e2 ? 1 : 2);
        }, 17: function(e2) {
          return Number(1 == e2 || e2 % 10 == 1 && e2 % 100 != 11 ? 0 : 1);
        }, 18: function(e2) {
          return Number(0 == e2 ? 0 : 1 == e2 ? 1 : 2);
        }, 19: function(e2) {
          return Number(1 == e2 ? 0 : 0 == e2 || e2 % 100 > 1 && e2 % 100 < 11 ? 1 : e2 % 100 > 10 && e2 % 100 < 20 ? 2 : 3);
        }, 20: function(e2) {
          return Number(1 == e2 ? 0 : 0 == e2 || e2 % 100 > 0 && e2 % 100 < 20 ? 1 : 2);
        }, 21: function(e2) {
          return Number(e2 % 100 == 1 ? 1 : e2 % 100 == 2 ? 2 : e2 % 100 == 3 || e2 % 100 == 4 ? 3 : 0);
        }, 22: function(e2) {
          return Number(1 == e2 ? 0 : 2 == e2 ? 1 : (e2 < 0 || e2 > 10) && e2 % 10 == 0 ? 2 : 3);
        } };
        function j() {
          var e2 = {};
          return M.forEach(function(t2) {
            t2.lngs.forEach(function(n2) {
              e2[n2] = { numbers: t2.nr, plurals: P[t2.fc] };
            });
          }), e2;
        }
        var V = function() {
          function e2(t2) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(a.a)(this, e2), this.languageUtils = t2, this.options = n2, this.logger = g.create("pluralResolver"), this.rules = j();
          }
          return Object(u.a)(e2, [{ key: "addRule", value: function(e3, t2) {
            this.rules[e3] = t2;
          } }, { key: "getRule", value: function(e3) {
            return this.rules[e3] || this.rules[this.languageUtils.getLanguagePartFromCode(e3)];
          } }, { key: "needsPlural", value: function(e3) {
            var t2 = this.getRule(e3);
            return t2 && t2.numbers.length > 1;
          } }, { key: "getPluralFormsOfKey", value: function(e3, t2) {
            return this.getSuffixes(e3).map(function(e4) {
              return t2 + e4;
            });
          } }, { key: "getSuffixes", value: function(e3) {
            var t2 = this, n2 = this.getRule(e3);
            return n2 ? n2.numbers.map(function(n3) {
              return t2.getSuffix(e3, n3);
            }) : [];
          } }, { key: "getSuffix", value: function(e3, t2) {
            var n2 = this, r2 = this.getRule(e3);
            if (r2) {
              var i2 = r2.noAbs ? r2.plurals(t2) : r2.plurals(Math.abs(t2)), o2 = r2.numbers[i2];
              this.options.simplifyPluralSuffix && 2 === r2.numbers.length && 1 === r2.numbers[0] && (2 === o2 ? o2 = "plural" : 1 === o2 && (o2 = ""));
              var s2 = function() {
                return n2.options.prepend && o2.toString() ? n2.options.prepend + o2.toString() : o2.toString();
              };
              return "v1" === this.options.compatibilityJSON ? 1 === o2 ? "" : "number" == typeof o2 ? "_plural_".concat(o2.toString()) : s2() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === r2.numbers.length && 1 === r2.numbers[0] ? s2() : this.options.prepend && i2.toString() ? this.options.prepend + i2.toString() : i2.toString();
            }
            return this.logger.warn("no plural rule found for: ".concat(e3)), "";
          } }]), e2;
        }(), U = function() {
          function e2() {
            var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object(a.a)(this, e2), this.logger = g.create("interpolator"), this.options = t2, this.format = t2.interpolation && t2.interpolation.format || function(e3) {
              return e3;
            }, this.init(t2);
          }
          return Object(u.a)(e2, [{ key: "init", value: function() {
            var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e3.interpolation || (e3.interpolation = { escapeValue: true });
            var t2 = e3.interpolation;
            this.escape = void 0 !== t2.escape ? t2.escape : A, this.escapeValue = void 0 === t2.escapeValue || t2.escapeValue, this.useRawValueToEscape = void 0 !== t2.useRawValueToEscape && t2.useRawValueToEscape, this.prefix = t2.prefix ? T(t2.prefix) : t2.prefixEscaped || "{{", this.suffix = t2.suffix ? T(t2.suffix) : t2.suffixEscaped || "}}", this.formatSeparator = t2.formatSeparator ? t2.formatSeparator : t2.formatSeparator || ",", this.unescapePrefix = t2.unescapeSuffix ? "" : t2.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t2.unescapeSuffix || "", this.nestingPrefix = t2.nestingPrefix ? T(t2.nestingPrefix) : t2.nestingPrefixEscaped || T("$t("), this.nestingSuffix = t2.nestingSuffix ? T(t2.nestingSuffix) : t2.nestingSuffixEscaped || T(")"), this.nestingOptionsSeparator = t2.nestingOptionsSeparator ? t2.nestingOptionsSeparator : t2.nestingOptionsSeparator || ",", this.maxReplaces = t2.maxReplaces ? t2.maxReplaces : 1e3, this.alwaysFormat = void 0 !== t2.alwaysFormat && t2.alwaysFormat, this.resetRegExp();
          } }, { key: "reset", value: function() {
            this.options && this.init(this.options);
          } }, { key: "resetRegExp", value: function() {
            var e3 = "".concat(this.prefix, "(.+?)").concat(this.suffix);
            this.regexp = new RegExp(e3, "g");
            var t2 = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
            this.regexpUnescape = new RegExp(t2, "g");
            var n2 = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
            this.nestingRegexp = new RegExp(n2, "g");
          } }, { key: "interpolate", value: function(e3, t2, n2, r2) {
            var i2, o2, s2, a2 = this, u2 = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
            function c2(e4) {
              return e4.replace(/\$/g, "$$$$");
            }
            var l2 = function(e4) {
              if (e4.indexOf(a2.formatSeparator) < 0) {
                var i3 = k(t2, u2, e4);
                return a2.alwaysFormat ? a2.format(i3, void 0, n2) : i3;
              }
              var o3 = e4.split(a2.formatSeparator), s3 = o3.shift().trim(), c3 = o3.join(a2.formatSeparator).trim();
              return a2.format(k(t2, u2, s3), c3, n2, r2);
            };
            this.resetRegExp();
            var d2 = r2 && r2.missingInterpolationHandler || this.options.missingInterpolationHandler, f2 = r2 && r2.interpolation && r2.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
            return [{ regex: this.regexpUnescape, safeValue: function(e4) {
              return c2(e4);
            } }, { regex: this.regexp, safeValue: function(e4) {
              return a2.escapeValue ? c2(a2.escape(e4)) : c2(e4);
            } }].forEach(function(t3) {
              for (s2 = 0; i2 = t3.regex.exec(e3); ) {
                if (void 0 === (o2 = l2(i2[1].trim()))) if ("function" == typeof d2) {
                  var n3 = d2(e3, i2, r2);
                  o2 = "string" == typeof n3 ? n3 : "";
                } else {
                  if (f2) {
                    o2 = i2[0];
                    continue;
                  }
                  a2.logger.warn("missed to pass in variable ".concat(i2[1], " for interpolating ").concat(e3)), o2 = "";
                }
                else "string" == typeof o2 || a2.useRawValueToEscape || (o2 = y(o2));
                if (e3 = e3.replace(i2[0], t3.safeValue(o2)), t3.regex.lastIndex = 0, ++s2 >= a2.maxReplaces) break;
              }
            }), e3;
          } }, { key: "nest", value: function(e3, t2) {
            var n2, r2, i2 = this, o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a2 = s({}, o2);
            function u2(e4, t3) {
              var n3 = this.nestingOptionsSeparator;
              if (e4.indexOf(n3) < 0) return e4;
              var r3 = e4.split(new RegExp("".concat(n3, "[ ]*{"))), i3 = "{".concat(r3[1]);
              e4 = r3[0], i3 = (i3 = this.interpolate(i3, a2)).replace(/'/g, '"');
              try {
                a2 = JSON.parse(i3), t3 && (a2 = s({}, t3, a2));
              } catch (t4) {
                return this.logger.warn("failed parsing options string in nesting for key ".concat(e4), t4), "".concat(e4).concat(n3).concat(i3);
              }
              return delete a2.defaultValue, e4;
            }
            for (a2.applyPostProcessor = false, delete a2.defaultValue; n2 = this.nestingRegexp.exec(e3); ) {
              var c2 = [], l2 = false;
              if (n2[0].includes(this.formatSeparator) && !/{.*}/.test(n2[1])) {
                var d2 = n2[1].split(this.formatSeparator).map(function(e4) {
                  return e4.trim();
                });
                n2[1] = d2.shift(), c2 = d2, l2 = true;
              }
              if ((r2 = t2(u2.call(this, n2[1].trim(), a2), a2)) && n2[0] === e3 && "string" != typeof r2) return r2;
              "string" != typeof r2 && (r2 = y(r2)), r2 || (this.logger.warn("missed to resolve ".concat(n2[1], " for nesting ").concat(e3)), r2 = ""), l2 && (r2 = c2.reduce(function(e4, t3) {
                return i2.format(e4, t3, o2.lng, o2);
              }, r2.trim())), e3 = e3.replace(n2[0], r2), this.regexp.lastIndex = 0;
            }
            return e3;
          } }]), e2;
        }();
        var q = function(e2) {
          function t2(e3, n2, r2) {
            var i2, o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            return Object(a.a)(this, t2), i2 = l(this, d(t2).call(this)), I && v.call(c(i2)), i2.backend = e3, i2.store = n2, i2.services = r2, i2.languageUtils = r2.languageUtils, i2.options = o2, i2.logger = g.create("backendConnector"), i2.state = {}, i2.queue = [], i2.backend && i2.backend.init && i2.backend.init(r2, o2.backend, o2), i2;
          }
          return h(t2, e2), Object(u.a)(t2, [{ key: "queueLoad", value: function(e3, t3, n2, r2) {
            var i2 = this, o2 = [], s2 = [], a2 = [], u2 = [];
            return e3.forEach(function(e4) {
              var r3 = true;
              t3.forEach(function(t4) {
                var a3 = "".concat(e4, "|").concat(t4);
                !n2.reload && i2.store.hasResourceBundle(e4, t4) ? i2.state[a3] = 2 : i2.state[a3] < 0 || (1 === i2.state[a3] ? s2.indexOf(a3) < 0 && s2.push(a3) : (i2.state[a3] = 1, r3 = false, s2.indexOf(a3) < 0 && s2.push(a3), o2.indexOf(a3) < 0 && o2.push(a3), u2.indexOf(t4) < 0 && u2.push(t4)));
              }), r3 || a2.push(e4);
            }), (o2.length || s2.length) && this.queue.push({ pending: s2, loaded: {}, errors: [], callback: r2 }), { toLoad: o2, pending: s2, toLoadLanguages: a2, toLoadNamespaces: u2 };
          } }, { key: "loaded", value: function(e3, t3, n2) {
            var r2 = e3.split("|"), i2 = r2[0], o2 = r2[1];
            t3 && this.emit("failedLoading", i2, o2, t3), n2 && this.store.addResourceBundle(i2, o2, n2), this.state[e3] = t3 ? -1 : 2;
            var s2 = {};
            this.queue.forEach(function(n3) {
              var r3, a2, c2, l2, d2;
              r3 = n3.loaded, a2 = o2, c2 = b(r3, [i2], Object), l2 = c2.obj, d2 = c2.k, l2[d2] = l2[d2] || [], l2[d2].push(a2), function(e4, t4) {
                for (var n4 = e4.indexOf(t4); -1 !== n4; ) e4.splice(n4, 1), n4 = e4.indexOf(t4);
              }(n3.pending, e3), t3 && n3.errors.push(t3), 0 !== n3.pending.length || n3.done || (Object.keys(n3.loaded).forEach(function(e4) {
                s2[e4] || (s2[e4] = []), n3.loaded[e4].length && n3.loaded[e4].forEach(function(t4) {
                  s2[e4].indexOf(t4) < 0 && s2[e4].push(t4);
                });
              }), n3.done = true, n3.errors.length ? n3.callback(n3.errors) : n3.callback());
            }), this.emit("loaded", s2), this.queue = this.queue.filter(function(e4) {
              return !e4.done;
            });
          } }, { key: "read", value: function(e3, t3, n2) {
            var r2 = this, i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, o2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 350, s2 = arguments.length > 5 ? arguments[5] : void 0;
            return e3.length ? this.backend[n2](e3, t3, function(a2, u2) {
              a2 && u2 && i2 < 5 ? setTimeout(function() {
                r2.read.call(r2, e3, t3, n2, i2 + 1, 2 * o2, s2);
              }, o2) : s2(a2, u2);
            }) : s2(null, {});
          } }, { key: "prepareLoading", value: function(e3, t3) {
            var n2 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i2 = arguments.length > 3 ? arguments[3] : void 0;
            if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i2 && i2();
            "string" == typeof e3 && (e3 = this.languageUtils.toResolveHierarchy(e3)), "string" == typeof t3 && (t3 = [t3]);
            var o2 = this.queueLoad(e3, t3, r2, i2);
            if (!o2.toLoad.length) return o2.pending.length || i2(), null;
            o2.toLoad.forEach(function(e4) {
              n2.loadOne(e4);
            });
          } }, { key: "load", value: function(e3, t3, n2) {
            this.prepareLoading(e3, t3, {}, n2);
          } }, { key: "reload", value: function(e3, t3, n2) {
            this.prepareLoading(e3, t3, { reload: true }, n2);
          } }, { key: "loadOne", value: function(e3) {
            var t3 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r2 = e3.split("|"), i2 = r2[0], o2 = r2[1];
            this.read(i2, o2, "read", void 0, void 0, function(r3, s2) {
              r3 && t3.logger.warn("".concat(n2, "loading namespace ").concat(o2, " for language ").concat(i2, " failed"), r3), !r3 && s2 && t3.logger.log("".concat(n2, "loaded namespace ").concat(o2, " for language ").concat(i2), s2), t3.loaded(e3, r3, s2);
            });
          } }, { key: "saveMissing", value: function(e3, t3, n2, r2, i2) {
            var o2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
            this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t3) ? this.logger.warn('did not save key "'.concat(n2, '" as the namespace "').concat(t3, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!") : null != n2 && "" !== n2 && (this.backend && this.backend.create && this.backend.create(e3, t3, n2, r2, null, s({}, o2, { isUpdate: i2 })), e3 && e3[0] && this.store.addResource(e3[0], t3, n2, r2));
          } }]), t2;
        }(v);
        function F() {
          return { debug: false, initImmediate: true, ns: ["translation"], defaultNS: ["translation"], fallbackLng: ["dev"], fallbackNS: false, whitelist: false, nonExplicitWhitelist: false, supportedLngs: false, nonExplicitSupportedLngs: false, load: "all", preload: false, simplifyPluralSuffix: true, keySeparator: ".", nsSeparator: ":", pluralSeparator: "_", contextSeparator: "_", partialBundledLanguages: false, saveMissing: false, updateMissing: false, saveMissingTo: "fallback", saveMissingPlurals: true, missingKeyHandler: false, missingInterpolationHandler: false, postProcess: false, postProcessPassResolved: false, returnNull: true, returnEmptyString: true, returnObjects: false, joinArrays: false, returnedObjectHandler: false, parseMissingKeyHandler: false, appendNamespaceToMissingKey: false, appendNamespaceToCIMode: false, overloadTranslationOptionHandler: function(e2) {
            var t2 = {};
            if ("object" === Object(r.a)(e2[1]) && (t2 = e2[1]), "string" == typeof e2[1] && (t2.defaultValue = e2[1]), "string" == typeof e2[2] && (t2.tDescription = e2[2]), "object" === Object(r.a)(e2[2]) || "object" === Object(r.a)(e2[3])) {
              var n2 = e2[3] || e2[2];
              Object.keys(n2).forEach(function(e3) {
                t2[e3] = n2[e3];
              });
            }
            return t2;
          }, interpolation: { escapeValue: true, format: function(e2, t2, n2, r2) {
            return e2;
          }, prefix: "{{", suffix: "}}", formatSeparator: ",", unescapePrefix: "-", nestingPrefix: "$t(", nestingSuffix: ")", nestingOptionsSeparator: ",", maxReplaces: 1e3, skipOnVariables: false } };
        }
        function B(e2) {
          return "string" == typeof e2.ns && (e2.ns = [e2.ns]), "string" == typeof e2.fallbackLng && (e2.fallbackLng = [e2.fallbackLng]), "string" == typeof e2.fallbackNS && (e2.fallbackNS = [e2.fallbackNS]), e2.whitelist && (e2.whitelist && e2.whitelist.indexOf("cimode") < 0 && (e2.whitelist = e2.whitelist.concat(["cimode"])), e2.supportedLngs = e2.whitelist), e2.nonExplicitWhitelist && (e2.nonExplicitSupportedLngs = e2.nonExplicitWhitelist), e2.supportedLngs && e2.supportedLngs.indexOf("cimode") < 0 && (e2.supportedLngs = e2.supportedLngs.concat(["cimode"])), e2;
        }
        function z() {
        }
        var H = new (function(e2) {
          function t2() {
            var e3, n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = arguments.length > 1 ? arguments[1] : void 0;
            if (Object(a.a)(this, t2), e3 = l(this, d(t2).call(this)), I && v.call(c(e3)), e3.options = B(n2), e3.services = {}, e3.logger = g, e3.modules = { external: [] }, r2 && !e3.isInitialized && !n2.isClone) {
              if (!e3.options.initImmediate) return e3.init(n2, r2), l(e3, c(e3));
              setTimeout(function() {
                e3.init(n2, r2);
              }, 0);
            }
            return e3;
          }
          return h(t2, e2), Object(u.a)(t2, [{ key: "init", value: function() {
            var e3 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = arguments.length > 1 ? arguments[1] : void 0;
            function r2(e4) {
              return e4 ? "function" == typeof e4 ? new e4() : e4 : null;
            }
            if ("function" == typeof t3 && (n2 = t3, t3 = {}), t3.whitelist && !t3.supportedLngs && this.logger.deprecate("whitelist", 'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.'), t3.nonExplicitWhitelist && !t3.nonExplicitSupportedLngs && this.logger.deprecate("whitelist", 'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.'), this.options = s({}, F(), this.options, B(t3)), this.format = this.options.interpolation.format, n2 || (n2 = z), !this.options.isClone) {
              this.modules.logger ? g.init(r2(this.modules.logger), this.options) : g.init(null, this.options);
              var i2 = new D(this.options);
              this.store = new L(this.options.resources, this.options);
              var o2 = this.services;
              o2.logger = g, o2.resourceStore = this.store, o2.languageUtils = i2, o2.pluralResolver = new V(i2, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix }), o2.interpolator = new U(this.options), o2.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }, o2.backendConnector = new q(r2(this.modules.backend), o2.resourceStore, o2, this.options), o2.backendConnector.on("*", function(t4) {
                for (var n3 = arguments.length, r3 = new Array(n3 > 1 ? n3 - 1 : 0), i3 = 1; i3 < n3; i3++) r3[i3 - 1] = arguments[i3];
                e3.emit.apply(e3, [t4].concat(r3));
              }), this.modules.languageDetector && (o2.languageDetector = r2(this.modules.languageDetector), o2.languageDetector.init(o2, this.options.detection, this.options)), this.modules.i18nFormat && (o2.i18nFormat = r2(this.modules.i18nFormat), o2.i18nFormat.init && o2.i18nFormat.init(this)), this.translator = new _(this.services, this.options), this.translator.on("*", function(t4) {
                for (var n3 = arguments.length, r3 = new Array(n3 > 1 ? n3 - 1 : 0), i3 = 1; i3 < n3; i3++) r3[i3 - 1] = arguments[i3];
                e3.emit.apply(e3, [t4].concat(r3));
              }), this.modules.external.forEach(function(t4) {
                t4.init && t4.init(e3);
              });
            }
            if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
              var a2 = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
              a2.length > 0 && "dev" !== a2[0] && (this.options.lng = a2[0]);
            }
            this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined");
            var u2 = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
            u2.forEach(function(t4) {
              e3[t4] = function() {
                var n3;
                return (n3 = e3.store)[t4].apply(n3, arguments);
              };
            });
            var c2 = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
            c2.forEach(function(t4) {
              e3[t4] = function() {
                var n3;
                return (n3 = e3.store)[t4].apply(n3, arguments), e3;
              };
            });
            var l2 = m(), d2 = function() {
              var t4 = function(t5, r3) {
                e3.isInitialized && e3.logger.warn("init: i18next is already initialized. You should call init just once!"), e3.isInitialized = true, e3.options.isClone || e3.logger.log("initialized", e3.options), e3.emit("initialized", e3.options), l2.resolve(r3), n2(t5, r3);
              };
              if (e3.languages && "v1" !== e3.options.compatibilityAPI && !e3.isInitialized) return t4(null, e3.t.bind(e3));
              e3.changeLanguage(e3.options.lng, t4);
            };
            return this.options.resources || !this.options.initImmediate ? d2() : setTimeout(d2, 0), l2;
          } }, { key: "loadResources", value: function(e3) {
            var t3 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : z, r2 = n2, i2 = "string" == typeof e3 ? e3 : this.language;
            if ("function" == typeof e3 && (r2 = e3), !this.options.resources || this.options.partialBundledLanguages) {
              if (i2 && "cimode" === i2.toLowerCase()) return r2();
              var o2 = [], s2 = function(e4) {
                e4 && t3.services.languageUtils.toResolveHierarchy(e4).forEach(function(e5) {
                  o2.indexOf(e5) < 0 && o2.push(e5);
                });
              };
              if (i2) s2(i2);
              else {
                var a2 = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                a2.forEach(function(e4) {
                  return s2(e4);
                });
              }
              this.options.preload && this.options.preload.forEach(function(e4) {
                return s2(e4);
              }), this.services.backendConnector.load(o2, this.options.ns, r2);
            } else r2(null);
          } }, { key: "reloadResources", value: function(e3, t3, n2) {
            var r2 = m();
            return e3 || (e3 = this.languages), t3 || (t3 = this.options.ns), n2 || (n2 = z), this.services.backendConnector.reload(e3, t3, function(e4) {
              r2.resolve(), n2(e4);
            }), r2;
          } }, { key: "use", value: function(e3) {
            if (!e3) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
            if (!e3.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
            return "backend" === e3.type && (this.modules.backend = e3), ("logger" === e3.type || e3.log && e3.warn && e3.error) && (this.modules.logger = e3), "languageDetector" === e3.type && (this.modules.languageDetector = e3), "i18nFormat" === e3.type && (this.modules.i18nFormat = e3), "postProcessor" === e3.type && R.addPostProcessor(e3), "3rdParty" === e3.type && this.modules.external.push(e3), this;
          } }, { key: "changeLanguage", value: function(e3, t3) {
            var n2 = this;
            this.isLanguageChangingTo = e3;
            var r2 = m();
            this.emit("languageChanging", e3);
            var i2 = function(e4) {
              var i3 = "string" == typeof e4 ? e4 : n2.services.languageUtils.getBestMatchFromCodes(e4);
              i3 && (n2.language || (n2.language = i3, n2.languages = n2.services.languageUtils.toResolveHierarchy(i3)), n2.translator.language || n2.translator.changeLanguage(i3), n2.services.languageDetector && n2.services.languageDetector.cacheUserLanguage(i3)), n2.loadResources(i3, function(e5) {
                !function(e6, i4) {
                  i4 ? (n2.language = i4, n2.languages = n2.services.languageUtils.toResolveHierarchy(i4), n2.translator.changeLanguage(i4), n2.isLanguageChangingTo = void 0, n2.emit("languageChanged", i4), n2.logger.log("languageChanged", i4)) : n2.isLanguageChangingTo = void 0, r2.resolve(function() {
                    return n2.t.apply(n2, arguments);
                  }), t3 && t3(e6, function() {
                    return n2.t.apply(n2, arguments);
                  });
                }(e5, i3);
              });
            };
            return e3 || !this.services.languageDetector || this.services.languageDetector.async ? !e3 && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect(i2) : i2(e3) : i2(this.services.languageDetector.detect()), r2;
          } }, { key: "getFixedT", value: function(e3, t3) {
            var n2 = this, i2 = function e4(t4, i3) {
              var o2;
              if ("object" !== Object(r.a)(i3)) {
                for (var a2 = arguments.length, u2 = new Array(a2 > 2 ? a2 - 2 : 0), c2 = 2; c2 < a2; c2++) u2[c2 - 2] = arguments[c2];
                o2 = n2.options.overloadTranslationOptionHandler([t4, i3].concat(u2));
              } else o2 = s({}, i3);
              return o2.lng = o2.lng || e4.lng, o2.lngs = o2.lngs || e4.lngs, o2.ns = o2.ns || e4.ns, n2.t(t4, o2);
            };
            return "string" == typeof e3 ? i2.lng = e3 : i2.lngs = e3, i2.ns = t3, i2;
          } }, { key: "t", value: function() {
            var e3;
            return this.translator && (e3 = this.translator).translate.apply(e3, arguments);
          } }, { key: "exists", value: function() {
            var e3;
            return this.translator && (e3 = this.translator).exists.apply(e3, arguments);
          } }, { key: "setDefaultNamespace", value: function(e3) {
            this.options.defaultNS = e3;
          } }, { key: "hasLoadedNamespace", value: function(e3) {
            var t3 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), false;
            if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), false;
            var r2 = this.languages[0], i2 = !!this.options && this.options.fallbackLng, o2 = this.languages[this.languages.length - 1];
            if ("cimode" === r2.toLowerCase()) return true;
            var s2 = function(e4, n3) {
              var r3 = t3.services.backendConnector.state["".concat(e4, "|").concat(n3)];
              return -1 === r3 || 2 === r3;
            };
            if (n2.precheck) {
              var a2 = n2.precheck(this, s2);
              if (void 0 !== a2) return a2;
            }
            return !!this.hasResourceBundle(r2, e3) || (!this.services.backendConnector.backend || !(!s2(r2, e3) || i2 && !s2(o2, e3)));
          } }, { key: "loadNamespaces", value: function(e3, t3) {
            var n2 = this, r2 = m();
            return this.options.ns ? ("string" == typeof e3 && (e3 = [e3]), e3.forEach(function(e4) {
              n2.options.ns.indexOf(e4) < 0 && n2.options.ns.push(e4);
            }), this.loadResources(function(e4) {
              r2.resolve(), t3 && t3(e4);
            }), r2) : (t3 && t3(), Promise.resolve());
          } }, { key: "loadLanguages", value: function(e3, t3) {
            var n2 = m();
            "string" == typeof e3 && (e3 = [e3]);
            var r2 = this.options.preload || [], i2 = e3.filter(function(e4) {
              return r2.indexOf(e4) < 0;
            });
            return i2.length ? (this.options.preload = r2.concat(i2), this.loadResources(function(e4) {
              n2.resolve(), t3 && t3(e4);
            }), n2) : (t3 && t3(), Promise.resolve());
          } }, { key: "dir", value: function(e3) {
            if (e3 || (e3 = this.languages && this.languages.length > 0 ? this.languages[0] : this.language), !e3) return "rtl";
            return ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam"].indexOf(this.services.languageUtils.getLanguagePartFromCode(e3)) >= 0 ? "rtl" : "ltr";
          } }, { key: "createInstance", value: function() {
            var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = arguments.length > 1 ? arguments[1] : void 0;
            return new t2(e3, n2);
          } }, { key: "cloneInstance", value: function() {
            var e3 = this, n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : z, i2 = s({}, this.options, n2, { isClone: true }), o2 = new t2(i2), a2 = ["store", "services", "language"];
            return a2.forEach(function(t3) {
              o2[t3] = e3[t3];
            }), o2.services = s({}, this.services), o2.services.utils = { hasLoadedNamespace: o2.hasLoadedNamespace.bind(o2) }, o2.translator = new _(o2.services, o2.options), o2.translator.on("*", function(e4) {
              for (var t3 = arguments.length, n3 = new Array(t3 > 1 ? t3 - 1 : 0), r3 = 1; r3 < t3; r3++) n3[r3 - 1] = arguments[r3];
              o2.emit.apply(o2, [e4].concat(n3));
            }), o2.init(i2, r2), o2.translator.options = o2.options, o2.translator.backendConnector.services.utils = { hasLoadedNamespace: o2.hasLoadedNamespace.bind(o2) }, o2;
          } }]), t2;
        }(v))();
        t.default = H;
      }]);
    });
  })(dist);
  return dist.exports;
}
var distExports = requireDist();
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };
function v4(options, buf, offset) {
  var _a;
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
class AgentContactWrapper {
  //#endregion enriched data
  constructor(_contact) {
    __publicField(this, "_conversationUuid", "");
    //#region enriched data
    __publicField(this, "customers", /* @__PURE__ */ new Map());
    __publicField(this, "selectedCustomer", null);
    __publicField(this, "_areCaseLinksLoading", false);
    __publicField(this, "caseLinks", []);
    __publicField(this, "_syncDate");
    __publicField(this, "_wasAccepted", false);
    __publicField(this, "_wasConsulted", false);
    this._contact = _contact;
  }
  get queueName() {
    return this._contact.data.interaction.callProcessingDetails.virtualTeamName;
  }
  get routingType() {
    return this._contact.data.interaction.callProcessingDetails.ROUTING_TYPE;
  }
  get isNewOutgoingMail() {
    return this.isOutgoingMail && this._contact.data.interaction.state == "new";
  }
  get isOutgoingMail() {
    return this._contact.data.interaction.mediaType === "email" && this._contact.data.interaction.outboundType === "OUTDIAL";
  }
  get wxccConversationId() {
    return this._contact.data.mediaResourceId;
  }
  get conversationUuid() {
    var _a, _b, _c, _d, _e;
    if ((_a = this._contact.data.interaction.callAssociatedData) == null ? void 0 : _a.HTTP_Identify_conversationUUID) {
      return (_b = this._contact.data.interaction.callAssociatedData) == null ? void 0 : _b.HTTP_Identify_conversationUUID.value.toString();
    }
    if ((_d = (_c = this._contact.data.interaction.callAssociatedData) == null ? void 0 : _c.LIWEST_WebexConnect_ConversationUUID) == null ? void 0 : _d.value) {
      return (_e = this._contact.data.interaction.callAssociatedData) == null ? void 0 : _e.LIWEST_WebexConnect_ConversationUUID.value.toString();
    }
    return this._conversationUuid;
  }
  get fromAddress() {
    const participants = this._contact.data.interaction.participants;
    for (const key of Object.keys(participants)) {
      if (key !== this._contact.data.agentId) {
        return key;
      }
    }
    return "";
  }
  get mediaType() {
    if (["telephony", "email"].find(
      (val) => val === this._contact.data.interaction.mediaType.toLowerCase()
    ))
      return this._contact.data.interaction.mediaType;
    return "unknown";
  }
  get state() {
    return this._contact.data.interaction.state;
  }
  get jsonPayload() {
    return JSON.stringify({
      channel: this.mediaType === "telephony" ? "PHONE" : "MAIL",
      department: this.queueName,
      agent: StoredData.crmLoginId,
      model: this.conversationType
    });
  }
  get conversationType() {
    return this.mediaType === "telephony" ? "CONVERSATION_PHONE" : "CONVERSATION_MAIL";
  }
  get interactionId() {
    return this._contact.data.interactionId;
  }
  get conversationTypeNumber() {
    if (this.mediaType === "telephony") {
      return 0;
    } else if (this.mediaType === "email") {
      return 1;
    } else if (this.mediaType === "task") {
      return 3;
    }
    return -1;
  }
  get wasTransferredToAgent() {
    var _a;
    return this._contact.data.type === "AgentWrapup" && this._contact.data.interaction.state === "new" && ((_a = this._contact.data.interaction.callProcessingDetails.BLIND_TRANSFER_IN_PROGRESS) == null ? void 0 : _a.toString().toLowerCase()) == "true";
  }
  get callLabel() {
    let returnValue = this.fromAddress || "";
    const cString = this.customerString;
    if (returnValue && cString) {
      returnValue += " ";
    }
    if (cString) {
      returnValue += cString;
    }
    return returnValue;
  }
  get mailLabel() {
    var _a, _b;
    const cString = this.customerString;
    if (!cString && this._contact.data.interaction.outboundType === "OUTDIAL") {
      return "Ausgehend an: " + this.fromAddress;
    }
    let returnValue = "";
    if ((_b = (_a = this._contact.data.interaction) == null ? void 0 : _a.callAssociatedData) == null ? void 0 : _b.mailSubject) {
      returnValue = this._contact.data.interaction.callAssociatedData.mailSubject.value.toString();
    }
    if (returnValue && cString) {
      returnValue += " ";
    }
    returnValue += cString + " " + this.fromAddress;
    return returnValue;
  }
  get customerString() {
    let customerToUse = null;
    if (this.selectedCustomer !== null) {
      customerToUse = this.selectedCustomer;
    } else if (this.customers.size === 1) {
      const customersWithFirstZipCode = this.customers.get([...this.customers.keys()][0]);
      if ((customersWithFirstZipCode == null ? void 0 : customersWithFirstZipCode.length) === 1) {
        customerToUse = customersWithFirstZipCode[0];
      }
    }
    if (!customerToUse) {
      return "";
    }
    const customerNumber = customerToUse.contract_number;
    const customerName = customerToUse.customer_name;
    let returnValue = customerNumber || "";
    if (customerNumber && customerName) {
      returnValue += " ";
    }
    if (customerName) {
      returnValue += customerName;
    }
    return returnValue;
  }
  get singleHitCustomer() {
    const keys = [...this.customers.keys()];
    if (keys.length !== 1 || this.customers.get(keys[0]).length !== 1) {
      return null;
    }
    return this.customers.get(keys[0])[0];
  }
  get hasSingleHit() {
    return this.singleHitCustomer !== null;
  }
  get eventType() {
    return this._contact.data.type;
  }
  get areCaseLinksLoading() {
    return this._areCaseLinksLoading;
  }
  set areCaseLinksLoading(value) {
    this._areCaseLinksLoading = value;
    StoredData.triggerUpdate();
  }
  get syncDate() {
    return this._syncDate;
  }
  get isSyncing() {
    return this._syncDate !== void 0;
  }
  get wasAccepted() {
    return this._wasAccepted;
  }
  get wasConsulted() {
    return this._wasConsulted;
  }
  addCustomers(newEntries) {
    let wasChanged = false;
    newEntries.forEach((value, key) => {
      if (this.customers.has(key)) {
        const foundCustomers = this.customers.get(key);
        const newCustomers = value.filter(
          (boosterData) => (foundCustomers == null ? void 0 : foundCustomers.findIndex(
            (innerData) => innerData.debitor_no === boosterData.debitor_no
          )) === -1
        );
        this.customers.set(key, foundCustomers.concat(newCustomers));
        wasChanged = wasChanged || foundCustomers.length > 0;
      } else {
        this.customers.set(key, value);
        wasChanged = true;
      }
    });
    if (wasChanged) {
      StoredData.triggerUpdate();
    }
  }
  setIsSyncing() {
    this._syncDate = /* @__PURE__ */ new Date();
  }
  setSyncCompleted() {
    this._syncDate = void 0;
  }
  setAccepted() {
    this._wasAccepted = true;
  }
  setConsulted() {
    this._wasConsulted = true;
  }
  setConversationUuid(value) {
    this._conversationUuid = value;
  }
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator2 = generator.call(obj);
  let result;
  while ((result = iterator2.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer2(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty$1 = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack2 = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack2.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack2[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack2[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: hasOwnProperty$1,
  hasOwnProp: hasOwnProperty$1,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack2 = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack2.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack2.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack2.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer2(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed2 = new this(first);
    targets.forEach((target) => computed2.set(target));
    return computed2;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && isRelativeUrl || allowAbsoluteUrls == false) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError2() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.8.1";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack2 = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack2;
          } else if (stack2 && !String(err.stack).endsWith(stack2.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack2;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
class ErrorData {
  constructor(_errorLines) {
    __publicField(this, "_timeStamp");
    this._errorLines = _errorLines;
    this._timeStamp = /* @__PURE__ */ new Date();
  }
  get timeStamp() {
    return this._timeStamp;
  }
  get errorLines() {
    return this._errorLines;
  }
}
const _MerkurRequestHandler = class _MerkurRequestHandler {
  static _apiConfigForGet(agentContactWrapper) {
    const returnValue = {
      headers: {
        "X-API-KEY": this._apiKey
      }
    };
    if (agentContactWrapper && returnValue.headers) {
      returnValue.headers["X-TECHNICAL-ID"] = agentContactWrapper.conversationUuid;
      returnValue.headers["X-BUSINESS-ID"] = agentContactWrapper.fromAddress;
    }
    return returnValue;
  }
  static _apiConfig(agentContactWrapper) {
    const requestConfig = this._apiConfigForGet(agentContactWrapper);
    requestConfig.responseType = "json";
    if (requestConfig.headers) {
      requestConfig.headers["Accept"] = "application/json";
      requestConfig.headers["Content-Type"] = "application/json";
    }
    return requestConfig;
  }
  static setApiKey(value) {
    this._apiKey = value;
    this._setInterceptor();
  }
  static putActive(contact) {
    if (!contact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "putActive");
      return;
    }
    axios.put(
      `${this._apiUrl}/event/conversation/${contact.conversationUuid}/active`,
      contact.jsonPayload,
      this._apiConfig(contact)
    ).then((result) => {
      const noZipCodeMap = /* @__PURE__ */ new Map();
      noZipCodeMap.set("", result.data.data);
      contact.addCustomers(noZipCodeMap);
      this._checkForAssignedCustomer(contact);
    });
  }
  static _checkForAssignedCustomer(agentContact) {
    axios.get(`${this._apiUrl}/conversation/resolve/${agentContact.conversationUuid}`, this._apiConfigForGet(agentContact)).then((result) => {
      if (result.data.customerNumber) {
        let foundCustomer;
        agentContact.customers.forEach((data) => {
          if (!foundCustomer) {
            foundCustomer = data.find((customer) => customer.debitor_no.toString() === result.data.customerNumber);
          }
        });
        if (foundCustomer) {
          StoredData.log("customer found in assigned customers", foundCustomer);
          agentContact.selectedCustomer = foundCustomer;
        } else {
          _MerkurRequestHandler.searchCustomerAsync(result.data.customerNumber, agentContact).then((searchResult) => {
            searchResult.forEach((value) => {
              const customerToFind = value.find((data) => data.debitor_no.toString() === result.data.customerNumber);
              if (customerToFind) {
                StoredData.log("customer found from search", customerToFind);
                agentContact.selectedCustomer = customerToFind;
              }
            });
            StoredData.triggerUpdate();
          });
        }
      }
      StoredData.triggerUpdate();
    });
  }
  static async searchCustomerAsync(searchValue, agentContact) {
    const getResult = axios.get(`${this._apiUrl}/customer/search/all/${searchValue}?limit=20`, this._apiConfigForGet(agentContact ?? null));
    return getResult.then(
      (result) => this._getMerkurBoosterMapFromSearchResult(result.data)
    );
  }
  static postCustomerData(customer, agentContact) {
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "postCustomerData");
      return;
    }
    const assignType = agentContact.mediaType === "telephony" ? "CONVERSATION_PHONE" : "CONVERSATION_MAIL";
    agentContact.areCaseLinksLoading = true;
    axios.post(
      `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/customer/${customer.debitor_no}/assigntype/${assignType}/assignidentifier/${agentContact.fromAddress}/assign`,
      agentContact.jsonPayload,
      this._apiConfig(agentContact)
    ).then((response) => {
      console.log(response);
      agentContact.caseLinks = response.data.case_links;
      StoredData.triggerCustomerAssigned();
    }).catch((reason) => {
      StoredData.log("error during assign", reason);
    }).finally(() => {
      agentContact.areCaseLinksLoading = false;
    });
  }
  static assignContact(agentContact, customer) {
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "assignContact");
      return;
    }
    agentContact.areCaseLinksLoading = true;
    agentContact.selectedCustomer = customer;
    const url = `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/customer/${customer.debitor_no}/assigntype/${agentContact.conversationType}/assignidentifier/${agentContact.fromAddress}/assign`;
    axios.post(url, agentContact.jsonPayload, this._apiConfig(agentContact)).then((response) => {
      agentContact.caseLinks = response.data.case_links;
      StoredData.triggerCustomerAssigned();
    }).catch((reason) => {
      StoredData.log("assignContact", reason);
    }).finally(() => {
      agentContact.areCaseLinksLoading = false;
    });
  }
  static sendConsult(interactionId) {
    const agentContact = StoredData.getAgentContactViaInteractionId(interactionId);
    if (!agentContact) {
      StoredData.log("unable to send consult, no agent contact found", interactionId);
      return;
    }
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "sendConsult");
      return;
    }
    const url = `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/consult`;
    axios.put(url, agentContact.jsonPayload, this._apiConfig(agentContact)).then((response) => {
      StoredData.log("consult result", response);
    });
  }
  static assignNewCustomer(agentContact) {
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "assignNewCustomer");
      return;
    }
    agentContact.areCaseLinksLoading = true;
    const newCustomer = {
      activity_id: "",
      contract_address: "",
      contract_number: "",
      customer_birth_date: "",
      customer_name: "",
      customer_password: "",
      debitor_no: "",
      domain: "",
      email: agentContact.mediaType === "email" ? agentContact.fromAddress : "",
      email_addresses: [agentContact.mediaType === "email" ? agentContact.fromAddress : ""],
      id: -1,
      invoice_address: "",
      modified_date: "",
      phone_no: agentContact.mediaType === "telephony" ? agentContact.fromAddress : "",
      phone_numbers: [agentContact.mediaType === "telephony" ? agentContact.fromAddress : ""],
      postofficebox: "",
      signin: "",
      smartcard_number: "",
      state: "",
      verified_email: "",
      verified_phone: ""
    };
    const newCustMap = /* @__PURE__ */ new Map();
    newCustMap.set("", [newCustomer]);
    agentContact.addCustomers(newCustMap);
    const url = `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/newcustomer`;
    axios.post(url, agentContact.jsonPayload, this._apiConfig(agentContact)).then((response) => {
      StoredData.log("new customer response", response.data);
      agentContact.selectedCustomer = newCustomer;
      agentContact.caseLinks = response.data.case_links;
      StoredData.triggerUpdate();
      StoredData.triggerCustomerAssigned();
    }).finally(() => {
      agentContact.areCaseLinksLoading = false;
    });
  }
  static unassignContact(agentContact) {
    if (!agentContact.selectedCustomer) {
      StoredData.log("unable to unassign if no selected customer present", agentContact);
      return;
    }
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "unassignContact");
      return;
    }
    agentContact.areCaseLinksLoading = true;
    axios.put(
      `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/customer/${agentContact.selectedCustomer.debitor_no}/unassign`,
      agentContact.jsonPayload,
      this._apiConfig(agentContact)
    ).then((response) => {
      StoredData.log("unassign response", response);
      agentContact.caseLinks = response.data.case_links;
    }).catch(
      (reason) => StoredData.log("error while trying to unassign", reason)
    ).finally(() => {
      agentContact.areCaseLinksLoading = false;
    });
  }
  static redirectContact(agentContact) {
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "redirectContact");
      return;
    }
    axios.put(
      `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/redirect`,
      agentContact.jsonPayload,
      this._apiConfig(agentContact)
    ).then(
      (response) => StoredData.log("redirect response", response)
    ).catch(
      (reason) => StoredData.log("error while attempting redirect", reason)
    );
  }
  static finishContact(agentContact) {
    var _a;
    const methodName = "finishContact";
    if (!agentContact.conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", methodName);
      return;
    }
    if (agentContact.wasConsulted) {
      StoredData.log("skipping finish as calls was consulted", agentContact);
      return;
    }
    const data = {
      channel: agentContact.mediaType,
      department: "Vermittlung",
      agent: StoredData.crmLoginId,
      model: "DefaultModel"
    };
    axios.put(
      `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/finish?customernumber=${((_a = agentContact.selectedCustomer) == null ? void 0 : _a.debitor_no) ?? ""}&conversationtype=${agentContact.conversationTypeNumber}`,
      data,
      this._apiConfig(agentContact)
    ).then(
      (response) => StoredData.log(methodName, response)
    ).catch(
      (reason) => StoredData.log(methodName, reason)
    );
  }
  static async setConversationUUid(agentContact) {
    let url = "/customer/";
    if (agentContact.mediaType === "email") {
      url += "email";
    } else {
      url += "phone";
    }
    url += "/" + agentContact.fromAddress + "/identify?wxconversationid=" + agentContact.wxccConversationId + "&wxtaskuuid=" + agentContact.interactionId;
    await axios.get(this._apiUrl + url, this._apiConfigForGet(agentContact)).then((result) => {
      agentContact.setConversationUuid(result.data.conversation_uid);
      const noZipCodeMap = /* @__PURE__ */ new Map();
      noZipCodeMap.set("", result.data.data);
      agentContact.addCustomers(noZipCodeMap);
    });
  }
  static logEventData(conversationUuid) {
    if (!conversationUuid) {
      StoredData.log("unable to send request without conversationUUID", "logEventData");
      return;
    }
    const url = `${this._apiUrl}/event/conversation/${conversationUuid}/eventdata`;
    axios.get(url, this._apiConfigForGet(null)).then((result) => StoredData.log("event data", result));
  }
  static _getMerkurBoosterMapFromSearchResult(searchResult) {
    const amendedCustomerDict = /* @__PURE__ */ new Map();
    try {
      const custData = searchResult.data;
      Object.keys(custData).forEach((zipCode) => {
        const key = (zipCode ?? "").length === 0 ? "Ohne TO-Zuweisung" : zipCode;
        amendedCustomerDict.set(key, custData[zipCode]);
      });
    } catch (ex) {
      StoredData.log("error while parsing CustomerSearchResult", ex);
    }
    return amendedCustomerDict;
  }
  static _setInterceptor() {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        StoredData.log("interceptor error caught", error);
        if (error.config) {
          const method = error.config.method;
          const url = error.config.url;
          const data = error.config.data;
          let errorLines = [];
          const mailBodyLines = [];
          mailBodyLines.push(`Failed to make a ${method} request to '${url}'`);
          if (data) {
            mailBodyLines.push(JSON.stringify(data));
          }
          if (error.response) {
            mailBodyLines.push(JSON.stringify(error.response));
          }
          const emailLinebreak = "%0D%0A";
          const encodedQuote = "%22";
          const mailBody = mailBodyLines.join(emailLinebreak.repeat(2)).replace(/"/g, encodedQuote);
          errorLines.push(
            `Bitte folgenden Text an <a href="mailto:servicedesk@teamliwest.at&body=${mailBody}">servicedesk@teamliwest.at</a> schicken:`
          );
          errorLines = errorLines.concat(mailBodyLines);
          StoredData.setErrorData(new ErrorData(errorLines));
        } else {
          StoredData.log("unable to intercept without config");
        }
        return Promise.reject(error);
      }
    );
  }
};
__publicField(_MerkurRequestHandler, "_apiKey", "");
__publicField(_MerkurRequestHandler, "_apiUrl", "https://contactcenter.liwest.at/rest/v1/merkurbooster");
let MerkurRequestHandler = _MerkurRequestHandler;
class ContactEventHandler {
  static async handleContact(contact) {
    StoredData.log("handleContact", contact);
    const agentContact = new AgentContactWrapper(contact);
    if (!agentContact.conversationUuid) ;
    if (!contact.data.interaction.isTerminated && (agentContact.state === "new" || agentContact.state === "connected")) {
      await this.handleContactOffered(contact);
      if (agentContact.state === "connected") {
        StoredData.log("mock connect", contact);
        this.handleContactAdded(contact);
      }
    } else {
      this.handleContactRemoved(contact);
    }
  }
  static async handleContactOffered(contact) {
    StoredData.log("handle contact offered");
    await StoredData.addAgentContact(contact);
  }
  static handleContactAdded(contact) {
    StoredData.log("handle contact added");
    const agentContact = new AgentContactWrapper(contact);
    const existingEntry = StoredData.getAgentContactViaInteractionId(agentContact.interactionId);
    if (existingEntry) {
      existingEntry.setAccepted();
    } else {
      StoredData.log("existing agent contact with interaction id " + agentContact.interactionId + " not found, unable to set accepted");
    }
    StoredData.setCurrentAgentContact(agentContact.interactionId);
    if (agentContact.mediaType === "telephony")
      this._findAndClickKDG();
  }
  static handleContactRemoved(contact) {
    StoredData.log("handle contact ended");
    const wrapper = new AgentContactWrapper(contact);
    const agentContact = StoredData.getAgentContactViaInteractionId(wrapper.interactionId);
    let wasFound = true;
    if (!agentContact) {
      wasFound = false;
      StoredData.log(`unable to find contact with interactionId "${wrapper.interactionId}" for removal`, contact);
    }
    StoredData.removeAgentContact(wrapper.interactionId);
    if (wasFound) {
      try {
        MerkurRequestHandler.finishContact(agentContact);
      } catch (ex) {
        StoredData.log("error during handleCallRemoved", ex);
      }
    }
  }
  static handleAgentWrapUp(contact) {
    StoredData.log("handle wrapup", contact);
    const wrapUpContact = new AgentContactWrapper(contact);
    const existingContact = StoredData.getAgentContactViaInteractionId(wrapUpContact.interactionId);
    if (existingContact) {
      if (wrapUpContact.wasTransferredToAgent) {
        MerkurRequestHandler.sendConsult(wrapUpContact.interactionId);
      }
      if (contact.data.interaction.state === "new") {
        MerkurRequestHandler.redirectContact(existingContact);
      }
      if (!wrapUpContact.wasTransferredToAgent) {
        MerkurRequestHandler.finishContact(existingContact);
      }
      StoredData.removeAgentContact(wrapUpContact.interactionId);
    }
  }
  static handleConsultCreated(contact) {
    StoredData.log("handle consult created", contact);
    const wrapper = new AgentContactWrapper(contact);
    StoredData.setConsulted(wrapper.interactionId);
    MerkurRequestHandler.sendConsult(wrapper.interactionId);
  }
  static _getElement(source, nodeName, className) {
    const children = Array.from(source);
    const foundValue = children.find(
      (cNode) => cNode.nodeName.toLowerCase() === nodeName.toLowerCase() && (!className || cNode.classList.contains(className))
    );
    return foundValue;
  }
  // assumptions: Cisco doesn't change the WxCC layout, agent desktop layout isn't changed dramatically
  // and the menu for the KDG still has the 'LIWEST KDG' label
  // "nav": {
  //    "label": "LIWEST KDG",
  // 		"_comment": "^^^ DO NOT CHANGE this value above, else auto-focus won't work anymore",
  //    "icon": "https://www.liwest.at/fileadmin/user_upload/logo-fb.jpg",
  //    "iconType": "other",
  //    "navigateTo": "kundendaten",
  //    "align": "top"
  // },
  static _findAndClickKDG() {
    let hElement;
    try {
      let sRoot = this._findAgentDesktopBaseShadowRoot();
      if (!sRoot) {
        return;
      }
      const agentxNav = this._getElement(sRoot.childNodes, "agentx-wc-navigation");
      if (!agentxNav) {
        StoredData.log("no agentxNav found");
        return;
      }
      hElement = agentxNav;
      if (!hElement) {
        StoredData.log("no hElement found", 3);
      }
      sRoot = hElement.shadowRoot;
      if (!sRoot) {
        StoredData.log("no sRoot found", 3);
        return;
      }
      const nav = this._getElement(sRoot.childNodes, "nav");
      if (!nav) {
        StoredData.log("no nav found");
        return;
      }
      const hidableContainer = this._getElement(nav.childNodes, "div", "hidable-container");
      if (!hidableContainer) {
        StoredData.log("no hidable container found");
        return;
      }
      const columnContainer = this._getElement(hidableContainer.childNodes, "div", "column");
      if (!columnContainer) {
        StoredData.log("no columnContainer found");
        return;
      }
      const primaryNav = sRoot.getElementById("primaryNav");
      if (!primaryNav) {
        StoredData.log("no primaryNav found");
        return;
      }
      const liNodes = Array.from(primaryNav.getElementsByTagName("li"));
      for (let i = 0; i < liNodes.length; i++) {
        const li = liNodes[i];
        const mdTooltip = Array.from(li.childNodes).find(
          (cNode) => {
            var _a;
            return cNode.nodeName.toLowerCase() === "md-tooltip" && ((_a = cNode.attributes.getNamedItem("message")) == null ? void 0 : _a.value) === "LIWEST KDG";
          }
        );
        if (mdTooltip) {
          const agentNav = this._getElement(mdTooltip.childNodes, "agentx-wc-navigation-item");
          sRoot = agentNav == null ? void 0 : agentNav.shadowRoot;
          if (sRoot) {
            const finallyFound = this._getElement(sRoot.childNodes, "md-button");
            if (!finallyFound) {
              StoredData.log("unable to locate button at last step");
              return;
            }
            try {
              hElement = finallyFound;
              hElement == null ? void 0 : hElement.click();
            } catch (ex) {
              StoredData.log("error during click", ex);
            }
          }
        }
      }
    } catch (ex) {
      StoredData.log("error while attempting to activate KDG", ex);
    }
  }
  static pushTextToSubjectField(text) {
    try {
      let hElement;
      let sRoot = this._findAgentDesktopBaseShadowRoot();
      if (!sRoot) {
        return;
      }
      hElement = sRoot.getElementById("panel-one");
      if (!hElement) {
        StoredData.log("panel one not found");
        return;
      }
      hElement = hElement.getElementsByTagName("imi-email-composer")[0];
      if (!hElement) {
        StoredData.log("imi email composer not found");
        return;
      }
      StoredData.log("imi composer", hElement);
      sRoot = hElement.shadowRoot;
      if (!sRoot) {
        StoredData.log("panel one shadow root not found");
        return;
      }
      StoredData.log("shadow root imi composer", sRoot);
      hElement = sRoot.childNodes[0];
      if (!hElement) {
        StoredData.log("shadow root child not found");
        return;
      }
      StoredData.log("shadow root imi as html element", hElement);
      const divs = hElement.getElementsByTagName("div");
      StoredData.log("divs", divs);
      StoredData.log("inputs", hElement.getElementsByTagName("input"));
      const input = hElement.getElementsByTagName("input")[0];
      if (!input) {
        StoredData.log("input not found");
        return;
      }
      const callback = (event) => {
        StoredData.log("blur", event, input);
        setTimeout(() => {
          if (!input.value) {
            input.value = text;
          }
        }, 200);
      };
      input.value = text;
      input.addEventListener("blur", callback);
      input.addEventListener("change", (ev) => {
        var _a;
        StoredData.log("change", ev);
        (_a = ev.target) == null ? void 0 : _a.removeEventListener("blur", callback);
      });
      StoredData.log("subject set", text);
    } catch (ex) {
      StoredData.log("error while pushing subject text", ex);
    }
  }
  static _findAgentDesktopBaseShadowRoot() {
    let hElement;
    let sRoot;
    const outer = document.getElementsByTagName("agentx-app");
    if (outer.length === 0) {
      StoredData.log("no agentx-app found");
      return null;
    }
    sRoot = outer[0].shadowRoot;
    if (!sRoot) {
      StoredData.log("no sRoot found", 1);
      return null;
    }
    const mdTheme = this._getElement(sRoot.childNodes, "md-theme");
    if (!mdTheme) {
      StoredData.log("no mdTheme found");
      return null;
    }
    hElement = mdTheme;
    if (!hElement) {
      StoredData.log("no hElement found", 1);
    }
    const containingDiv = this._getElement(hElement.childNodes, "div", "app");
    if (!containingDiv) {
      StoredData.log("no containing div");
      return null;
    }
    const routerView = this._getElement(containingDiv.childNodes, "router-view");
    if (!routerView) {
      StoredData.log("no routerView found");
      return null;
    }
    hElement = routerView;
    if (!hElement) {
      StoredData.log("no hElement found", 2);
      return null;
    }
    sRoot = hElement.shadowRoot;
    if (!sRoot) {
      StoredData.log("no sRoot found", 2);
      return null;
    }
    return sRoot;
  }
}
const _StoredData = class _StoredData {
  static get Uuid() {
    return this._uuid;
  }
  static get latestConversationUuid() {
    return this._latestConversationUuid;
  }
  static get agentEmailAddress() {
    return this._agentEmailAddress;
  }
  static set agentEmailAddress(value) {
    _StoredData.log("agent email set", value);
    if (value)
      this._agentEmailAddress = value;
  }
  static get crmUrl() {
    return "https://knowledge.atliwest.local/stoermeldungen_noc/";
  }
  static get crmLoginId() {
    return this.agentEmailAddress.split("@")[0].toUpperCase();
  }
  static get errorData() {
    return this._errorData;
  }
  static get wereHandlersSet() {
    return this._wereHandlersSet;
  }
  static setHandlersSet() {
    this._wereHandlersSet = true;
  }
  static addContactsChangedEventHandler(callback) {
    this._eventHandlerContactsChanged = callback;
    callback.call(null);
  }
  static addCurrentChangedEventHandler(callback) {
    this._eventHandlerCurrentChanged = callback;
    callback.call(null);
  }
  static addCustomerChangedEventHandler(callback) {
    this._eventHandlerCustomerAssigned = callback;
  }
  static addErrorEventHandler(callback) {
    this._eventHandlerErrorData = callback;
    callback.call(null);
  }
  static removeContactsChangedEventHandler() {
    this._eventHandlerContactsChanged = null;
  }
  static removeCurrentChangedEventHandler() {
    this._eventHandlerCurrentChanged = null;
  }
  static removeCustomerAssignedEventHandler() {
    this._eventHandlerCustomerAssigned = null;
  }
  static removeErrorEventHandler() {
    this._eventHandlerErrorData = null;
  }
  static get currentAgentContact() {
    return this._currentAgentContact;
  }
  static get calls() {
    return this._agentContacts.filter(
      (aContact) => aContact.mediaType === "telephony"
    );
  }
  static get mails() {
    return this._agentContacts.filter(
      (aContact) => aContact.mediaType === "email"
    );
  }
  static async addAgentContact(contact) {
    const newContact = new AgentContactWrapper(contact);
    const existingContact = this._agentContacts.find(
      (aContact) => aContact.interactionId === newContact.interactionId
    );
    if (existingContact) {
      _StoredData.log("skipping add, already in list", this._agentContacts, contact);
      return;
    }
    this._agentContacts.push(newContact);
    if (!newContact.conversationUuid) {
      newContact.setIsSyncing();
      await MerkurRequestHandler.setConversationUUid(newContact);
      newContact.setSyncCompleted();
      if (newContact.isNewOutgoingMail) {
        setTimeout(() => {
          _StoredData.log("starting timeout for ticket push");
          ContactEventHandler.pushTextToSubjectField("[BETREFF HIER EINGEBEN] LiwestTicket: " + newContact.conversationUuid);
        }, 3e3);
      }
    } else {
      _StoredData.log("no need to set conversationUuid", newContact);
    }
    this._latestConversationUuid = newContact.conversationUuid;
    this._emitChange(true);
    this._emitChange(false);
    _StoredData.log("contact added to store", newContact, this._agentContacts);
  }
  static removeAgentContact(interactionId) {
    var _a;
    this.log("removing entry", interactionId);
    if (interactionId === ((_a = this._currentAgentContact) == null ? void 0 : _a.interactionId)) {
      this.clearCurrent();
      this._emitChange(false);
    }
    const foundContact = this._agentContacts.find((contact) => contact.interactionId === interactionId);
    if (foundContact) {
      this.log("contact found, current entries", [...this._agentContacts]);
      this._agentContacts = this._agentContacts.filter((aContact) => aContact !== foundContact);
      this.log("removed, current entries", [...this._agentContacts]);
      this._emitChange(true);
    } else {
      _StoredData.log("no contact found for removal", this._agentContacts, interactionId);
    }
  }
  static getAgentContactViaInteractionId(interactionId) {
    return this._agentContacts.find(
      (aContact) => aContact.interactionId === interactionId
    );
  }
  static getAgentContactViaConversationUuid(conversationUuid) {
    return this._agentContacts.find(
      (aContact) => aContact.conversationUuid === conversationUuid
    );
  }
  static setCurrentAgentContact(interactionId) {
    const foundContact = this.getAgentContactViaInteractionId(interactionId);
    if (!foundContact) {
      _StoredData.log(`unable to set current, no agent contact found for id "${interactionId}"`);
      return;
    }
    if (foundContact.isSyncing) {
      if (+/* @__PURE__ */ new Date() - +foundContact.syncDate > 2e3) {
        _StoredData.log("sync hanging, aborting active", "sync date: " + foundContact.syncDate, "conversationUUID: " + foundContact.conversationUuid);
      } else {
        _StoredData.log("scheduling new try for active", "sync date: " + foundContact.syncDate, "conversationUUID: " + foundContact.conversationUuid);
        setTimeout(() => {
          this.setCurrentAgentContact(foundContact.interactionId);
        }, 200);
      }
      return;
    }
    this._currentAgentContact = foundContact;
    MerkurRequestHandler.putActive(foundContact);
    this._emitChange(false);
  }
  static clearCurrent() {
    this._currentAgentContact = null;
    this._emitChange(false);
  }
  static setSelectedCustomer(customer) {
    if (!this._currentAgentContact) {
      _StoredData.log("unable to set selected customer, no agent contact selected");
      return;
    }
    this._currentAgentContact.selectedCustomer = customer;
  }
  static triggerUpdate() {
    this._emitChange(true);
    this._emitChange(false);
  }
  static triggerCustomerAssigned() {
    var _a;
    (_a = this._eventHandlerCustomerAssigned) == null ? void 0 : _a.call(null);
  }
  static removeUnacceptedEntries() {
    this._agentContacts.filter((aContact) => !aContact.wasAccepted).forEach((aContact) => this.removeAgentContact(aContact.interactionId));
  }
  static removeNotContained(taskIdsToKeep) {
    this.log("enter removing");
    const interactionIdsToRemove = [];
    const currentIds = this._agentContacts.map((aContact) => aContact.interactionId);
    currentIds.forEach((idToCheck) => {
      this.log("checking entry", idToCheck, currentIds);
      let wasFound = false;
      for (let index = 0; index < taskIdsToKeep.length; index++) {
        const element = taskIdsToKeep[index];
        this.log("checking id", element);
        if (element == idToCheck) {
          wasFound = true;
          this.log("was found", element, idToCheck);
          break;
        }
      }
      if (!wasFound) {
        this.log("not found", idToCheck);
        interactionIdsToRemove.push(idToCheck);
      }
    });
    this.log("ids to remove", interactionIdsToRemove);
    interactionIdsToRemove.forEach((id) => this.removeAgentContact(id));
  }
  static setConsulted(interactionId) {
    const foundContact = this._agentContacts.find((contact) => contact.interactionId == interactionId);
    if (!foundContact) {
      this.log("no contact found for 'setConsulted'", interactionId);
    } else {
      foundContact.setConsulted();
    }
  }
  //#endregion contacts / interaction
  //#region error data
  static setErrorData(errorData) {
    var _a;
    this._errorData = errorData;
    (_a = this._eventHandlerErrorData) == null ? void 0 : _a.call(null);
  }
  static clearError() {
    var _a;
    this._errorData = null;
    (_a = this._eventHandlerErrorData) == null ? void 0 : _a.call(null);
  }
  //#endregion error data
  //#region debug
  static dumpState() {
    _StoredData.log("stored data state", { ...this });
  }
  static log(...data) {
    console.error("NTS DEBUG:", ...data, (/* @__PURE__ */ new Date()).toLocaleTimeString(), this._uuid);
  }
  //#endregion debug
  //#region private methods
  static _emitChange(isForContactsChanged) {
    setTimeout(() => {
      const callback = isForContactsChanged ? this._eventHandlerContactsChanged : this._eventHandlerCurrentChanged;
      callback == null ? void 0 : callback.call(null);
    }, 200);
  }
  //#endregion private methods
};
__publicField(_StoredData, "latestIdleTime", null);
__publicField(_StoredData, "_uuid", v4());
__publicField(_StoredData, "_latestConversationUuid", "");
__publicField(_StoredData, "displayErrors", false);
__publicField(_StoredData, "_agentEmailAddress", "");
__publicField(_StoredData, "agentLoginId", "");
__publicField(_StoredData, "_errorData");
__publicField(_StoredData, "isInitialized", false);
__publicField(_StoredData, "hasInitializationStarted", false);
__publicField(_StoredData, "_wereHandlersSet", false);
//#region event handlers
__publicField(_StoredData, "_eventHandlerContactsChanged", null);
__publicField(_StoredData, "_eventHandlerCurrentChanged", null);
__publicField(_StoredData, "_eventHandlerCustomerAssigned", null);
__publicField(_StoredData, "_eventHandlerErrorData", null);
//#endregion event handlers
//#region contacts / interaction
__publicField(_StoredData, "_agentContacts", []);
__publicField(_StoredData, "_currentAgentContact", null);
let StoredData = _StoredData;
const _hoisted_1$1 = { class: "ml-2 mr-2 mt-3 mb-3" };
const _hoisted_2$1 = { class: "row" };
const _hoisted_3$1 = { class: "col-12 mt-3" };
const _hoisted_4$1 = { class: "input-group mb-3" };
const _hoisted_5$1 = { class: "col-lg-12" };
const _hoisted_6$1 = {
  class: "table",
  style: { "overflow-y": "scroll" }
};
const _hoisted_7$1 = {
  class: "table center table-striped table-inverse",
  style: { "overflow-y": "scroll" }
};
const _hoisted_8$1 = ["onClick"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CustomerTable",
  props: {
    isDarkMode: { type: Boolean }
  },
  setup(__props) {
    const customerSearchResult = ref(
      /* @__PURE__ */ new Map()
    );
    const search = ref("");
    watch(search, () => {
      if (search.value.length < 3) {
        return;
      }
      MerkurRequestHandler.searchCustomerAsync(search.value, StoredData.currentAgentContact).then(
        (value) => {
          customerSearchResult.value = value;
          StoredData.log("search result from merkur", customerSearchResult.value);
        }
      );
    });
    function selectCustomer(customer) {
      if (!StoredData.currentAgentContact) {
        StoredData.log("unable to select customer without agent contact");
        return;
      }
      MerkurRequestHandler.postCustomerData(customer, StoredData.currentAgentContact);
      StoredData.setSelectedCustomer(customer);
    }
    onMounted(() => {
      if (StoredData.currentAgentContact !== null) {
        customerSearchResult.value = StoredData.currentAgentContact.customers;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value = $event),
                type: "text",
                class: "form-control",
                placeholder: "Suche",
                "aria-label": "Suche",
                "aria-describedby": "basic-addon2"
              }, null, 512), [
                [vModelText, search.value]
              ]),
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "input-group-append" }, [
                createBaseVNode("span", {
                  class: "input-group-text",
                  id: "basic-addon2"
                }, "Suche")
              ], -1))
            ]),
            createBaseVNode("span", null, toDisplayString(search.value), 1)
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("table", _hoisted_6$1, [
              createBaseVNode("thead", null, [
                createBaseVNode("tr", null, [
                  createBaseVNode("th", {
                    style: normalizeStyle([{ "width": "125px" }, { color: _ctx.isDarkMode ? "white" : "black" }])
                  }, "PLZ", 4),
                  createBaseVNode("th", {
                    style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                  }, "Kundendaten", 4)
                ])
              ]),
              createBaseVNode("tbody", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList([...customerSearchResult.value.keys()], (zipCode) => {
                  return openBlock(), createElementBlock("tr", { key: zipCode }, [
                    createBaseVNode("td", null, toDisplayString(zipCode), 1),
                    createBaseVNode("td", null, [
                      createBaseVNode("table", _hoisted_7$1, [
                        createBaseVNode("thead", null, [
                          createBaseVNode("tr", null, [
                            createBaseVNode("th", {
                              style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                            }, "Kundennummer", 4),
                            createBaseVNode("th", {
                              style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                            }, "Name", 4),
                            createBaseVNode("th", {
                              style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                            }, "Vertragsadresse", 4),
                            createBaseVNode("th", {
                              style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                            }, "Rechnungsadresse", 4),
                            createBaseVNode("th", {
                              style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                            }, "Kunde wählen", 4)
                          ])
                        ]),
                        createBaseVNode("tbody", null, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(customerSearchResult.value.get(zipCode), (customer) => {
                            return openBlock(), createElementBlock("tr", {
                              key: customer.id
                            }, [
                              createBaseVNode("td", {
                                style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                              }, toDisplayString(customer.debitor_no), 5),
                              createBaseVNode("td", {
                                style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                              }, toDisplayString(customer.customer_name), 5),
                              createBaseVNode("td", {
                                style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                              }, toDisplayString(customer.contract_address), 5),
                              createBaseVNode("td", {
                                style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "black" })
                              }, toDisplayString(customer.invoice_address), 5),
                              createBaseVNode("td", null, [
                                createBaseVNode("div", {
                                  class: "btn btn-sm btn-success",
                                  onClick: ($event) => selectCustomer(customer)
                                }, " Auswählen ", 8, _hoisted_8$1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ]);
                }), 128))
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
class WebexAPIRequestHandler {
  static get _requestConfig() {
    return {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.accessToken
      }
    };
  }
  static async getPeople(displayNameStartValue) {
    const url = this._baseUrlFormat + "people?displayName=" + displayNameStartValue;
    let returnValue = [];
    await axios.get(url, this._requestConfig).then((response) => {
      returnValue = response.data.items;
    }).catch((reason) => StoredData.log("error on user get", reason));
    return returnValue;
  }
  static sendMessage(id, message) {
    const body = {
      toPersonId: id,
      text: message
    };
    axios.post("https://webexapis.com/v1/messages", body, this._requestConfig).then((data) => StoredData.log("message sent", data)).catch((reason) => StoredData.log("message error", reason));
  }
}
__publicField(WebexAPIRequestHandler, "accessToken", "");
__publicField(WebexAPIRequestHandler, "_baseUrlFormat", "https://webexapis.com/v1/");
const _hoisted_1 = {
  key: 0,
  style: { "width": "90%" },
  class: "mx-auto alert alert-danger alert-dismissible fade show"
};
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = {
  id: "div_debug",
  style: { "display": "none" }
};
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["value"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = { class: "row justify-content-center" };
const _hoisted_9 = { class: "col-2 dropdown" };
const _hoisted_10 = { style: { "width": "100%" } };
const _hoisted_11 = { class: "col-2 dropdown" };
const _hoisted_12 = { style: { "width": "100%", "display": "flex", "align-items": "center" } };
const _hoisted_13 = ["value"];
const _hoisted_14 = { class: "col-2 dropdown" };
const _hoisted_15 = { style: { "width": "100%", "display": "flex", "align-items": "center" } };
const _hoisted_16 = ["value"];
const _hoisted_17 = { class: "col-2 dropdown" };
const _hoisted_18 = {
  key: 1,
  class: "row justify-content-center"
};
const _hoisted_19 = { class: "col-12 text-center" };
const _hoisted_20 = ["src"];
const _hoisted_21 = {
  key: 2,
  class: "row justify-content-center"
};
const _hoisted_22 = { class: "col-2" };
const _hoisted_23 = { class: "col-12 mb-3 mt-4 align-middle text-center" };
const _hoisted_24 = { class: "col-12 mt-1 mb-1" };
const _hoisted_25 = { class: "col-12 mt-1 mb-1" };
const _hoisted_26 = { class: "col-12 mt-1 mb-1" };
const _hoisted_27 = { class: "col-12 mb-3 align-middle text-center" };
const _hoisted_28 = {
  key: 0,
  class: "ml-2 mr-2 mt-3 mb-3"
};
const _hoisted_29 = { class: "row justify-content-center" };
const _hoisted_30 = ["href"];
const _hoisted_31 = {
  key: 0,
  class: "col-10"
};
const _hoisted_32 = ["src"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HomeComponent",
  props: {
    isDarkMode: { type: Boolean },
    frameHeight: {}
  },
  setup(__props) {
    const calls = ref([]);
    const emails = ref([]);
    const pendingCustomerConfirmation = ref(false);
    const showSearch = ref(false);
    const selectedCallId = ref("");
    const selectedEmailId = ref("");
    const isExplicitlySearched = ref(false);
    const errorData = ref(null);
    const displayErrors = ref(false);
    const searchValue = ref("");
    const persons = ref([]);
    const selectedPersonId = ref(null);
    watch(selectedCallId, () => {
      var _a;
      if (selectedCallId.value && selectedCallId.value !== ((_a = StoredData.currentAgentContact) == null ? void 0 : _a.interactionId)) {
        StoredData.setCurrentAgentContact(selectedCallId.value);
      }
    });
    watch(selectedEmailId, () => {
      var _a;
      if (selectedEmailId.value && selectedEmailId.value !== ((_a = StoredData.currentAgentContact) == null ? void 0 : _a.interactionId)) {
        StoredData.setCurrentAgentContact(selectedEmailId.value);
      }
    });
    watch(displayErrors, () => {
      StoredData.displayErrors = displayErrors.value;
    });
    function changeCurrent(event) {
      const interactionId = event.target.nodeValue;
      if (interactionId) {
        StoredData.setCurrentAgentContact(interactionId);
      }
    }
    function resetCurrent() {
      StoredData.clearCurrent();
    }
    function getIdleCrmUrl() {
      const url = `${StoredData.crmUrl}customer_view_finesse_ob.php?navUser=${StoredData.crmLoginId}`;
      return url;
    }
    function getCrmUrl() {
      var _a, _b, _c, _d;
      const workItemUuid = ((_a = StoredData.currentAgentContact) == null ? void 0 : _a.mediaType) === "task" ? StoredData.currentAgentContact.interactionId : "";
      let customerToTake = (_b = StoredData.currentAgentContact) == null ? void 0 : _b.selectedCustomer;
      if (!customerToTake && ((_c = StoredData.currentAgentContact) == null ? void 0 : _c.hasSingleHit)) {
        customerToTake = StoredData.currentAgentContact.singleHitCustomer;
      }
      const url = `${StoredData.crmUrl}customer_view_finesse.php?debID=${(customerToTake == null ? void 0 : customerToTake.debitor_no) ?? ""}&navUser=${StoredData.crmLoginId}&conversationUuid=${((_d = StoredData.currentAgentContact) == null ? void 0 : _d.conversationUuid) ?? ""}&workItemUuid=${workItemUuid}`;
      return url;
    }
    function assignSingleHit() {
      var _a;
      if (!((_a = StoredData.currentAgentContact) == null ? void 0 : _a.hasSingleHit)) {
        StoredData.log("unable to assign single hit");
        return;
      }
      MerkurRequestHandler.assignContact(
        StoredData.currentAgentContact,
        StoredData.currentAgentContact.singleHitCustomer
      );
      StoredData.setSelectedCustomer(StoredData.currentAgentContact.singleHitCustomer);
    }
    function assignNewCustomer() {
      if (!StoredData.currentAgentContact) {
        StoredData.log("unable to assign without current agent contact");
      }
      MerkurRequestHandler.assignNewCustomer(StoredData.currentAgentContact);
    }
    function activateSearch() {
      isExplicitlySearched.value = true;
      processCurrentChange();
      if (StoredData.currentAgentContact)
        MerkurRequestHandler.unassignContact(StoredData.currentAgentContact);
    }
    function processContactChange() {
      calls.value = StoredData.calls;
      emails.value = StoredData.mails;
    }
    function processCurrentChange() {
      var _a, _b, _c;
      if (!StoredData.currentAgentContact) {
        selectedCallId.value = null;
        selectedEmailId.value = null;
      } else {
        if (StoredData.currentAgentContact.mediaType === "email") {
          selectedCallId.value = null;
          selectedEmailId.value = StoredData.currentAgentContact.interactionId;
        } else {
          selectedEmailId.value = null;
          selectedCallId.value = StoredData.currentAgentContact.interactionId;
        }
      }
      showSearch.value = isExplicitlySearched.value || StoredData.currentAgentContact !== null && !StoredData.currentAgentContact.hasSingleHit && !((_a = StoredData.currentAgentContact) == null ? void 0 : _a.selectedCustomer);
      pendingCustomerConfirmation.value = ((_b = StoredData.currentAgentContact) == null ? void 0 : _b.selectedCustomer) === null && ((_c = StoredData.currentAgentContact) == null ? void 0 : _c.hasSingleHit) && !isExplicitlySearched.value;
    }
    function logEventData() {
      if (StoredData.latestConversationUuid) {
        MerkurRequestHandler.logEventData(StoredData.latestConversationUuid);
      }
    }
    function dumpStoredData() {
      StoredData.dumpState();
    }
    function searchWebexPeople() {
      selectedPersonId.value = null;
      WebexAPIRequestHandler.getPeople(searchValue.value).then((people) => persons.value = people);
    }
    function sendGuestMessage() {
      if (!selectedPersonId.value) {
        StoredData.log("no person selected for guest message");
        return;
      }
      WebexAPIRequestHandler.sendMessage(selectedPersonId.value, "Dein Besuch ist da, bitte hol ihn beim Empfang ab");
    }
    function sendCallbackMessage() {
      if (!selectedPersonId.value) {
        StoredData.log("no person selected for callback message");
        return;
      }
      if (!StoredData.currentAgentContact) {
        StoredData.log("no current agent contact");
        return;
      }
      if (StoredData.currentAgentContact.mediaType !== "telephony") {
        StoredData.log("unable to send callback message for non-call conversations");
        return;
      }
      WebexAPIRequestHandler.sendMessage(selectedPersonId.value, "Anrufer mit Nummer " + StoredData.currentAgentContact.fromAddress + " hat angerufen, bitte ASAP zurückrufen");
    }
    function test2() {
    }
    onMounted(() => {
      StoredData.addContactsChangedEventHandler(processContactChange);
      StoredData.addCurrentChangedEventHandler(processCurrentChange);
      StoredData.addCustomerChangedEventHandler(() => {
        isExplicitlySearched.value = false;
        processCurrentChange();
      });
      StoredData.addErrorEventHandler(() => errorData.value = StoredData.errorData);
      displayErrors.value = StoredData.displayErrors;
    });
    onUnmounted(() => {
      StoredData.removeContactsChangedEventHandler();
      StoredData.removeCurrentChangedEventHandler();
      StoredData.removeCustomerAssignedEventHandler();
      StoredData.removeErrorEventHandler();
    });
    function logCurrent() {
      StoredData.log("log selected", StoredData.currentAgentContact);
      StoredData.log("log current calls", StoredData.calls);
      StoredData.log("log current mails", StoredData.mails);
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", null, [
          errorData.value && displayErrors.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createBaseVNode("strong", null, "[Fehler] " + toDisplayString(errorData.value.timeStamp.toLocaleTimeString()), 1),
            _cache[15] || (_cache[15] = createBaseVNode("br", null, null, -1)),
            _cache[16] || (_cache[16] = createBaseVNode("br", null, null, -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(errorData.value.errorLines, (line) => {
              return openBlock(), createElementBlock("div", { key: line }, [
                createBaseVNode("div", { innerHTML: line }, null, 8, _hoisted_2),
                _cache[13] || (_cache[13] = createBaseVNode("br", null, null, -1))
              ]);
            }), 128)),
            createBaseVNode("button", {
              type: "button",
              style: { "cursor": "pointer" },
              class: "close",
              "aria-label": "Close",
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(StoredData).clearError && unref(StoredData).clearError(...args))
            }, _cache[14] || (_cache[14] = [
              createBaseVNode("span", { "aria-hidden": "true" }, "×", -1)
            ]))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3, [
            unref(StoredData).latestConversationUuid ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: logEventData
            }, " Log event data ")) : createCommentVNode("", true),
            createBaseVNode("button", { onClick: logCurrent }, "Log current"),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => dumpStoredData())
            }, "Dump stored data"),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => test2())
            }, "Test"),
            createBaseVNode("button", {
              disabled: !searchValue.value,
              onClick: _cache[3] || (_cache[3] = ($event) => searchWebexPeople())
            }, "Suche", 8, _hoisted_4),
            withDirectives(createBaseVNode("input", {
              type: "search",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => searchValue.value = $event)
            }, null, 512), [
              [vModelText, searchValue.value]
            ]),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => selectedPersonId.value = $event),
              class: "form-control",
              id: "personDropdown"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(persons.value, (item) => {
                return openBlock(), createElementBlock("option", {
                  value: item.id,
                  key: item.id
                }, toDisplayString(item.displayName), 9, _hoisted_5);
              }), 128))
            ], 512), [
              [vModelSelect, selectedPersonId.value]
            ]),
            createBaseVNode("button", {
              disabled: !selectedPersonId.value,
              onClick: _cache[6] || (_cache[6] = ($event) => sendGuestMessage())
            }, "Gastnachricht schicken", 8, _hoisted_6),
            createBaseVNode("button", {
              disabled: !selectedPersonId.value || !unref(StoredData).currentAgentContact,
              onClick: _cache[7] || (_cache[7] = ($event) => sendCallbackMessage())
            }, "Rückrufnachricht schicken", 8, _hoisted_7)
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => displayErrors.value = $event),
                  id: "cbx_displayErrors"
                }, null, 512), [
                  [vModelCheckbox, displayErrors.value]
                ]),
                _cache[17] || (_cache[17] = createBaseVNode("label", { for: "cbx_displayErrors" }, "Fehler anzeigen", -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("label", {
                  for: "callDropdown",
                  style: normalizeStyle({
                    fontWeight: calls.value.length > 0 ? "bold" : "unset",
                    color: _ctx.isDarkMode ? "white" : "black",
                    whiteSpace: "nowrap",
                    marginRight: "1vw",
                    marginBottom: "0"
                  })
                }, "Anrufe (" + toDisplayString(calls.value.length) + ")", 5),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => selectedCallId.value = $event),
                  class: "form-control",
                  id: "callDropdown",
                  style: { "width": "100%" },
                  onChange: _cache[10] || (_cache[10] = ($event) => changeCurrent($event))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(calls.value, (item) => {
                    return openBlock(), createElementBlock("option", {
                      value: item.interactionId,
                      key: item.interactionId
                    }, toDisplayString(item.callLabel), 9, _hoisted_13);
                  }), 128))
                ], 544), [
                  [vModelSelect, selectedCallId.value]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("label", {
                  style: normalizeStyle({
                    fontWeight: emails.value.length > 0 ? "bold" : "unset",
                    color: _ctx.isDarkMode ? "white" : "black",
                    whiteSpace: "nowrap",
                    marginRight: "1vw",
                    marginBottom: "0"
                  }),
                  for: "emailDropdown"
                }, "E-Mails (" + toDisplayString(emails.value.length) + ")", 5),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => selectedEmailId.value = $event),
                  class: "form-control",
                  id: "emailDropdown",
                  style: { "width": "100%" },
                  onChange: _cache[12] || (_cache[12] = ($event) => changeCurrent($event))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(emails.value, (item) => {
                    return openBlock(), createElementBlock("option", {
                      value: item.interactionId,
                      key: item.interactionId
                    }, toDisplayString(item.mailLabel), 9, _hoisted_16);
                  }), 128))
                ], 544), [
                  [vModelSelect, selectedEmailId.value]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_17, [
              unref(StoredData).currentAgentContact ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "btn btn-sm btn-secondary btn-block p-2",
                onClick: resetCurrent
              }, " Auswahl aufheben ")) : createCommentVNode("", true)
            ])
          ]),
          !unref(StoredData).currentAgentContact && unref(StoredData).agentEmailAddress ? (openBlock(), createElementBlock("div", _hoisted_18, [
            createBaseVNode("div", _hoisted_19, [
              createBaseVNode("iframe", {
                class: "mt-4",
                name: "kundendateniframe",
                id: "kundendateniframe",
                style: normalizeStyle({ width: "100%", height: (_ctx.frameHeight ?? 710) + "px" }),
                src: getIdleCrmUrl()
              }, null, 12, _hoisted_20)
            ])
          ])) : createCommentVNode("", true),
          unref(StoredData).currentAgentContact ? (openBlock(), createElementBlock("div", _hoisted_21, [
            createBaseVNode("div", _hoisted_22, [
              createBaseVNode("div", _hoisted_23, [
                createBaseVNode("span", {
                  style: normalizeStyle({ color: _ctx.isDarkMode ? "white" : "#292929" })
                }, "Ist die Kundenauswahl korrekt?", 4)
              ]),
              createBaseVNode("div", _hoisted_24, [
                pendingCustomerConfirmation.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "btn btn-sm btn-success btn-block p-2",
                  onClick: assignSingleHit
                }, " Ja ")) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_25, [
                pendingCustomerConfirmation.value || ((_a = unref(StoredData).currentAgentContact) == null ? void 0 : _a.selectedCustomer) ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "btn btn-sm btn-danger btn-block p-2",
                  onClick: activateSearch
                }, " Nein ")) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_26, [
                showSearch.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "btn btn-sm btn-secondary btn-block p-2",
                  onClick: assignNewCustomer
                }, " Neukunde, kein Treffer ")) : createCommentVNode("", true)
              ]),
              withDirectives(createBaseVNode("div", _hoisted_27, _cache[18] || (_cache[18] = [
                createBaseVNode("span", null, "Links werden geladen", -1)
              ]), 512), [
                [vShow, (_b = unref(StoredData).currentAgentContact) == null ? void 0 : _b.areCaseLinksLoading]
              ]),
              !((_c = unref(StoredData).currentAgentContact) == null ? void 0 : _c.areCaseLinksLoading) && ((_d = unref(StoredData).currentAgentContact) == null ? void 0 : _d.selectedCustomer) ? (openBlock(), createElementBlock("div", _hoisted_28, [
                createBaseVNode("div", _hoisted_29, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList((_e = unref(StoredData).currentAgentContact) == null ? void 0 : _e.caseLinks, (link, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: "col-12 text-center",
                      style: { "word-break": "break-all" }
                    }, [
                      createBaseVNode("a", {
                        href: link.link,
                        target: "_blank"
                      }, toDisplayString(link.link_desc), 9, _hoisted_30)
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ]),
            unref(StoredData).currentAgentContact !== null ? (openBlock(), createElementBlock("div", _hoisted_31, [
              withDirectives(createVNode(_sfc_main$2, { "is-dark-mode": _ctx.isDarkMode }, null, 8, ["is-dark-mode"]), [
                [vShow, showSearch.value]
              ]),
              !showSearch.value ? (openBlock(), createElementBlock("iframe", {
                key: 0,
                class: "mt-4",
                name: "kundendateniframe",
                id: "kundendateniframe",
                style: normalizeStyle({ width: "100%", height: (_ctx.frameHeight ?? 710) + "px" }),
                src: getCrmUrl()
              }, null, 12, _hoisted_32)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  props: {
    isDarkMode: { type: Boolean },
    apiKey: {},
    agentEmailId: {},
    displayErrors: { type: Boolean },
    token: {},
    frameHeight: {}
  },
  setup(__props) {
    const props = __props;
    const isInitialized = ref(false);
    watch(props, () => {
      StoredData.log("props", props);
      StoredData.agentEmailAddress = props.agentEmailId;
      StoredData.displayErrors = props.displayErrors ?? false;
      WebexAPIRequestHandler.accessToken = props.token ?? "";
    });
    onMounted(() => {
      if (!StoredData.isInitialized && !StoredData.hasInitializationStarted) {
        StoredData.hasInitializationStarted = true;
        StoredData.log(props);
        initializeIfAgentEmailSet();
      } else {
        StoredData.log("already initializing, calls and mails:", StoredData.calls, StoredData.mails);
        isInitialized.value = true;
      }
    });
    function initializeIfAgentEmailSet() {
      if (props.token && !WebexAPIRequestHandler.accessToken) {
        WebexAPIRequestHandler.accessToken = props.token;
      }
      if (props.agentEmailId && !StoredData.agentEmailAddress) {
        StoredData.agentEmailAddress = props.agentEmailId;
      }
      if (StoredData.agentEmailAddress) {
        initialize();
      } else {
        StoredData.log("retry because of missing agent email id");
        setTimeout(() => {
          initializeIfAgentEmailSet();
        }, 200);
      }
    }
    function initialize() {
      if (props.apiKey) {
        MerkurRequestHandler.setApiKey(props.apiKey);
      } else {
        StoredData.log("unable to request customer data without apiKey!");
        StoredData.setErrorData(new ErrorData(["MISSING API KEY"]));
      }
      if (typeof props.displayErrors !== "undefined") {
        StoredData.displayErrors = props.displayErrors;
      } else {
        StoredData.log("no display errors found in props, keeping default false");
      }
      try {
        distExports.Desktop.config.init({ widgetName: "kundendaten-gadget", widgetProvider: "NTS" }).then(() => {
          StoredData.log("successful init");
        }).catch((reason) => {
          StoredData.log("error during init", reason);
        }).finally(() => {
          distExports.Desktop.actions.getTaskMap().then((data) => {
            try {
              if (!data) {
                return;
              }
              const cArray = Array.from(data.values());
              StoredData.log("task map", data, cArray);
              for (let i = 0; i < cArray.length; i++) {
                const agentContact = cArray[i];
                const fakedAgentContact = { data: agentContact, type: agentContact.type, orgId: agentContact.orgId, trackingId: agentContact.trackingId };
                const newWrapper = new AgentContactWrapper(fakedAgentContact);
                if (newWrapper.isOutgoingMail) {
                  StoredData.addAgentContact(fakedAgentContact);
                }
              }
            } catch (ex) {
              StoredData.log("task map error", ex);
            }
          });
          _setupEventListeners();
          setTimeout(() => {
            StoredData.isInitialized = true;
            isInitialized.value = true;
            StoredData.log("initialized");
          }, 500);
        });
      } catch (ex) {
        StoredData.log("Init not working", ex);
      }
    }
    function _setupEventListeners() {
      if (StoredData.wereHandlersSet) {
        StoredData.log("skip setting event handlers");
        return;
      }
      distExports.Desktop.screenpop.addEventListener("eScreenPop", (data) => {
        StoredData.log("screenPop data", data);
      });
      distExports.Desktop.agentStateInfo.addEventListener(
        "updated",
        (data) => {
          StoredData.log("agentStateInfo", data);
          try {
            const idleCode = data.find((entry) => entry.name == "idleCode");
            StoredData.log("found idle code", idleCode, idleCode == null ? void 0 : idleCode.value);
            if (idleCode && idleCode.value && idleCode.value.name === "RONA") {
              StoredData.log("getting task map");
              setTimeout(() => {
                StoredData.log("timeout elapsed");
                distExports.Desktop.actions.getTaskMap().then((data2) => {
                  StoredData.log("task map result", data2);
                  let stillAssignedTaskIds = [];
                  if (data2) {
                    stillAssignedTaskIds = Array.from(data2.keys());
                  } else {
                    StoredData.log("undefined data for task map received");
                  }
                  StoredData.log("task ids to keep after RONA", stillAssignedTaskIds);
                  StoredData.removeNotContained(stillAssignedTaskIds);
                });
              }, 1e3);
            }
          } catch (ex) {
            StoredData.log("error on idle code parsing", ex);
          }
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentContact",
        (contact) => {
          try {
            ContactEventHandler.handleContact(contact);
          } catch (ex) {
            StoredData.log("error while setting current items", ex);
          }
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentOfferContact",
        (contact) => {
          StoredData.log("eAgentOfferContact", contact);
          try {
            ContactEventHandler.handleContactOffered(contact);
          } catch (ex) {
            StoredData.log("error while setting caller data", ex);
          }
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentOfferConsult",
        (contact) => {
          StoredData.log("eAgentOfferConsult", contact);
          try {
            ContactEventHandler.handleContactOffered(contact);
          } catch (ex) {
            StoredData.log("error on offer consult", ex);
          }
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentContactAssigned",
        (contact) => {
          StoredData.log("eAgentContactAssigned", contact);
          try {
            ContactEventHandler.handleContactAdded(contact);
          } catch (ex) {
            StoredData.log("error while processing AgentContactAssigned", ex);
          }
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentContactEnded",
        (contact) => {
          StoredData.log("AgentContact eAgentContactEnded: ", contact);
          ContactEventHandler.handleContactRemoved(contact);
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentWrapup",
        (contact) => {
          StoredData.log("eAgentWrapup", contact);
          try {
            ContactEventHandler.handleAgentWrapUp(contact);
          } catch (ex) {
            StoredData.log("error during eAgentWrapup", ex);
          }
        }
      );
      distExports.Desktop.agentContact.addEventListener(
        "eAgentConsultCreated",
        (contact) => {
          StoredData.log("eAgentConsultCreated", contact);
          try {
            ContactEventHandler.handleConsultCreated(contact);
          } catch (ex) {
            StoredData.log("error during consult created", ex);
          }
        }
      );
      const eventsToSubscribe = [
        "eAgentConsulting",
        "eAgentConsultConferenced",
        "eAgentConsultFailed",
        "eAgentConsultEndFailed",
        "eAgentConsultEnded",
        "eAgentCtqCancelled",
        "eAgentCtqFailed",
        "eAgentCtqCancelFailed",
        "eCallRecordingStarted"
      ];
      eventsToSubscribe.forEach((eventName) => {
        try {
          distExports.Desktop.agentContact.addEventListener(
            eventName,
            (contact) => {
              try {
                StoredData.log("event fired", eventName, contact);
              } catch {
              }
            }
          );
        } catch (ex) {
          StoredData.log("error while adding listener for " + eventName, ex);
        }
      });
      StoredData.log("listeners set");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", null, [
        _cache[0] || (_cache[0] = createBaseVNode("link", {
          rel: "stylesheet",
          href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        }, null, -1)),
        _cache[1] || (_cache[1] = createBaseVNode("link", {
          rel: "stylesheet",
          href: "https://drgreendj.github.io/style.css"
        }, null, -1)),
        isInitialized.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          "is-dark-mode": _ctx.isDarkMode,
          "frame-height": _ctx.frameHeight
        }, null, 8, ["is-dark-mode", "frame-height"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17c90bd9"]]);
const kundendatenGadget = /* @__PURE__ */ defineCustomElement(App);
window.customElements.define("kundendaten-gadget", kundendatenGadget);
