#!/bin/sh

#if [ "$DATABASE" = "postgres" ]
#then
    #echo "Waiting for postgres..."
    
    #while ! nc -z $DB_HOST $DB_PORT; do
      #sleep 0.1
    #done
    
    #echo "PostgreSQL started"
#fi

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py collectstatic --no-input

gunicorn blogproject.wsgi:application --bind 0.0.0.0:8000

#echo "from django.contrib.auth.models import User;
#User.objects.filter(email='$DJANGO_ADMIN_EMAIL').delete();
#User.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')" | python manage.py shell

#exec "$@"