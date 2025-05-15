import { useState } from "react";
import { Menu, X } from "lucide-react";


interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    onSelect: (name: string) => void;
}
const Sidebar = ({ isOpen, toggleSidebar, onSelect }: SidebarProps) => {
    const menuItems = ["Dashboard", "Products", "Orders", "Users", "Settings"];

    return (
        <div
            className={`bg-black text-white p-5 space-y-4 duration-300 
      ${isOpen ? "w-64" : "w-16"} hidden sm:block`}
        >
            <div className="flex justify-between items-center">
                <h2 className={`text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}>
                    Admin
                </h2>
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className="flex flex-col space-y-2 mt-6">
                {menuItems.map((item, idx) => (
                    <button
                        key={item}
                        onClick={() => onSelect(item)}
                        className="text-left hover:bg-gray-700 p-2 rounded text-sm transition-all"
                    >
                        {isOpen ? item : item[0]}
                    </button>

                ))}
            </nav>
        </div>
    );
};

export default Sidebar;

