import { IDefaultQuery } from '../../shared/interface/query.interface'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 
import { ICreateCar } from '../interface/cars.interface';


export default class CarsDao { 
    async create(data: ICreateCar) {
        return getFirst(
            await KnexService('cars')
            .insert(data)
            .returning('*')
        )
    }


    async update( id: string, values: ICreateCar) {
        return getFirst(
            await KnexService('cars')
            .where({id: id})
            .update({
                ...values
            })
            .returning('*')
        )   
    }

    async getAll( keyword: string = '', filters, sorts) {
        const {limit, offset, order, orderBy} = sorts 
        return await KnexService('cars') 
        .select([
            "cars.*", 
            KnexService.raw(`jsonb_agg(distinct car_images) as car_images`)
        ])
        .leftJoin(function () {
            this.select([
                'car_images.blog_id',
                "image.src as image.src"
            ])
            .from('car_images') 
            .leftJoin({image: "images"}, { 'car_images.image_id': 'image.id' })
            .groupBy('car_images.id', "image.id")
            .as('car_images')
        }, { 'cars.id': 'car_images.blog_id' })
        .groupBy('cars.id')
        // .limit(limit)
        // .offset(offset)  
        .andWhere(filters) 
    }

    async getById(id: string) {
        return getFirst( await KnexService("cars") 
        .select([
            "cars.*", 
            KnexService.raw(`jsonb_agg(distinct car_images) as car_images`)
        ])
        .leftJoin(function () {
            this.select([
                'car_images.blog_id',
                "image.src as image.src"
            ])
            .from('car_images') 
            .leftJoin({image: "images"}, { 'car_images.image_id': 'image.id' })
            .groupBy('car_images.id', "image.id")
            .as('car_images')
        }, { 'cars.id': 'car_images.blog_id' })
        .where({"cars.id": id}) 
        .groupBy('cars.id')
        )
        // .groupBy('cars.id')

    }

    async deleteById(id: string) {
        return await KnexService('cars')
        .where({
            id: id
        })
        .delete()
    }  

    async deleteBlogImages(id: string) {
        return await KnexService('car_images')
        .where({
            blog_id: id
        })
        .delete()
    }  

    async createBlogImage(data){
        return getFirst(
            await KnexService("car_images")
                .insert(data)
                .returning("*")
        )
    }

    
}