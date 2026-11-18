import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/** Password field with an eye button to show / hide what was typed. */
export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mp-password-wrap">
      <input {...props} type={visible ? "text" : "password"} />
      <button
        type="button"
        className="mp-password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        title={visible ? "Hide password" : "Show password"}
        disabled={props.disabled}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
