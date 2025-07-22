import { DotIcon } from "lucide-react";
import { useDraggable } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import { cls } from "@/lib/dom";
import { useWorkflowCanvas } from "@/contexts/WorkflowCanvasContext";
import NodeWidgetParams from "./NodeWidgetParams";
import Icon from "./Icon";
import { NodeInstance, Point2D } from "@/types";

interface Props extends React.ComponentProps<"div"> {
  instance: NodeInstance;
  startPosition: Point2D;
}

function NodeWidget({ instance, startPosition, className }: Props) {
  const context = useWorkflowCanvas();
  const position = useRef<Point2D>({ ...startPosition });
  const ref = useRef<HTMLDivElement | null>(null);
  const [bind] = useDraggable({
    onDrag: ({ delta }) => {
      positionNode({
        x: position.current.x + delta.x,
        y: position.current.y + delta.y,
      });
    },
  });
  const isFocused = context.focusedNodes.includes(instance);

  function positionNode(newPosition?: Point2D) {
    if (newPosition) {
      position.current.x = newPosition.x;
      position.current.y = newPosition.y;
    }

    if (ref.current) {
      ref.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      context.events.emit("node-position-update", { instance });
    }
  }

  useEffect(() => {
    positionNode();
  }, []);

  return (
    <div
      ref={ref}
      data-node-id={instance.id}
      onMouseEnter={() => context.setFocusedNodes([instance])}
      onMouseLeave={() => context.setFocusedNodes([])}
      className={cls(
        "rounded-2xl  border-stone-600 aspect-[1.2] w-60 text-white border select-none origin-center transition-colors duration-300 hover:cursor-grab active:cursor-grabbing",
        isFocused ? "bg-stone-700" : "bg-stone-800",
        className
      )}
      {...bind}>
      <div className="inner-container p-4 flex flex-col justify-between h-full">
        <div className="header flex items-start justify-between">
          <div className="icon w-7 h-7 bg-black rounded-full items-center justify-center flex">
            <Icon
              name={instance.node.icon}
              size={16}
              stroke="white"
              strokeWidth={1.5}
            />
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
          {instance.params && (
            <NodeWidgetParams params={instance.params} className="mt-4" />
          )}
        </div>
      </div>
    </div>
  );
}

export default NodeWidget;
