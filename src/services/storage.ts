import { Storage, Drivers } from '@ionic/storage';

let storage: Storage;

/**
 * Pass any name to the createStore function to name your DB
 * @param name  of the database storage __IonicStorage_`name`
 * @returns
 */
export const createStore = async (suffixName = 'unnamed'): Promise<Storage> => {
  storage = new Storage({
    name: `__IonicStorage_${suffixName}`,
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
  });
  return await storage.create();
};

export const set = async (key: string, val: any): Promise<any> => await storage.set(key, val);

export const get = async (key: string): Promise<any> => await storage.get(key);

export const remove = async (key: string): Promise<any> => await storage.remove(key);

export const clear = async (): Promise<void> => await storage.clear();

export const setObject = async (key: string, id: string, val: any): Promise<any> => {
  const all = await storage.get(key);
  const objIndex = await all.findIndex((a: { id: string }) => parseInt(a.id) === parseInt(id));

  all[objIndex] = JSON.stringify(val);
  return set(key, all);
};

export const removeObject = async (key: string, id: string): Promise<any> => {
  const all = await storage.get(key);
  const objIndex = await all.findIndex((a: { id: string }) => parseInt(a.id) === parseInt(id));

  all.splice(objIndex, 1);
  return set(key, all);
};

export const getObject = async (key: string, id: string): Promise<any> => {
  const all = await storage.get(key);
  const obj = await all.filter((a: { id: string }) => parseInt(a.id) === parseInt(id))[0];
  return obj;
};
