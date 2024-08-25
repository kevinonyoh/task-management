/* eslint-disable prettier/prettier */
import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { TaskCommentModel } from "../models/taskComment.model";

@Injectable()
export class TaskCommentRepository extends ModelRepository<TaskCommentModel> {
    constructor() {
        super(TaskCommentModel);
    }
}