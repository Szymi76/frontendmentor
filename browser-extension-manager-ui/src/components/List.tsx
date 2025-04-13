import { useMemo, useState } from "react";

import data from "../data.json";
import { ListItem, ListShowedItems } from "../types";
import { ReactSVG } from "react-svg";

type ListProps = { itemsShowed: ListShowedItems };
const List = (props: ListProps) => {
  const { itemsShowed } = props;
  const [listItems, setListItems] = useState<ListItem[]>(
    data.map((_, i) => {
      return { ..._, index: i };
    })
  );

  const items = useMemo(
    () =>
      listItems.filter((item) => {
        if (itemsShowed == "all") return true;
        else if (itemsShowed == "active" && item.isActive) return true;
        else if (itemsShowed == "inactive" && !item.isActive) return true;
        else return false;
      }),
    [itemsShowed, listItems]
  );

  const handleRemoveItem = (index: number) => {
    setListItems(listItems.filter((item) => item.index !== index));
  };
  const handleToggleActiveItem = (index: number) => {
    setListItems(
      listItems.map((item) => {
        if (item.index !== index) return item;
        else return { ...item, isActive: !item.isActive };
      })
    );
  };

  return (
    <div className="row my-2 g-3 align-items-stretch">
      {items.map((item) => (
        <SingleListItem
          key={"item" + item.index}
          {...item}
          index={item.index}
          onRemove={handleRemoveItem}
          onToggleActive={handleToggleActiveItem}
        />
      ))}
    </div>
  );
};

export default List;
type PropsSingleListItem = ListItem & {
  index: number;
  onRemove: (index: number) => void;
  onToggleActive: (index: number) => void;
};
const SingleListItem = (props: PropsSingleListItem) => {
  const { name, description, logo, isActive, index, onRemove, onToggleActive } =
    props;

  return (
    <div className="col-12 col-md-6 col-lg-4" style={{ height: 200 }}>
      <div className="card bg-neutral rounded-4 h-100 shadow-sm">
        <div className="card-body d-flex gap-3">
          <ReactSVG src={`${logo}.svg`} />
          <div>
            <h5 className="card-title">{name}</h5>
            <p className="card-text fs-6">{description}</p>
          </div>
        </div>
        <div className="p-3 d-flex justify-content-between align-items-center">
          <button
            onClick={() => onRemove(index)}
            className="btn btn-body rounded-5 px-3 focus-ring border"
          >
            Remove
          </button>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
              checked={isActive}
              onChange={() => onToggleActive(index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
