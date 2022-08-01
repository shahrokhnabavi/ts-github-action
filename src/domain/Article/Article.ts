import { ResultSet } from '../../infrastructure/Database/Types';
import { ParsedBody } from '../../infrastructure/Http/HttpType';

class Article {
  private _id = 0;
  private _title = '';
  private _name = '';
  private _createdAt = '';
  private _updatedAt = '';

  public toJSON(): { [Key: string]: string | number } {
    return {
      id: this._id,
      title: this._title,
      name: this._name,
      created_at: this._createdAt,
      updated_at: this._updatedAt
    };
  }

  public static fromRequest(body: ParsedBody): Article {
    const article = new Article();

    article._id = Number(body.id || 0);
    article._title = String(body.title || '');
    article._name = String(body.name || '');
    article.setDateTime(String(body.created_at || ''), String(body.updated_at || ''));

    return article;
  }

  public static fromResultSet(item: ResultSet): Article {
    const article = new this();

    article._id = Number(item.id);
    article._title = String(item.title);
    article._name = String(item.name || '');
    article.setDateTime(String(item.created_at || ''), String(item.updated_at || ''));

    return article;
  }

  private setDateTime(createdAt: string, updatedAt: string): void {
    const createDate = new Date(createdAt === '' ? Date.now() : createdAt);
    const updateDate = new Date(updatedAt === '' ? Date.now() : updatedAt);

    this._createdAt = this.toIsoStringInLocalTime(createDate);
    this._updatedAt = this.toIsoStringInLocalTime(updateDate);
  }

  private toIsoStringInLocalTime(date: Date): string {
    return new Date(date.getTime() + -date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get name(): string {
    return this._name;
  }

  public get createdAt(): string {
    return this._createdAt;
  }

  public get updatedAt(): string {
    return this._updatedAt;
  }
}

export default Article;
