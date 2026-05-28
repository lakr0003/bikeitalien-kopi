import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const variants = {
  primary:
    "bg-(--button-dark) text-(--text-secondary) [font-size:var(--p-size)] hover:scale-[1.02]",
  secondary:
    "bg-(--button-light) text-(--text-primary) [font-size:var(--p-size)] hover:bg-(--card-background) hover:scale-[1.02] border border-(--button-dark)",
  accent:
    "bg-(--accent) text-(--text-primary) [font-size:var(--p-size)] hover:scale-[1.02]",
  icon: "bg-(--button-dark) text-(--text-secondary) px-4 py-4 rounded-full hover:scale-[1.02]",
};

const Button = ({
  variant = "primary",
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}) => {
  const Icon =
    icon === false
      ? null
      : (icon ??
        (iconPosition === "left" ? IoIosArrowBack : IoIosArrowForward));

  const showIcon = variant === "icon" || children;

  if (variant === "icon") {
    return (
      <button
        className={`cursor-pointer flex items-center justify-center rounded-full p-4 bg-(--button-dark) text-(--text-secondary) hover:scale-[1.02] transition-transform ${className}`}
        {...props}
      >
        <span className="pointer-events-none inline-flex">
          {Icon && <Icon size={22} />}
        </span>
      </button>
    );
  }

  return (
    <button
      className={`group flex cursor-pointer items-center justify-center gap-2 rounded-[20px] px-4 py-3 font-medium transition-transform ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && showIcon && (
        <span className="-ml-1 inline-flex transition-transform duration-200 group-hover:-translate-x-1">
          <Icon size={22} />
        </span>
      )}
      {children && (
        <span
          className={`inline-flex transition-transform duration-200 ${
            Icon && iconPosition === "left"
              ? "group-hover:translate-x-1"
              : Icon && iconPosition === "right"
                ? "group-hover:-translate-x-1"
                : ""
          }`}
        >
          {children}
        </span>
      )}
      {Icon && iconPosition === "right" && showIcon && (
        <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
          <Icon size={22} />
        </span>
      )}
    </button>
  );
};

export default Button;
