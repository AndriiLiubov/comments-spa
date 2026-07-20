from django.core.validators import RegexValidator

username_validator = RegexValidator(
    regex=r"^[A-Za-z0-9]+$",
    message="Only latin letters and digits are allowed.",
)
