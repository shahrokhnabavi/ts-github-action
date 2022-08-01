import Article from '../../../domain/Article/Article';
import QueryAbstract from '../../Database/QueryAbstract';

class AddArticleQuery extends QueryAbstract {
  constructor(private readonly article: Article) {
    super();
  }

  public query(): string {
    return 'INSERT INTO `articles` (`title`, `name`) VALUES (:title, :name)';
  }

  public params(): { [key: string]: string | number } {
    return {
      title: this.article.title,
      name: this.article.name
    };
  }
}

export default AddArticleQuery;
