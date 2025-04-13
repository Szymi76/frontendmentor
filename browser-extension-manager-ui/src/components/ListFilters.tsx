import { ListShowedItems } from "../types";

const items: ListShowedItems[] = ["all", "active", "inactive"];

type ListFiltersProps = {
  currentItemsShowed: ListShowedItems;
  onChangeShowedListItems: (itemsShowed: ListShowedItems) => void;
};
const ListFilters = (props: ListFiltersProps) => {
  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
      <h3 className="fw-bold">Extensions List</h3>
      <div className="d-flex justify-content-end gap-2">
        {items.map((item) => (
          <SingleBarButton
            key={item}
            itemShowed={item}
            isActive={item == props.currentItemsShowed}
            onButtonClick={() => props.onChangeShowedListItems(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListFilters;

type SingleBarButtonProps = {
  itemShowed: ListShowedItems;
  isActive: boolean;
  onButtonClick: (itemShowed: ListShowedItems) => void;
};
const SingleBarButton = (props: SingleBarButtonProps) => {
  const { itemShowed, isActive, onButtonClick } = props;

  return (
    <button
      onClick={() => onButtonClick(itemShowed)}
      data-selected={isActive}
      className="btn btn-list-filter rounded-5 px-3 focus-ring border text-capitalize"
    >
      {itemShowed}
    </button>
  );
};
