import fs from 'fs';

import ConfigurationInterface from './ConfigurationInterface';
import { ConfigItem, Configs } from './Types';

class Configuration implements ConfigurationInterface {
  private readonly DEV_ENVIRONMENT = 'development';
  private readonly _configs: Configs = {};

  constructor() {
    const environment = process.env.ENVIRONMENT || this.DEV_ENVIRONMENT;

    const configFile = `etc/config.${environment}.json`;
    const config = fs.existsSync(configFile) ? fs.readFileSync(configFile, 'utf8') : '{}';

    this._configs = {
      ...JSON.parse(config),
      environment,
      is_development: environment === this.DEV_ENVIRONMENT
    };
  }

  public get(key: string, defaultValue: ConfigItem = ''): ConfigItem {
    return this.findValueForPath(key.split('.')) || defaultValue;
  }

  public set(key: string, value: ConfigItem): void {
    this._configs[key] = value;
  }

  public get configs(): Configs {
    return this._configs;
  }

  private findValueForPath(paths: Array<string>): ConfigItem {
    if (paths.length <= 1) {
      return this.configs[paths[0]];
    }

    const key = String(paths.pop());
    const parent = this.findValueForPath(paths) as Configs;

    return parent && parent[key];
  }
}

export default Configuration;
