import { type PiniaPluginContext } from 'pinia'
import { openDB } from 'idb'

const DB_NAME = 'ecommerce-db'
const DB_VERSION = 2

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store')
      }
    },
  })
}

export function piniaIndexedDBPlugin({ store }: PiniaPluginContext) {
  const storedState = localStorage.getItem(store.$id)
  if (storedState) {
    store.$patch(JSON.parse(storedState))
  }

  // We will use a hybrid approach: 
  // 1. Load initial state from localStorage for speed (optional, or just rely on IDB)
  // 2. Sync with IDB for larger data
  
  // Actually, for this requirement, let's try to load from IDB on init
  // But Pinia init is synchronous. We might need an async init action in stores.
  
  store.$subscribe(async (mutation, state) => {
    const db = await initDB()
    await db.put('store', JSON.parse(JSON.stringify(state)), store.$id)
  })
  
  // Hydrate from IDB
  initDB().then(async (db) => {
    const data = await db.get('store', store.$id)
    if (data) {
      store.$patch(data)
    }
  })
}
