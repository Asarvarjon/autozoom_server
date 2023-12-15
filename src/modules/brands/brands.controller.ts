import { ISearchQuery, IDefaultQuery } from '../shared/interface/query.interface';
import { CreateBrandDTO, UpdateBrandDTO } from './dto/brands.dto';
import { Request, Response, NextFunction } from 'express';
import extractQuery from '../shared/utils/extractQuery';
import BrandsService from './brands.service';
import ErrorResponse from '../shared/utils/errorResponse';

export default class BrandsController {
    private brandsService = new BrandsService();

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const brandData: CreateBrandDTO = req.body;
            const data = await this.brandsService.create(brandData, req['files']);

            res.status(201).json({
                success: true,
                data,
                message: 'Brand was created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const data = await this.brandsService.findOne(id);

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

            const data = await this.brandsService.getAll(keyword, filters, sorts);

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
            const data = await this.brandsService.findOne(id);

            if (!data) {
                throw new ErrorResponse(400, 'Not found');
            }

            await this.brandsService.delete(id);

            res.status(200).json({
                success: true,
                message: "Brand was deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const brandData: UpdateBrandDTO = req.body;
            const { id } = req.params;

            const data = await this.brandsService.update(id, brandData, req['files']);

            res.status(200).json({
                success: true,
                data,
                message: "Brand was updated successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
