import Image from "next/image";
import { CartSheet } from "./CartSheet";
export const Header = () => {
  return (
    <div className="bg-black px-[88px] py-3 flex justify-between ">
      <div>
        <Image src="./nomNom.svg" alt="logo" height={44} width={146} />
      </div>
      <div className=" flex gap-[12.81px]">
        <div className="bg-white rounded-full px-3 py-2 flex gap-1">
          <div className="flex gap-1 items-center">
            <Image src="./icons/location.svg" alt="" width={20} height={20} />
            <span className="text-red-500 text-[12px]">Delivery address:</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-[12px] text-gray-400">Add Location</span>
            <Image src="./icons/arrow.svg" alt="" width={20} height={20} />
          </div>
        </div>
        <div>
          {/* <Image src="./icons/cart.svg" alt="" width={36} height={36} /> */}
          <CartSheet />
        </div>
        <div>
          <Image src="./icons/user.svg" alt="user" width={36} height={36} />
        </div>
      </div>
    </div>
  );
};
