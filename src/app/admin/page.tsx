"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../../components/AdminComponents/sideBar"
import AdminProduct from "@/components/AdminComponents/AdminProduct";
import AdminOrders from "@/components/AdminComponents/AdminOrders";
import AdminUsers from "@/components/AdminComponents/AdminUsers";

const AdminMain = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState("Dashboard");

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleSidebarSelect = (item: string) => {
        setSelectedItem(item);
    };

    const renderComponent = () => {
        switch (selectedItem) {
            case "Products":
                return <AdminProduct />
            case "Orders":
                return <AdminOrders />
            case "Users":
                return <AdminUsers />
            default:
                return ""
        }
    }

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelect={handleSidebarSelect} />
            <div className="sm:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-800 bg-white p-2 rounded shadow"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">{selectedItem}</h1>
                {renderComponent()}
            </main>
        </div>
    );
};

export default AdminMain;
