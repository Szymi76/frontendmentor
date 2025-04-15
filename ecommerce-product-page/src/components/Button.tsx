import React from "react";

type ButtonProps = { children: React.ReactNode; onClick?: () => void };
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-orange-400 text-black px-10 py-4 flex items-center justify-center gap-3 rounded-lg hover:opacity-80 duration-75 cursor-pointer font-bold flex-1"
    >
      {props.children}
    </button>
  );
};

export default Button;
