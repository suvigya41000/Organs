require('dotenv').config();

const JWT_token = process.env.JWT_TOKEN;
const Db_Url = process.env.DB_URL;
console.log(Db_Url)
module.exports = {
    JWT_token,
    Db_Url
};