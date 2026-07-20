import { PhotoProvider, PhotoView } from "react-photo-view";

import { getAvatar } from "../../utils/avatar";

function CommentItem({ comment, onReply }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <img
          className="author-avatar"
          src={getAvatar(comment.author.username)}
          alt={comment.author.username}
        />

        <div className="author-info">
          <div className="author">{comment.author.username}</div>

          <div className="date">
            {new Date(comment.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div
        className="message"
        dangerouslySetInnerHTML={{
          __html: comment.text,
        }}
      />

      {comment.file && (
        <div className="attachment">
          {/\.(jpg|jpeg|png|gif)$/i.test(comment.file) ? (
            <PhotoProvider>
              <PhotoView src={comment.file}>
                <img
                  src={comment.file}
                  alt="Attachment"
                  className="attachment-image"
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            <a
              href={comment.file}
              target="_blank"
              rel="noopener noreferrer"
              className="attachment-link"
            >
              📄 View attachment
            </a>
          )}
        </div>
      )}

      <div className="comment-footer">
        <button className="reply-button" onClick={() => onReply(comment)}>
          Reply
        </button>
      </div>

      {comment.children.length > 0 && (
        <div className="children">
          {comment.children.map((child) => (
            <CommentItem key={child.id} comment={child} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
