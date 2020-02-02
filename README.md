# Non-Static AWS EC2 IP Address

This is why this function is written. AWS EC2 has not static public `IP` or `DNS` address. Some `docker container`s may be run on it and needed `Public IP` for clients. 


## Lambda

Lambda is a serverless system to compute functions. 

### Python and NodeJS

`Python` and `NodeJS` are the most popular langs nowadays. 

#### Python
[lambda_function.py](getEC2PublicIP_Python/lambda_function.py)



`handler` is `lambda_function.lambda_handler` ([file](getEC2PublicIP/lambda_function.py)). `event["queryStringParameters"]` gets query parameters.

##### Pip installation

I used [this way - AWS-Lambda--Python-Flask-Template](https://github.com/inceabdullah/AWS-Lambda--Python-Flask-Template) to install in the same path.

#### NodeJS

[index.ts](getEC2PublicIP_NodeJS/src/index.ts)

Used  [Haber-Tellali-3th-Wave-News-Service Sending Log](https://github.com/inceabdullah/Haber-Tellali-3th-Wave-News-Service/blob/6d392e7275cba8a33d44c2bb0f94b2d675a9c242/aws-lambda/SendMySql/NodeJS/src/index.ts). 

### Shell

[shell script](script)

**crontab** service is used on **AWS EC2**. 

For getting `Public IP`, [Is there a way to get the Public DNS address of an instance? - StackExchange](https://unix.stackexchange.com/questions/24355/is-there-a-way-to-get-the-public-dns-address-of-an-instance) is used.

```bash
export PUBLIC_DNS=`curl http://169.254.169.254/latest/meta-data/public-hostname 2>/dev/null`
```

Pressing `crontab -e` is for adding line follow:
`@reboot ./script`

Note: Might use `wget` in `export PUBLIC_DNS=\`curl` instead of `curl` and **$(** instead of **`**. `cat getEC2.api` would get error if this file's path not `/`. You could change with full path.

Might be tried to run `sudo crontab -e` or after `sudo -s`, `sudo su` then, `crontab -e`

### Get PublicIP
#### Python

[lambda_function.py](showPublicIP_Python/lambda_function.py)


```python
"""SELECT * FROM `EC2ServerPublicIP` WHERE %s=%d""" % ("ID", 1)
```
is used then `rows[0][1]` gives `publicIP` or
```python
"""SELECT * FROM `EC2ServerPublicIP` WHERE %s=%d""" % ("ID", 1)
```
and `rows[0][0]`

#### NodeJS

[index.ts](showPublicIP_NodeJS/src/index.ts)


In an async function, `mysql.query` function is also async, so we shoul put `await` in front of it [serverless-mysql README.md](https://github.com/samdei/mysql-serverless/blob/2ba57eddf99c078bc23182206b81270cfad40f96/README.md#querying-database).

```python
SELECT publicIP FROM \`${MySqlInfo.TableName}\` WHERE ID = 1
```
is used for fetching just one column, `publicIP`. `result` already has `publicIP` key, so not needed to make new one:
`body: JSON.stringify(result[0])`


## RDS

In this repo, `MySQL` is used to process datas.