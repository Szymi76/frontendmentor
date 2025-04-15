import { Item } from "./hooks/useCart";

import Image1 from "../images/image-product-1.jpg";
import Image2 from "../images/image-product-2.jpg";
import Image3 from "../images/image-product-3.jpg";
import Image4 from "../images/image-product-4.jpg";

import Thumbnail1 from "../images/image-product-1-thumbnail.jpg";
import Thumbnail2 from "../images/image-product-2-thumbnail.jpg";
import Thumbnail3 from "../images/image-product-3-thumbnail.jpg";
import Thumbnail4 from "../images/image-product-4-thumbnail.jpg";

const item: Item = {
  company: "sneaker company",
  name: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  discount: 50,
  id: 1,
  images: [Image1, Image2, Image3, Image4],
  thumbnails: [Thumbnail1, Thumbnail2, Thumbnail3, Thumbnail4],
  price: 125,
  amount: 0,
};

const items = [item];
export default items;
