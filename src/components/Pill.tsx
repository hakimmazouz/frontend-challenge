interface Props extends React.ComponentProps<"div"> {}

function Pill({ children }: Props) {
  return (
    <div className="pill bg-stone-600 inline-flex p-1 rounded-full items-center">
      <p className="leading-[1] text-xs opacity-80 pr-1 space-x-1.5 items-center justify-center flex">
        {children}
      </p>
    </div>
  );
}

export default Pill;
