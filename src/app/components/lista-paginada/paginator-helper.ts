export class PaginatorHelper {
  constructor(
    public size = 10,
    public page = 0,
    public sort = 'id,ASC',
    public totalElements = 0,
    public totalPages = 0,
  ) {
  }
}

export class ParamPageable {
  constructor(
    public size: number,
    public page: number,
    public sort: string
  ) {
  }
}

export const toQuery = (params: any, delimiter = '&') => {
  const keys = Object.keys(params);
  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;
    if (index < (keys.length - 1)) {
      query += delimiter;
    }
    return query;
  }, '');
}
