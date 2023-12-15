import { ICreateLocation } from '../interface/locations.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';

export default class LocationsDao {
    async create(data: ICreateLocation) {
        return getFirst(
            await KnexService('locations')
                .insert(data)
                .returning('*')
        );
    }

    async update(modelId: string, values: ICreateLocation) {
        return getFirst(
            await KnexService('locations')
                .where({ id: modelId })
                .update({
                    ...values
                })
                .returning('*')
        );
    }

    async getAll(keyword: string = '', filters: any, sorts: any) {
        const { limit, offset, order, orderBy } = sorts;
        return await KnexService('locations')
            .select('*')
            .where(filters)
            .orderBy(orderBy, order) 
    }

    async getById(modelId: string) {
        return getFirst(
            await KnexService('locations')
                .where({ id: modelId })
        );
    }

    async deleteById(id: string) {
        return await KnexService('locations')
            .where({
                id: id
            })
            .delete();
    }
}
