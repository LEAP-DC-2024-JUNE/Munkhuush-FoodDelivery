import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-black py-[60px] ">
      <div className="">
        <img src="./fresh.svg" alt="fresh fast" height={92} />
      </div>
      <div className="mt-[76px] mb-[104px] mx-[88px] flex gap-[220px] ">
        <div>
          <Image src="./nom.svg" alt="" width={88} height={93} />
        </div>
        <div className="flex gap-[112px] ">
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-400">NOMNOM</h1>
            <Link className="text-gray-200" href="/">
              Home
            </Link>
            <Link className="text-gray-200" href="/contact-us">
              Contact us
            </Link>
            <Link className="text-gray-200" href="/delivery-zone">
              Delivery zone
            </Link>
          </div>
          <div className="flex  gap-14">
            <div className="flex flex-col gap-4 w-[132px]">
              <h1 className="text-gray-400">MENU</h1>
              <Link className="text-gray-200" href="/">
                Appetizers
              </Link>
              <Link className="text-gray-200" href="/contact-us">
                Salads
              </Link>
              <Link className="text-gray-200" href="/delivery-zone">
                Pizzas
              </Link>
              <Link className="text-gray-200" href="/delivery-zone">
                Main dishes
              </Link>
              <Link className="text-gray-200" href="/delivery-zone">
                Desserts
              </Link>
            </div>
            <div className="flex flex-col gap-4 w-[132px]">
              <h1 className="mb-6"> </h1>
              <Link className="text-gray-200" href="/">
                Side dish
              </Link>
              <Link className="text-gray-200" href="/contact-us">
                Brunch
              </Link>
              <Link className="text-gray-200" href="/delivery-zone">
                Desserts
              </Link>
              <Link className="text-gray-200" href="/delivery-zone">
                Beverages
              </Link>
              <Link className="text-gray-200 flex" href="/delivery-zone">
                Fish & Sea foods
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-400">FOLLOW US</h1>
            <div className="flex gap-4">
              <Image src="./icons/facebook.svg" alt="" width={28} height={27} />
              <Image
                src="./icons/instagram.svg"
                alt=""
                width={28}
                height={27}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 mx-[88px] border-t-[1px] text-gray-400 flex gap-12 border-t-gray-600  ">
        <span>Copy right 2024 © Nomnom LLC</span>
        <span>Privacy policy</span>
        <span>Terms and condition</span>
        <span>Cookie policy</span>
      </div>
    </div>
  );
};
