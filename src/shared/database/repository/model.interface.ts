/* eslint-disable prettier/prettier */
import { FindOptions, Transaction, WhereOptions } from "sequelize";

export interface IModel<M> {
    create<T = unknown>(data: T, transaction: Transaction | null);

    bulkCreate<T = unknown>(data: T[], transaction: Transaction | null): Promise<M[]>;

    findAll<T = unknown>(filter?: WhereOptions<M>, includes?: FindOptions<T>): Promise<M[]>;

    findOne<T = unknown>(filter: WhereOptions<M>, includes?: FindOptions<T>): Promise<M>;

    findAllPaginated<T = unknown>(filter?: WhereOptions<M>, includes?: FindOptions<T>, pagination?: IPagination): Promise<IPaginatedData>;

    findById<T = unknown>(id: string | number, includes?: FindOptions<T>): Promise<M>;

    update<T = unknown>(filter: WhereOptions<M>, data: Partial<T>, transaction?: Transaction | null): Promise<M>;

    delete<T = unknown>(filter: WhereOptions<M>, transaction?: Transaction | null): Promise<M>;
}

export interface IPagination {
    page?: number;
    limit?: number;
}

export interface IPaginatedData {
    page: number;
    total: number;
    limit: number;
    data: unknown[];
}