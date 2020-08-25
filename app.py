from flask import Flask, request, render_template, redirect, url_for
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'anarbitrarykeysowhatevs123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
socketio = SocketIO(app)

class User(UserMixin, db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80))

    # unsure about this - list of joined sessions
    sessions = db.Column(db.Text())

class Rooms(db.Model):
    __tablename__ = "Rooms"
    id = db.Column(db.Integer, primary_key=True)
    owner = relationship("User", back_populates="Rooms" # links to username (!!)
    room_key = db.Column(db.String(20), unique=True)

# sign in page 
    # Student table - username, password, respective email

# select classes page
    # Room page - Owner, key to room, attendees 

# student view - multiple choice/multimedia/short response
    # live response to what the teacher emits 

# teacher view - serve out questions 
    # collect and save responses onto local computer from the students

