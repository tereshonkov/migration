import styles from "./Button.module.css";
import { Link } from "@/i18n/navigation";

interface ButtonProps {
  children: React.ReactNode;
  link?: string;
  className?: string;
}

export default function Button({ children, link, className }: ButtonProps) {
  const classNames = [styles.btn, className].filter(Boolean).join(" ");

  if (link) {
    return (
      <Link href={link} className={classNames}>
        {children}
      </Link>
    );
  } else {
    return <button className={classNames}>{children}</button>;
  }
}
