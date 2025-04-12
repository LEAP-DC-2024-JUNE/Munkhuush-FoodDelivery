import { usePathname, useRouter } from "next/navigation";
export const AdminSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-10 w-[205px] h-screen px-5 py-9">
      <img
        onClick={() => router.push("/")}
        src="./icons/admin/adminBoardLogo.svg"
        alt="logo"
        className="hover:cursor-pointer"
      />
      <div className="flex flex-col gap-6 w-[165px] h-[168px]">
        <div
          className={`${
            pathname === "/food-menu"
              ? "text-white bg-black  rounded-full"
              : "text-black"
          } text-sm font-medium flex gap-2.5 items-center px-6 w-[165px] h-[40px] `}
        >
          {pathname === "/food-menu" ? (
            <img
              src="./icons/darkMode/adminFoodMenuDark.svg"
              alt="foodMenuDark"
            />
          ) : (
            <img src="./icons/adminFoodMenu.svg" alt="foodMenu" />
          )}
          <span className="text-sm font-medium">Food menu</span>
        </div>
        <div
          className={`${
            pathname === "/orders"
              ? "text-white bg-black  rounded-full"
              : "text-black"
          } text-sm font-medium flex gap-2.5 w-[165px] h-[40px] items-center px-6 `}
        >
          {pathname === "/orders" ? (
            <img src="./icons/darkMode/adminOrdersDark.svg" alt="orders" />
          ) : (
            <img src="./icons/admin/adminOrders.svg" alt="orders" />
          )}
          <span className="text-sm font-medium">Orders</span>
        </div>
        <div
          className={`${
            pathname === "/settings"
              ? "text-white bg-black  rounded-full"
              : "text-black"
          } text-sm font-medium flex gap-2.5 w-[165px] h-[40px] items-center px-6 `}
        >
          <img src="./icons/admin/adminSettings.svg" alt="settings" />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
};
