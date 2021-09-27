
export const Button = ({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={className || "bg-blue-500 hover:bg-blue-800 text-blue-50 px-3 py-1 rounded"}
      {...rest}
    />
  );
};
