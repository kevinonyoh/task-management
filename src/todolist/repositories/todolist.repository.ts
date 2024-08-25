/* eslint-disable prettier/prettier */
import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { todolistModel } from "../models/todolist.model";

@Injectable()
export class TodolistRepository extends ModelRepository<todolistModel> {
    constructor() {
        super(todolistModel);
    }
}