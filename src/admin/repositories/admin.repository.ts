/* eslint-disable prettier/prettier */
import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { AdminModel } from "../models/admin.model";


@Injectable()
export class AdminRepository extends ModelRepository<AdminModel> {
    constructor() {
        super(AdminModel);
    }
}