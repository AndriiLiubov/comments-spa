from rest_framework import serializers

from comments.models import Comment, CommentAuthor
from captcha.models import CaptchaStore

from comments.validators import username_validator
from comments.file_validators import validate_uploaded_file


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentAuthor
        fields = (
            "username",
            "email",
            "homepage",
        )


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = (
            "id",
            "author",
            "text",
            "file",
            "created_at",
            "children",
        )

    def get_children(self, obj):
        serializer = CommentSerializer(
            obj.children.all(),
            many=True,
            context=self.context,
        )
        return serializer.data


class CreateCommentSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=100,
        validators=[username_validator],
    )

    email = serializers.EmailField()

    homepage = serializers.URLField(
        required=False,
        allow_blank=True,
    )

    text = serializers.CharField()

    parent = serializers.PrimaryKeyRelatedField(
        queryset=Comment.objects.all(),
        required=False,
        allow_null=True,
    )

    file = serializers.FileField(
        required=False,
        allow_null=True,
    )

    captcha_key = serializers.CharField()

    captcha_value = serializers.CharField()

    def validate_file(self, value):
        validate_uploaded_file(value)
        return value

    def validate(self, attrs):
        captcha = CaptchaStore.objects.filter(
            hashkey=attrs["captcha_key"],
            response=attrs["captcha_value"].lower(),
        ).first()

        if not captcha:
            raise serializers.ValidationError({"captcha": "Invalid CAPTCHA."})

        captcha.delete()

        return attrs
