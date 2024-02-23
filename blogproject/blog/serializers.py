from rest_framework import serializers
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image')

class PostSerializer(serializers.ModelSerializer):
    # images = ImageSerializer(many=True, read_only=True) для работы с моделями
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Post
        fields = '__all__'

