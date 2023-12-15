import { ICreateCategory } from './../interface/categories.interface';
import { IDefaultQuery } from '../../shared/interface/query.interface'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 


export default class CategoriesDao { 
    async create(data: ICreateCategory) {
        return getFirst(
            await KnexService('categories')
            .insert(data)
            .returning('*')
        )
    }


    async update( categoryId: string, values: ICreateCategory) {
        return getFirst(
            await KnexService('categories')
            .where({id: categoryId})
            .update({
                ...values
            })
            .returning('*')
        )   
    }

    async getAll( keyword: string = '', filters, sorts) {
        const {limit, offset, order, orderBy} = sorts 
        return await KnexService('categories') 
        .select('*') 
        .andWhere(filters) 
    }

    async getById(categoyId: string) {
        return getFirst( await KnexService("categories") 
        .where({"categories.id": categoyId}) 
        )
    }

    async deleteById(id: string) {
        return await KnexService('categories')
        .where({
            id: id
        })
        .delete()
    }  
}