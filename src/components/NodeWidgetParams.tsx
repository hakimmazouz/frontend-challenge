import Pill from "./Pill";
import Avatar from "./Avatar";
import { UserIcon } from "lucide-react";
import { NodeInstanceParam } from "@/types";

interface Props extends React.ComponentProps<"ul"> {
  params: NodeInstanceParam[];
}

function NodeWidgetParams({ params = [], ...props }: Props) {
  return (
    <ul {...props}>
      {params.map((param, index) => (
        <Pill key={index}>
          {param.type == "reference" && (
            <Avatar className="bg-green-300 h-4 w-4">
              <UserIcon stroke="black" size={12} />
            </Avatar>
          )}
          {param.type == "auto" && (
            <Avatar className="bg-black h-4 w-4">
              <span className="font-medium scale-75">N</span>
            </Avatar>
          )}
          <span>{param.title}</span>
        </Pill>
      ))}
    </ul>
  );
}

export default NodeWidgetParams;
