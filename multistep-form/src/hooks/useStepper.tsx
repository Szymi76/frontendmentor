import { useState } from "react";

export const useStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const max_step = 3;

  const next = () => {
    if (currentStep == max_step) return;
    setCurrentStep(currentStep + 1);
  };

  const previous = () => {
    if (currentStep == 0) return;
    setCurrentStep(currentStep - 1);
  };

  const jumpToStep = (step: number) => {
    setCurrentStep(step);
  };

  return { currentStep, next, previous, jumpToStep };
};
