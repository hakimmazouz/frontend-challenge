// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { EXAMPLE_WORKFLOW_CONFIG, WorkflowConfig } from "@/lib/const";
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
