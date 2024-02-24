from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .serializers import *


class PostListPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 5

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = PostListPagination

class PostDetailView(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly, )
    #authentication_classes = (TokenAuthentication, )  #разрешает аутентификацию только по токенам

class PostDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAdminOrReadOnly, )

class ImageUploadView(APIView):
    pass

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

# class CommentDetailView(generics.RetrieveUpdateAPIView):
    # queryset = Comment.objects.all()
    # serializer_class = CommentSerializer
    # permission_classes = (IsOwnerOrReadOnly, )