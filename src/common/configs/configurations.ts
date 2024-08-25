/* eslint-disable prettier/prettier */
export default () => ({
    port: +process.env.PORT || 8200,
    dbHost: process.env.DB_HOST,
    dbPort: +process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    secret: process.env.SECRET_VALUE
});