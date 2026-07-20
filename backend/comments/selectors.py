from comments.models import Comment


def get_comments():
    return (
        Comment.objects.filter(parent__isnull=True)
        .select_related("author")
        .prefetch_related("children")
    )
