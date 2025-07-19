import { NodeInstance, WorkflowConfig } from "@/lib/const";
import WorkflowNodeLayer from "./WorkflowNodeLayer";
import WorkflowConnectorsLayer from "./WorkflowConnectorsLayer";
import {
  WorkflowCanvasContext,
  WorkflowCanvasContextDefaultValue,
} from "@/contexts/WorkflowCanvasContext";
import { useRef, useState } from "react";

interface Props extends React.ComponentProps<"div"> {
  config: WorkflowConfig;
}

function WorkflowCanvas({ config }: Props) {
  const nodeLayerRef = useRef<HTMLDivElement | null>(null);
  const connectorsLayerRef = useRef<HTMLDivElement | null>(null);
  const [focusedNode, setFocusedNode] = useState<NodeInstance | undefined>();

  return (
    <div className="inset-0 fixed bg-stone-900">
      <WorkflowCanvasContext.Provider
        value={{
          ...WorkflowCanvasContextDefaultValue,
          connectorsLayerRef: connectorsLayerRef,
          nodeLayerRef: nodeLayerRef,
          focusedNode,
          setFocusedNode: (instance?: NodeInstance) => setFocusedNode(instance),
        }}>
        <WorkflowConnectorsLayer
          ref={connectorsLayerRef}
          nodes={config.nodes}
        />
        <WorkflowNodeLayer ref={nodeLayerRef} nodes={config.nodes} />
      </WorkflowCanvasContext.Provider>
    </div>
  );
}

export default WorkflowCanvas;
