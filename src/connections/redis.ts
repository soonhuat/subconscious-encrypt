import { createClient, RedisClientType } from 'redis'

export let redisClient: RedisClientType = null

export function connectRedis() {
  redisClient = createClient(process.env.REDIS_URL)
  redisClient.on('error', function (err) {
    console.log('could not establish a connection with redis. ' + err)
  })
  redisClient.on('connect', function (err) {
    console.log('connected to redis successfully')
  })
}
