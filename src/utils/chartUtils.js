// src/utils/chartUtils.js

/**
 * Given an array of y‐values (0–100) for days 1→N, returns an SVG <path> string.
 * We'll scale horizontally 0→(width) based on index, vertical 0→height based on value.
 *
 *   data: [75, 60, 90, 50, 75, 60, 35, 50]  // percents
 *   width: 300
 *   height: 200
 * Returns “M10,50 L52.5,60 L95,20 …” style string (with 10px margin)
 */
export function makeLinePath(data, width = 300, height = 200, margin = 10) {
  if (!data || data.length === 0) return '';

  const n = data.length;
  const plotWidth = width - 2 * margin;
  const plotHeight = height - 2 * margin;
  const xStep = plotWidth / (n - 1);

  const points = data.map((val, i) => {
    // invert y because SVG y=0 is top
    const x = margin + i * xStep;
    const y = margin + (100 - val) * (plotHeight / 100);
    return { x, y };
  });

  // Build "M{x0},{y0} L{x1},{y1} L{x2},{y2} …"
  let path = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x},${points[i].y}`;
  }
  return path;
}
