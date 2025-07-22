import Guide from "@/components/Guide";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import { getWorkflowConfig } from "@/lib/api";
import { WorkflowConfig } from "@/lib/const";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [workflow, setWorkflow] = useState<WorkflowConfig>();

  useEffect(() => {
    const getWorkflow = async () => {
      const { data, error } = await getWorkflowConfig();

      if (data) setWorkflow(data.workflow);
      if (error) console.warn("Could not fetch workflow data");
    };

    getWorkflow();
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-stone-900 ${inter.className}`}>
      <Guide />
      {workflow && <WorkflowCanvas config={workflow} />}
    </main>
  );
}
