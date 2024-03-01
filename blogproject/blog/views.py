from django.core.mail import send_mail
from django.dispatch import receiver
from allauth.account.signals import user_signed_up
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .serializers import *
from rest_framework.response import Response


class PostListPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 5

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = PostListPagination

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly, )
    #authentication_classes = (TokenAuthentication, )  #разрешает аутентификацию только по токенам

class ImageList(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (IsOwnerOrReadOnly,)

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrReadOnly, )


# @receiver(user_signed_up)
# def user_signed_up_handler(request, user, **kwargs):
#     subject = 'Приветствую тебя, Путник'
#     message = 'ТЕПЕРЬ ТЫ ЧАСТЬ ЭТОГО ЦИРКА!'
#     from_email = 'kingstudy.olonichev@gmail.com'
#     to_email = user.email
#
#     send_mail(subject, message, from_email, [to_email])