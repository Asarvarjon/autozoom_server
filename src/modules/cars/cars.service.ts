import { CreateCarDTO } from './dto/cars.dto';
 
import { IDefaultQuery } from '../shared/interface/query.interface'; 
import { isEmpty } from 'class-validator';  
import ErrorResponse from '../shared/utils/errorResponse';     
import generateSlug from '../shared/utils/generateSlug';
import DAO from './dao/cars.dao';
import uploadFile from '../shared/utils/fileUpload'; 
import ImagesDAO from '../shared/modules/images/dao/images.dao';

export default class Service {
    private dao = new DAO() 
    private imagesDao = new ImagesDAO()  

    async create(data: CreateCarDTO, files) { 
        
        const car = await this.dao.create({
                ...data, 
        }) 

        const images = await uploadFile(files['images'], "images")
        for (const i of images) {
            const image = await this.imagesDao.create(i) 
            await this.createBlogImage(car.id, image.id)
        }

        return car
    }

    async createBlogImage(car_id, image_id) {  
        const created = await this.dao.createBlogImage({
                car_id,
                image_id,
        }) 

        return created
    }

    async findOne(id: string) {
        const data = await this.dao.getById(id); 

        if(!data) {
            throw new ErrorResponse(404, 'Not found!')
        }

        return data
    }

    async getAll(keyword: string, filters: IDefaultQuery, sorts: IDefaultQuery) {
        const data = await this.dao.getAll(keyword, filters, sorts);

        return data
    }

    async delete(id: string) {
        await this.dao.deleteBlogImages(id)
        await this.dao.deleteById(id)
    }

    async update(id: string, data: CreateCarDTO, files) {
        const found = await this.dao.getById(id)

        if(isEmpty(found)) {
            throw new ErrorResponse(404, 'not found!')
        }  
        

        const updated = await this.dao.update(id, {...data})

        return updated
    } 
}