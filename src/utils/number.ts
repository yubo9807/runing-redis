/**
 * 数字生成器
 * @call const iter = createNum(); iter.next();
 */
export function *createNum() {
  let n = 0
  while (true) {
    yield n;
    n++;
  }
}