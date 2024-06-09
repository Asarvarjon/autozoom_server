import { getFirst } from "../../../utils/utils";
import KnexService from '../../../../../database/connection';
import { ICreateFile } from "../../../interface/files.interface";
import { v4 as uuidv4 } from 'uuid';

export default class ImagesDAO {
    async create({src, ext, name, mimetype, size}: ICreateFile){
        return getFirst(
            await KnexService("images")
                .insert({
                    id: uuidv4(),
                    src, 
                    ext, 
                    name, 
                    mimetype, 
                    size
                })
                .returning("*")
        )
    }

    async deleteById(id: string) {
        return await KnexService('images')
            .where({id: id})
            .delete()
    }

    async deleteByFilter(filters) {
        return await KnexService('images')
            .where(filters)
            .delete()
    }
}