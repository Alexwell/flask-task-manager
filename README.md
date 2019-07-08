#Commands

Flask:
```sh
 $ export FLASK_APP=task_manager.py
 $ export FLASK_ENV=development
 $ export FLASK_DEBUG=1
 ```

DB initialization:
```sh
 $ flask db init 
```

 DB migration: 
```sh 
$ flask db migrate -m "name"
$ flask db upgrade
```
Mail error reports for local mail server:
```sh
$ python -m smtpd -n -c DebuggingServer localhost:8025
$ export MAIL_SERVER=localhost
$ export MAIL_PORT=8025
```
Mail error reports for gmail:
```sh
$ export MAIL_SERVER=smtp.googlemail.com
$ export MAIL_PORT=587
$ export MAIL_USE_TLS=1
$ export MAIL_USERNAME=test_mail@gmail.com
$ export MAIL_PASSWORD=pAsswoRd
```
Run tests:
```sh
$ python tests.py
```

Heroku:

```sh
$ heroku login
$ heroku apps:create app-name
$ heroku addons:add heroku-postgresql:hobby-dev
$ heroku config:set FLASK_APP=task_manager.py
$ git push heroku master
```