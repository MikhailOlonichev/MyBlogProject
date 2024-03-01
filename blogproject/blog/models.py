from tkinter import Image

from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    '''information about post'''
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    create_time = models.DateField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    class Meta:
        ordering = ['-create_time']
        indexes = [
            models.Index(fields=['-create_time']),
        ]

    def __str__(self):
        return self.title


class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images/')
    author = models.ForeignKey(User, on_delete=models.CASCADE)

# class Image(models.Model):
    # post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    # image = models.ImageField(upload_to='post_images/')


    # def __str__(self):
        # return f'Image for {self.post.title}'

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_body = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['-created']),
        ]

    def __str__(self):
        return f'Comment by {self.author} on {self.post}'