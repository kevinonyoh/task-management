/* eslint-disable prettier/prettier */
import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { NotificationModel } from "../models/notification.model";

@Injectable()
export class NotificationRepository extends ModelRepository<NotificationModel> {
    constructor() {
        super(NotificationModel);
    }
}