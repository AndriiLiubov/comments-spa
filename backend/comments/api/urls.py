from django.urls import path

from comments.api.views import CommentListCreateAPIView
from comments.api.views import CaptchaAPIView

urlpatterns = [
    path(
        "",
        CommentListCreateAPIView.as_view(),
        name="comments",
    ),
    path(
        "captcha/",
        CaptchaAPIView.as_view(),
        name="captcha",
    ),
]
