import ThankYouSvg from "../assets/images/icon-thank-you.svg";

const FormSubmitSuccess = () => {
  return (
    <div className="thank-you-container">
      <img src={ThankYouSvg} alt="thank you icon" />
      <h1 className="text-2xl text-primary">Thank you!</h1>
      <p className="text-description">
        Thank for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loregaming.com
      </p>
    </div>
  );
};

export default FormSubmitSuccess;
