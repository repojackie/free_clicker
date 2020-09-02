"""
Helper functions to try and steer away from the massive file 
that is being made in app.py
"""
import random

def gen_num(digits):
    """
    Function for generating a random number with {digits} amount of digits
    """
    num = ""
    for i in range(0, digits):
        num = num + str(random.randint(0, 9))
    return num

def get_room_info(room_list, db):
    """
    
    """
    pass
