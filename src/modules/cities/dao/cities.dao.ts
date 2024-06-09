import { ICreateCity } from '../interface/cities.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { v4 as uuidv4 } from 'uuid';

export default class CitysDao {
    async create(data: ICreateCity) {
        return getFirst(
            await KnexService('cities')
                .insert({
                    id: uuidv4(),
                    ...data
                })
                .returning('*')
        );
    }

    async update(modelId: string, values: ICreateCity) {
        return getFirst(
            await KnexService('cities')
                .where({ id: modelId })
                .update({
                    ...values
                })
                .returning('*')
        );
    }

    async getAll(keyword: string = '', filters: any, sorts: any) {
        const { limit, offset, order, orderBy } = sorts;
        return await KnexService('cities')
            .select('*')
            .where(filters) 
    }

    async getById(modelId: string) {
        return getFirst(
            await KnexService('cities')
                .where({ id: modelId })
        );
    }

    async deleteById(id: string) {
        return await KnexService('cities')
            .where({
                id: id
            })
            .delete();
    }
}
