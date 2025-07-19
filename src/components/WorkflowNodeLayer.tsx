import { NodeInstance } from "@/lib/const";
import NodeWidget from "./NodeWidget";
import { forwardRef, Ref, useMemo } from "react";
import { getNodeStartPositions } from "@/lib/nodes";

interface Props extends React.ComponentProps<"div"> {
  nodes: NodeInstance[];
}

function WorkflowNodeLayer({ nodes }: Props, ref: Ref<HTMLDivElement>) {
  const startPositions = useMemo(() => getNodeStartPositions(nodes), [nodes]);

  return (
    <div ref={ref} className="w-full h-full relative">
      {nodes.map((node) => (
        <NodeWidget
          key={node.id}
          instance={node}
          startPosition={startPositions[node.id]}
          className="absolute top-0 left-0"
        />
      ))}
    </div>
  );
}

export default forwardRef(WorkflowNodeLayer);
