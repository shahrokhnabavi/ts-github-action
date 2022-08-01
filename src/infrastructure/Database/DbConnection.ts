import mysql, { Pool } from 'mysql2/promise';

import { ConfigurationInterface } from '../Configuration';
import { DbType } from './Types';

class DbConnection {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;
  private readonly dbName: string;
  private readonly port: number;
  private readonly dialect: DbType;

  private readonly poolMax: number;
  private readonly poolIdleTime: number;
  private readonly poolObtainTime: number;

  constructor(config: ConfigurationInterface) {
    this.host = config.get('db.connection.host', 'localhost') as string;
    this.username = config.get('db.connection.username') as string;
    this.password = config.get('db.connection.password') as string;
    this.dbName = config.get('db.connection.db_name') as string;
    this.port = config.get('db.connection.port', 3360) as number;
    this.dialect = config.get('db.connection.dialect', 'mysql') as DbType;

    this.poolMax = config.get('db.connection.pool.max', 5) as number;
    this.poolIdleTime = config.get('db.connection.pool.idle', 3000) as number;
    this.poolObtainTime = config.get('db.connection.pool.obtain', 1000) as number;
  }

  public getPool(): Pool {
    return mysql.createPool({
      host: this.host,
      user: this.username,
      password: this.password,
      port: this.port,
      database: this.dbName,
      namedPlaceholders: true
    });
  }
}

export default DbConnection;
