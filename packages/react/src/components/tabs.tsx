"use client";

import React, { useId, useRef } from 'react';

/** Label and identifier for one tab button. */
export interface TabItem {
  /** Value identifying this tab in controlled state. */
  value: string;
  /** Visible tab label; text content supplies the accessible name unless `ariaLabel` is set. */
  label: React.ReactNode;
  /** Accessible name for labels that do not contain readable text, such as icon-only labels. */
  ariaLabel?: string;
  /** Optional DOM id assigned to the tab button; auto-generated when omitted. */
  id?: string;
}

/** Props for the controlled tab-list component {@link Tabs}. */
export interface TabsProps {
  /** Tabs to render, in display and keyboard-navigation order. */
  items: TabItem[];
  /** Value of the selected tab. */
  value: string;
  /**
   * Called when a tab is activated by click or tab-list keyboard navigation.
   * @param value Value of the newly selected tab.
   */
  onValueChange: (value: string) => void;
  /** ID of the associated tab panel, assigned to each tab's `aria-controls`. */
  panelId?: string;
  /**
   * When provided, called during render for each tab with its value and DOM id.
   * Use explicit `TabItem.id` values when panel markup needs to reference an id
   * directly. This callback is useful for collecting generated ids in a ref.
   * @param value The tab item's value.
   * @param id The DOM id assigned to the tab button.
   * @example
   * const tabIds = useRef<Record<string, string>>({});
   * <Tabs items={tabs} value={active} onValueChange={setActive}
   *   getTabId={(value, id) => { tabIds.current[value] = id; }} />
   * <div role="tabpanel" aria-labelledby={tabIds.current[active]}>…</div>
   */
  getTabId?: (value: string, id: string) => void;
  /** Optional id for the tablist element itself. */
  tabListId?: string;
}

/**
 * Renders an accessible, controlled tab list with arrow, Home, and End navigation.
 *
 * @example
 * ```tsx
 * <Tabs items={tabs} value={activeTab} onValueChange={setActiveTab} panelId="settings-panel" />
 * ```
 */
export function Tabs({ items, value, onValueChange, panelId, getTabId, tabListId }: TabsProps) {
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
    <div className="qzl-tabs" role="tablist" ref={listRef} id={tabListId}>
      {items.map((item, index) => {
        const active = item.value === value;
        const tabId = item.id ?? `${listId}-tab-${index}`;
        getTabId?.(item.value, tabId);
        return (
          <button
            key={item.value}
            id={tabId}
            type="button"
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="tab"
            aria-selected={active}
            aria-controls={panelId}
            aria-label={item.ariaLabel}
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
