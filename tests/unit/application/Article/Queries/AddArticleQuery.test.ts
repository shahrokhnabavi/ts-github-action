import AddArticleQuery from '../../../../../src/application/Article/Queries/AddArticleQuery';
import Article from '../../../../../src/domain/Article/Article';

describe('AddArticleQuery', () => {
  test('should get sql query', () => {
    const article = new Article();
    const objQuery = new AddArticleQuery(article);

    expect(objQuery.query()).toBe('INSERT INTO `articles` (`title`, `name`) VALUES (:title, :name)');
  });

  test('should get query params', () => {
    const article = Article.fromResultSet({
      id: 1,
      name: 'Test Runner',
      title: 'Best article ever'
    });
    const objQuery = new AddArticleQuery(article);

    expect(objQuery.params()).toEqual({
      name: article.name,
      title: article.title
    });
  });
});
