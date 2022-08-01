import AddArticleQuery from '../../application/Article/Queries/AddArticleQuery';
import DeleteArticleQuery from '../../application/Article/Queries/DeleteArticleQuery';
import GetAllArticlesQuery from '../../application/Article/Queries/GetAllArticlesQuery';
import GetArticleByIdQuery from '../../application/Article/Queries/GetArticleByIdQuery';
import UpdateArticleQuery from '../../application/Article/Queries/UpdateArticleQuery';
import Article from '../../domain/Article/Article';
import ArticleRepositoryInterface from '../../domain/Article/ArticleRepositoryInterface';
import { DatabaseInterface } from '../Database';
import { ResultSet } from '../Database/Types';

class ArticleRepository implements ArticleRepositoryInterface {
  constructor(private readonly db: DatabaseInterface) {}

  public async all(): Promise<Article[]> {
    const results = (await this.db.execute(new GetAllArticlesQuery())).resultSet;

    return results.map((result: ResultSet): Article => Article.fromResultSet(result));
  }

  public async getById(id: number): Promise<Article | null> {
    const result = (await this.db.execute(new GetArticleByIdQuery(id))).resultSet;

    if (result.length !== 1) {
      return null;
    }

    return Article.fromResultSet(result[0]);
  }

  public async save(article: Article): Promise<number> {
    const query = (await this.isArticleExists(article.id))
      ? new UpdateArticleQuery(article)
      : new AddArticleQuery(article);

    const result = (await this.db.execute(query)).header;

    return result.insertId || article.id;
  }

  public async delete(id: number): Promise<boolean> {
    const resultSetHeader = (await this.db.execute(new DeleteArticleQuery(id))).header;

    return resultSetHeader.affectedRows === 1;
  }

  private async isArticleExists(id: number): Promise<boolean> {
    const article = await this.getById(id);

    return article !== null;
  }
}

export default ArticleRepository;
