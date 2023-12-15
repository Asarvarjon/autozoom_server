import { UpdateCategoryDTO } from './dto/categories.dto';
import { ICreateCategory, ICategory } from './interface/categories.interface';
import { IDefaultQuery } from '../shared/interface/query.interface'; 
import { isEmpty } from 'class-validator';  
import ErrorResponse from '../shared/utils/errorResponse';    
import CategoriesDao from './dao/categories.dao';
import generateSlug from '../../modules/shared/utils/generateSlug';
import uploadFile from '../../modules/shared/utils/fileUpload';
import ImagesDAO from '../../modules/shared/modules/images/dao/images.dao';

export default class CategoriesService {
    private categoriesDao = new CategoriesDao() 
    private imagesDao = new ImagesDAO()  


    async create(data: ICreateCategory, files) { 

        let src: string;
        if(!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0])
            src = uploadedImage.src
        }

 
        const category: ICategory = await this.categoriesDao.create({
            ...data,
            image_src: src,
    }) 

        return category
    }

    async findOne(id: string) {
        const foundCategory: ICategory = await this.categoriesDao.getById(id); 

        if(!foundCategory) {
            throw new ErrorResponse(404, 'Not found!')
        }

        return foundCategory
    }

    async getAll(keyword: string, filters: IDefaultQuery, sorts: IDefaultQuery) {
        const category = await this.categoriesDao.getAll(keyword, filters, sorts);

        return category
    }

    async delete(id: string) {
        await this.categoriesDao.deleteById(id)
    }

    async update(id: string, values: UpdateCategoryDTO, files) {
        const found = await this.categoriesDao.getById(id)

        if(isEmpty(found)) {
            throw new ErrorResponse(400, 'Category was not found!')
        }  

        let image_src = found.image_src

        if(!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0])
            image_src = uploadedImage.src
        } 
 

        const category: ICategory = await this.categoriesDao.update(id, {...values, image_src})

        return category
    } 
}