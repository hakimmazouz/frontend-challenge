import { forwardRef, Ref, useEffect, useState } from "react";
import NodeConnector from "./NodeConnector";
import { NodeConnectorConfig, NodeInstance } from "@/types";
import { collectConnectors } from "@/lib/nodes";

interface Props extends React.ComponentProps<"div"> {
  nodes: NodeInstance[];
}

function WorkflowConnectorsLayer({ nodes }: Props, ref: Ref<HTMLDivElement>) {
  const [connectors, setConnectors] = useState<NodeConnectorConfig[]>([]);

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
