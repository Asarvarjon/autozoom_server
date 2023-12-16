import { UpdateCityDTO } from './dto/cities.dto';
import { ICreateCity, ICity } from './interface/cities.interface';
import CitysDao from './dao/cities.dao'; 
import ErrorResponse from '../shared/utils/errorResponse';
import uploadFile from '../shared/utils/fileUpload';
import ImagesDAO from '../shared/modules/images/dao/images.dao';
import { isEmpty } from 'class-validator';
import generateSlug from '../shared/utils/generateSlug';


export default class CitysService {
    private citiesDao = new CitysDao()  
    private imagesDao = new ImagesDAO()  

  
    async create(data: ICreateCity, files): Promise<ICity> {
        let image_src: string;

        if (!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            // Assuming ImagesDAO.create returns the uploaded image details, adjust accordingly
            const uploadedImage = await this.imagesDao.create(images[0]);
            image_src = uploadedImage.src;
        }

        let slug = generateSlug(data.name)
        
        
        return this.citiesDao.create({
            ...data, 
            image_src,
            slug
        });
    }

    async findOne(id: string): Promise<ICity> {
        const foundCity: ICity = await this.citiesDao.getById(id);

        if (!foundCity) {
            throw new ErrorResponse(404, 'not found')
        }

        return foundCity;
    }

    async getAll(keyword: string, filters: any, sorts: any): Promise<ICity[]> {
        return this.citiesDao.getAll(keyword, filters, sorts);
    }

    async delete(id: string): Promise<void> {
        await this.citiesDao.deleteById(id);
    }

    async update(id: string, values: ICreateCity, files): Promise<ICity> {
        const found: ICity = await this.citiesDao.getById(id);

        if (!found) {
            throw new ErrorResponse(404, 'not found')
        } 

        let image_src = found.image_src;
        let slug = found.slug;

        if (!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0]);
            image_src = uploadedImage.src;
        }

        if(values.slug !== undefined && values.slug !== null) {
            slug = generateSlug(values.slug)
        }




        return this.citiesDao.update(id, { ...values, image_src });
    }
}