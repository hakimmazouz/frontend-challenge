export type NodeInstanceId = string;
export type NodeParamType = "reference" | "auto";
export type IconName =
  | "dollar-sign"
  | "shield"
  | "wrench"
  | "hammer"
  | "arrow-right-circle"
  | "pencil"
  | "send";

export type Node = {
  type: string;
  icon: IconName;
  description: string;
};

export type NodeInstanceParam = {
  type: NodeParamType;
  value: string;
  title: string;
};

export type NodeInstance = {
  id: NodeInstanceId;
  node: Node;
  outputToNodeId: NodeInstanceId[];
  params?: NodeInstanceParam[];
};

export type WorkflowConfig = {
  nodes: NodeInstance[];
};

export interface NodeConnectorConfig {
  fromNode: NodeInstance;
  toNode: NodeInstance;
}

export interface NodeUpdateEvent {
  event: "node-position-update";
  callback: (context: { instance: NodeInstance }) => void;
}

export interface NodeDeleteEvent {
  event: "node-delete";
  callback: (context: {}) => void;
}

export type NodeEvents = NodeUpdateEvent | NodeDeleteEvent;

export type Point2D = { x: number; y: number };
