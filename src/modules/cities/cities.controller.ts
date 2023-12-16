import { ISearchQuery, IDefaultQuery } from '../shared/interface/query.interface';
import { CreateCityDTO, UpdateCityDTO } from './dto/cities.dto';
import { Request, Response, NextFunction } from 'express';
import extractQuery from '../shared/utils/extractQuery';
import CitysService from './cities.service';
import ErrorResponse from '../shared/utils/errorResponse';

export default class CitysController {
    private citiesService = new CitysService();

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const modelData: CreateCityDTO = req.body;
            const data = await this.citiesService.create(modelData,  req['files'] );

            res.status(201).json({
                success: true,
                data,
                message: 'City was created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const data = await this.citiesService.findOne(id);

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

            const data = await this.citiesService.getAll(keyword, filters, sorts);

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
            const data = await this.citiesService.findOne(id);

            if (!data) {
                throw new ErrorResponse(400, 'Not found');
            }

            await this.citiesService.delete(id);

            res.status(200).json({
                success: true,
                message: "City was deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const modelData: UpdateCityDTO = req.body;
            const { id } = req.params;

            const data = await this.citiesService.update(id, modelData,  req['files'] );

            res.status(200).json({
                success: true,
                data,
                message: "City was updated successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
