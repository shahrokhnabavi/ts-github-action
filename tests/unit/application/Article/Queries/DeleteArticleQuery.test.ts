import DeleteArticleQuery from '../../../../../src/application/Article/Queries/DeleteArticleQuery';

describe('DeleteArticleQuery', () => {
  const ID = 1;

  test('should get sql query', () => {
    const objQuery = new DeleteArticleQuery(ID);

    expect(objQuery.query()).toBe('DELETE FROM `articles` WHERE `id` = :id');
  });

  test('should get query params', () => {
    const objQuery = new DeleteArticleQuery(ID);

    expect(objQuery.params()).toEqual({
      id: ID
    });
  });
});
