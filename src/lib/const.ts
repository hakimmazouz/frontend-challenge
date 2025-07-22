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

export const EXAMPLE_WORKFLOW_CONFIG: WorkflowConfig = {
  nodes: [
    {
      id: "node-0",
      outputToNodeId: ["node-1", "node-2", "node-3"],
      node: {
        type: "FP & A",
        description: "Assessment of cost-benefit",
        icon: "dollar-sign",
      },
      params: [
        {
          type: "reference",
          title: "Kristin Watson",
          value: "1234",
        },
      ],
    },
    {
      id: "node-1",
      outputToNodeId: ["node-4"],
      node: {
        type: "IT Review",
        description: "Assessment of IT risks",
        icon: "wrench",
      },
      params: [
        {
          type: "reference",
          title: "Alice Weather",
          value: "1234",
        },
      ],
    },
    {
      id: "node-2",
      outputToNodeId: ["node-4"],
      node: {
        type: "Security Review",
        description: "Assessment of security risks",
        icon: "shield",
      },
      params: [
        {
          type: "reference",
          title: "Darlene Robertson",
          value: "1234",
        },
      ],
    },
    {
      id: "node-3",
      outputToNodeId: ["node-4"],
      node: {
        type: "Legal Review",
        description: "Assessment of legal risks",
        icon: "hammer",
      },
      params: [
        {
          type: "reference",
          title: "Darlene Johnson",
          value: "1234",
        },
      ],
    },
    {
      id: "node-4",
      outputToNodeId: ["node-5", "node-6"],
      node: {
        type: "Vendor onboarding",
        description: "Vendor created in ERP",
        icon: "arrow-right-circle",
      },
      params: [
        {
          type: "auto",
          title: "Auto",
          value: "auto",
        },
      ],
    },
    {
      id: "node-5",
      outputToNodeId: [],
      node: {
        type: "Contract Execution",
        description: "Aligned contract",
        icon: "pencil",
      },
      params: [
        {
          type: "reference",
          title: "Request owner",
          value: "1234",
        },
      ],
    },
    {
      id: "node-6",
      outputToNodeId: [],
      node: {
        type: "PO",
        description: "Order service",
        icon: "send",
      },
      params: [
        {
          type: "reference",
          title: "Organization",
          value: "1234",
        },
      ],
    },
  ],
};
