module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://ifaliemh:V53rygYZYEiw0IQAkmot5bbc-JsIKySE@hanno.db.elephantsql.com:5432/ifaliemh',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgres://fnvsuddf:VD5Zw26NgyUvDwjzumda19eTzOE0Ae4n@hanno.db.elephantsql.com:5432/fnvsuddf'
};