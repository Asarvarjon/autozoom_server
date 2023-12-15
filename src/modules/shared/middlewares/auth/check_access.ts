import { RequestWithUser } from "../../interface/routes.interface";  
import { NextFunction, Request, Response } from "express"; 
import ErrorResponse from "../../utils/errorResponse";  


const check_access = (module_name: string) => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const {
                user
            } = req   
            
            next()

        } catch (error) {  
            next(error)
        }
    }
}

export default check_access;