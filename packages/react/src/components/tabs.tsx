import React, { useId, useRef } from 'react';

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  panelId?: string;
}

export function Tabs({ items, value, onValueChange, panelId }: TabsProps) {
  const listId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (!items.length) return;
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % items.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + items.length) % items.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = items.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    onValueChange(items[nextIndex].value);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
  }

  return (
    <div className="qzl-tabs" role="tablist" ref={listRef}>
      {items.map((item, index) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            id={`${listId}-tab-${index}`}
            type="button"
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="tab"
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            className={active ? 'qzl-tabs__tab qzl-tabs__tab--active' : 'qzl-tabs__tab'}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
