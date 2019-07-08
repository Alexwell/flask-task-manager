# -*- coding: utf-8 -*-
# TODO

# import unittest
# from app import db
# from app.models import User


# class UserModelCase(unittest.TestCase):
#     def setUp(self):
#         db.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
#         db.create_all()
#
#     def tearDown(self):
#         db.session.remove()
#         db.drop_all()
#
#     def test_password_hashing(self):
#         u = User(email='testmail@test.test')
#         u.set_password('test_pass')
#         self.assertFalse(u.check_password('wrong_pass'))
#         self.assertTrue(u.check_password('test_pass'))
#
#
# if __name__ == '__main__':
#     unittest.main(verbosity=2)
