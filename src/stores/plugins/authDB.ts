import { openDB, type IDBPDatabase } from 'idb'
import type { UserData } from '@/types/users'

const DB_NAME = 'ecommerce-db'
const DB_VERSION = 2 // Increment version to trigger upgrade
const USERS_STORE = 'users'

let dbPromise: Promise<IDBPDatabase> | null = null

const initDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Delete old store if it exists
        if (db.objectStoreNames.contains(USERS_STORE)) {
          db.deleteObjectStore(USERS_STORE)
        }
        // Create fresh store
        db.createObjectStore(USERS_STORE, { keyPath: 'email' })
        console.log('Database upgraded to version', newVersion)
      }
    })
  }
  return dbPromise
}

export const authDB = {
  async registerUser(email: string, password: string, name: string): Promise<boolean> {
    try {
      const db = await initDB()
      const existing = await db.get(USERS_STORE, email)

      console.log('Registration attempt for:', email, 'Existing user:', existing)

      if (existing) {
        console.warn('User already exists:', email)
        return false // User already exists
      }

      const userData: UserData = {
        email,
        password, // In production, this should be hashed!
        name,
        createdAt: Date.now()
      }

      await db.put(USERS_STORE, userData)
      console.log('User registered successfully:', email)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  },

  async loginUser(email: string, password: string): Promise<UserData | null> {
    try {
      const db = await initDB()
      const user = await db.get(USERS_STORE, email)

      console.log('Login attempt for:', email, 'Found user:', user)

      if (user && user.password === password) {
        console.log('Login successful for:', email)
        return user
      }

      if (user) {
        console.warn('Password mismatch for:', email)
      } else {
        console.warn('User not found:', email)
      }

      return null
    } catch (error) {
      console.error('Login error:', error)
      return null
    }
  },

  async getUserByEmail(email: string): Promise<UserData | null> {
    try {
      const db = await initDB()
      return await db.get(USERS_STORE, email)
    } catch (error) {
      console.error('Get user error:', error)
      return null
    }
  },

  async getAllUsers(): Promise<UserData[]> {
    try {
      const db = await initDB()
      return await db.getAll(USERS_STORE)
    } catch (error) {
      console.error('Get all users error:', error)
      return []
    }
  },

  async clearAllUsers(): Promise<boolean> {
    try {
      const db = await initDB()
      await db.clear(USERS_STORE)
      console.log('All users cleared from database')
      return true
    } catch (error) {
      console.error('Clear users error:', error)
      return false
    }
  }
}

// Debug helper - expose to window in development
if (import.meta.env.DEV) {
  (window as any).authDB = authDB
  console.log('🔧 Debug: authDB exposed to window. Use window.authDB.getAllUsers() to debug')
}
