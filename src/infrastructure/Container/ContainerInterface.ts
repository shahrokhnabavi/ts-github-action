import { GenericClass, ResolverOption } from './Types';

export default interface ContainerInterface {
  add<T = Record<string, unknown>>(
    name: string,
    type: GenericClass<T>,
    opt: ResolverOption
  ): ContainerInterface;
  get<T>(name: string): T;
}
