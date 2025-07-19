import { cls } from "@/lib/dom";

interface Props extends React.ComponentProps<"span"> {}

function Avatar({ children, className }: Props) {
  return (
    <span
      className={cls(
        "inline-flex items-center justify-center rounded-full overflow-hidden ",
        className
      )}>
      {children}
    </span>
  );
}

export default Avatar;
