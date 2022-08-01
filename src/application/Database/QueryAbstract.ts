import QueryInterface from './QueryInterface';

abstract class QueryAbstract implements QueryInterface {
  public abstract params(): { [p: string]: string | number };
  public abstract query(): string;
}

export default QueryAbstract;
