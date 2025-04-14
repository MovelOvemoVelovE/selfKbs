:::tip

世界上只有两种脑子，一种是刷过算法的，一种是没刷过算法的。

刷过算法的脑子多少有点..小可爱

:::

## 数组查找两数之和的下标 <Badge type="tip" text="2025.04.12" />

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
  return [];
}
```

## 回文数 <Badge type="tip" text="2025.04.14" />

题目是给出整数 x，判断 x 是否是回文数。

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

- 边界排除所有负数、个位数为 0 的数
- 反转后半部分的数字就可以判断
- 反转数字的方式：
  1. 数字最后一位通过`%10`去除
  2. 数字除以 10，向上取整去掉最后一位，然后继续`%10`取第二位，以此循环
- 是否翻转过半了?
  1. 偶数情况下： 由于原数字一直在不断被截取最后一位，当新数字等于原数字时，说明已经翻转过半了
  2. 奇数情况下： 由于原数字一直在不断被截取最后一位，当新数字大于原数字时，说明已经翻转过半了

:::

```ts
function isPalindrome(x: number): boolean {
  // 边界情况处理
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  // 翻转的结果数字
  let reverseNumber: number = 0;
  while (x > reverseNumber) {
    // 取余数得到最后一位数字
    reverseNumber = reverseNumber * 10 + (x % 10);
    // 除以10去掉最后一位数字
    x = Math.floor(x / 10);
  }
  // 奇数情况下给去掉中间的数字
  return x == reverseNumber || x == Math.floor(reverseNumber / 10);
}
```

## 罗马数字转整数 <Badge type="tip" text="2025.04.14" />

罗马数字字符和对应数字如下：

| 字符 | 数字 |
| :--: | :--: |
|  I   |  1   |
|  V   |  5   |
|  X   |  10  |
|  L   |  50  |
|  C   | 100  |
|  D   | 500  |
|  M   | 1000 |

另外还有一种情况： 如 4 不是`IIII`, 而是`IV`， 9 不是`VIIII`, 而是`IX`。

I 放在 V 和 X 的前面，表示 1 减去 5 和 10。
X 放在 L 和 C 的前面，表示 10 减去 50 和 100。
C 放在 D 和 M 的前面，表示 100 减去 500 和 1000。

```ts
function romanToInt(s: string): number {
  let result: number = 0;
  // 枚举对象，存储罗马数字和对应的整数值
  let emum = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  while (s.length) {
    // 取出前两个字符
    let first = s[0];
    let second = s[1];
    // 如果第二个字符存在，并且第一个字符对应的值小于第二个字符对应的值
    // 说明是存在 IX = 9 这种情况
    if (second && emum[first] < emum[second]) {
      // 题目说明了不会存在 IL这种不合法的情况。不用判断
      result += emum[second] - emum[first];
      s = s.slice(2);
    } else {
      result += emum[first];
      s = s.slice(1);
    }
  }
  return result;
}
```

## 最长公共前缀 <Badge type="tip" text="2025.04.14" />

给出一个字符串数组，找出其中最长的公共前缀。

```ts
function longestCommonPrefix(strs: string[]): string {
  let result: string[] = [];
  // 抽出第一个字符串
  let [firstStr, ...restStrs] = strs;
  // 循环第一个字符串
  for (let i = 0; i < firstStr.length; i++) {
    // 如果其余字符串的当前字符和第一个字符串的当前字符相同
    // 则将当前字符加入结果数组中
    if (restStrs.every((str) => str[i] === firstStr[i])) {
      result.push(firstStr[i]);
    }
  }
  return result.join("");
}
```
