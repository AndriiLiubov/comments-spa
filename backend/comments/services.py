import os

from django.db import transaction

from comments.image_utils import resize_image
from comments.html_sanitizer import sanitize_html
from comments.models import Comment, CommentAuthor


@transaction.atomic
def create_comment(validated_data):
    author, _ = CommentAuthor.objects.get_or_create(
        email=validated_data["email"],
        defaults={
            "username": validated_data["username"],
            "homepage": validated_data.get("homepage", ""),
        },
    )

    uploaded_file = validated_data.get("file")

    if uploaded_file:
        extension = os.path.splitext(uploaded_file.name)[1].lower()

        if extension in {".jpg", ".jpeg", ".png", ".gif"}:
            uploaded_file = resize_image(uploaded_file)

    text = sanitize_html(validated_data["text"])

    comment = Comment.objects.create(
        author=author,
        text=text,
        parent=validated_data.get("parent"),
        file=uploaded_file,
    )

    return comment
