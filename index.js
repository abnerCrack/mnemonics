// 输入对比
function areInputsEqual(newInputs, lastInputs) {
  // 长度改变
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  // 键值改变
  for (let i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  // 没有变化
  return true;
}
// 记忆函数
export default function (calcFunction, isEqual = areInputsEqual) {
  // 缓存的this
  let cachedThis;
  // 缓存的参数
  let cachedArgs = [];
  // 缓存的结果
  let cachedResult;
  // 缓存标志
  let cacheTag = false;
  return function () {
    // 转化arguments为数组
    const newArgs = Array.prototype.slice.call(arguments)
    // 已经缓存过，并且this没有变更，并且值没有发生变更
    if (cacheTag && cachedThis === this && isEqual(newArgs, cachedArgs)) {
      // 命中缓存
      return cachedResult;
    }
    // 第一次缓存或者发生了变更
    // 缓存结果
    cachedResult = calcFunction.apply(this, newArgs);
    // 设置缓存标志
    cacheTag = true;
    // 缓存this
    cachedThis = this;
    // 缓存参数
    cachedArgs = newArgs;
    // 返回结果
    return cachedResult;
  };
}
