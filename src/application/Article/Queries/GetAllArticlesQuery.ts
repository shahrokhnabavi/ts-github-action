import QueryAbstract from '../../Database/QueryAbstract';

class GetAllArticlesQuery extends QueryAbstract {
  public query(): string {
    return 'SELECT `id`, `title`, `name`, created_at, updated_at FROM `articles`';
  }

  public params(): { [key: string]: string | number } {
    return {};
  }
}

export default GetAllArticlesQuery;
