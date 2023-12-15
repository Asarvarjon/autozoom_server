import { UpdateBrandDTO } from './dto/brands.dto';
import { ICreateBrand, IBrand } from './interface/brands.interface';
import { IDefaultQuery } from '../shared/interface/query.interface';
import { isEmpty } from 'class-validator';
import ErrorResponse from '../shared/utils/errorResponse';
import BrandsDao from './dao/brands.dao';
import uploadFile from '../shared/utils/fileUpload';
import ImagesDAO from '../shared/modules/images/dao/images.dao';

export default class BrandsService {
    private brandsDao = new BrandsDao();
    private imagesDao = new ImagesDAO()  


    async create(data: ICreateBrand, files: any) {
        let image_src: string;

        if (!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            // Assuming ImagesDAO.create returns the uploaded image details, adjust accordingly
            const uploadedImage = await this.imagesDao.create(images[0]);
            image_src = uploadedImage.src;
        }

        const brand: IBrand = await this.brandsDao.create({
            ...data,
            image_src: image_src,
        });

        return brand;
    }

    async findOne(id: string) {
        const foundBrand: IBrand = await this.brandsDao.getById(id);

        if (!foundBrand) {
            throw new ErrorResponse(404, 'Brand not found!');
        }

        return foundBrand;
    }

    async getAll(keyword: string, filters: IDefaultQuery, sorts: IDefaultQuery) {
        const brands = await this.brandsDao.getAll(keyword, filters, sorts);

        return brands;
    }

    async delete(id: string) {
        await this.brandsDao.deleteById(id);
    }

    async update(id: string, values: UpdateBrandDTO, files: any) {
        const found = await this.brandsDao.getById(id);

        if (isEmpty(found)) {
            throw new ErrorResponse(400, 'Brand not found!');
        }

        let image_src = found.image_src;

        if (!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0]);
            image_src = uploadedImage.src;
        }

        const brand: IBrand = await this.brandsDao.update(id, { ...values, image_src });

        return brand;
    }
}
