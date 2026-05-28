import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const variants = {
  primary:
    "bg-(--button-dark) text-(--text-secondary) [font-size:var(--p-size)] ",
  accent:
    "bg-(--accent) text-(--text-primary) [font-size:var(--p-size)] ",
};

const LinkButton = ({
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

  return (
    <a
      className={`group flex cursor-pointer items-center justify-center gap-2 rounded-[20px] px-4 py-3 font-medium transition-transform ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && showIcon && (
        <span className="-ml-1 inline-flex transition-transform duration-200 group-hover:-translate-x-1">
          <Icon size={22} />
        </span>
      )}
      {children && variant !== "icon" && (
        <span className={`inline-flex transition-transform duration-200 ${
          Icon && iconPosition === "left" ? "group-hover:translate-x-1" :
          Icon && iconPosition === "right" ? "group-hover:-translate-x-1" : ""
        }`}>
          {children}
        </span>
      )}
      {Icon && iconPosition === "right" && showIcon && variant !== "icon" && (
        <span className="-mr-1 inline-flex transition-transform duration-200 group-hover:translate-x-1">
          <Icon size={22} />
        </span>
      )}
      {Icon && variant === "icon" && <Icon size={22} />}
    </a>
  );
};

export default LinkButton;
