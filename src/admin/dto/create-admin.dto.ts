import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Category, Status, Tag } from "src/todolist/interfaces/todolist.interface";

export class CreateAdminDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

}



export class AdminAssignTodolistDto {
    
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

export class UpdateStatusTaskDto{

    @IsEnum(Status)
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    assignTo: string;

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