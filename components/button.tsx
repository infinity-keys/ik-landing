import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  href?: string;
  textColor?: "dark" | "light";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  value?: string;
  onClick?: any;
  disabled?: boolean;
}

export default function Button({
  text,
  href,
  textColor = "dark",
  fullWidth = false,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const classes = clsx(
    "bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-lg font-medium text-center text-white hover:text-blue",
    {
      "text-blue": textColor === "light",
      "inline-block": fullWidth === false,
      "block w-full": fullWidth === true,
      isValid: disabled === true,
    }
  );

  if (href) {
    return (
      <Link href={href}>
        <a className={classes}>{text}</a>
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
