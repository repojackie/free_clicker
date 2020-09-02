class Config:
    """ Base config """
    SECRET_KEY = 'sdvlnaskvnsdlnjvsdfvb' # should use os.environ.get() 
    STATIC_FOLDER = 'static'
    TEMPLATE_FOLDER = 'templates'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_TIME_LIMIT = 3600

class ProdConfig(Config):
    FLASK_ENV = 'production'
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = '' # don't know this yet...

class DevConfig(Config):
    Flask_ENV = 'development'
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:////home/jackie/Documents/projects/free_clicker/app/Database.db'
