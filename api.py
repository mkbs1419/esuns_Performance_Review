# -*- coding: utf-8 -*-
# File: api.py 2018-04-23 for localhost:5000
from flask import Flask
# from flask_cors import CORS
from flask_restful import Resource, Api, fields, marshal_with
import pymysql.cursors
from datetime import datetime, timedelta


app = Flask(__name__)
# CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

SERVER_name = 'localhost'

# layout fields
AP_fields = {
    'id': fields.Integer,
    'date': fields.DateTime(dt_format='iso8601'),
    'Id_Number': fields.String,
    'PC_name': fields.String,
    'AP_version': fields.String(default='1.0')
}


def get_conn(dbname):
    conn = pymysql.connect(host='localhost',
                             user='root',
                             password='root',
                             db='esuns_performance_bonus',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()
    return conn, cursor


# def execute_sql(cursor):
#     columns = [column[0] for column in cursor.description]
#     # print 'columns', columns
#     results = []
#     for row in cursor.fetchall():
#         results.append(dict(zip(columns, row)))
#     return results


class status(Resource):
    def get(self):
        response = [
            'API is running OK'
        ]
        return response
        
# login -- projectinfo
class projects(Resource):
    def get(self):
        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT * FROM `projectinfo`"
        cursor.execute(sql)
        result = cursor.fetchall()

        print "/projects"

        cursor.close()
        conn.close()
        return result


# class AP_record_day(Resource):
#     def get(self, day_num):
#         conn, cursor = get_conn('Esuns_Collector_Data')

#         today, ago = get_today(int(day_num))
#         sql = "SELECT [id],[date],[Id_Number],[PC_name],[AP_version] FROM [Esuns_Collector_Data].[dbo].[AP_Record] WHERE [date] > '" + str(ago) + "'"

#         cursor.execute(sql)
#         result = execute_sql(cursor)

#         response = {"show_days": day_num, "earliest_date": ago}
#         response["data"] = result

#         cursor.close()
#         conn.close()
#         return response



api.add_resource(status, '/')  # API server's status
###############################################################################
api.add_resource(projects, '/projects')

# api.add_resource(AP_record, '/AP_record')  # Shows AP_Record today's data
# api.add_resource(AP_record_day, '/AP_record/<day_num>')  # Shows the data for # days

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
    # app.run(port=5000, debug=True)
