from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email, RegexValidator
from rest_framework import generics, status, permissions
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import *
from rest_framework_simplejwt.exceptions import TokenError

from django.views.decorators.csrf import csrf_exempt

class PostListPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 5


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = PostListPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly,)


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
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class UserPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)


class RegisterView(APIView):
    @csrf_exempt
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        try:
            validate_email(email)
            validate_password(password)
            username_validator = RegexValidator(r'^[A-Za-z0_-]+$', message="Username can only contain letters, numbers, and underscores.")
            username_validator(username)
            
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

        # serializer = UserSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserView(APIView):
    @csrf_exempt
    def get(self, request):
        token = request.headers.get('Authorization')

        if not token:
            raise AuthenticationFailed('Unauthenticated user!!!')

        try:
            prefix, token = token.split()   #проверка формата токена
            if prefix != 'Bearer':
                raise AuthenticationFailed('Invalid token prefix')

            access_token = AccessToken(token)   #расшифровка токена

            user_id = access_token.payload['user_id']   #по айдишнику определяем пользователя

        except Exception as e:
            raise AuthenticationFailed('Invalid or expired token') from e

        return Response({'user_id': user_id,
                         'username': request.user.username,
                         'email': request.user.email
                         })


class LogoutView(APIView):
    @csrf_exempt
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Succesful logout!'
        }
        return response
