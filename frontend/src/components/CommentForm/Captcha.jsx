function Captcha({ captchaImage, captchaValue, onChange, onRefresh, error }) {
  return (
    <div className="captcha">
      <label>CAPTCHA</label>

      {captchaImage && (
        <img src={captchaImage} alt="CAPTCHA" className="captcha-image" />
      )}

      <button type="button" className="captcha-refresh" onClick={onRefresh}>
        Refresh
      </button>

      <input
        type="text"
        name="captcha_value"
        value={captchaValue}
        onChange={onChange}
        placeholder="Enter CAPTCHA"
      />

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Captcha;
