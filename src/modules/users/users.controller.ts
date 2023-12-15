import { ISearchQuery } from './../shared/interface/query.interface';
import { IDefaultQuery } from '../../modules/shared/interface/query.interface';
import { RequestWithUser } from '../../modules/shared/interface/routes.interface';
import { isEmpty } from 'class-validator';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto'; 
import { Request, Response, NextFunction } from 'express'; 
import UsersService from './users.service'; 
import ErrorResponse from '../../modules/shared/utils/errorResponse'; 
import extractQuery from '../../modules/shared/utils/extractQuery';
import buildPagination from '../../modules/shared/utils/paginationBuilder';

export default class UsersController {

    private usersService = new UsersService()

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDTO = req.body; 
            const data = await this.usersService.create(userData);

            res.status(201).json({
                success: true,
                data,
                message: 'User was created succesfully!'
            })
        } catch (error) {
            next(error)
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const data = await this.usersService.findOne(id)

            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            next(error)
        }
    } 
 
}