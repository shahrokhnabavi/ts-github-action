import QueryAbstract from '../../Database/QueryAbstract';

class GetArticleByIdQuery extends QueryAbstract {
  constructor(private readonly id: number) {
    super();
  }

  public query(): string {
    return 'SELECT `id`, `title`, `name`, created_at, updated_at FROM `articles` WHERE `id` = :id';
  }

  public params(): { [key: string]: string | number } {
    return {
      id: this.id
    };
  }
}

export default GetArticleByIdQuery;
