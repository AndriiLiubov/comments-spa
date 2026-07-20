import { useEffect, useRef, useState } from "react";
import api from "../../api/api";

import DOMPurify from "dompurify";

import TagToolbar from "./TagToolbar";
import Captcha from "./Captcha";
import FileUpload from "./FileUpload";

function CommentForm({ onCommentCreated, parentComment, onCancelReply }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    homepage: "",
    text: "",
    file: null,
    captcha_key: "",
    captcha_value: "",
    parent: null,
  });

  const [errors, setErrors] = useState({});

  const [captchaImage, setCaptchaImage] = useState("");

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!parentComment) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      parent: parentComment.id,
    }));
  }, [parentComment]);

  useEffect(() => {
    loadCaptcha();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = "Only Latin letters and numbers are allowed.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email.";
    }

    if (formData.homepage) {
      try {
        new URL(formData.homepage);
      } catch {
        newErrors.homepage = "Invalid URL.";
      }
    }

    if (!formData.text.trim()) {
      newErrors.text = "Comment is required.";
    }

    if (!formData.captcha_value.trim()) {
      newErrors.captcha = "CAPTCHA is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const loadCaptcha = async () => {
    try {
      const response = await api.get("comments/captcha/");

      setCaptchaImage(response.data.image);

      setFormData((prev) => ({
        ...prev,
        captcha_key: response.data.key,
        captcha_value: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    if (name === "captcha_value") {
      setErrors((prev) => ({
        ...prev,
        captcha: undefined,
      }));
    }
  };

  const handleFileChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      file: event.target.files[0] || null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();

    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("homepage", formData.homepage);
    data.append("text", formData.text);
    data.append("captcha_key", formData.captcha_key);
    data.append("captcha_value", formData.captcha_value);

    if (formData.parent) {
      data.append("parent", formData.parent);
    }

    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await api.post("comments/", data);

      console.log(response.data);

      onCommentCreated();

      setErrors({});

      onCancelReply();

      setFormData({
        username: "",
        email: "",
        homepage: "",
        text: "",
        file: null,
        captcha_key: "",
        captcha_value: "",
        parent: null,
      });

      loadCaptcha();
    } catch (error) {
      console.error(error.response?.data);

      if (error.response?.data) {
        setErrors((prev) => ({
          ...prev,
          ...error.response.data,
        }));
      }
    }
  };

  const insertTag = (startTag, endTag = "") => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = formData.text.substring(start, end);

    const newText =
      formData.text.substring(0, start) +
      startTag +
      selectedText +
      endTag +
      formData.text.substring(end);

    setFormData((prev) => ({
      ...prev,
      text: newText,
    }));

    requestAnimationFrame(() => {
      textarea.focus();

      textarea.setSelectionRange(
        start + startTag.length,
        end + startTag.length,
      );
    });
  };

  console.log(errors);

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <form className="comment-form" onSubmit={handleSubmit}>
          {parentComment && (
            <div
              style={{
                marginBottom: "20px",
                padding: "10px",
                background: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              Replying to:
              <strong> {parentComment.author.username}</strong>
            </div>
          )}

          <div className="form-header">
            <h2>Add Comment</h2>

            <button
              type="button"
              className="close-button"
              onClick={onCancelReply}
            >
              ✕
            </button>
          </div>

          <div>
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {errors.email && <div className="error">{errors.email}</div>}

          <div>
            <label>Homepage</label>

            <input
              type="url"
              name="homepage"
              value={formData.homepage}
              onChange={handleChange}
            />
            {errors.homepage && <div className="error">{errors.homepage}</div>}
          </div>

          <div>
            <label>
              Attachment (Only JPG, PNG, GIF and TXT files are allowed)
            </label>

            <FileUpload
              file={formData.file}
              onChange={handleFileChange}
              onRemove={() =>
                setFormData((prev) => ({
                  ...prev,
                  file: null,
                }))
              }
            />

            {errors.file && (
              <div className="error">
                {Array.isArray(errors.file) ? errors.file[0] : errors.file}
              </div>
            )}
          </div>

          <div>
            <label>Comment</label>

            <TagToolbar insertTag={insertTag} />

            <textarea
              ref={textareaRef}
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={6}
            />

            {errors.text && <div className="error">{errors.text}</div>}

            <h3 className="preview-title">Live Preview</h3>

            <div
              className="preview-box"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(formData.text),
              }}
            />
          </div>

          <Captcha
            captchaImage={captchaImage}
            captchaValue={formData.captcha_value}
            onChange={handleChange}
            onRefresh={loadCaptcha}
            error={errors.captcha}
          />

          {Object.values(errors).some((value) => value) && (
            <div className="form-error-summary">
              ⚠️ Please fix the highlighted errors before submitting the form.
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancelReply}
            >
              Cancel
            </button>

            <button type="submit" className="submit-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
