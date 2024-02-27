from django.urls import path, include, re_path
from rest_framework_simplejwt.views import *

from .views import *

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('postsdelete/<int:pk>', PostDestroyView.as_view()),

    path('session-auth/', include('rest_framework.urls')),   #авторизация по сессии

    path('auth/', include('djoser.urls')),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('posts/comment/', CommentListCreateView.as_view(), name='post_comment'),



    path('images/', ImageView.as_view(), name='image-create'),

    # path('create/<int:pk>/', PostDetailView.as_view(), name='comment_detail'),

    # path('images/upload/', ImageUploadView.as_view(), name='image-upload'),
]
