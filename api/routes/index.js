import { Router } from "express";
import  {authRoute}  from "./authRoute.js";

const indexRoute = Router();

indexRoute.use('/', authRoute)

export { indexRoute };