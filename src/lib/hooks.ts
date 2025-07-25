import { Point2D } from "@/types";
import { useCallback, useRef } from "react";

interface DragState {
  delta: Point2D;
  dist: Point2D;
  prev: Point2D;
}

interface UseDraggableParams {
  onDrag: (dragState: DragState) => void;
}

type UseDraggableValue = [
  { onMouseDown: (event: React.MouseEvent<HTMLElement>) => void },
  DragState
];

export const useDraggable = ({
  onDrag,
}: UseDraggableParams): UseDraggableValue => {
  const dragState = useRef<DragState>({
    delta: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    dist: { x: 0, y: 0 },
  });

  const resetDragState = () => {
    const { delta, dist, prev } = dragState.current;

    delta.x = 0;
    delta.y = 0;
    dist.x = 0;
    dist.y = 0;
    prev.x = 0;
    prev.y = 0;
  };

  const onMouseDown = useCallback(
    ({ clientX, clientY }: React.MouseEvent<HTMLElement>) => {
      resetDragState();

      const { prev } = dragState.current;

      prev.x = clientX;
      prev.y = clientY;

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    []
  );

  const onMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    const { delta, prev, dist } = dragState.current;

    delta.x = clientX - prev.x;
    delta.y = clientY - prev.y;

    prev.x = clientX;
    prev.y = clientY;

    dist.x += delta.x;
    dist.y += delta.x;

    onDrag(dragState.current);
  }, []);

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return [{ onMouseDown }, dragState.current];
};
