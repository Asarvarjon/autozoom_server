import { getFirst } from "../../../utils/utils";
import KnexService from '../../../../../database/connection';
import { ICreateFile } from "../../../interface/files.interface";
import { v4 as uuidv4 } from 'uuid';

export default class FilesDAO {
    async create({src, ext, name, mimetype, size}: ICreateFile){
        return getFirst(
            await KnexService("files")
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
        return await KnexService('files')
            .where({id: id})
            .delete()
    }
}