import { useForm, FormProvider } from "react-hook-form";
import { MULTI_FORM__STEPS } from "../constants";
import MultiStepForm from "./MultiStepForm";
import { useStepper } from "../hooks/useStepper";
import StepsInfo from "../components/StepsInfo";
import { useState } from "react";
import FormSubmitSuccess from "./FormSubmitSuccess";

export type PlanPricing = "monthly" | "yearly";
export type Plan = "arcade" | "advanced" | "pro";
export type AddOns = "online" | "storage" | "profile";

export type MultiFormData = {
  name: string;
  email: string;
  phone: string;
  planPricing: "monthly" | "yearly";
  selectedPlan: "arcade" | "advanced" | "pro";
  pickAddOns: AddOns[];
};

const MultiStepFormContainer = () => {
  const [submitted, setSubmitted] = useState(false);
  const { currentStep, next, previous, jumpToStep } = useStepper();
  const methods = useForm<MultiFormData>({
    defaultValues: {
      selectedPlan: "arcade",
      planPricing: "monthly",
      pickAddOns: [],
    },
  });

  // Function fires when form is submitted
  const onSubmit = methods.handleSubmit((data) => {
    // Data validation and api request
    console.log(data);
    setSubmitted(true);
  });

  // Steps as an array
  const steps = Object.values(MULTI_FORM__STEPS);

  // First and last step index
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Action when hitting "Next Step"
  const handleNextStep = async () => {
    let canGoNext = true;

    if (currentStep === 0) {
      const isValid = await methods.trigger(["name", "email", "phone"]);
      if (!isValid) canGoNext = false;
    }

    if (canGoNext) next();
  };

  // Action when hitting "Previous Step"
  const handlePreviousStep = () => previous();

  return (
    <FormProvider {...methods}>
      <form className="form-container" onSubmit={onSubmit}>
        {/* Left info about current progress */}
        <div className="form-container__steps-info">
          <StepsInfo currentStep={currentStep} />
        </div>

        {/* Right side form wrapper */}
        {!submitted ? (
          <div className="form-container__form-wrapper">
            {/* Label and description of current step */}
            <div className="form-container__form-wrapper__text">
              <h1>{steps[currentStep].longLabel}</h1>
              <p>{steps[currentStep].description}</p>
            </div>

            {/* Specific step container */}
            <div className="form-container__form">
              <MultiStepForm
                currentStep={currentStep}
                jumpToStep={jumpToStep}
              />
            </div>

            {/* Navigation under the form */}
            <div className="form-container__bottom-nav">
              <div>
                {!isFirstStep && (
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={handlePreviousStep}
                  >
                    Go Back
                  </button>
                )}
              </div>
              <div>
                {!isLastStep && (
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleNextStep}
                  >
                    Next Step
                  </button>
                )}
                {isLastStep && (
                  <button type="submit" className="button button-secondary">
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <FormSubmitSuccess />
        )}
      </form>
    </FormProvider>
  );
};

export default MultiStepFormContainer;
