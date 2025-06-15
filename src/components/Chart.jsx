import React from 'react';
import { makeLinePath } from '../utils/chartUtils';

export default function Chart({
  dataPoints,   
  width = 300,
  height = 200,
}) {
  if (!dataPoints || dataPoints.length === 0) {
    return <div style={{ textAlign: 'center', color: '#555' }}>No data</div>;
  }

  const pathD = makeLinePath(dataPoints, width, height, 24);

  return (
    <div className="chart-container" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height}>
        {/* Horizontal grid lines at 0%, 25%, 50%, 75%, 100% */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const y = 24 + (100 - pct) * ((height - 48) / 100);
          return (
            <g key={pct}>
              <line
                x1={24}
                x2={width - 8}
                y1={y}
                y2={y}
                stroke="#aac9ff"
                strokeWidth="1"
              />
              <text x={0} y={y + 4} fill="var(--color-text-dark)" fontSize="10">
                {pct}%
              </text>
            </g>
          );
        })}

        {/* X‐axis labels: Day 1 → length of dataPoints */}
        {dataPoints.map((_, i) => {
          const x = 24 + i * ((width - 48) / (dataPoints.length - 1));
          return (
            <text
              key={i}
              x={x - 4}
              y={height - 8}
              fill="var(--color-text-dark)"
              fontSize="10"
            >
              {i + 1}
            </text>
          );
        })}

        {/* The line path */}
        <path
          d={pathD}
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
        />

        {/* Data point circles */}
        {dataPoints.map((val, i) => {
          const x = 24 + i * ((width - 48) / (dataPoints.length - 1));
          const y = 24 + (100 - val) * ((height - 48) / 100);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="var(--color-accent)"
            />
          );
        })}
      </svg>
    </div>
  );
}
