import { GoArrowUpRight } from "react-icons/go";

const colorClass = {
  dark: "bg-(--text-primary)",
  light: "bg-(--text-secondary)",
};

const Underline = ({ always = false, startZero = false, color = "dark" }) => (
  <div
    className={`h-px w-full origin-left rounded-full transition-transform duration-300 ease-out ${colorClass[color]} ${always ? "scale-x-100" : startZero ? "scale-x-0 group-hover:scale-x-100" : "scale-x-[0.3] group-hover:scale-x-100"}`}
  />
);

const Link = ({
  href,
  variant = "default",
  color = "dark",
  startZero = false,
  className = "",
  children,
  ...props
}) => {
  if (variant === "external") {
    return (
      <a
        href={href}
        className={`group flex w-fit flex-col font-semibold [font-size:var(--p-size)] ${className}`}
        {...props}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          <GoArrowUpRight size={20} />
        </span>
        <Underline color={color} />
      </a>
    );
  }

  if (variant === "small-external") {
    return (
      <a
        href={href}
        className={`group flex w-fit flex-col [font-size:var(--tag-size)] ${className}`}
        {...props}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          <GoArrowUpRight size={16} />
        </span>
        <Underline startZero color={color} />
      </a>
    );
  }

  if (variant === "small") {
    return (
      <a
        href={href}
        className={`group flex w-fit flex-col [font-size:var(--tag-size)] ${className}`}
        {...props}
      >
        <span>{children}</span>
        <Underline startZero color={color} />
      </a>
    );
  }

  if (variant === "p") {
    return (
      <a
        href={href}
        className={`group flex w-fit flex-col [font-size:var(--p-size)] ${className}`}
        {...props}
      >
        <span>{children}</span>
        <Underline startZero color={color} />
      </a>
    );
  }

  if (variant === "underline") {
    return (
      <a
        href={href}
        className={`group flex w-fit flex-col font-semibold [font-size:var(--p-size)] ${className}`}
        {...props}
      >
        <span>{children}</span>
        <Underline color={color} />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`group flex w-fit flex-col font-semibold [font-size:var(--p-size)] ${className}`}
      {...props}
    >
      <span>{children}</span>
      <Underline color={color} />
    </a>
  );
};

export default Link;
