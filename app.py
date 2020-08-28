from flask import Flask, request, render_template, redirect, url_for
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'anarbitrarykeysowhatevs123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
socketio = SocketIO(app)

@login_manager.user_loader
def load_user(id):
    """ 
    this callback is used to reload the user object from the user
    ID stored in session 
    """
    return User.query.get(int(id))

@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect(url_for('login'))

class User(UserMixin, db.Model):
    __tablename__ = "User"

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

@app.route('/')
def info():
    return render_template('info.html')

# sign in page 
    # Student table - username, password, respective email
@app.route('/login', methods=['GET', 'POST'])
def login():
    # should use WTForms but eh
    messages = []

    if request.method == "POST":
        # someone already has an account who wants to sign in
        if request.form.get('verify') is not None and request.form['verify']  == 'I already have an account':
            # how to manage signing in on the same page?
            return render_template('login.html', verified=True)

        username_verified = request.form.get('username_verified')
        if username_verified is not None:
            # checking to see if these things are in the db
            password_verified = request.form['password_verified']
            user = User.query.filter_by(username=username_verified, password=password_verified).first()
            print(user)
            if user:
                login_user(user)
                return redirect(url_for('classes'))
            else:
                messages.append("Username/password incorrect. Have you already made an account?")
                return render_template('login.html', messages=messages, verified=False)

    
        username = request.form['username']
        password = request.form['password']
        password2 = request.form['password2']
        email = request.form['email']

        if len(username) < 10:
            messages.append("Username is too short!")
        if password != password2:
            messages.append("Passwords much match.")
        if len(password) < 8:
            messages.append("Password too short")
        if len(email) == 0:
            messages.append("Please enter an email!")

        if (len(messages) == 0):
            user = User(username=username, email=email, password=password)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for('classes'))

    return render_template('login.html', len_messages=len(messages), messages=messages, verified=False)

# select classes page
    # Room page - Owner, key to room, attendees 
@app.route('/classes', methods=['GET', 'POST'])
@login_required
def classes():
    if request.method == "POST":
        # check if it is create new class
        if request.form.get('start') is not None:
            # query database for classes owned by user 
            sessions = Rooms.query.all(owner=current_user.username)
    
            return render_template('classes.html', sessions=sessions)
        elif request.form.get('join') is not None:
            sessions = User.query.filter_by(username=current_user.username)
            print(sessions)

            # join a session owned by another user
            return render_template('classes.html', sessions=sessions)
        elif request.form.get('create_add') is not None:
            # create a new session or add an existing session
            return(render_template('create.html'))

    return render_template('classes.html')

# for creating new classes/sessions
@app.route('/create', methods=["GET", "POST"])
def create():
    owner = current_user.username

    # autogen unique id, 10 digits
    new_id = random.random() * 10               # lets find a new function for this
    room_pwd = ""
    passcode = ""

    # passcode for entry?
    if request.method == "POST":
        passcode = request.form["password"]
        if len(passcode) > 0:
            room_pwd = passcode

    # put the new session into the db!
    try:
        new_session = Rooms(owner=owner, room_key=new_id, room_pwd=room_pwd)
        db.session.add(new_session)
        db.session.commit()
    except:
        # in case an existing ID is somehow used-- this is not very scalable
        new_id = random.random() * 10
        new_session = Rooms(owner=owner, room_key=new_id, room_pwd=room_pwd)
        db.session.add(new_session)
        db.session.commit()
        return '<h1> Looks like something went wrong. </h1>'

    return render_template('create.html', new_id=new_id, passcode=passcode)

# student view - multiple choice/multimedia/short response
@login_required
@app.route('/student')
def student():
    # make sure that the session the student is joining is live

    # find the session id and the teacher who owns it. Is the teacher logged in?

    # use websockets to connect

    pass

# teacher view - serve out questions i
    # collect and save responses onto local computer from the students
@login_required
@app.route('/teacher')
def teacher():
    # 
    pass
if __name__ == "__main__":
    socketio.run(app, debug=True)

