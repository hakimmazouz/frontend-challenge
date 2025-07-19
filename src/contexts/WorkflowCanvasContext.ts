import { NodeInstance } from "@/lib/const";
import EventEmitter from "@/lib/EventEmitter";
import { Point2D } from "@/lib/hooks";
import { createContext, MutableRefObject, useContext } from "react";

interface NodeUpdateEvent {
  event: "node-position-update";
  callback: (context: { instance: NodeInstance }) => void;
}

type NodeEvents = NodeUpdateEvent;

const events = new EventEmitter<NodeEvents>();
export interface WorkflowCanvasContextValue {
  connectorsLayerRef: MutableRefObject<HTMLDivElement | null> | null;
  nodeLayerRef: MutableRefObject<HTMLDivElement | null> | null;
  events: EventEmitter<NodeEvents>;
  focusedNode: NodeInstance | undefined;
  setFocusedNode: (instance?: NodeInstance) => void;
}

export const WorkflowCanvasContextDefaultValue: WorkflowCanvasContextValue = {
  connectorsLayerRef: null,
  nodeLayerRef: null,
  focusedNode: undefined,
  setFocusedNode: (instance?: NodeInstance) => {},
  events,
};

export const WorkflowCanvasContext = createContext<WorkflowCanvasContextValue>(
  WorkflowCanvasContextDefaultValue
);

export const useWorkflowCanvas = () => {
  return useContext(WorkflowCanvasContext);
};
