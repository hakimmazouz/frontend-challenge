import { useWorkflowCanvas } from "@/contexts/WorkflowCanvasContext";
import { NodeInstance } from "@/lib/const";
import { cls } from "@/lib/dom";
import {
  getConnectorSizeAndPosition,
  getNodeElWithOutputNodeEl,
} from "@/lib/nodes";
import { SVGProps, useEffect, useRef, useState } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  fromNode: NodeInstance;
  toNode: NodeInstance;
}

function NodeConnector({ fromNode, toNode, className, ...props }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  const lineRef = useRef<SVGPolylineElement | null>(null);
  const context = useWorkflowCanvas();
  const [xFlow, setXFlow] = useState<"regular" | "reverse">("regular");
  const relatedNodeIsFocused =
    context.focusedNodes.includes(toNode) ||
    context.focusedNodes.includes(fromNode);

  function renderConnector({ instance }: { instance: NodeInstance }) {
    if (instance.id == fromNode.id || instance.id == toNode.id) {
      const { fromElement, toElement } = getNodeElWithOutputNodeEl(
        context.nodeLayerRef?.current!,
        fromNode,
        toNode
      );

      if (fromElement && toElement && ref.current) {
        const fromBounds = fromElement.getBoundingClientRect();
        const toBounds = toElement.getBoundingClientRect();

        const {
          distance,
          height,
          position,
          yFlow,
          xFlow: latestXFlow,
        } = getConnectorSizeAndPosition(fromBounds, toBounds);
        const flipY = yFlow == "to-bottom";
        const flipX = latestXFlow == "regular";
        const { canvasOffset } = context;

        ref.current.style.width = `${distance}px`;
        ref.current.style.height = `${height}px`;
        ref.current.style.transform = `translate(${
          position.x - canvasOffset.x
        }px, ${position.y - canvasOffset.y}px) scaleY(${
          flipY ? -1 : 1
        }) scaleX(${flipX ? -1 : 1})`;

        if (xFlow !== latestXFlow) setXFlow(latestXFlow);
      }
    }
  }

  useEffect(() => {
    const unsub = context.events.on("node-position-update", renderConnector);

    function animateDashOffset() {
      if (lineRef.current) {
        const offset = performance.now() * 0.01;
        lineRef.current.setAttribute("stroke-dashoffset", offset.toString());
      }

      raf = requestAnimationFrame(animateDashOffset);
    }

    let raf = requestAnimationFrame(animateDashOffset);

    renderConnector({ instance: fromNode });

    return () => {
      unsub();
      cancelAnimationFrame(raf);
    };
  }, [xFlow]);

  return (
    <svg
      {...props}
      ref={ref}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      onMouseEnter={() => context.setFocusedNodes([fromNode, toNode])}
      onMouseLeave={() => context.setFocusedNodes([])}
      className={cls(
        "fixed top-0 left-0 transition-opacity duration-300",
        !context.focusedNodes.length && !relatedNodeIsFocused && "opacity-40",
        context.focusedNodes.length > 0 && !relatedNodeIsFocused && "opacity-5",
        relatedNodeIsFocused && "opacity-100",
        className
      )}>
      <polyline
        ref={lineRef}
        strokeDasharray="12"
        points={"0,4 50,4 50,96 100,96"}
        stroke="white"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}

export default NodeConnector;
