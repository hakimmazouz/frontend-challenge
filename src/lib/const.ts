export type NodeInstanceId = string;
export type NodeParamType = "reference" | "value";

export interface Node {
  type: string;
  icon: string;
  description: string;
  params?: NodeParam[];
}

export interface NodeParam {
  name: string;
  title: string;
  description: string;
  type: NodeParamType;
}

export interface NodeInstanceParam {
  param: NodeParam;
  value: unknown;
}

export interface NodeInstance {
  id: NodeInstanceId;
  node: Node;
  outputToNodeId: NodeInstanceId[];
  params?: NodeInstanceParam[];
}

export interface WorkflowConfig {
  nodes: NodeInstance[];
}

export const EXAMPLE_WORKFLOW_CONFIG: WorkflowConfig = {
  nodes: [
    {
      id: "node-0",
      outputToNodeId: ["node-1", "node-2", "node-3"],
      node: {
        type: "FP & A",
        description: "Assessment of cost-benefit",
        icon: "money",
      },
    },
    {
      id: "node-1",
      outputToNodeId: ["node-4"],
      node: {
        type: "IT Review",
        description: "Assessment of IT risks",
        icon: "tools",
      },
    },
    {
      id: "node-2",
      outputToNodeId: ["node-4"],
      node: {
        type: "Security Review",
        description: "Assessment of security risks",
        icon: "tools",
      },
    },
    {
      id: "node-3",
      outputToNodeId: ["node-4"],
      node: {
        type: "Legal Review",
        description: "Assessment of legal risks",
        icon: "tools",
      },
    },
    {
      id: "node-4",
      outputToNodeId: ["node-5", "node-6"],
      node: {
        type: "Vendor Review",
        description: "Vendor created in ERP",
        icon: "tools",
      },
    },
    {
      id: "node-5",
      outputToNodeId: [],
      node: {
        type: "Contract Execution",
        description: "Aligned contract",
        icon: "tools",
      },
    },
    {
      id: "node-6",
      outputToNodeId: [],
      node: {
        type: "PO",
        description: "Order service",
        icon: "tools",
      },
    },
  ],
};
