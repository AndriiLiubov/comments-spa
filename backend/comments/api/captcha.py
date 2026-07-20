from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url


def generate_captcha(request):
    key = CaptchaStore.generate_key()

    return {
        "key": key,
        "image": request.build_absolute_uri(captcha_image_url(key)),
    }
