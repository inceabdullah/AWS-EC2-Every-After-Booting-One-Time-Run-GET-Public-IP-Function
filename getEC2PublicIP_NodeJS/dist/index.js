"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySqlInfo = __importStar(require("./secret_info/MySql_info"));
const mysql = require('serverless-mysql')({
    config: {
        host: MySqlInfo.Endpoint,
        user: MySqlInfo.User,
        password: MySqlInfo.Passwd,
        database: MySqlInfo.DB_name
    }
});
exports.handler = async (event) => {
    const body = event.queryStringParameters;
    const Body = {
        publicIP: body.publicIP
    };
    const result = mysql.query(`UPDATE ${MySqlInfo.TableName} SET publicIP = '${body.publicIP}' WHERE ID = 1`, function (err, results, fields) {
        console.log("connection released");
        if (err)
            throw err;
        else {
            console.log('Inserted ' + results.affectedRows + ' row(s).');
        }
    });
    await mysql.end();
    mysql.quit();
    return {
        statusCode: 200,
        body: JSON.stringify(Body)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0Esb0VBQXNEO0FBRXRELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBTyxTQUFTLENBQUMsUUFBUTtRQUM3QixJQUFJLEVBQU8sU0FBUyxDQUFDLElBQUk7UUFDekIsUUFBUSxFQUFHLFNBQVMsQ0FBQyxNQUFNO1FBQzNCLFFBQVEsRUFBSSxTQUFTLENBQUMsT0FBTztLQUNoQztDQUNKLENBQUMsQ0FBQztBQUVVLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFnQixFQUFFO0lBRWxFLE1BQU0sSUFBSSxHQUFRLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztJQUU5QyxNQUFNLElBQUksR0FBRztRQUNULFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtLQUMxQixDQUFBO0lBQ0QsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLFNBQVMsQ0FBQyxTQUFTLG9CQUFvQixJQUFJLENBQUMsUUFBUSxnQkFBZ0IsRUFDcEcsVUFBVSxHQUFPLEVBQUUsT0FBVyxFQUFFLE1BQVU7UUFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBRWpDLElBQUksR0FBRztZQUFFLE1BQU0sR0FBRyxDQUFDO2FBQ25CO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQztTQUdoRTtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsT0FBTztRQUNILFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzdCLENBQUE7QUFDTCxDQUFDLENBQUEifQ==