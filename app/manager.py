from flask_script import Manager
from init import create_app

PORT = 8080
app = create_app()
manager = Manager(app)

@manager.command
def run():
    app.run(port=PORT)

if __name__ == "__main__":
    manager.run()
