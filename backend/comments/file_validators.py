import os

from django.core.exceptions import ValidationError


ALLOWED_EXTENSIONS = {
    ".jpg",
    ".png",
    ".gif",
    ".txt",
}

MAX_TXT_SIZE = 100 * 1024  # 100 KB


def validate_uploaded_file(file):
    if file is None:
        return

    extension = os.path.splitext(file.name)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise ValidationError("Only JPG, PNG, GIF and TXT files are allowed.")

    if extension == ".txt" and file.size > MAX_TXT_SIZE:
        raise ValidationError("TXT file must not exceed 100 KB.")
