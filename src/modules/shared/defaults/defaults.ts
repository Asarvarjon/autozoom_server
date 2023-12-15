import { IDefaultQuery } from "../interface/query.interface";

export const defaultQueryValues: IDefaultQuery = {
    limit: 30,
    offset: 0,
    page: 0,
    order: "ASC",
    orderBy: "created_at"
}

export const defaults = {
    passwordLength: 6,
    reqImagesName: "images",
    reqFilesName: "files",
    passwordMessage: (password) => {return `Sizning maxfiylik parolingiz: ${password} \n Uni keyinchalik o'zgartirishingiz mumkin.`}
}

export const defaultRangeSplitter: string = "and"
export const defaultRequestImagesName: string = "images"
export const defaultRequestCoverImageName: string = "cover"
export const defaultRequestFilesName: string = "files"


