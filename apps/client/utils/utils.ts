export function numberToChinese(n: number) {
  const units = ["", "十", "百", "千"];
  const chars = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let num = n;
  if (num === 0) return chars[0];
  let str = "";
  let zeroFlag = false;

  for (let i = 0; num > 0; i++) {
    const digit = num % 10;
    num = Math.floor(num / 10);

    if (digit === 0) {
      if (!zeroFlag) {
        str = chars[digit] + str;
        zeroFlag = true;
      }
    } else {
      str = chars[digit] + units[i] + str;
      zeroFlag = false;
    }
  }
  // 10-19进行处理
  if (n >= 10 && n < 20) {
    str = str.slice(1);
  }
  // 去除末尾的零
  if (str.endsWith(chars[0])) {
    str = str.slice(0, -1);
  }
  return str;
}
