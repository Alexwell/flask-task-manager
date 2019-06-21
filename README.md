# $ export FLASK_APP=microblog.py
# $ export FLASK_DEBUG=1

#DB migration: 
## $ flask db migrate -m "name"
## $ flask db upgrade

#mail error reports:
# local mail server:
## $ python -m smtpd -n -c DebuggingServer localhost:8025
## $ export MAIL_SERVER=localhost
## $ export MAIL_PORT=8025

# gmail:
## $ export MAIL_SERVER=smtp.googlemail.com
## $ export MAIL_PORT=587
## $ export MAIL_USE_TLS=1
## $ export MAIL_USERNAME=test_mail@gmail.com
## $ export MAIL_PASSWORD=pAsswoRd

# Run tests:
## $ python tests.py
