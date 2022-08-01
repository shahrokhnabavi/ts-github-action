import GetArticleByIdQuery from '../../../../../src/application/Article/Queries/GetArticleByIdQuery';

describe('GetArticleByIdQuery', () => {
  const ID = 1;

  test('should get sql query', () => {
    const objQuery = new GetArticleByIdQuery(ID);

    expect(objQuery.query()).toBe('SELECT `id`, `title`, `name`, created_at, updated_at FROM `articles` WHERE `id` = :id');
  });

  test('should get query params', () => {
    const objQuery = new GetArticleByIdQuery(ID);

    expect(objQuery.params()).toEqual({id: ID});
  });
});
