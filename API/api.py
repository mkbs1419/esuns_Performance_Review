# -*- coding: utf-8 -*-
# File: api.py 2018-05-27
from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api, fields, marshal_with, reqparse
import pymysql.cursors
from datetime import date, datetime
from urllib import unquote

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

SERVER_name = 'localhost'

parser = reqparse.RequestParser()

def strtolist(strlist):
    if isinstance(strlist, list):
        return strlist
    else:
        strlist = strlist.replace("[", "")
        strlist = strlist.replace("]", "")
        strlist = strlist.replace("\"", "")
        strlist = strlist.replace(" ", "")
        strlist = strlist.split(",")
        return strtolist(strlist)


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


def get_conn():
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='root',
        db='esuns_performance_bonus',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()
    return conn, cursor


class status(Resource):
    def get(self):
        response = ['API is running OK']
        return response


# login -- projectinfo
class projects(Resource):
    def get(self):
        print "/projects GET"
        conn, cursor = get_conn()
        sql = "SELECT projectName FROM `projectinfo` ORDER BY _id ASC"
        cursor.execute(sql)
        result = []
        for row in cursor:
            result.append(row["projectName"])
        cursor.close()
        conn.close()
        return result

    def post(self):
        print "/projects POST"
        parser.add_argument('project', type=unicode)
        parser.add_argument('password', type=str)
        args = parser.parse_args()

        conn, cursor = get_conn()
        sql = "SELECT projectName, exceptValue, quarter, actualMoney, accumulation, fillingPerson, testList FROM `projectinfo` WHERE projectName = \"" + args["project"] + "\" AND password = \"" + args["password"] + "\""
        cursor.execute(sql)

        result = cursor.fetchone()
        # result["testList"] = result["testList"].split(",")

        cursor.close()
        conn.close()

        if (result):
            print "Access Allow"
            result["testList"] = result["testList"].split(",")
            return [True, result], 201
        else:
            print "Access Denied"
            return [False, {"projectName": args["project"]}], 201

# index, form1 -- employeeinfo
class employeeinfo(Resource):
    def get(self, employeeId_):
        print "/employeeinfo GET"
        conn, cursor = get_conn()
        sql = "SELECT * FROM `employeeinfo` WHERE employeeId = \"" + employeeId_ + "\""
        cursor.execute(sql)
        result = cursor.fetchone()

        result["arriveDate"] = json_serial(result["arriveDate"])
        result["regularDate"] = json_serial(result["regularDate"])

        cursor.close()
        conn.close()
        return result

    def post(self, employeeId_):
        print "/employeeinfo POST"
        parser.add_argument('testList')
        args = parser.parse_args()

        testList = args["testList"]
        testList = testList.replace("[", "")
        testList = testList.replace("]", "")
        testList = testList.replace("\"", "")
        testList = testList.replace(" ", "")
        testList = testList.split(",")

        conn, cursor = get_conn()
        sql = "SELECT employeeId, employeeName, form1Status, form2Status FROM `employeeinfo` WHERE employeeId IN ("
        sql_ele = ""
        for ele in testList:
            sql_ele = sql_ele + "\"" + ele + "\","
        sql = sql + sql_ele[:-1] + ")"
        print sql
        cursor.execute(sql)
        result = cursor.fetchall()

        cursor.close()
        conn.close()

        return result


# form1 -- form1 table
class form1data(Resource):
    def post(self, employeeId_):
        print "/form1data POST"
        parser.add_argument('unid', type=unicode)
        parser.add_argument('projectName', type=unicode)
        parser.add_argument('quarter', type=str)
        parser.add_argument('reviewDate', type=str)
        parser.add_argument('scoreList')
        parser.add_argument('form1Result')
        parser.add_argument('reviewNote', type=unicode)
        args = parser.parse_args()

        scoreList = args["scoreList"]
        scoreList = scoreList.replace("[", "")
        scoreList = scoreList.replace("]", "")
        scoreList = scoreList.replace("\"", "")
        scoreList = scoreList.replace(" ", "")
        scoreList = scoreList.split(",")

        form1Result = args["form1Result"]
        form1Result = form1Result.replace("[", "")
        form1Result = form1Result.replace("]", "")
        form1Result = form1Result.replace("\"", "")
        form1Result = form1Result.replace(" ", "")
        form1Result = form1Result.split(",")

        # insert or update if exist
        conn, cursor = get_conn()
        sql = "INSERT INTO `form1` (`_id`, `employeeId`, `projectName`, `quarter`, `reviewDate`, `q1Score`, `q2Score`, `q3Score`, `q4Score`, `q5Score`, `q6Score`, `q7Score`, `q8Score`, `q9Score`, `result`, `description`, `badPerformance`, `note`) VALUES "
        sql_data = "(\"" + args["unid"] + "\", \"" + employeeId_ + "\", \"" + args["projectName"] + "\", \"" + args["quarter"] + "\", \"" + args["reviewDate"] + "\", "
        sql_data_score = ""
        sql_data_result = ""
        for ele in scoreList:
            sql_data_score = sql_data_score + "\"" + ele + "\", "
        sql_data_result = "\"" + form1Result[0] + "\", \"" + form1Result[1] + "\", \"" + form1Result[2] + "," + form1Result[3] + "\", \"" + args["reviewNote"] + "\")"
        sql_end = " ON DUPLICATE KEY UPDATE reviewDate = \"" + args["reviewDate"] + "\", q1Score = \"" + scoreList[0] + "\", q2Score = \"" + scoreList[1] + "\", q3Score = \"" + scoreList[2] + "\", q4Score = \"" + scoreList[3] + "\", q5Score = \"" + scoreList[4] + "\", q6Score = \"" + scoreList[5] + "\", q7Score = \"" + scoreList[6] + "\", q8Score = \"" + scoreList[7] + "\", q9Score = \"" + scoreList[8] + "\", result = \"" + form1Result[0] + "\", description = \"" + form1Result[1] + "\", badPerformance = \"" + form1Result[2] + "," + form1Result[3] + "\", note = \"" + args["reviewNote"] + "\""
        sql = sql + sql_data + sql_data_score + sql_data_result + sql_end
        cursor.execute(sql)
        sql = "UPDATE `employeeinfo` SET `form1Status` = '1' WHERE employeeId = \"" + employeeId_ + "\""
        cursor.execute(sql)
        conn.commit()
        cursor.close()
        conn.close()
        return True


# form2 -- form2 table
class form2data(Resource):
    def post(self):
        print "/form2data POST"
        parser.add_argument('unid', type=unicode)
        parser.add_argument('projectName', type=unicode)
        parser.add_argument('quarter', type=str)
        parser.add_argument('reviewDate', type=str)
        parser.add_argument('employeeId', type=str)
        parser.add_argument('orderList')
        parser.add_argument('scoreList')
        parser.add_argument('totalList')
        args = parser.parse_args()

        unid = args["employeeId"] + args["unid"]

        # insert or update if exist
        conn, cursor = get_conn()
        sql = "INSERT INTO `form2` (`_id`, `projectName`, `quarter`, `reviewDate`, `employeeId`, `orderList`, `scoreList`, `totalList`) VALUES "
        sql_data = "('"+unid+"', '"+args["projectName"]+"', '"+args["quarter"]+"', '"+args["reviewDate"]+"', '"+args["employeeId"]+"', '"+args["orderList"]+"', '"+args["scoreList"]+"', '"+args["totalList"]+"')"
        sql_end = " ON DUPLICATE KEY UPDATE reviewDate = '"+args["reviewDate"]+"', orderList = '"+args["orderList"]+"', scoreList = '"+args["scoreList"]+"', totalList = '"+args["totalList"]+"'"
        sql = sql + sql_data + sql_end
        cursor.execute(sql)
        sql = "UPDATE `employeeinfo` SET `form2Status` = '1' WHERE employeeId = \"" + args["employeeId"] + "\""
        cursor.execute(sql)
        conn.commit()
        cursor.close()
        conn.close()
        return True


# index -- index save
class indexsave(Resource):
    def post(self):
        print "/indexsave POST"
        parser.add_argument('projectName', type=unicode)
        parser.add_argument('actualMoney', type=int)
        parser.add_argument('accumulation', type=int)
        args = parser.parse_args()

        # update table
        conn, cursor = get_conn()
        sql = "UPDATE `projectinfo` SET `actualMoney` = "+str(args["actualMoney"])+", `accumulation` = "+str(args["accumulation"])+" WHERE `projectName` = '"+args["projectName"]+"';"
        print sql
        cursor.execute(sql)
        conn.commit()
        cursor.close()
        conn.close()
        return args


# index -- index data
class indexdata(Resource):
    def post(self):
        print "/indexsave POST"
        parser.add_argument('projectName', type=unicode)
        parser.add_argument('quarter', type=str)
        args = parser.parse_args()

        conn, cursor = get_conn()

        sql = "SELECT f1._id, f1.employeeId, em.employeeName, f1.result AS form1score, f1.description AS form1description, f2.totalList AS form2ScoreList FROM `form1` AS f1, `form2` AS f2, `employeeinfo` AS em WHERE f1._id = f2._id AND f1.employeeId = em.employeeId AND f1.projectName = '"+args["projectName"]+"' AND f1.quarter = '"+args["quarter"]+"';"
        cursor.execute(sql)
        result = cursor.fetchall()

        for i in range(0, len(result)):
            result[i]["form2ScoreList"] = strtolist(result[i]["form2ScoreList"])
            result[i]["form2ScoreList"] = map(int, result[i]["form2ScoreList"])
            result[i]["form2Score"] = sum(result[i]["form2ScoreList"])/5.0  # num of questions
        args["resultList"] = result

        cursor.close()
        conn.close()
        return args


api.add_resource(status, '/')  # API server's status
###############################################################################
api.add_resource(projects, '/projects')
api.add_resource(employeeinfo, '/employeeinfo/<employeeId_>')
api.add_resource(form1data, '/form1data/<employeeId_>')
api.add_resource(form2data, '/form2data')
api.add_resource(indexsave, '/indexsave')
api.add_resource(indexdata, '/indexdata')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, threaded=True, debug=False)
    # app.run(host="0.0.0.0", port=3000, threaded=True, debug=True)
