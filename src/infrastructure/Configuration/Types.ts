export type ConfigItem = boolean | string | number | Configs | Array<Configs>;

export type Configs = {
  [key: string]: ConfigItem;
};
