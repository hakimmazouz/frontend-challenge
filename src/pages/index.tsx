import Guide from "@/components/Guide";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import { getWorkflowConfig } from "@/lib/api";
import { useFetch } from "@/lib/hooks";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useFetch(getWorkflowConfig);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-stone-900 ${inter.className}`}>
      <Guide />
      {data && <WorkflowCanvas config={data.workflow} />}
    </main>
  );
}
