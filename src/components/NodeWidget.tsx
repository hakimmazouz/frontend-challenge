import {
  CircleEllipsisIcon,
  DotIcon,
  MenuIcon,
  PersonStandingIcon,
  UserIcon,
  WrenchIcon,
} from "lucide-react";
import Avatar from "./Avatar";
import Pill from "./Pill";
import { Point2D, useDraggable } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import { NodeInstance } from "@/lib/const";
import { cls } from "@/lib/dom";
import { useWorkflowCanvas } from "@/contexts/WorkflowCanvasContext";

interface Props extends React.ComponentProps<"div"> {
  instance: NodeInstance;
  startPosition: Point2D;
}

function NodeWidget({ instance, startPosition, className }: Props) {
  const context = useWorkflowCanvas();
  const position = useRef<Point2D>({ ...startPosition });
  const ref = useRef<HTMLDivElement | null>(null);
  const [bind] = useDraggable({
    onDrag: ({ delta, dist, prev }) => {
      if (ref.current) {
        const { transform } = window.getComputedStyle(ref.current);

        positionNode({
          x: position.current.x + delta.x,
          y: position.current.y + delta.y,
        });

        context.events.emit("node-position-update", { instance });
      }
    },
  });

  function positionNode(pos?: Point2D) {
    if (pos?.x) {
      position.current.x = pos.x;
    }
    if (pos?.y) {
      position.current.y = pos.y;
    }

    if (ref.current) {
      ref.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }
  }

  useEffect(() => {
    positionNode();
    context.events.emit("node-position-update", { instance });
  }, []);

  return (
    <div
      ref={ref}
      data-node-id={instance.id}
      onMouseEnter={() => context.setFocusedNode(instance)}
      onMouseLeave={() => context.setFocusedNode()}
      className={cls(
        "rounded-2xl bg-stone-800 border-stone-600 aspect-[1.2] w-60 text-white border select-none origin-center",
        className
      )}
      {...bind}>
      <div className="inner-container p-4 flex flex-col justify-between h-full">
        <div className="header flex items-start justify-between">
          <div className="icon w-8 h-8 bg-black rounded-full items-center justify-center flex">
            <WrenchIcon size={16} stroke="white" strokeWidth={1.5} />
          </div>
          <div className="menu -space-x-3 flex">
            <DotIcon size={20} />
            <DotIcon size={20} />
            <DotIcon size={20} />
          </div>
        </div>
        <div className="content">
          <p className="text-base font-medium">{instance.node.type}</p>
          <p className="opacity-60 text-sm">{instance.node.description}</p>
          <div className="params mt-4">
            <Pill>
              <Avatar className="bg-green-300 h-4 w-4">
                <UserIcon stroke="black" size={12} />
              </Avatar>
              <span>Darlene Johnson</span>
            </Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeWidget;
