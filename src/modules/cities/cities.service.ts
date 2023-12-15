import { UpdateCityDTO } from './dto/cities.dto';
import { ICreateCity, ICity } from './interface/cities.interface';
import CitysDao from './dao/cities.dao'; 
import ErrorResponse from '../shared/utils/errorResponse';

export default class CitysService {
    private citiesDao = new CitysDao()  
  
    async create(data: ICreateCity): Promise<ICity> {
        
        return this.citiesDao.create({
            ...data, 
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

    async update(id: string, values: UpdateCityDTO): Promise<ICity> {
        const foundCity: ICity = await this.citiesDao.getById(id);

        if (!foundCity) {
            throw new ErrorResponse(404, 'not found')
        }
        
        return this.citiesDao.update(id, { ...values });
    }
}