import UpdateArticleQuery from '../../../../../src/application/Article/Queries/UpdateArticleQuery';
import Article from '../../../../../src/domain/Article/Article';

describe('UpdateArticleQuery', () => {
  test('should get sql query', () => {
    const article = new Article();
    const objQuery = new UpdateArticleQuery(article);

    expect(objQuery.query()).toBe('UPDATE `articles` SET `title` = :title, `name` = :name, updated_at = :updated_at WHERE `id` = :id');
  });

  test('should get query params', () => {
    const article = Article.fromResultSet({
      id: 1,
      name: 'Test Runner',
      title: 'Best article ever'
    });
    const objQuery = new UpdateArticleQuery(article);

    expect(objQuery.params()).toEqual({
      id: article.id,
      name: article.name,
      title: article.title,
      updated_at: article.updatedAt
    });
  });
});
