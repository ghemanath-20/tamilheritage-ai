import { lowdb } from 'lowdb';

export type DbData = {
  books: any[];
  audit: any[];
  places: any[];
};

export const createDb = async () => {
  const db = new lowdb<DbData>({
    books: [],
    audit: [],
    places: [],
  }, 'db.json');

  await db.read();
  db.data = db.data || { books: [], audit: [], places: [] };
  await db.write();

  return db;
};
