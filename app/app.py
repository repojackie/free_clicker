from flask import Flask, request, render_template, redirect, url_for, Blueprint
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, login_required, logout_user, current_user
import random
from exts import db, login_manager 
from utils import gen_num
from models import User, Rooms
import config

def create_app(config_object=config.DevConfig):
    main = Flask(__name__)
    main.config.from_object(config_object)
    register_extensions(main)
    return main

def register_extensions(main):
    db.init_app(main)
    login_manager.init_app(main)
    login_manager.login_view = 'login'
    
    @login_manager.user_loader
    def load_user(id):
        """ 
        this callback is used to reload the user object from the user
        ID stored in session 
        """
        return User.query.get(int(id))

    @login_manager.unauthorized_handler
    def unauthorized_callback():
        return redirect(url_for('app.login'))
    
    return main

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
                return redirect(url_for("app.classes"))
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
            return redirect(url_for('app.classes'))

    return render_template('login.html', len_messages=len(messages), messages=messages, verified=False)

def get_room_info(rooms):
    """
    :inputs: list of Rooms
    
    :outputs: list of Rooms owner, name, and code
    """
    owner = []
    code = [] 
    pwd = []

    for room in rooms:
        this_room = Rooms.query.filter_by(id=room.id).first()
        owner.append(this_room.owner)
        code.append(this_room.room_key)
        pwd.append(this_room.room_pwd)

    return owner, code, pwd

# select classes page
    # Room page - Owner, key to room, attendees 
@app.route('/classes', methods=['GET', 'POST'])
@login_required
def classes():
    # sessions owned by the user
    sessions = Rooms.query.filter_by(owner=current_user.username).all()
    print("Sessions: " + str(sessions))
    print("Running the ID thing: " + str(get_room_info(sessions)))
    
    tmp_sesh = User.query.filter_by(username=current_user.username).first()
    user_sessions  = tmp_sesh.sessions
    print("User-owned sessions: " + str(user_sessions))
    
    # this part of the script is a little ugly
    if request.method == "POST":
        # start a ready-made session
        if request.form.get('start') is not None:
            return render_template('classes.html', sessions=sessions, join_session=False)
        # join someone elses session
        elif request.form.get('join') is not None:
            # join a session owned by another user
            return render_template('classes.html', sessions=user_sessions, join_session=True)
        # create a session or add a new session to join
        elif request.form.get('create_add') is not None:
            # create a new session or add an existing session
            return(render_template('create.html'))

    return render_template('classes.html', join_session=True, sessions=user_sessions)

# for creating new classes/sessions
@app.route('/create', methods=["GET", "POST"])
def create():
    owner = current_user.username

    # autogen unique id, 10 digits
    new_id = gen_num(10)
    room_pwd = ""
    passcode = ""

    # passcode for entry?
    if request.method == "POST":
        if request.form.get('join_existing') is not None:
            # for joining an existing session 
            return redirect(url_for('app.join_existing'))
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

@app.route('/join_existing', methods=["GET", "POST"])
def join_existing():
    if request.method == "POST":
        room = request.form.get('code')
        pwd = request.form.get('pass')
        joinable = Rooms.query.filter_by(room_key=room, room_pwd=pwd).first()
        
        if joinable is not None:
            # add the user to the session
            curr_user = User.query.filter_by(username=current_user.username).first()
            curr_user.sessions = curr_user.sessions + ' , '  + room 
            db.session.commit()
            return redirect(url_for('app.classes'))

        message = "The session code and/or the password was incorrect. Are you sure the session exists?"
        return render_template('join_existing.html', message=message)
    return render_template('join_existing.html')

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
    app = create_app()
    socketio = SocketIO(app)
    socketio.run(app, debug=True)

