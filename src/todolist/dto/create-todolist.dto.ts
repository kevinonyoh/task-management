/* eslint-disable prettier/prettier */
import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category, Status, Tag } from "../interfaces/todolist.interface";

export class CreateTodolistDto {
    
    @IsString()
    @IsNotEmpty()
    taskName: string;

    @IsString()
    @IsNotEmpty()
    taskDescription: string;

    @IsEnum(Category)
    @IsNotEmpty()
    category: string;
    
    @IsEnum(Status)
    @IsNotEmpty()
    status: string;

    @IsEnum(Tag)
    @IsNotEmpty()
    tag: string;

    @IsString()
    @IsNotEmpty()
    dueDate: string;

    @IsString()
    @IsNotEmpty()
    assignTo: string;

}


export class UpdateStatusDto {
    @IsEnum(Status)
    @IsNotEmpty()
    status: string;
}


export class AddCommentDto{
    
    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsString()
    @IsNotEmpty()
    todoId: string;
}

export class DeleteCommentDto{
    @IsString()
    @IsNotEmpty()
    id: string;
}


export class UpdateCommentDto{
    
    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsString()
    @IsNotEmpty()
    todoId: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}


export class PagnationDto{
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @IsNumber()
    @IsNotEmpty()
    limit: number
}


export class GetDueDateDto{
    @IsString()
    @IsNotEmpty()
    dueDate: string;

}