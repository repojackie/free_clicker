from flask import Flask, render_template, session, request, redirect
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bagels123are123delicious'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlitte://test.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))

    def __init__(self, username, password):
        self.username = username
        self.password = password


@app.route('/', methods=['GET', 'POST'])
def index_login():
    if not session.get('logged_in'):
        return render_template('login.html')
    return render_template('login.html')

@app.route('/mainpage')
@login_required
def mainpage():
    return render_template("mainpage.html")

if __name__ == "__main__":
    socketio.run(app, debug=True)
