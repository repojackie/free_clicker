from exts import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = "User"

    # tmp : what is this?
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80))

    # unsure about this - list of joined sessions
    sessions = db.relationship('Rooms', backref='User', lazy=True)

class Rooms(db.Model):
    __tablename__ = "Rooms"
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column("User", db.ForeignKey('User.username')) # links to username (!!)
    room_key = db.Column(db.String(20), unique=True)
    room_pwd = db.Column(db.String(20))

    # tmp : do I even need this here?
    __table_args__ = {'extend_existing': True}
