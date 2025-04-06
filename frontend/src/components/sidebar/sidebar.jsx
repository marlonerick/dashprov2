import {
  LayoutDashboard,
  User2,
  AlignJustify,
  PocketKnife,
  ShoppingBasket,
  ShoppingCart,
  PackageOpen,
  ChartNoAxesCombined,

} from "lucide-react";

import LogoHome from "../../assets/img/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  const SideMenu = [
    {
      title: "Home",
      icon: <LayoutDashboard color="#FFF" size={20} />,
      rota: "/home",
    },
    {
      title: "Membros",
      icon: <User2 color="#FFF" size={20} />,
      rota: "/cadastro",
    },
    {
      title: "Vendas",
      icon: <ShoppingCart color="#FFF" size={20} />,
      rota: "/vendas",
    },
    {
      title: "Compras",
      icon: <ShoppingBasket color="#FFF" size={20} />,
      rota: "/compras",
    },
    {
      title: "Ações",
      icon: <PocketKnife color="#FFF" size={20} />,
      rota: "/acao",
    },
    {
      title: "Encomendas",
      icon: <PackageOpen color="#FFF" size={20} />,
      rota: "/encomendas",
    },
    {
      title: "Metas",
      icon: <ChartNoAxesCombined color="#FFF" size={20} />,
      rota: "/metas",
    },

  ];

  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(SideMenu.length).fill(false)
  );

  const toggleSubMenu = (index) => {
    setSubMenuOpen((prevSubMenuOpen) => {
      const updatedSubMenuOpen = [...prevSubMenuOpen];
      updatedSubMenuOpen[index] = !updatedSubMenuOpen[index];
      return updatedSubMenuOpen;
    });
  };

  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-80" : "w-32 "
          } relative min-h-screen overflow-y-auto bg-[#212529] p-5 pt-6 duration-700 scrollbar-none`}
        >
          {open ? (
            <AlignJustify
              size={36}
              color="#FFF"
              className="absolute -right-0 w-10 cursor-pointer rounded-lg bg-[#1E293B] p-1 shadow-lg transition-all hover:bg-[#334155] hover:scale-105 translate-y-[-50%]"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <AlignJustify
              size={36}
              color="#FFF"
              className="absolute -right-0 w-10 cursor-pointer rounded-lg bg-[#1E293B] p-1 shadow-lg transition-all hover:bg-[#334155] hover:scale-105 translate-y-[-50%]"
              onClick={() => setOpen(!open)}
            />
          )}

          <div className="m-0 flex w-full flex-col items-center gap-x-3">
            <h1
              className={`text-xl origin-left font-medium text-white duration-500 ${
                !open && "scale-0"
              }`}
            >
              DASHBOARD FAMILIA
            </h1>
            <hr className="w-72 h-px my-2 bg-gray-200 border-0 dark:bg-white"></hr>
            <img
              src={LogoHome}
              alt=""
              className={`h-16 w-16 cursor-pointer rounded-xl duration-500`}
            />
            <hr className="w-72 h-px my-2 bg-gray-200 border-0 dark:bg-white"></hr>
          </div>
          <div className="m-1 p-2 bg-gray-500 rounded-xl">
            <ul>
              {SideMenu.map((menuItem, index) => (
                <div key={index}>
                  <Link to={menuItem.rota ? menuItem.rota : ""} key={index}>
                    <li
                      className="my-1 flex cursor-pointer flex-col items-center justify-between gap-x-2 space-x-1 rounded-md p-1 hover:bg-gray-600 "
                      onClick={() => toggleSubMenu(index)}
                    >
                      {menuItem.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left text-sm font-medium uppercase text-white duration-500`}
                      >
                        {menuItem.title}
                      </span>
                    </li>
                  </Link>
                  {menuItem.subMenuItems && subMenuOpen[index] && (
                    <ul>
                      {menuItem.subMenuItems.map((subItem, subIndex) => (
                        <Link
                          to={subItem.rota ? subItem.rota : ""}
                          key={subIndex}
                        >
                          <li className="items-centers my-1 flex origin-left cursor-pointer justify-center gap-x-2 rounded-md p-1 text-xs font-medium uppercase text-white duration-500 hover:bg-[#BDCDD6]">
                            <span className="flex w-full origin-left items-center justify-center gap-x-2 text-[10px] font-normal uppercase text-cyan-500 duration-500">
                              {subItem.icon}
                              {subItem.title}
                            </span>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </ul>
          </div>
          {/* <div className="flex items-center justify-center">
            <button className="flex  w-24 items-center justify-center ">
              <LogOut color="red" size={40} />
              <p className="rounded-xl p-1 text-lg font-bold text-red-600">
                LOGOUT
              </p>
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
