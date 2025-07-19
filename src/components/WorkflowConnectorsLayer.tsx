import { useWorkflowCanvas } from "@/contexts/WorkflowCanvasContext";
import { NodeInstance } from "@/lib/const";
import { forwardRef, Ref, useEffect, useState } from "react";
import NodeConnector from "./NodeConnector";

function collectConnectors(instances: NodeInstance[]) {
  return instances
    .filter((instance) => instance.outputToNodeId.length)
    .map((instance) =>
      instance.outputToNodeId.map((outputInstance) => ({
        fromNode: instance,
        toNode: instances.find((i) => i.id == outputInstance)!,
      }))
    )
    .flat();
}

interface NodeConnector {
  fromNode: NodeInstance;
  toNode: NodeInstance;
}

interface Props extends React.ComponentProps<"div"> {
  nodes: NodeInstance[];
}

function WorkflowConnectorsLayer({ nodes }: Props, ref: Ref<HTMLDivElement>) {
  const context = useWorkflowCanvas();
  const [connectors, setConnectors] = useState<NodeConnector[]>([]);

  useEffect(() => {
    setConnectors(collectConnectors(nodes));
  }, [nodes]);

  return (
    <div ref={ref} className="fixed inset-0">
      {connectors.map((connector) => (
        <NodeConnector
          key={`${connector.fromNode.id}-${connector.toNode.id}`}
          {...connector}
        />
      ))}
    </div>
  );
}

export default forwardRef(WorkflowConnectorsLayer);
