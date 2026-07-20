from rest_framework.filters import OrderingFilter


class CommentOrderingFilter(OrderingFilter):
    ordering_fields_map = {
        "username": "author__username",
        "email": "author__email",
        "created_at": "created_at",
    }

    def remove_invalid_fields(self, queryset, fields, view, request):
        valid_fields = []

        for field in fields:
            descending = field.startswith("-")
            field_name = field.lstrip("-")

            if field_name in self.ordering_fields_map:
                mapped = self.ordering_fields_map[field_name]

                if descending:
                    mapped = f"-{mapped}"

                valid_fields.append(mapped)

        return valid_fields
