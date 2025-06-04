import { handleEnterDown } from "../utils";
import CheckmarkIconSvg from "../assets/images/icon-checkmark.svg";

type ButtonCardWithCheckboxProps = {
  label: string;
  description: string;
  price: string;
  checked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
};
export const ButtonCardWithCheckbox = (props: ButtonCardWithCheckboxProps) => {
  const toggleChecked = () => props.onCheckedChange(!props.checked);

  return (
    <div
      onClick={toggleChecked}
      className="button-card-with-checkbox"
      onKeyDown={(e) => handleEnterDown(e, toggleChecked)}
      data-checked={props.checked}
      aria-checked={props.checked}
      role="checkbox"
      tabIndex={0}
    >
      <div className="button-card-with-checkbox__checkbox">
        <input
          checked={props.checked}
          onChange={(e) => props.onCheckedChange(e.target.checked)}
          type="checkbox"
        />
        <span>
          <img src={CheckmarkIconSvg} alt="checkmark icon" />
        </span>
      </div>
      <div className="button-card-with-checkbox__text">
        <h4>{props.label}</h4>
        <p>{props.description}</p>
      </div>
      <p>{props.price}</p>
    </div>
  );
};
