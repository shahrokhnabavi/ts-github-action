import { ConfigItem } from './Types';

export default interface ConfigurationInterface {
  get(key: string, defaultValue?: ConfigItem): ConfigItem;
  set(key: string, value: ConfigItem): void;
}
