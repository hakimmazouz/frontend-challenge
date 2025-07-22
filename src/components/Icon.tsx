import { IconName } from "@/lib/const";
import {
  ArrowRightCircleIcon,
  BadgeDollarSignIcon,
  HammerIcon,
  LucideProps,
  PencilIcon,
  SendIcon,
  ShieldIcon,
  WrenchIcon,
} from "lucide-react";

interface Props extends LucideProps {
  name: IconName;
}

function Icon({ name, ...props }: Props) {
  if (name == "arrow-right-circle") return <ArrowRightCircleIcon {...props} />;

  if (name == "dollar-sign") return <BadgeDollarSignIcon {...props} />;

  if (name == "wrench") return <WrenchIcon {...props} />;

  if (name == "pencil") return <PencilIcon {...props} />;

  if (name == "hammer") return <HammerIcon {...props} />;

  if (name == "shield") return <ShieldIcon {...props} />;

  if (name == "send") return <SendIcon {...props} />;

  return null;
}

export default Icon;
