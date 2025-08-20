import { useSortable } from '@dnd-kit/react/sortable';
import { cn } from '@/shared/lib/utils';

export function Word({ id, index, word }: { id: string, index: number, word: string }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
  });

  return (
    <button className={cn(" bg-white rounded-[20px] px-4 py-2 text-primary h-fit w-fit", isDragging && " duration-200 transition-transform scale-125")} ref={ref} data-dragging={isDragging}>
      {word}
    </button>
  );
}