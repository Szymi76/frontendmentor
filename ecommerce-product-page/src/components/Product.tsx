import { useState } from "react";
import { Item, useCart } from "../hooks/useCart";
import Button from "./Button";
import PlusIcon from "../../images/icon-plus.svg";
import MinusIcon from "../../images/icon-minus.svg";
import PreviousIcon from "../../images/icon-previous.svg";
import NextIcon from "../../images/icon-next.svg";
import CloseIcon from "../../images/icon-close.svg";

type ProductProps = { item: Item };
const Product = (props: ProductProps) => {
  const { addItemToCart } = useCart();
  const [amount, setAmount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const item = { ...props.item, amount };

  return (
    <div className="flex flex-col lg:flex-row py-0 lg:py-20 max-w-5xl mx-auto">
      <DesktopImages item={item} onShowPreview={() => setShowPreview(true)} />
      <MobileImages item={item} onShowPreview={() => setShowPreview(true)} />
      <div className="px-10 lg:px-18 py-10 flex flex-col gap-3">
        <p className="text-gray-500 font-semibold uppercase">{item.company}</p>
        <h2 className="text-4xl font-bold mb-3">{item.name}</h2>
        <p className="text-gray-400">{item.description}</p>
        <div className="flex gap-3 lg:flex-col justify-between mt-3">
          <div className="flex gap-3 items-center">
            <p className="text-2xl font-bold ">${item.price.toFixed(2)}</p>
            {item.discount > 0 && (
              <p className="bg-black text-white px-2 rounded-md">
                {item.discount}%
              </p>
            )}
          </div>
          <p className="text-gray-500 font-bold line-through">
            ${((item.price / (100 - item.discount)) * 100).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 mt-5">
          <div className="flex">
            <button
              className="bg-gray-100 px-5 py-4 rounded-l-md hover:opacity-80 cursor-pointer"
              onClick={() => setAmount((amount) => Math.max(0, amount - 1))}
            >
              <img src={MinusIcon} alt="minus icon" />
            </button>
            <div className="flex flex-1 lg:flex-none justify-center items-center bg-gray-100 font-bold px-5 py-4 tabular-nums">
              {amount}
            </div>
            <button
              className="bg-gray-100 px-5 py-4 rounded-r-md hover:opacity-80 cursor-pointer"
              onClick={() => setAmount((amount) => amount + 1)}
            >
              <img src={PlusIcon} alt="plus icon" />
            </button>
          </div>
          <Button onClick={() => addItemToCart(item)}>Add to cart</Button>
        </div>
      </div>
      {showPreview && (
        <ImagesPreview
          item={item}
          onHidePreview={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Product;

type ImagesProps = ProductProps & { onShowPreview: () => void };

const DesktopImages = (props: ImagesProps) => {
  const { images, thumbnails } = props.item;
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="hidden lg:block">
      <img
        src={images[selectedIndex]}
        alt="main image"
        className="max-h-[400px] max-w-[400px] rounded-lg"
        onClick={props.onShowPreview}
      />
      <div className="flex gap-3 justify-between py-10">
        {thumbnails.map((url, index) => {
          const selected = index === selectedIndex;

          return (
            <div
              className={`rounded-lg border-2 overflow-hidden cursor-pointer ${
                selected ? "border-orange-400" : "border-transparent"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={url}
                alt="thumbnail image"
                height={100}
                width={100}
                className={`center hover:opacity-50 duration-75 ${
                  selected ? "opacity-50" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileImages = (props: ImagesProps) => {
  const { images } = props.item;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex(() => {
      if (selectedIndex == 3) return 0;
      else return selectedIndex + 1;
    });
  };

  const handlePrevious = () => {
    setSelectedIndex(() => {
      if (selectedIndex == 0) return 3;
      else return selectedIndex - 1;
    });
  };

  return (
    <div className="relative lg:hidden">
      <img src={images[selectedIndex]} alt="main image" />
      <button
        onClick={handlePrevious}
        className="bg-white rounded-full absolute top-1/2 left-5 -translate-y-1/2 h-12 w-12 flex items-center justify-center cursor-pointer hover:opacity-85 duration-75"
      >
        <img src={PreviousIcon} alt="previous icon" />
      </button>
      <button
        onClick={handleNext}
        className="bg-white rounded-full absolute top-1/2 right-5 -translate-y-1/2 h-12 w-12 flex items-center justify-center cursor-pointer hover:opacity-85 duration-75"
      >
        <img src={NextIcon} alt="next icon" />
      </button>
    </div>
  );
};

type ImagesPreview = { item: Item; onHidePreview: () => void };
const ImagesPreview = (props: ImagesPreview) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { images } = props.item;

  const handleNext = () => {
    setSelectedIndex(() => {
      if (selectedIndex == 3) return 0;
      else return selectedIndex + 1;
    });
  };

  const handlePrevious = () => {
    setSelectedIndex(() => {
      if (selectedIndex == 0) return 3;
      else return selectedIndex - 1;
    });
  };

  return (
    <div className="fixed h-screen w-full bg-black/80 top-0 left-0 z-20 justify-center items-center hidden lg:flex">
      <div className="relative">
        <img
          src={images[selectedIndex]}
          alt="main image"
          className="h-[600px] w-[600px] rounded-2xl"
        />
        <button
          onClick={handlePrevious}
          className="bg-white rounded-full absolute top-1/2 -left-8 -translate-y-1/2 h-16 w-16 flex items-center justify-center cursor-pointer hover:opacity-85 duration-75"
        >
          <img src={PreviousIcon} alt="previous icon" />
        </button>
        <button
          onClick={handleNext}
          className="bg-white rounded-full absolute top-1/2 -right-8 -translate-y-1/2 h-16 w-16 flex items-center justify-center cursor-pointer hover:opacity-85 duration-75"
        >
          <img src={NextIcon} alt="next icon" />
        </button>
        <button
          className="absolute -top-10 right-0 cursor-pointer"
          onClick={props.onHidePreview}
        >
          <img src={CloseIcon} alt="close icon" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
