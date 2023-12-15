import { UpdateLocationDTO } from './dto/locations.dto';
import { ICreateLocation, ILocation } from './interface/locations.interface';
import LocationsDao from './dao/locations.dao'; 
import ErrorResponse from '../shared/utils/errorResponse';

export default class LocationsService {
    private locationsDao = new LocationsDao()  
  
    async create(data: ICreateLocation): Promise<ILocation> {
        
        return this.locationsDao.create({
            ...data, 
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

    async update(id: string, values: UpdateLocationDTO): Promise<ILocation> {
        const foundLocation: ILocation = await this.locationsDao.getById(id);

        if (!foundLocation) {
            throw new ErrorResponse(404, 'not found')
        }
        
        return this.locationsDao.update(id, { ...values });
    }
}