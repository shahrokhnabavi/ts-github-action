import QueryAbstract from '../../Database/QueryAbstract';

class DeleteArticleQuery extends QueryAbstract {
  constructor(private readonly id: number) {
    super();
  }

  public query(): string {
    return 'DELETE FROM `articles` WHERE `id` = :id';
  }

  public params(): { [key: string]: string | number } {
    return {
      id: this.id
    };
  }
}

export default DeleteArticleQuery;
