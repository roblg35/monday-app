import db from '../database';

interface Fragrance {
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

class FragranceService {
  static async getAllFragrances(): Promise<Fragrance[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM fragrances', (err, rows:Fragrance[]) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static async getFragranceById(id: string): Promise<Fragrance | undefined> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM fragrances WHERE id = ?', [id], (err, row:Fragrance) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  static async addFragrance(fragrance: Fragrance): Promise<Fragrance> {
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`INSERT INTO fragrances (id, name, description, category, created_at, updated_at, image_url)
                               VALUES (?, ?, ?, ?, ?, ?, ?)`);
      stmt.run(fragrance.id, fragrance.name, fragrance.description, fragrance.category, created_at, updated_at, fragrance.image_url, function(err) {
        if (err) {
          reject(err);
        }
        resolve({ ...fragrance, created_at, updated_at });
      });
      stmt.finalize();
    });
  }

  static async updateFragrance(fragrance: Partial<Fragrance>): Promise<Fragrance | undefined> {
    const updated_at = new Date().toISOString();
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`UPDATE fragrances SET
                                name = COALESCE(?, name),
                                description = COALESCE(?, description),
                                category = COALESCE(?, category),
                                updated_at = ?,
                                image_url = COALESCE(?, image_url)
                                WHERE id = ?`);
      stmt.run(fragrance.name, fragrance.description, fragrance.category, updated_at, fragrance.image_url, fragrance.id, function(err) {
        if (err) {
          reject(err);
        }
        if (this.changes === 0) {
          reject(new Error('Fragrance not found'));
        }
        resolve({ ...fragrance, updated_at } as Fragrance);
      });
      stmt.finalize();
    });
  }

  static async deleteFragrance(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`DELETE FROM fragrances WHERE id = ?`);
      stmt.run(id, function(err) {
        if (err) {
          reject(err);
        }
        if (this.changes === 0) {
          reject(new Error('Fragrance not found'));
        }
        resolve(id);
      });
      stmt.finalize();
    });
  }
}

export default FragranceService;
