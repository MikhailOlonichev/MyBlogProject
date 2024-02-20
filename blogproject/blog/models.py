from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Post(models.Model):
    '''information about post'''
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    create_time = models.DateField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField()

    def __str__(self):
        return f'/image for {self.post.title}'
