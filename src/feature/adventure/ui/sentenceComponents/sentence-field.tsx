import { type ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';

export function SentenceField({ children, id }: { children: ReactNode, id: string }) {
  const { ref } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });


  return (
    <div className=" w-full h-fit border-2 border-primary rounded-2xl p-5 flex flex-wrap gap-3" ref={ref}>
      {children}
    </div>
  );
}