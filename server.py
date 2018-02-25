import functools
import os
import binascii
from flask import Flask, render_template, request, session, redirect
from flask_socketio import SocketIO, send, join_room, leave_room, disconnect
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from random import randint
from pymongo import MongoClient
from models import User

app = Flask(__name__)
app.config['SECRET KEY'] = binascii.hexlify(os.urandom(24))
app.debug = True
socketio = SocketIO(app)
login_manager = LoginManager()
login_manager.init_app(app)

client = MongoClient()
db = client.iquicker

clients = []
codes = []

def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            return False
        else:
            return f(*args, **kwargs)
    return wrapped

@login_manager.user_loader
def load_user(uid):
    res = User.get_by_id(db, uid)
    if res == None:
        return None
    newuser = User(res['uid'], res['first_name'], res['last_name'])
    return newuser

@socketio.on('join-session')
def joined(code):
    socketio.emit()

@socketio.on('joined')
def joined(code):
    clients.append(request.sid)
    codes.append(code)
    room = session.get('room')
    join_room(room)

def generate_code():
    code = randint(999,9999)
    while (code in codes):
        code = randint(999,9999)

    codes.append(code)
    socketio.emit('code', code)

@socketio.on('answer')
def answer(data):
    socketio.emit('answer', data)

@socketio.on('close-question')
def close_question():
    socketio.emit('close-question')

@socketio.on('open-question')
def open_question():
    socketio.emit('open-question')

@socketio.on('new-question')
def new_question():
    socketio.emit('new-question')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/joinsession')
#@login_required
def join_session():
    return render_template("joinsession.html")

@app.route('/chooseanswer')
#@login_required
def choose_answer():
    return render_template("chooseanswer.html")

@app.route('/createsession')
@login_required
def code():
    return render_template("createsession.html")

@app.route('/session')
#@login_required
def session():
    return render_template("chooseanswer.html")
    
@app.route('/controlsession')
#@login_required
def create_session():
    return render_template("controlsession.html", code=codes[len(codes) - 1])

@app.route('/chooseclass')
#@login_required
def choose_class():
    code = randint(999,9999)
    while (code in codes):
        code = randint(999,9999)

    codes.append(code)
    return render_template("chooseclass.html")

if __name__ == "__main__":
    socketio.run(app)