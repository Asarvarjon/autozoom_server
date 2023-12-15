import {  ICreateAccessModule } from '../interface/resources.interface';
 
import KnexService from '../../../../database/connection'; 
import { getFirst } from '../../../shared/utils/utils';

export default class ModulesDAO {

    async createRoleResources({ role_id, access_module_id }: ICreateAccessModule) {
        return getFirst(
            await KnexService('role_access_modules')
            .insert({
                role_id, 
                access_module_id
            })
            .returning('*')
        )
    }  

    async getAll() {
        return await KnexService('resources')
    }  
}