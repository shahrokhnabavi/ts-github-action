import ContainerInterface from '../Container/ContainerInterface';
import ArticleRepository from './ArticleRepository';
import ArticlesController from './ArticlesController';

class ArticlesServiceProvider {
  public static provide(container: ContainerInterface): void {
    container.add('articleRepository', ArticleRepository, { lifetime: 'SINGLETON' });
    container.add('articlesController', ArticlesController, { lifetime: 'SINGLETON' });
  }
}

export default ArticlesServiceProvider;
