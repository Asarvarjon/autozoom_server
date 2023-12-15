import { UpdateModelDTO } from './dto/models.dto';
import { ICreateModel, IModel } from './interface/models.interface';
import ModelsDao from './dao/models.dao'; 
import ErrorResponse from '../shared/utils/errorResponse';

export default class ModelsService {
    private modelsDao = new ModelsDao()  
  
    async create(data: ICreateModel): Promise<IModel> {
        
        return this.modelsDao.create({
            ...data, 
        });
    }

    async findOne(id: string): Promise<IModel> {
        const foundModel: IModel = await this.modelsDao.getById(id);

        if (!foundModel) {
            throw new ErrorResponse(404, 'not found')
        }

        return foundModel;
    }

    async getAll(keyword: string, filters: any, sorts: any): Promise<IModel[]> {
        return this.modelsDao.getAll(keyword, filters, sorts);
    }

    async delete(id: string): Promise<void> {
        await this.modelsDao.deleteById(id);
    }

    async update(id: string, values: UpdateModelDTO): Promise<IModel> {
        const foundModel: IModel = await this.modelsDao.getById(id);

        if (!foundModel) {
            throw new ErrorResponse(404, 'not found')
        }
        
        return this.modelsDao.update(id, { ...values });
    }
}