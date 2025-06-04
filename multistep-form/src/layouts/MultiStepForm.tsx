import { useFormContext } from "react-hook-form";
import { AddOns, MultiFormData, Plan } from "./MultiStepFormContainer";
import { MULTI_FORM__STEPS } from "../constants";
import {
  ButtonCard,
  ButtonCardWithCheckbox,
  FormInput,
  Switch,
} from "../components/index";
import { Divider } from "../components/Helpers";

/////////////////
// All steps combined
/////////////////

type MultiStepFormProps = {
  currentStep: number;
  jumpToStep: (step: number) => void;
};
const MultiStepForm = (props: MultiStepFormProps) => {
  if (props.currentStep === 0) return <FirstStep />;
  if (props.currentStep === 1) return <SecondStep />;
  if (props.currentStep === 2) return <ThirdStep />;
  else return <FinalStep {...props} />;
};

export default MultiStepForm;

/////////////////
// First Step
/////////////////

const FirstStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormData>();

  const { name, email, phone } = MULTI_FORM__STEPS.firstStep.form;

  return (
    <div className="flex flex-col gap-lg">
      <FormInput
        type="text"
        label={name.label}
        placeholder={name.placeholder}
        errorMessage={errors.name?.message}
        isError={Boolean(errors.name)}
        {...register("name", {
          required: "This field is required",
        })}
      />
      <FormInput
        type="email"
        label={email.label}
        placeholder={email.placeholder}
        errorMessage={errors.email?.message}
        isError={Boolean(errors.email)}
        {...register("email", {
          required: "This field is required",
        })}
      />
      <FormInput
        type="text"
        label={phone.label}
        placeholder={phone.placeholder}
        errorMessage={errors.phone?.message}
        isError={Boolean(errors.phone)}
        {...register("phone", {
          required: "This field is required",
        })}
      />
    </div>
  );
};

/////////////////
// Second Step
/////////////////

const SecondStep = () => {
  const { watch, setValue } = useFormContext<MultiFormData>();

  const steps = Object.values(MULTI_FORM__STEPS.secondStep.form);

  const planPricing = watch("planPricing");
  const isSwitchChecked = planPricing === "yearly";
  const onSwitchChange = () => {
    setValue("planPricing", isSwitchChecked ? "monthly" : "yearly");
  };

  return (
    <div className="second-step">
      <div className="second-step__buttons-wrapper">
        {steps.map((step) => {
          const isSelected = watch("selectedPlan") == step.name;
          const toggleSelection = () =>
            setValue("selectedPlan", step.name as Plan);

          const price =
            planPricing == "monthly"
              ? `$${step.price.monthly}/mo`
              : `$${step.price.yearly}/yr`;

          return (
            <div key={step.name} className="flex-1">
              <ButtonCard
                isSelected={isSelected}
                onClick={toggleSelection}
                label={step.label}
                price={price}
                description={
                  planPricing === "yearly" ? step.description : undefined
                }
                iconSrc={step.iconSvg}
              />
            </div>
          );
        })}
      </div>
      <div className="second-step__pricing">
        <p
          className={
            planPricing === "monthly" ? "text-primary" : "text-description"
          }
        >
          Monthly
        </p>
        <Switch checked={isSwitchChecked} onCheckedChange={onSwitchChange} />
        <p
          className={
            planPricing === "yearly" ? "text-primary" : "text-description"
          }
        >
          Yearly
        </p>
      </div>
    </div>
  );
};

/////////////////
// Third Step
/////////////////

const ThirdStep = () => {
  const { watch, setValue } = useFormContext<MultiFormData>();

  const steps = Object.values(MULTI_FORM__STEPS.thirdStep.form);

  const planPricing = watch("planPricing");
  const pickAddOns = watch("pickAddOns");

  return (
    <div className="flex flex-col gap-lg">
      {steps.map((step) => {
        const name = step.name as AddOns;

        const toggleSelection = () => {
          setValue(
            "pickAddOns",
            pickAddOns.includes(name)
              ? pickAddOns.filter((val) => val != name)
              : [...pickAddOns, name]
          );
        };

        const price =
          planPricing == "monthly"
            ? `$${step.price.monthly}/mo`
            : `$${step.price.yearly}/yr`;

        return (
          <div key={step.name}>
            <ButtonCardWithCheckbox
              checked={pickAddOns.includes(name)}
              onCheckedChange={toggleSelection}
              label={step.label}
              description={step.description}
              price={price}
            />
          </div>
        );
      })}
    </div>
  );
};

/////////////////
// Final Step
/////////////////

const FinalStep = (props: MultiStepFormProps) => {
  const { getValues } = useFormContext<MultiFormData>();

  const thirdStep = MULTI_FORM__STEPS.thirdStep.form;
  const secondStep = MULTI_FORM__STEPS.secondStep.form;

  const data = getValues();

  const sum =
    MULTI_FORM__STEPS.secondStep.form[data.selectedPlan].price[
      data.planPricing
    ] +
    Object.values(MULTI_FORM__STEPS.thirdStep.form).reduce((prev, curr) => {
      if (data.pickAddOns.includes(curr.name as AddOns))
        return prev + curr.price[data.planPricing];
      return prev;
    }, 0);

  return (
    <div className="final-step">
      <div className="final-step__summary">
        <div className="justify-between">
          <div className="flex flex-col gap-sm">
            <p className="flex gap-md">
              <span className="text-capitalize font-lg text-primary font-bold">
                {data.selectedPlan}
              </span>
              <span className="text-capitalize font-lg text-primary font-bold">
                ({data.planPricing})
              </span>
            </p>
            <a
              onClick={() => props.jumpToStep(1)}
              href="#"
              className="text-description"
            >
              Change
            </a>
          </div>
          <p className="text-capitalize font-lg text-primary font-bold">
            ${secondStep[data.selectedPlan].price[data.planPricing]}/
            {data.planPricing === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        <Divider />
        <div className="flex flex-col gap-lg">
          {data.pickAddOns.map((addOn) => {
            const price =
              data.planPricing === "monthly"
                ? `+$${thirdStep[addOn].price.monthly}/mo`
                : `+$${thirdStep[addOn].price.yearly}/yr`;

            return (
              <div key={addOn} className="justify-between">
                <p className="text-description">{thirdStep[addOn].label}</p>
                <p className="text-primary font-medium">{price}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="final-step__total">
        <p className="text-description">
          Total (per {data.planPricing === "monthly" ? "month" : "year"})
        </p>
        <p className="font-xl font-bold text-secondary">
          +${sum}/{data.planPricing === "monthly" ? "mo" : "yr"}
        </p>
      </div>
    </div>
  );
};
