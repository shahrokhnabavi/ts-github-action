import {
  asClass,
  AwilixContainer,
  BuildResolverOptions,
  createContainer,
  InjectionMode
} from 'awilix';

import ArticlesServiceProvider from '../Articles/ArticlesServiceProvider';
import { Configuration } from '../Configuration';
import { Database } from '../Database';
import { ErrorHandler } from '../ErrorHandler';
import { Logger } from '../Logger';
import ContainerInterface from './ContainerInterface';
import { GenericClass, ResolverOption } from './Types';

class Container implements ContainerInterface {
  private di: AwilixContainer;

  constructor() {
    this.di = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this.registerServices();
  }

  public add<T>(
    name: string,
    type: GenericClass<T>,
    opt?: ResolverOption
  ): ContainerInterface {
    this.di.register({
      [name]: asClass(type, <BuildResolverOptions<T>>opt)
    });

    return this;
  }

  public get<T>(name: string): T {
    return this.di.resolve(name);
  }

  private registerServices(): void {
    this.add('config', Configuration, { lifetime: 'SINGLETON' });
    this.add('logger', Logger, { lifetime: 'SINGLETON' });
    this.add('errorHandler', ErrorHandler, { lifetime: 'SINGLETON' });
    this.add('db', Database, { lifetime: 'SINGLETON' });
    ArticlesServiceProvider.provide(this);
  }
}

export default Container;
