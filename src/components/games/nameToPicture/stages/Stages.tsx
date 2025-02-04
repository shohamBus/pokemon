import React, { useMemo } from 'react'
import './stages.scss'

interface StagesProps {
  type: string;
  stage: number;
}
export const Stages = (props: StagesProps) => {
  const { type, stage } = props;
  const arr = useMemo(() => [1, 2, 3], [])
  return (
    <div className='stage-container'>
      {arr.map((s, index) => {
        let className = 'disable';
        if (stage === s) {
          className = 'active';
        } else if (stage > s) {
          className = 'pass';
        }
        return (
          <div key={index} className={`stage ${type} ${className}`}>
            <span className='stage-text'>Stage {s}</span>
          </div>
        );
      })}
    </div>
  )
}
