import { useState } from "react";
import "./Dropdown.css";

interface Props {
  isMultiselect?: boolean;
  items: string[];
  name?: string;
  width?: number;
}

export default function Dropdown({
  isMultiselect = false,
  items,
  name = "",
  width = 220,
}: Props) {
  const [open, setOpen] = useState(false);
  // set to track selected items for O(1) lookup
  const [selectedItems, setSelectedItems] = useState<Set<string> | string>(
    isMultiselect ? new Set<string>() : ""
  );

  // toggle open/closed state of dropdown
  const handleClick = () => {
    setOpen(!open);
  };

  // determine if an item is selected
  function isSelected(i: string) {
    if (isMultiselect) {
      return (selectedItems as Set<string>).has(i);
    } else {
      return selectedItems === i;
    }
  }

  // adds item to selectedItems if not selected currently, otherwise unselect it
  // by removing from selectedItems
  const handleItemClick = (item: string) => {
    if (isMultiselect) {
      const newSelectedItems = new Set(selectedItems as Set<string>);
      if (newSelectedItems.has(item)) {
        newSelectedItems.delete(item);
      } else {
        newSelectedItems.add(item);
      }
      setSelectedItems(newSelectedItems);
    } else {
      if (selectedItems === item) {
        setSelectedItems("");
      } else {
        setSelectedItems(item);
      }
    }
  };

  // clear selectedItems
  const handleClearSelection = () => {
    if (isMultiselect) {
      setSelectedItems(new Set<string>());
    } else {
      setSelectedItems("");
    }
  };

  // select all items
  const handleSelectAll = () => {
    if (isMultiselect) {
      setSelectedItems(new Set(items));
    }
  };

  return (
    <div className="dropdown-container" style={{ width }}>
      <div onClick={handleClick} className="dropdown-btn">
        {name && <span className="dropdown-name">{name}</span>}
        <div className="dropdown-label-container">
          {selectedItems === "" ||
          (isMultiselect && (selectedItems as Set<string>).size === 0) ? (
            <span className="placeholder-text">Select</span>
          ) : (
            <span className="selected-string">
              {isMultiselect
                ? Array.from(selectedItems).join(", ")
                : selectedItems}
            </span>
          )}

          <div className="dropdown-arrow">{open ? "▲" : "▼"}</div>
        </div>
      </div>

      <div className={`dropdown-items ${open ? "isVisible" : "isHidden"}`}>
        {isMultiselect && (
          <div className="dropdown-item select-all" onClick={handleSelectAll}>
            <div className="dropdown__link">Select All</div>
          </div>
        )}

        <div
          className="dropdown-item clear-selection"
          onClick={handleClearSelection}
        >
          <div className="dropdown__link">Clear Selection</div>
        </div>

        {items.map((item) => (
          <div
            key={item}
            className={`dropdown-item ${isSelected(item) ? "selected" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            {isMultiselect && (
              <input
                type="checkbox"
                checked={isSelected(item)}
                onChange={() => handleItemClick(item)}
                className="dropdown-checkbox"
              />
            )}
            <div className="dropdown__link">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
