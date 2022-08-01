import { ResultSet, ResultSetHeader } from './Types';

class QueryResultSet {
  private _resultSet: ResultSet[] = [];
  private _header: ResultSetHeader = {
    insertId: 0,
    affectedRows: 0
  };

  public static withResultSet(resultSet: ResultSet[]): QueryResultSet {
    const queryResultSet = new QueryResultSet();

    queryResultSet._resultSet = resultSet;

    return queryResultSet;
  }

  public static withHeader(header: ResultSetHeader): QueryResultSet {
    const queryResultSet = new QueryResultSet();

    queryResultSet._header = header;

    return queryResultSet;
  }

  public get header(): ResultSetHeader {
    return this._header;
  }

  public get resultSet(): ResultSet[] {
    return this._resultSet;
  }
}

export default QueryResultSet;
