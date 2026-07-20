import { useRef } from "react";

function FileUpload({ file, onChange, onRemove }) {
  const inputRef = useRef(null);

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onRemove();
  };

  return (
    <div className="file-upload">
      <label className="upload-button">
        📎 Choose file
        <input ref={inputRef} type="file" hidden onChange={onChange} />
      </label>

      {file && (
        <div className="selected-file">
          <span>{file.name}</span>

          <button type="button" className="remove-file" onClick={handleRemove}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
