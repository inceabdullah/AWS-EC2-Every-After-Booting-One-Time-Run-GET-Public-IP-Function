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
    const result = await mysql.query(`SELECT publicIP FROM \`${MySqlInfo.TableName}\` WHERE ID = 1`);
    await mysql.end();
    mysql.quit();
    const Body = {
        publicIP: result[0].publicIP
    };
    return {
        statusCode: 200,
        body: JSON.stringify(Body)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0Esb0VBQXNEO0FBRXRELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBTyxTQUFTLENBQUMsUUFBUTtRQUM3QixJQUFJLEVBQU8sU0FBUyxDQUFDLElBQUk7UUFDekIsUUFBUSxFQUFHLFNBQVMsQ0FBQyxNQUFNO1FBQzNCLFFBQVEsRUFBSSxTQUFTLENBQUMsT0FBTztLQUNoQztDQUNKLENBQUMsQ0FBQztBQUVVLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFnQixFQUFFO0lBSWxFLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsU0FBUyxDQUFDLFNBQVMsaUJBQWlCLENBQUMsQ0FBQTtJQUMvRixNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixNQUFNLElBQUksR0FBRztRQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtLQUMvQixDQUFBO0lBQ0QsT0FBTztRQUNILFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzdCLENBQUE7QUFDTCxDQUFDLENBQUEifQ==