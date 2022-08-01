import Article from '../../domain/Article/Article';
import ArticleRepositoryInterface from '../../domain/Article/ArticleRepositoryInterface';
import {
  ControllerInterface,
  HttpRequest,
  HttpResponse,
  RequestMethods,
  Route
} from '../Http';
import { LoggerInterface } from '../Logger';

class ArticlesController implements ControllerInterface {
  public readonly routes: Array<Route> = [
    new Route(RequestMethods.GET, '/just-test', 'simple'),
    new Route(RequestMethods.GET, '/articles', 'list'),
    new Route(RequestMethods.GET, '/article/:id', 'get'),
    new Route(RequestMethods.DELETE, '/article/:id', 'delete'),
    new Route(RequestMethods.POST, '/article', 'save'),
    new Route(RequestMethods.PUT, '/article/:id', 'save')
  ];

  constructor(
    private readonly logger: LoggerInterface,
    private readonly articleRepository: ArticleRepositoryInterface
  ) {}

  public async get(request: HttpRequest): Promise<HttpResponse> {
    const article = await this.articleRepository.getById(Number(request.params.id));

    if (article === null) {
      return HttpResponse.notFound();
    }

    return HttpResponse.json(JSON.stringify(article));
  }

  public simple(request: HttpRequest): HttpResponse {
    this.logger.warn(`Controller is fired: ${request.method}`);

    return HttpResponse.html('Hi there this is control: Article LIST');
  }

  public async list(request: HttpRequest): Promise<HttpResponse> {
    this.logger.warn(`Controller is fired: ${request.ip}`);

    const articles = await this.articleRepository.all();

    return HttpResponse.json(JSON.stringify(articles));
  }

  public async save(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;
    // TODO: JSON SCHEMA VALIDATOR

    if (request.params.id) {
      body.id = request.params.id;
    }

    const article = Article.fromRequest(body);
    const id = await this.articleRepository.save(article);

    return HttpResponse.json(JSON.stringify({ id }));
  }

  public async delete(request: HttpRequest): Promise<HttpResponse> {
    const isSucceed = await this.articleRepository.delete(Number(request.params.id));

    if (!isSucceed) {
      return HttpResponse.notFound();
    }

    return HttpResponse.noContent();
  }
}

export default ArticlesController;
