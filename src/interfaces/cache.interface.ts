export interface ICache {
  getKey(key: string): Promise<string>;
  setValue(key: string, value: any, ttl?: number): Promise<void>;
}
