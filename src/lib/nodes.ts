import { NodeInstance, Point2D } from "@/types";
import { mapConstrain } from "./math";

export function getNodeElWithOutputNodeEl(
  el: HTMLDivElement,
  fromNode: NodeInstance,
  toNode: NodeInstance
) {
  const fromElement = el.querySelector(`[data-node-id="${fromNode.id}"`);
  const toElement = el.querySelector(`[data-node-id="${toNode.id}"`);

  return { fromElement, toElement };
}

export function getHeightOfConnector(top: DOMRect, bottom: DOMRect) {
  return Math.max(
    1,
    bottom.top + bottom.height * 0.5 - (top.top + top.height * 0.5)
  );
}

export function getPositionOfConnector(left: DOMRect, top: DOMRect) {
  const x = left.right;
  const y = top.top + top.height * 0.5;

  return { x, y };
}

export function getDistanceBetweenClosestEdges(left: DOMRect, right: DOMRect) {
  const leftEdge = left.left + left.width;
  const rightEdge = right.left;

  const distance = rightEdge - leftEdge;

  return distance;
}

export function getConnectorSizeAndPosition(
  from: DOMRect,
  to: DOMRect
): {
  distance: number;
  height: number;
  position: Point2D;
  yFlow: "to-bottom" | "to-top";
  xFlow: "regular" | "reverse";
} {
  const left = from.left < to.left ? from : to;
  const right = from.right > to.right ? from : to;
  const top = from.top < to.top ? from : to;
  const bottom = from.bottom > to.bottom ? from : to;

  const distance = getDistanceBetweenClosestEdges(left, right);
  const height = getHeightOfConnector(top, bottom);
  const position = getPositionOfConnector(left, top);

  return {
    distance,
    height,
    position,
    xFlow: from == left ? "regular" : "reverse",
    yFlow: from == top ? "to-bottom" : "to-top",
  };
}

export function getNodeStartPositions(instances: NodeInstance[]) {
  let startX = 100;
  const center = 400;
  const xInterval = 300;
  const positions: Record<string, Point2D> = {};

  function positionNode({
    instance,
    parent,
  }: {
    instance: NodeInstance;
    parent?: NodeInstance;
  }) {
    if (positions[instance?.id]) return;

    const isChild = !!parent;
    const singleChild = isChild && parent.outputToNodeId.length == 1;
    const index = isChild ? parent?.outputToNodeId?.indexOf(instance?.id) : 0;
    const length = isChild ? parent?.outputToNodeId?.length : 1;
    const totalYSpread = singleChild ? 0 : 160 * length - 1;

    positions[instance.id] = {
      x: isChild ? positions[parent.id].x + xInterval : startX,
      y: isChild
        ? singleChild
          ? center
          : center +
            mapConstrain(
              index,
              0,
              length - 1,
              -totalYSpread * 0.5,
              totalYSpread * 0.5
            )
        : center,
    };

    if (instance.outputToNodeId.length) {
      instance.outputToNodeId.forEach((nextNodeId) => {
        positionNode({
          instance: instances.find((i) => i.id == nextNodeId)!,
          parent: instance,
        });
      });
    }
  }

  instances.forEach((instance) => {
    positionNode({ instance });
  });

  return positions;
}
