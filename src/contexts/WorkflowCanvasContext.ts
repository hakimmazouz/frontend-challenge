import EventEmitter from "@/lib/EventEmitter";
import { NodeEvents, NodeInstance, Point2D } from "@/types";
import { createContext, MutableRefObject, useContext } from "react";

const events = new EventEmitter<NodeEvents>();
export interface WorkflowCanvasContextValue {
  connectorsLayerRef: MutableRefObject<HTMLDivElement | null> | null;
  nodeLayerRef: MutableRefObject<HTMLDivElement | null> | null;
  events: EventEmitter<NodeEvents>;
  focusedNodes: NodeInstance[];
  canvasOffset: Point2D;
  setFocusedNodes: (instances: NodeInstance[]) => void;
}

export const WorkflowCanvasContextDefaultValue: WorkflowCanvasContextValue = {
  connectorsLayerRef: null,
  nodeLayerRef: null,
  focusedNodes: [],
  canvasOffset: { x: 0, y: 0 },
  setFocusedNodes: (instances: NodeInstance[]) => {},
  events,
};

export const WorkflowCanvasContext = createContext<WorkflowCanvasContextValue>(
  WorkflowCanvasContextDefaultValue
);

export const useWorkflowCanvas = () => {
  return useContext(WorkflowCanvasContext);
};
