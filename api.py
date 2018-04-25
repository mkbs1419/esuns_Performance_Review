# -*- coding: utf-8 -*-
# File: api.py 2018-04-23 for localhost:3000
from flask import Flask
# from flask_cors import CORS
from flask_restful import Resource, Api, fields, marshal_with, reqparse
import pymysql.cursors
from datetime import datetime, timedelta

app = Flask(__name__)
# CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

SERVER_name = 'localhost'

parser = reqparse.RequestParser()

# layout fields
testList_fields = {
    'arriveDate': fields.String(default=''),  # fields.DateTime(dt_format='iso8601')
    'employeeDepartment': fields.String,
    'employeeGroup': fields.String,
    'employeeId': fields.String,
    'employeeLevel': fields.String,
    'employeeName': fields.String,
    'form1Result': fields.List,
    'form1Score': fields.List,
    'form2Score': fields.List,
    'form1Status': fields.Boolean(default=False),
    'form2Status': fields.Boolean(default=False),
    'regularDate': fields.String(default=''),
    'reviewDate': fields.String(default=''),
    'reviewNote': fields.String(default='')
}


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
        sql = "SELECT projectName, contractValue, quarter, actualMoney, accumulation, fillingPerson, testList FROM `projectinfo` WHERE projectName = \"" + args["project"] + "\" AND password = \"" + args["password"] + "\""
        cursor.execute(sql)

        result = cursor.fetchone()
        result["testList"] = result["testList"].split(",")

        if (result):
            print "Access Allow"
            cursor.close()
            conn.close()
            return [True, result], 201
        else:
            print "Access Denied"
            cursor.close()
            conn.close()
            return [False, {"projectName": args["project"]}], 201

# index -- employeeinfo
class employeeinfo(Resource):
    # @marshal_with(testList_fields, envelope='resource')
    def post(self):
        print "/employeeinfo POST"
        parser.add_argument('testList', action='append')
        args = parser.parse_args()

        testList = args["testList"]

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


api.add_resource(status, '/')  # API server's status
###############################################################################
api.add_resource(projects, '/projects')
api.add_resource(employeeinfo, '/employeeinfo')

# api.add_resource(AP_record, '/AP_record')  # Shows AP_Record today's data
# api.add_resource(AP_record_day, '/AP_record/<day_num>')  # Shows the data for # days

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=False)
    # app.run(port=3000, debug=True)
