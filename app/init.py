import sys
import os

project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if project_path not in sys.path:
    sys.path.insert(0, project_path)

from flask import Flask
from flask_wtf.csrf import CSRFProtect, CSRFError
from config import config

from models.models import User
from exts import db, login_manager
from controllers.init import router

def create_app(config_object=config.DevConfig):
    main = Flask(__name__)
    main.config.from_object(config_object)
    CSRFProtect(main)
    register_extensions(main)
    main.register_blueprint(router)
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

