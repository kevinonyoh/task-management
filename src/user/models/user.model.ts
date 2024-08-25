/* eslint-disable prettier/prettier */
import { AllowNull, Column, DataType, Default, HasMany, IsEmail, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { todolistModel } from "src/todolist/models/todolist.model";
import { NotificationModel } from "./notification.model";


@Table({
    tableName: 'user',
    modelName: 'UserModel',
    underscored: true,
    freezeTableName: true
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @IsEmail
    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @Unique
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    password: string;

    @HasMany(() => todolistModel)
    todoLists: todolistModel[];

    @HasMany(() => NotificationModel)
    notifications: NotificationModel[];

}