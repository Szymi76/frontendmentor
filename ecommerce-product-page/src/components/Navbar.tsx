import { useState } from "react";

import BrandLogo from "../../images/logo.svg";
import CartIcon from "../../images/icon-cart.svg";
import AvatarImage from "../../images/image-avatar.png";
import IconClose from "../../images/icon-close.svg";
import { useCart } from "../hooks/useCart";
import HamburgerIcon from "../../images/icon-menu.svg";
import TrashIcon from "../../images/icon-delete.svg";
import Button from "./Button";

const links = [
  { label: "collections", href: "#" },
  { label: "men", href: "#" },
  { label: "women", href: "#" },
  { label: "about", href: "#" },
  { label: "contact", href: "#" },
];

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <nav className="max-w-5xl mx-auto sticky top-0 z-10 bg-white border-b-2 border-gray-200 flex items-center gap-10 px-5 py-3 md:py-0">
      <div className="flex gap-5">
        <button
          className="cursor-pointer md:hidden"
          onClick={() => setShowSideMenu(true)}
        >
          <img
            src={HamburgerIcon}
            alt="hamburger menu icon"
            height={22}
            width={22}
          />
        </button>
        <a href="./">
          <img src={BrandLogo} alt="brand logo" />
        </a>
      </div>
      <ul className="gap-5 hidden md:flex">
        {links.map((link) => (
          <NavbarLink key={link.label} {...link} />
        ))}
      </ul>
      <div className="ml-auto flex items-center gap-8">
        <CartIconButton toggleCart={() => setShowCart(!showCart)} />
        <AvatarButton />
      </div>
      {showCart && <Cart />}
      {showSideMenu && <SideNavBar onHideMenu={() => setShowSideMenu(false)} />}
    </nav>
  );
};

export default Navbar;

type CartIconButtonProps = { toggleCart: () => void };
const CartIconButton = (props: CartIconButtonProps) => {
  const { items } = useCart();
  const overallAmount = items
    .map((item) => item.amount)
    .reduce((prev, curr) => prev + curr, 0);
  return (
    <div className="relative rounded-full p-3">
      <button className=" cursor-pointer" onClick={props.toggleCart}>
        <img src={CartIcon} alt="cart icon" height={30} width={30} />
      </button>
      {overallAmount > 0 && (
        <span className="absolute top-1 bg-orange-400 px-2 rounded-full text-white font-medium text-sm">
          {overallAmount}
        </span>
      )}
    </div>
  );
};

const Cart = () => {
  const { items, removeItemFromCart } = useCart();

  const isCartEmpty = items.length === 0;

  return (
    <div className="absolute w-full top-22 sm:w-fit right-0 xl:-right-20 px-5">
      <div className="flex flex-col bg-white min-w-[350px] rounded-lg shadow-2xl">
        <h3 className="p-5 font-bold border-b border-gray-200">Cart</h3>
        {isCartEmpty && (
          <div className="flex-1 flex justify-center items-center py-20">
            <p className="text-gray-600 text-lg font-semibold">
              Your cart is empty.
            </p>
          </div>
        )}

        {!isCartEmpty && (
          <div className="flex flex-col p-5 flex-1">
            <div className="flex flex-col gap-3 pb-5">
              {items.map((item) => {
                return (
                  <div className="flex gap-3 py-3">
                    <img
                      src={item.thumbnails[0]}
                      alt="thumbnail image"
                      className="h-10 w-10 rounded"
                    />
                    <div className="flex flex-col">
                      <p className="text-gray-500">{item.name}</p>
                      <div className="flex gap-2">
                        <p className="text-gray-500">
                          ${item.price.toFixed(2)} x {item.amount}
                        </p>
                        <p className="font-bold">
                          ${(item.price * item.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="cursor-pointer"
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      <img src={TrashIcon} alt="" />
                    </button>
                  </div>
                );
              })}
            </div>
            <Button>Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const AvatarButton = () => {
  return (
    <button className="border-2 border-transparent hover:border-orange-400 cursor-pointer rounded-full">
      <img src={AvatarImage} height={60} width={60} alt="user avatar" />
    </button>
  );
};

type NavbarLinkProps = { label: string; href: string };
const NavbarLink = (props: NavbarLinkProps) => {
  return (
    <a
      className="h-full py-8 text-gray-400 font-medium text-xl hover:text-gray-800 border-b-4 border-transparent hover:border-orange-400 duration-75 relative w-fit"
      href={props.href}
    >
      {props.label}
    </a>
  );
};

type SideNavBarProps = { onHideMenu: () => void };
const SideNavBar = (props: SideNavBarProps) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-full bg-black/30">
      <div className="bg-white h-full w-3/5 p-8">
        <button className="cursor-pointer" onClick={props.onHideMenu}>
          <img src={IconClose} alt="close button" height={20} width={20} />
        </button>
        <ul className="pt-10 flex flex-col gap-5 text-2xl font-semibold capitalize">
          {links.map((link) => (
            <SideNavBarLink key={link.label} {...link} />
          ))}
        </ul>
      </div>
    </div>
  );
};

type SideNavBarLinkProps = { label: string; href: string };
const SideNavBarLink = (props: SideNavBarLinkProps) => {
  return (
    <li>
      <a href={props.href}>{props.label}</a>
    </li>
  );
};
