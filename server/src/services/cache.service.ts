import NodeCache from 'node-cache'

class CacheService {
  private cache: NodeCache

  constructor({ stdTTL, checkperiod, ...otherOptions }: NodeCache.Options) {
    this.cache = new NodeCache({ stdTTL, checkperiod: checkperiod || stdTTL * 0.2, ...otherOptions })
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key)
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value)
  }

  flushAll(): void {
    this.cache.flushAll()
  }
}

export default CacheService
