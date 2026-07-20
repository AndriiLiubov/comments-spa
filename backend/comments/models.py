from django.db import models

from .validators import username_validator


class CommentAuthor(models.Model):
    username = models.CharField(
        max_length=100,
        validators=[username_validator],
    )

    email = models.EmailField(unique=True)

    homepage = models.URLField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["username"]
        verbose_name = "Comment Author"
        verbose_name_plural = "Comment Authors"

    def __str__(self):
        return self.username


class Comment(models.Model):
    author = models.ForeignKey(
        CommentAuthor,
        on_delete=models.CASCADE,
        related_name="comments",
    )

    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
    )

    text = models.TextField()

    file = models.FileField(
        upload_to="attachments/",
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Comment"
        verbose_name_plural = "Comments"

    def __str__(self):
        return f"Comment #{self.pk} by {self.author.username}"
