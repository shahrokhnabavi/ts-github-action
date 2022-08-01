export type DbType = 'mysql' | 'postgres' | 'mariadb';

export type ResultSet = {
  [key: string]: string | number;
};

export type ResultSetHeader = {
  insertId: number;
  affectedRows: number;
};
