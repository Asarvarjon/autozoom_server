import { ISearchQuery, IDefaultQuery } from '../shared/interface/query.interface';
import { CreateModelDTO, UpdateModelDTO } from './dto/models.dto';
import { Request, Response, NextFunction } from 'express';
import extractQuery from '../shared/utils/extractQuery';
import ModelsService from './models.service';
import ErrorResponse from '../shared/utils/errorResponse';

export default class ModelsController {
    private modelsService = new ModelsService();

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const modelData: CreateModelDTO = req.body;
            const data = await this.modelsService.create(modelData );

            res.status(201).json({
                success: true,
                data,
                message: 'Model was created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const data = await this.modelsService.findOne(id);

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    public getAll = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { query } = req;
            const { keyword }: ISearchQuery = query;
            const filters = extractQuery(query).filters;
            const sorts = extractQuery(query).sorts; 

            const data = await this.modelsService.getAll(keyword, filters, sorts);

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const { id } = req.params;
            const data = await this.modelsService.findOne(id);

            if (!data) {
                throw new ErrorResponse(400, 'Not found');
            }

            await this.modelsService.delete(id);

            res.status(200).json({
                success: true,
                message: "Model was deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const modelData: UpdateModelDTO = req.body;
            const { id } = req.params;

            const data = await this.modelsService.update(id, modelData );

            res.status(200).json({
                success: true,
                data,
                message: "Model was updated successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
