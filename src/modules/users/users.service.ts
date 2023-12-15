import { IDefaultQuery } from '../../modules/shared/interface/query.interface'; 
import { UpdateUserDTO } from './dto/users.dto';
import { ICreateTempPassword, IUser } from 'modules/users/interface/users.interface';
import { ICreateUser } from './interface/users.interface';
import { isEmpty } from 'class-validator';  
import ErrorResponse from '../shared/utils/errorResponse';
import UsersDao from './dao/users.dao';
import uploadFile from '../../modules/shared/utils/fileUpload';
import ImagesDAO from '../../modules/shared/modules/images/dao/images.dao'; 
import { defaults } from '../../modules/shared/defaults/defaults';  


export default class UsersService { 
    private usersDao = new UsersDao();
    private imagesDao = new ImagesDAO();  

    async create({ first_name,phone_number, last_name, password }: ICreateUser) {
        
        return await this.usersDao.create({
            first_name, phone_number, last_name, password
        }); 
    }  

    async findOne(id: string) {
        const user: IUser = await this.usersDao.getById(id);

        if(!user) {
            throw new ErrorResponse(404, 'User was not found!')
        }     
        return { 
            ...user, 
        }
    }

    async findByNumber(phone_number: string) {
        const user: IUser = await this.usersDao.getByPhoneNumber(phone_number);

        if(!user) {
            throw new ErrorResponse(404, 'User was not found!')
        }

        return user
    }

    async getAll(keyword: string, filters: IDefaultQuery, sorts: IDefaultQuery) {
        const users = await this.usersDao.getAll(keyword, filters, sorts);

        return users
    }

    async delete(id: string) {
        await this.usersDao.deleteById(id)
    }
 

}