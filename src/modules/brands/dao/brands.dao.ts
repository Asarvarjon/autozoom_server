import { ICreateBrand } from '../interface/brands.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { v4 as uuidv4 } from 'uuid';

export default class BrandsDao {
    async create(data: ICreateBrand) {
        return getFirst(
            await KnexService('brands')
                .insert({
                    id: uuidv4(),
                    ...data
                })
                .returning('*')
        );
    }

    async update(brandId: string, values: ICreateBrand) {
        return getFirst(
            await KnexService('brands')
                .where({ id: brandId })
                .update({
                    ...values
                })
                .returning('*')
        );
    }

    async getAll(keyword: string = '', filters: any, sorts: any) {
        const { limit, offset, order, orderBy } = sorts;
        return await KnexService('brands')
            .select('*')
            .where(filters) 
    }

    async getById(brandId: string) {
        return getFirst(
            await KnexService('brands')
                .where({ id: brandId })
        );
    }

    async deleteById(id: string) {
        return await KnexService('brands')
            .where({
                id: id
            })
            .delete();
    }
}
