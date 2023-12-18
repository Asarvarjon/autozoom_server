import { ICreateModel } from '../interface/models.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';

export default class ModelsDao {
    async create(data: ICreateModel) {
        return getFirst(
            await KnexService('models')
                .insert(data)
                .returning('*')
        );
    }

    async update(modelId: string, values: ICreateModel) {
        return getFirst(
            await KnexService('models')
                .where({ id: modelId })
                .update({
                    ...values
                })
                .returning('*')
        );
    }

    async getAll(keyword: string = '', filters: any, sorts: any) {
        console.log(filters);
        const { limit, offset, order, orderBy } = sorts;
        return await KnexService('models')
            .select([
                'models.*',
                "brands.id as brand.id",
                "brands.title as brand_title",
            ])
            .leftJoin('brands', 'models.brand_id', 'brands.id') 
            .groupBy('models.id','brands.id')
            .where(filters)
            
            .orderBy(orderBy, order) 
    }

    async getById(modelId: string) {
        return getFirst(
            await KnexService('models')
                .select([
                    'models.*',
                    "brands.id as brand.id",
                    "brands.title as brand_title",
                ])
                .leftJoin('brands', 'models.brand_id', 'brands.id') 
                .groupBy('models.id','brands.id')
                .where({ 'models.id': modelId })
        );
    }

    async deleteById(id: string) {
        return await KnexService('models')
            .where({
                id: id
            })
            .delete();
    }
}
