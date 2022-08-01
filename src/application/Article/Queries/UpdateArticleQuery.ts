import Article from '../../../domain/Article/Article';
import QueryAbstract from '../../Database/QueryAbstract';

class UpdateArticleQuery extends QueryAbstract {
  constructor(private readonly article: Article) {
    super();
  }

  public query(): string {
    return 'UPDATE `articles` SET `title` = :title, `name` = :name, updated_at = :updated_at WHERE `id` = :id';
  }

  public params(): { [key: string]: string | number } {
    return {
      id: this.article.id,
      title: this.article.title,
      name: this.article.name,
      updated_at: this.article.updatedAt
    };
  }
}

export default UpdateArticleQuery;
