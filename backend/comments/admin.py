from django.contrib import admin

from .models import CommentAuthor, Comment


@admin.register(CommentAuthor)
class CommentAuthorAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "homepage",
        "created_at",
    )

    search_fields = (
        "username",
        "email",
    )

    ordering = ("username",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "parent",
        "text",
        "created_at",
    )

    list_filter = ("created_at",)

    search_fields = (
        "author__username",
        "author__email",
        "text",
    )

    autocomplete_fields = (
        "author",
        "parent",
    )

    ordering = ("-created_at",)
