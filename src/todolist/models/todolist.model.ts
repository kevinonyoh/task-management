/* eslint-disable prettier/prettier */

import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model, IsEmail } from "sequelize-typescript";
import { Category, Status, Tag } from "../interfaces/todolist.interface";
import { UserModel } from "src/user/models/user.model";
import { TaskCommentModel } from "./taskComment.model";
import { AdminModel } from "src/admin/models/admin.model";



@Table({
    tableName: 'todolist',
    modelName: 'todolistModel',
    underscored: true,
    freezeTableName: true
})
export class todolistModel extends Model<todolistModel>{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Unique
    @AllowNull(false)
    @Column
    taskName: string;

    @AllowNull(false)
    @Column
    taskDescription: string;

    @AllowNull(false)
    @Column(DataType.ENUM(Category.PERSONAL, Category.WORK))
    category: Category;

    @AllowNull(false)
    @Column(DataType.ENUM(Status.COMPLETE, Status.INCOMPLETE, Status.INPROGESS))
    status: Status;

    @Column(DataType.ENUM(Tag.BUG, Tag.FEATURE, Tag.URGENT))
    tag: Tag;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    dueDate: string;

   
    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    assignTo: string;

    @ForeignKey(() => AdminModel)
    @AllowNull(true)
    @Column(DataType.UUID)
    assignBy: string;

    @HasMany(() => TaskCommentModel)
    comment: TaskCommentModel[];

    @BelongsTo(() => UserModel, 'assignTo')
    user: UserModel;
   
   


}





