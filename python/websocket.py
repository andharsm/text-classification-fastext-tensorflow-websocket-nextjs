from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from model import match_data

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins for testing

# Your existing code...

@socketio.on('text_input')
def handle_text_input(text):
    print('Received text:', text)
    
    # Process the text using your existing match_data function
    label, score = match_data(text)

    print('label:', label, '\nscore:', score)

    # Emit the result back to the client
    emit('result', {'label': label, 'score': score})
    print('berhasil emit')

if __name__ == '__main__':
    socketio.run(app, debug=True)
