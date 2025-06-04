import { handleEnterDown } from "../utils";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
};
export const Switch = (props: SwitchProps) => {
  const toggleChecked = () => props.onCheckedChange(!props.checked);

  return (
    <div
      className="switch"
      tabIndex={0}
      role="checkbox"
      aria-checked={props.checked}
      onKeyDown={(e) => handleEnterDown(e, toggleChecked)}
    >
      <input
        checked={props.checked}
        onChange={(e) => props.onCheckedChange(e.target.checked)}
        type="checkbox"
      />
      <span></span>
    </div>
  );
};
