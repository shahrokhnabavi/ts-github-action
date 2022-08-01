import Article from './Article';

interface ArticleRepositoryInterface {
  all(): Promise<Article[]>;
  getById(id: number): Promise<Article | null>;
  save(article: Article): Promise<number>;
  delete(id: number): Promise<boolean>;
}

export default ArticleRepositoryInterface;
