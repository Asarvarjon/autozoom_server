import { IAccessModule, ICreateAccessModule } from './interface/resources.interface';
import ModulesDAO from './dao/access_modules.dao';

export default class ResourcesService {
    private modulesDao = new ModulesDAO()

    async createRoleResource({ access_module_id, role_id }: ICreateAccessModule) {   
        const role_resource: IAccessModule = await this.modulesDao.createRoleResources({
            access_module_id, role_id
        })

        return role_resource
    } 

    async getAll() {
        const resources = await this.modulesDao.getAll();
        return resources
    } 
}