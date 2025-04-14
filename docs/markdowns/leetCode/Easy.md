
## 数组查找两数之和的下标 <Badge type="tip" text="2025.4.12" />



```ts
function twoSum(nums: number[], target: number): number[] {
    // 使用哈希表存储数组元素和索引
    let map = new Map<number, number>();
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 计算当前元素需要的补数
        let complement = target - nums[i];
        // 如果补数在哈希表中，返回当前索引和补数的索引
        if (map.has(complement)) {
          // 补数的索引在哈希表中
          return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }
    return []
};
```

## 回文数 <Badge type="tip" text="2025.4.14" />

题目是给出整数x，判断x是否是回文数。

第一反应是用字符串来做，直接反转字符串比较

```ts
function isPalindrome(x: number): boolean {
  if (x >= 0 && x < 10) return true;
  let xArr = x.toString().split("");
  let xArrReverse = xArr.reverse();
  let xArrReverseJoin = xArrReverse.join("");
  if (xArrReverseJoin === x.toString()) {
    return true;
  }
  return false;
}
```

:::danger 思路优化

转为字符串的空间、时间复杂度都不太好， 那么就进一步考虑下优化。

可以考虑数字的特性：

- 边界排除所有负数、个位数为0的数
- 反转后半部分的数字就可以判断
- 反转数字的方式：
  1. 数字最后一位通过`%10`去除
  2. 数字除以10，向上取整去掉最后一位，然后继续`%10`取第二位，以此循环
- 是否翻转过半了?
  1. 偶数情况下： 由于原数字一直在不断被截取最后一位，当新数字等于原数字时，说明已经翻转过半了
  2. 奇数情况下： 由于原数字一直在不断被截取最后一位，当新数字大于原数字时，说明已经翻转过半了

:::

```ts
function isPalindrome(x: number): boolean {
  // 边界情况处理
  if(x < 0 || (x % 10 === 0 && x !== 0)) return false;
  // 翻转的结果数字
  let reverseNumber: number = 0
  while(x > reverseNumber) {
    // 取余数得到最后一位数字
    reverseNumber = reverseNumber * 10 + x % 10;
    // 除以10去掉最后一位数字
    x = Math.floor(x / 10);
  }
  // 奇数情况下给去掉中间的数字
  return x == reverseNumber || x == Math.floor(reverseNumber / 10);
}
```

## 罗马数字转整数 <Badge type="tip" text="2025.4.15" />

罗马数字字符和对应数字如下：

| 字符 | 数字 |
| :--: | :--: |
|  I   |  1   |
|  V   |  5   |
|  X   |  10  |
|  L   |  50  |
|  C   |  100 |
|  D   |  500 |
|  M   |  1000|

另外还有一种情况： 如4不是`IIII`, 而是`IV`， 9不是`VIIII`, 而是`IX`。

I放在V和X的前面，表示1减去5和10。
X放在L和C的前面，表示10减去50和100。
C放在D和M的前面，表示100减去500和1000。

```ts

```