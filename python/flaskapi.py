from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS  # Import CORS from flask_cors
from model import match_data

app = Flask(__name__)
api = Api(app)
CORS(app)  # Enable CORS for all routes

class TextInputResource(Resource):
    def post(self):
        try:
            data = request.get_json()

            if 'textInput' not in data:
                return jsonify({'error': 'Missing textInput parameter'}), 400

            text_input = data['textInput']

            # Process the text using your existing match_data function
            label, score = match_data(text_input)

            return jsonify({'label': label, 'score': score})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

api.add_resource(TextInputResource, '/text_input')

if __name__ == '__main__':
    app.run(debug=True)
