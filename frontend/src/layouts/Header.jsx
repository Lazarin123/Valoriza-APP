import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="h-32 w-full">
        <ul className="flex m-5  flex-row mx-10 justify-between">
          <li className="flex align-center flex-row gap-0 ">
            <img
              src="/frontend/src/assets/images/Banner_sua_casa_mais_bela_70_off__1_-removebg-preview 5.svg"
              alt="valoriza logo"
            />
            <img
              src="\frontend\src\assets\images\Banner_sua_casa_mais_bela_70_off__2_-removebg-preview 4.svg"
              alt="valoriza app name"
            />
          </li>
          <li className="flex relative flex-col justify-center items-center size-14">
            <button className="top-4 absolute">
              <img src="\frontend\src\assets\images\menu 1.svg" alt="menu" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
