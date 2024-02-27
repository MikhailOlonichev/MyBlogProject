from rest_framework import serializers
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields =  ('id', 'author', 'title', 'content', 'create_time', 'comments')