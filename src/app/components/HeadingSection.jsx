const HeadingSection = ({ tagline, title, children, className = "" }) => {
  return (
    <div className={className}>
      {tagline && (
        <p className="text-(length:--tag-size)! font-medium">{tagline}</p>
      )}
      <div className="flex max-w-215 flex-col gap-4">
        <h3 className="font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default HeadingSection;
