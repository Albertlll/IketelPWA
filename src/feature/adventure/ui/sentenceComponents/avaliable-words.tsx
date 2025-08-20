import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import type { ReactNode } from 'react';

export function AvaliableWords({ children, id }: { children: ReactNode, id: string }) {
  const { ref } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });


  return (
    <div className="flex w-full h-full items-center justify-center gap-3" ref={ref}>
      <div className=' flex gap-3 flex-wrap items-center'>
        {children}
      </div>
    </div>

  );
}