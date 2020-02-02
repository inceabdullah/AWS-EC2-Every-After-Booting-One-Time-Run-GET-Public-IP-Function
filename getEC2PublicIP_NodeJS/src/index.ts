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

    const body: any = event.queryStringParameters;

    const Body = {
        publicIP: body.publicIP
    }
    const result = mysql.query(`UPDATE ${MySqlInfo.TableName} SET publicIP = '${body.publicIP}' WHERE ID = 1`, 
         function (err:any, results:any, fields:any) {
            
            console.log("connection released")

             if (err) throw err;
         else{
             console.log('Inserted ' + results.affectedRows + ' row(s).');
             

         }
     })
     await mysql.end();
     mysql.quit();
    return {
        statusCode: 200,
        body: JSON.stringify(Body)
    }
}