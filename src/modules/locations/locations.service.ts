import { isEmpty } from 'class-validator';
import { UpdateLocationDTO } from './dto/locations.dto';
import { ICreateLocation, ILocation } from './interface/locations.interface';
import LocationsDao from './dao/locations.dao'; 
import ErrorResponse from '../shared/utils/errorResponse';
import uploadFile from '../shared/utils/fileUpload';
import ImagesDAO from '../shared/modules/images/dao/images.dao';
import generateSlug from '../shared/utils/generateSlug';

export default class LocationsService {
    private locationsDao = new LocationsDao()  
    private imagesDao = new ImagesDAO()  

  
    async create(data: ICreateLocation, files): Promise<ILocation> {
        let image_src: string;

        if (!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            // Assuming ImagesDAO.create returns the uploaded image details, adjust accordingly
            const uploadedImage = await this.imagesDao.create(images[0]);
            image_src = uploadedImage.src;
        }

        let slug = generateSlug(data.name)
        
        return this.locationsDao.create({
            ...data, 
            image_src,
            slug
        });
    }

    async findOne(id: string): Promise<ILocation> {
        const foundLocation: ILocation = await this.locationsDao.getById(id);

        if (!foundLocation) {
            throw new ErrorResponse(404, 'not found')
        }

        return foundLocation;
    }

    async getAll(keyword: string, filters: any, sorts: any): Promise<ILocation[]> {
        return this.locationsDao.getAll(keyword, filters, sorts);
    }

    async delete(id: string): Promise<void> {
        await this.locationsDao.deleteById(id);
    }

    async update(id: string, values: ICreateLocation, files): Promise<ILocation> {
        const foundLocation: ILocation = await this.locationsDao.getById(id);

        if (!foundLocation) {
            throw new ErrorResponse(404, 'not found')
        } 

        let image_src = foundLocation.image_src;
        

        if (!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0]);
            image_src = uploadedImage.src;
        }

        let slug = foundLocation.slug;

        if(values.slug !== undefined && values.slug !== null) {
            slug = generateSlug(values.slug)
        }

        
        return this.locationsDao.update(id, { ...values, image_src });
    }
}