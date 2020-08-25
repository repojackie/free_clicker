from flask import Flask, render_template, session, request, redirect
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bagels123are123delicious'

socketio = SocketIO(app)

@app.route('/')
def index_login():
    return render_template('login.html')

@app.route('/mainpage')
@login_required
def mainpage():
    return render_template("mainpage.html")

if __name__ == "__main__":
    socketio.run(app, debug=True)
