from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from comments.api.serializers import (
    CommentSerializer,
    CreateCommentSerializer,
)
from comments.selectors import get_comments
from comments.services import create_comment
from comments.pagination import CommentPagination
from comments.filters import CommentOrderingFilter
from comments.api.captcha import generate_captcha


class CaptchaAPIView(APIView):
    def get(self, request):
        return Response(generate_captcha(request))


class CommentListCreateAPIView(ListCreateAPIView):
    pagination_class = CommentPagination

    filter_backends = [CommentOrderingFilter]

    ordering_fields = [
        "username",
        "email",
        "created_at",
    ]

    ordering = ["-created_at"]

    def get_queryset(self):
        return get_comments()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateCommentSerializer
        return CommentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        comment = create_comment(serializer.validated_data)

        return Response(
            CommentSerializer(comment).data,
            status=status.HTTP_201_CREATED,
        )
