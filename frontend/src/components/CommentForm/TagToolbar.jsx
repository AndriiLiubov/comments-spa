function TagToolbar({ insertTag }) {
  return (
    <div className="toolbar">
      <button
        type="button"
        title="Bold"
        onClick={() => insertTag("<strong>", "</strong>")}
      >
        <strong>B</strong>
      </button>

      <button
        type="button"
        title="Italic"
        onClick={() => insertTag("<i>", "</i>")}
      >
        <em>I</em>
      </button>

      <button
        type="button"
        title="Code"
        onClick={() => insertTag("<code>", "</code>")}
      >
        {"</>"}
      </button>

      <button
        type="button"
        title="Link"
        onClick={() => insertTag('<a href="" title="">', "</a>")}
      >
        🔗
      </button>
    </div>
  );
}

export default TagToolbar;
