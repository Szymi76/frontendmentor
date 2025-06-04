import { handleEnterDown } from "../utils";

type ButtonCardProps = {
  label: string;
  price: string;
  iconSrc: string;
  isSelected: boolean;
  description?: string;
  onClick: () => void;
};
export const ButtonCard = (props: ButtonCardProps) => {
  return (
    <div
      className="button-card"
      onClick={props.onClick}
      role="button"
      aria-selected={props.isSelected}
      data-selected={props.isSelected}
      onKeyDown={(e) => handleEnterDown(e, props.onClick)}
      tabIndex={0}
    >
      <img src={props.iconSrc} alt="" />
      <div>
        <h4>{props.label}</h4>
        <p>{props.price}</p>
        {props.description && <p>{props.description}</p>}
      </div>
    </div>
  );
};
