type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type FormInputProps = InputProps & {
  label: string;
  errorMessage?: string;
  isError?: boolean;
};
export const FormInput = (props: FormInputProps) => {
  const { label, errorMessage, isError, ...inputProps } = props;

  return (
    <div className="form-input" data-error={props.isError}>
      <div className="form-input-label-container">
        <label className="form-input-label">{props.label}</label>
        <p className="form-input-error-message">{props.errorMessage}</p>
      </div>
      <input {...inputProps} className="input input-primary" />
    </div>
  );
};
