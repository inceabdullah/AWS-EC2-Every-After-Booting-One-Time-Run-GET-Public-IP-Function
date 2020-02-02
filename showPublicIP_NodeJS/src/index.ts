import { APIGatewayEvent } from 'aws-lambda';
import * as MySqlInfo from './secret_info/MySql_info';

const mysql = require('serverless-mysql')({
    config: {
        host     : MySqlInfo.Endpoint,
        user     : MySqlInfo.User,
        password : MySqlInfo.Passwd,
        database :  MySqlInfo.DB_name
    }
});

export const handler = async (event: APIGatewayEvent): Promise<any> => {

    
    
    const result = await mysql.query(`SELECT publicIP FROM \`${MySqlInfo.TableName}\` WHERE ID = 1`)
     await mysql.end();
     mysql.quit();
     
    return {
        statusCode: 200,
        body: JSON.stringify(result[0])
    }
}