interface QueryInterface {
  query(): string;
  params(): { [key: string]: string | number };
}

export default QueryInterface;
