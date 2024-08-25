import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, IsEmail, Model, PrimaryKey, Table } from "sequelize-typescript"
import { UserModel } from "src/user/models/user.model";



@Table({
    tableName: 'notification',
    modelName: 'NotificationModel',
    underscored: true,
    freezeTableName: true
})
export class NotificationModel extends Model<NotificationModel>{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    message: string;

    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => UserModel, 'email')
    user: UserModel;

}



