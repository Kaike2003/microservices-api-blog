import express, { Express } from 'express';
import { Api } from "../../api";
import cors from "cors"
import morgan from "morgan"
import { CreatePostRoute } from './routes/post/create.post.routes';
import { GetAllPostRoute } from './routes/post/getAll.post.routes';
import { GetOnePostRoutes } from './routes/post/getOne.post.routes';
import { DeleteAllPostRoutes } from './routes/post/deleteAll.post.routes';
import { DeleteOnePostRoutes } from './routes/post/deleteOne.post.routes';
import { UpdateOnePostRoutes } from './routes/post/updateOne.post.routes';


export class ExpressApi implements Api {

    private constructor(private readonly app: Express) { }

    static create(): ExpressApi {
        const app: Express = express()
        this.middlewares(app)
        this.routes(app)
        return new ExpressApi(app)
    }

    private static middlewares(app: Express) {
        app.use(express.json()).use(cors()).use(morgan("dev"))
    }

    private static routes(app: Express) {
        const createPostRoute = CreatePostRoute.create().execute()
        const getAllPostRoute = GetAllPostRoute.create().execute()
        const getOnePostRoute = GetOnePostRoutes.create().execute()
        const deleteAllPostRoute = DeleteAllPostRoutes.create().execute()
        const deleteOnePostRoute = DeleteOnePostRoutes.create().execute()
        const updateOnePostRoute = UpdateOnePostRoutes.create().execute()

        app.use(createPostRoute, getAllPostRoute, getOnePostRoute, deleteAllPostRoute, deleteOnePostRoute, updateOnePostRoute)
    }

    listen(port: number): void {
        this.app.listen(port, () => console.log(`Server running on: http://localhost:83`));
    }

}