## runing-redis

- 运行中的 redis，程序终止数据也就没了

## use

```js
const Redis = require('runing-redis');

const r = new Redis(50000);  // 限制大小（字节）

(async () => {
  const d = await r.deposit('a', 11111, 3000);
  console.log('d :>> ', d);  //--> { cache: false, data: 11111 }

  setTimeout(async() => {
    const d = await r.deposit('a', 22222, 1000);
    console.log('d :>> ', d);  //--> { cache: true, data: 11111 }
  }, 2000)
})()
```

- 支持异步存储

```js
r.deposit('a', async() => await promise, 3000);
```

### koa 中使用

- 封装下 runing-redis
```js
const Redis = require('runing-redis');

export default {
  /**
   * 储存数据，如果已经存在并且没有过期你会直接获取到该数据
   * @param {string} ctx
   * @param {*} value 是一个函数时(必须返回数据)：可以进行数据请求，有缓存时并不会执行；其他类型：直接将数据存放进去
   * @param {date} overTime 过期时间，为 -1 时数据不过期。设置更小的数无意义
   * @param {boolean} cover 强制覆盖数据
   * @param {boolean} cache 想知道有获取的数据有没有缓存
   * @returns 返回设置的 value
   */
  async deposit(ctx, value?: Value, overTime: OverTime = -1, cover: Cover = false, cache = false) {
    let res = null;
    if (['string', 'symbol'].includes(typeof ctx)) {
      res = await redis.deposit(ctx, value, overTime, cover)
    } else {
      res = await redis.deposit(ctx.request.url, value, overTime, cover)
      ctx.state.redis_cache = res.cache;
    }
    if (cache) return res;
    else return res.data;
  },

  // 清除数据（过期的，早以前的）
  clearCache: redis.clearCache,

  // 删除过期的数据
  deleteFristValue: redis.deleteFristValue,

  // 删除最早缓存的数据
  deleteOverValue: redis.deleteOverValue,
}
```

```js
user.get('/label', async(ctx, next) => {

	const data = await redis.deposit(ctx, async () => {
		return await sql_getUserList();  // runing-redis 中有缓存数据就不会运行
	}, 100000)

	ctx.body = data;
	next();
})