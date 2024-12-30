import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    /* Get the container's width & height first */
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setWidth(width);
    canvas.setHeight(height);

    /* Next get the center of the canvas itself */
    const center = canvas.getCenter();

    const zooRatio = 0.85; // Define a ration
    const localWorkspace = canvas
      .getObjects()
      .find((object) => object.name === "clip"); // Find the canvas to scale it

    // @ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width,
      height,
    });

    const zoom = zooRatio * scale;

    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    if (!localWorkspace) return;

    const worksapceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    /* Calculate & set the viewport */
    viewportTransform[4] =
      canvas.width / 2 - worksapceCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - worksapceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [canvas, container, autoZoom]);
};
