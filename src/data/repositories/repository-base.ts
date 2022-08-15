
export interface IModel {
    id: number;
}


export interface IRepositoryBase<TModel extends IModel> {

    getAll(): Promise<TModel[]>;
    getById(id: number): Promise<TModel>;
    create(newModel: Omit<TModel, 'id'>): Promise<TModel>;
    update(modelToUpdate: Pick<TModel, 'id'> & Partial<Omit<TModel, 'id'>>): Promise<TModel>;
    delete(id: number): Promise<void>;
}