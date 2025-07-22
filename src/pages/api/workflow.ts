// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { EXAMPLE_WORKFLOW_CONFIG } from "@/lib/const";
import { WorkflowConfig } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  workflow: WorkflowConfig;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ workflow: EXAMPLE_WORKFLOW_CONFIG });
}
