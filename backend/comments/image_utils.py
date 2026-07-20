from io import BytesIO
from pathlib import Path

from django.core.files.base import ContentFile
from PIL import Image


MAX_SIZE = (320, 240)


def resize_image(uploaded_file):
    image = Image.open(uploaded_file)

    image.thumbnail(MAX_SIZE)

    buffer = BytesIO()

    format = image.format or "PNG"

    image.save(buffer, format=format)

    return ContentFile(
        buffer.getvalue(),
        name=Path(uploaded_file.name).name,
    )
