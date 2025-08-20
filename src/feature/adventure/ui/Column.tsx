import React from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';

export function Column({ children, id }) {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });


  return (
    <div className=" w-full border-2 border-primary rounded-2xl p-5 h-40 flex gap-3" ref={ref}>
      {children}
    </div>
  );
}