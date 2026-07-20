import { useState } from "react";

import CommentList from "../components/CommentList/CommentList";
import CommentForm from "../components/CommentForm/CommentForm";

function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [parentComment, setParentComment] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCommentCreated = () => {
    setRefreshKey((prev) => prev + 1);

    setParentComment(null);
    setIsFormOpen(false);
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Comments SPA</h1>

          <p className="page-subtitle">
            Share your thoughts with the community.
          </p>
        </div>

        <button
          className="add-comment-button"
          onClick={() => {
            setParentComment(null);
            setIsFormOpen(true);
          }}
        >
          + New Comment
        </button>
      </div>

      {isFormOpen && (
        <CommentForm
          parentComment={parentComment}
          onCommentCreated={handleCommentCreated}
          onCancelReply={() => {
            setParentComment(null);
            setIsFormOpen(false);
          }}
        />
      )}

      <CommentList
        refreshKey={refreshKey}
        onReply={(comment) => {
          setParentComment(comment);
          setIsFormOpen(true);
        }}
      />
    </div>
  );
}

export default Home;
