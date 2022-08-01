import GetAllArticlesQuery from '../../../../../src/application/Article/Queries/GetAllArticlesQuery';

describe('GetAllArticlesQuery', () => {
  test('should get sql query', () => {
    const objQuery = new GetAllArticlesQuery();

    expect(objQuery.query()).toBe('SELECT `id`, `title`, `name`, created_at, updated_at FROM `articles`');
  });

  test('should get query params', () => {
    const objQuery = new GetAllArticlesQuery();

    expect(objQuery.params()).toEqual({});
  });
});
