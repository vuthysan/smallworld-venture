import React from "react";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
  FaMediumM,
} from "react-icons/fa";
function SignFooter() {
  return (
    <div className="footer-menu sign-footer">
      <a
        href="https://t.me/smallworldventure"
        target="_blank"
        rel="noreferrer"
        title="Telegram Community"
      >
        <div>
          <FaTelegramPlane />
        </div>
      </a>
      <a
        href="https://web.facebook.com/smallworldventure/?_rdc=1&_rdr"
        target="_blank"
        rel="noreferrer"
        title="Facebook"
      >
        <div>
          <FaFacebookF />
        </div>
      </a>
      <a
        href="https://twitter.com/smallworldvc"
        target="_blank"
        rel="noreferrer"
        title="Twitter"
      >
        <div>
          <FaTwitter />
        </div>
      </a>
      <a
        href="https://medium.com/smallworldvc"
        target="_blank"
        rel="noreferrer"
        title="Medium"
      >
        <div>
          <FaMediumM />
        </div>
      </a>
    </div>
  );
}

export default SignFooter;
