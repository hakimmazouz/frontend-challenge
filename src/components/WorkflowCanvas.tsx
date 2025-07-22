import WorkflowNodeLayer from "./WorkflowNodeLayer";
import WorkflowConnectorsLayer from "./WorkflowConnectorsLayer";
import {
  WorkflowCanvasContext,
  WorkflowCanvasContextDefaultValue,
} from "@/contexts/WorkflowCanvasContext";
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "@/lib/hooks";
import { NodeInstance, Point2D, WorkflowConfig } from "@/types";

interface Props extends React.ComponentProps<"div"> {
  config: WorkflowConfig;
}

function WorkflowCanvas({ config }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const canvasOffset = useRef<Point2D>({ x: 0, y: 0 });
  const nodeLayerRef = useRef<HTMLDivElement | null>(null);
  const connectorsLayerRef = useRef<HTMLDivElement | null>(null);
  const [focusedNodes, setFocusedNodes] = useState<NodeInstance[]>([]);
  const [bind] = useDraggable({
    onDrag({ delta }) {
      if (ref.current) {
        canvasOffset.current.x += delta.x;
        canvasOffset.current.y += delta.y;
        ref.current.style.transform = `translate(${canvasOffset.current.x}px, ${canvasOffset.current.y}px)`;
      }
    },
  });

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      const eventFromNode = nodeLayerRef.current?.contains(
        event.target as Node
      );
      if (!eventFromNode) {
        bind.onMouseDown(event as unknown as React.MouseEvent<HTMLElement>);
      }
    }

    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  });

  return (
    <div ref={ref} className="inset-0 fixed">
      <WorkflowCanvasContext.Provider
        value={{
          ...WorkflowCanvasContextDefaultValue,
          connectorsLayerRef: connectorsLayerRef,
          nodeLayerRef: nodeLayerRef,
          canvasOffset: canvasOffset.current,
          focusedNodes,
          setFocusedNodes: (instances: NodeInstance[]) =>
            setFocusedNodes(instances),
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
