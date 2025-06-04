import arcadeSvg from "../assets/images/icon-arcade.svg";
import advancedSrc from "../assets/images/icon-advanced.svg";
import proSrc from "../assets/images/icon-pro.svg";

export type StepObject = {
  shortLabel: string;
  longLabel: string;
  description: string;
};

export const MULTI_FORM__STEPS = {
  // First Step
  firstStep: {
    shortLabel: "your info",
    longLabel: "Personal info",
    description: "Please provide your name, email and phone number.",
    form: {
      name: { label: "Name", placeholder: "e.g. Stephen King" },

      email: {
        label: "Email Address",
        placeholder: "e.g. stephenking@lorem.com ",
      },
      phone: { label: "Phone Number", placeholder: "e.g. +1 234 567 890 " },
    },
  },

  // Second Step
  secondStep: {
    shortLabel: "select plan",
    longLabel: "Select your plan",
    description: "You have the option of monthly or yearly biling.",
    form: {
      arcade: {
        name: "arcade",
        label: "Arcade",
        price: { monthly: 9, yearly: 90 },
        iconSvg: arcadeSvg,
        description: "2 months free",
      },

      advanced: {
        name: "advanced",
        label: "Advanced",
        price: { monthly: 12, yearly: 120 },
        iconSvg: advancedSrc,
        description: "2 months free",
      },

      pro: {
        name: "pro",
        label: "Pro",
        price: { monthly: 15, yearly: 150 },
        iconSvg: proSrc,
        description: "2 months free",
      },
    },
  },

  // Third Step
  thirdStep: {
    shortLabel: "add-ons",
    longLabel: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    form: {
      online: {
        name: "online",
        label: "Online service",
        description: "Access to multiplayer games",
        price: { monthly: 1, yearly: 10 },
      },

      storage: {
        name: "storage",
        label: "Larger storage",
        description: "Extra 1TB of cloud save",
        price: { monthly: 2, yearly: 20 },
      },

      profile: {
        name: "profile",
        label: "Customizable profile",
        description: "Custom theme on your profile",
        price: { monthly: 2, yearly: 20 },
      },
    },
  },

  // Final Step
  finalStep: {
    shortLabel: "summary",
    longLabel: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
  },
};
