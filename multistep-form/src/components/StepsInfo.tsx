import { MULTI_FORM__STEPS } from "../constants";

type StepsInfoProps = { currentStep: number };
const StepsInfo = (props: StepsInfoProps) => {
  const { currentStep } = props;

  // Steps as an array
  const steps = Object.values(MULTI_FORM__STEPS);

  return (
    <>
      {steps.map((step, index) => {
        const stepNumber = index;
        return (
          <SingleStepInfo
            key={"step-info-" + index}
            step={stepNumber + 1}
            isActive={currentStep == stepNumber}
            label={step.shortLabel}
          />
        );
      })}
    </>
  );
};

export default StepsInfo;

type SingleStepInfoProps = { step: number; isActive: boolean; label?: string };
const SingleStepInfo = (props: SingleStepInfoProps) => {
  return (
    <div className="single-step-info">
      <div data-active={props.isActive} className="single-step-info__circle">
        {props.step}
      </div>
      <div className="single-step-info__text">
        <p>STEP {props.step}</p>
        <h4>{props.label}</h4>
      </div>
    </div>
  );
};
