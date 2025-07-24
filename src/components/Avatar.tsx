import { cls } from "@/lib/dom";

interface Props extends React.ComponentProps<"span"> {}

function Avatar({ children, className, ...props }: Props) {
  return (
    <span
      {...props}
      className={cls(
        "inline-flex items-center justify-center rounded-full overflow-hidden ",
        className
      )}
    />
  );
}

export default Avatar;
