export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    migrations: process.env.TYPEORM_MIGRATIONS,
    entities: process.env.TYPEORM_ENTITIES,
    logging: process.env.TYPEORM_LOGGING === 'true',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  },
});
