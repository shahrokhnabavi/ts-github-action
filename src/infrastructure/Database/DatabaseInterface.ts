import QueryInterface from '../../application/Database/QueryInterface';
import QueryResultSet from './QueryResultSet';
import { ResultSet } from './Types';

interface DatabaseInterface {
  close(): Promise<void>;
  query(query: string, parameters?: Array<string | number>): Promise<ResultSet[]>;
  execute(query: QueryInterface): Promise<QueryResultSet>;
}

export default DatabaseInterface;
