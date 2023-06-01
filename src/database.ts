import * as sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import {Product} from './product'

async function openDB(): Promise<any> {
  return open({
    filename: './database.db',
    driver: sqlite3.cached.Database,
  })
}

async function initDB(): Promise<void> {
  const db = await openDB()
  await db.exec(`CREATE TABLE IF NOT EXISTS products(
                    id NUMBER PRIMARY KEY,
                    code TEXT,
                    contents TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`)
}

async function get(code: string): Promise<Product | null> {
  const db = await openDB()
  initDB()
  const result = await db.get('SELECT id, code, contents FROM products WHERE code = ?', [code])
  return JSON.parse(result.contents) as Product
}

async function exists(code: string): Promise<boolean> {
  const db = await openDB()
  initDB()
  const result = await db.run('EXISTS(SELECT id FROM products WHERE code = $code)', {
    $code: code,
  })
  console.log(result)
  return result !== null
}

async function insert(p: Product): Promise<number | undefined> {
  const db = await openDB()
  initDB()
  const indb = await get(p.code)
  if (indb !== null) return undefined
  const result = await db.run('INSERT INTO products VALUES($code, $contents)', {
    $id: p.code,
    $contents: JSON.stringify(p),
  })
  console.log(result)
  return result.lastID
}

const db = {openDB, initDB, get, insert, exists}

export default db
