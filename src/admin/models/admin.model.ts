/* eslint-disable prettier/prettier */
import { AllowNull, Column, DataType, Default, HasMany, IsEmail, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";


@Table({
    tableName: 'admin',
    modelName: 'AdminModel',
    underscored: true,
    freezeTableName: true
})
export class AdminModel extends Model<AdminModel> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @IsEmail
    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @Column
    name: string;


    @Column
    password: string;

}