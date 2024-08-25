import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, IsEmail, Model, PrimaryKey, Table } from "sequelize-typescript"
import { UserModel } from "src/user/models/user.model";
import { todolistModel } from "./todolist.model";


@Table({
    tableName: 'TaskComment',
    modelName: 'TaskCommentModel',
    underscored: true,
    freezeTableName: true
})
export class TaskCommentModel extends Model<TaskCommentModel>{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @IsEmail
    @Column
    userEmail: string;

    @AllowNull(false)
    @Column
    comment: string;

    @ForeignKey(() => todolistModel)
    @Column(DataType.UUID)
    todoId: string;

    @BelongsTo(() => todolistModel)
    todo: todolistModel;

}



