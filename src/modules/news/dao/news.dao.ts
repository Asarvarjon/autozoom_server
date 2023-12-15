import { IDefaultQuery } from '../../shared/interface/query.interface'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 


export default class NewsDao { 
    async create(data) {
        return getFirst(
            await KnexService('news')
            .insert(data)
            .returning('*')
        )
    }


    async update( id: string, values) {
        return getFirst(
            await KnexService('news')
            .where({id: id})
            .update({
                ...values
            })
            .returning('*')
        )   
    }

    async getAll( keyword: string = '', filters, sorts) {
        const { limit, offset, order, orderBy } = sorts;
        const knexQuery = KnexService('news').limit(limit).offset(offset);

        if (filters.created_at) {
            // Convert the provided created_at value to a timestamp
            const timestamp = new Date(filters.created_at).toISOString();
            filters.created_at = timestamp;
        }

        // Apply filters
        knexQuery.where(filters);

        return await knexQuery;
        
    }


    async getById(id: string) {
        return getFirst( await KnexService("news") 
        .where({"news.id": id}) 
        )
    }

    async deleteById(id: string) {
        return await KnexService('news')
        .where({
            id: id
        })
        .delete()
    }  

    async getArchives() { 
        return await KnexService('news')   
        .select(
            KnexService.raw("to_char(created_at, 'FMmonth YYYY') as month_year"),
            'id',
            'image_src',
            'title_ru',
            'title_en',
            'title_uz',
            'text_ru',
            'text_en',
            'text_uz',
            'created_at'
        )
        .orderBy('created_at', 'desc')
        .limit(10);
    }
}