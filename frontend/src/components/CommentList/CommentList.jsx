import { useEffect, useState } from "react";
import api from "../../api/api";
import CommentItem from "../CommentItem/CommentItem";

function CommentList({ refreshKey, onReply }) {
  const [comments, setComments] = useState([]);
  const [ordering, setOrdering] = useState("-created_at");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    loadComments();
  }, [ordering, page, refreshKey]);

  const loadComments = async () => {
    try {
      const response = await api.get("comments/", {
        params: {
          ordering,
          page,
        },
      });

      setComments(response.data.results);
      setCount(response.data.count);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="comments-toolbar">
        <h2 className="comments-count">Comments ({count})</h2>

        <div className="sort-box">
          <label>Sort by</label>

          <select
            value={ordering}
            onChange={(e) => {
              setOrdering(e.target.value);
              setPage(1);
            }}
          >
            <option value="-created_at">Newest first</option>
            <option value="created_at">Oldest first</option>
            <option value="username">Username (A-Z)</option>
            <option value="-username">Username (Z-A)</option>
            <option value="email">Email (A-Z)</option>
            <option value="-email">Email (Z-A)</option>
          </select>
        </div>
      </div>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
      <div className="pagination">
        <button
          disabled={!previous}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="page-number">Page {page}</span>

        <button disabled={!next} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CommentList;
