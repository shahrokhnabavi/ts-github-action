import { app, container } from './infrastructure/App';
import ArticlesController from './infrastructure/Articles';

app.addRoutes(container.get<ArticlesController>('articlesController'));

app.run();
