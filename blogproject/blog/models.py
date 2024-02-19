from django.contrib.auth.models import User
from django.db import models


# Create your models here.

# class Post(models.Model):
#     title = models.CharField(max_length=255)
#     content = models.TextField(blank=True)
#     # author = models.ForeignKey(User, on_delete=models.CASCADE)  КАК ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
#     create_time = models.DateTimeField(auto_now_add=True)
#     update_time = models.DateTimeField(auto_now=True)
#
#
# class Image(models.Model):
#     pass
