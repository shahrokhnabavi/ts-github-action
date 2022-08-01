import { Pool } from 'mysql2/promise';

import QueryInterface from '../../application/Database/QueryInterface';
import { ConfigurationInterface } from '../Configuration';
import { LoggerInterface } from '../Logger';
import DatabaseInterface from './DatabaseInterface';
import DbConnection from './DbConnection';
import QueryResultSet from './QueryResultSet';
import { ResultSet, ResultSetHeader } from './Types';

class Database implements DatabaseInterface {
  private readonly pool: Pool;

  constructor(config: ConfigurationInterface, private readonly logger: LoggerInterface) {
    this.pool = new DbConnection(config).getPool();
  }

  public async query(
    query: string,
    parameters: Array<string | number> = []
  ): Promise<ResultSet[]> {
    try {
      const [result] = await this.pool.execute(query, parameters);

      return <ResultSet[]>result;
    } catch (error) {
      this.logger.error((<Error>error).message);
    }

    return [];
  }

  public async close(): Promise<void> {
    try {
      await this.pool?.end();
      this.logger.debug('close db connect.');
    } catch (error) {
      this.logger.error('Unable to close db connect.');
    }
  }

  public async execute(query: QueryInterface): Promise<QueryResultSet> {
    const result = await this.pool.execute(query.query().toLowerCase(), query.params());

    if (!Array.isArray(result)) {
      throw new Error('Execution of query failed.');
    }

    if (result[0].constructor.name === 'ResultSetHeader') {
      return QueryResultSet.withHeader(<ResultSetHeader>result[0]);
    }

    return QueryResultSet.withResultSet(<ResultSet[]>result[0]);
  }
}

export default Database;
