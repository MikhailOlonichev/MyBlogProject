from django.urls import path, include, re_path
from rest_framework_simplejwt.views import *                                        
from .views import *

urlpatterns = [
    path('posts/', PostList.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    
    path('api-auth/logout/', LogoutView.as_view(), name='logout'),
    path('api-auth/', include('rest_framework.urls')), 
    path('user-posts/', UserPostsListView.as_view(), name='user-posts-list'),
    
    path('auth/', include('djoser.urls')),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('comments/', CommentList.as_view()),
    path('comments/<int:pk>/', CommentDetail.as_view()),

    path('images/', ImageList.as_view(), name='image-create'),
    path('images/<int:pk>/', ImageDetail.as_view()),


    #path('accounts/', include('allauth.urls')),


    # path('images/', ImageView.as_view(), name='image-create'),

    # path('create/<int:pk>/', PostDetailView.as_view(), name='comment_detail'),

    # path('images/upload/', ImageUploadView.as_view(), name='image-upload'),
]
