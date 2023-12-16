import { ISearchQuery, IDefaultQuery } from '../shared/interface/query.interface';
import { CreateLocationDTO, UpdateLocationDTO } from './dto/locations.dto';
import { Request, Response, NextFunction } from 'express';
import extractQuery from '../shared/utils/extractQuery';
import LocationsService from './locations.service';
import ErrorResponse from '../shared/utils/errorResponse';

export default class LocationsController {
    private locationsService = new LocationsService();

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const modelData: CreateLocationDTO = req.body;
            const data = await this.locationsService.create(modelData, req['files']);

            res.status(201).json({
                success: true,
                data,
                message: 'Location was created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const data = await this.locationsService.findOne(id);

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

            const data = await this.locationsService.getAll(keyword, filters, sorts);

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
            const data = await this.locationsService.findOne(id);

            if (!data) {
                throw new ErrorResponse(400, 'Not found');
            }

            await this.locationsService.delete(id);

            res.status(200).json({
                success: true,
                message: "Location was deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const modelData: UpdateLocationDTO = req.body;
            const { id } = req.params;

            const data = await this.locationsService.update(id, modelData,  req['files'] );

            res.status(200).json({
                success: true,
                data,
                message: "Location was updated successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
