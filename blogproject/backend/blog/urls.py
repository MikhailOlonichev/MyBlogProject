from collections import UserList
from django.urls import path, include, re_path
from .views import *
from rest_framework_simplejwt.views import *

urlpatterns = [
    path('posts/', PostList.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    
    # path('api-auth/logout/', LogoutView.as_view(), name='logout'),
    # path('api-auth/', include('rest_framework.urls')),
    # path('user-posts/', UserPostsListView.as_view(), name='user-posts-list'),
    
    path('auth/', include('djoser.urls')),

    path('comments/', CommentList.as_view()),
    path('comments/<int:pk>/', CommentDetail.as_view()),

    path('images/', ImageList.as_view(), name='image-create'),
    path('images/<int:pk>/', ImageDetail.as_view()),

    path('test/', SendSomeData.as_view(), name='test'),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user-list'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/', TokenRefreshView.as_view(), name='token-refresh')
]
