import { storageManager } from 'utils/storageUtils';

export const authStorage = storageManager.createOrFetchStorage('authentication');

export const cacheAuth = token => authStorage.set(token);

export const clearCacheAuth = () => authStorage.remove();
