export interface PaginateResult<T>{
  data: T[]
  meta: {
    total: number,
    lastPage: number,
    currentPage: number,
    perPage: number,
    prev: number | null,
    next: number | null
  }
}

export type PaginateOptions = {page?: number | string, perPage?: number | string}
export type PaginateFunction = <T, K>(model: any,page: number, args?: K, options?: PaginateOptions,include?: any,) => Promise<PaginateResult<T>>

export const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
  return async (model,page, args: any = { where: undefined }, include: any, options) => {
    const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
    const skip = page > 0 ? perPage * (page -1) : 0;
    const [total,data] = await Promise.all([
      model.count({
        where: args.where
      }),
      model.findMany({
       ...args,
        take: perPage,
        skip,
      },
      {
        include: include
      })
    ]);
    
    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      }
    }
  }
}