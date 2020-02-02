import json
import secret_info
import mysql.connector

RemoteMysql = secret_info.RemoteMysql

mydb = mysql.connector.connect(host=RemoteMysql.host, user=RemoteMysql.user, passwd=RemoteMysql.passwd, database=RemoteMysql.database)
mydbCursor = mydb.cursor()

def lambda_handler(event, context):
    
    sql = """SELECT * FROM `EC2ServerPublicIP` WHERE %s=%d""" % ("ID", 1)
    mydbCursor.execute(sql)
    rows = mydbCursor.fetchall()
    mydb.close()

    
    Body={
        "publicIP": str(rows[0][1])
        
    }
    return {
        'statusCode': 200,
        'body': json.dumps(Body)
    }