from rest_framework import serializers
from .models import *



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

# class ImageSerializer(serializers.ModelSerializer):
    # class Meta:
        # model = Image
        # fields = ('id', 'image')



class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)
    author = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    # images = ImageSerializer(many=True, read_only=True)
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    likes = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Post
        fields =  ('id', 'author', 'title', 'content', 'create_time', 'comments', 'likes', 'likes_count')

    def get_likes_count(self, obj):
        return obj.likes.count()

