import { WorkflowConfig } from "@/types";

interface FetchResult<R> {
  data?: R;
  error?: string;
}

export type ApiFetch<R, P = undefined> = (
  params?: P
) => Promise<FetchResult<R>>;

export type GetWorkflowConfigResponse = { workflow: WorkflowConfig };

export const getWorkflowConfig: ApiFetch<
  GetWorkflowConfigResponse
> = async () => {
  const response = await fetch("/api/workflow");
  try {
    const data = (await response.json()) as GetWorkflowConfigResponse;

    return { data };
  } catch (e) {
    return { error: "Workflow could not be fetched" };
  }
};
