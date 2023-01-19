from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import ast


app = Flask(__name__)
CORS(app)
api = Api(app)


class Hello(Resource):
    def get(self):
        return {'message': 'Hello'}, 200


class Question(Resource):

    def post(self):
        # parser = reqparse.RequestParser()

        # parser.add_argument('q', required=True)

        q = request.args.get("q")

        # return data with 200 OK
        return {'question_asked': q, 'ChatGbt_answer': q}, 200

    def get(self):
        return {'message': 'Hello'}, 200


api.add_resource(Hello, '/hello')

api.add_resource(Question, '/question')


if __name__ == '__main__':
    app.run()
