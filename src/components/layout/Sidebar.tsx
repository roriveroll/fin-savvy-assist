
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, route: "/dashboard" },
    { id: "profile", label: "Perfil", icon: User, route: "/profile" },
    { id: "settings", label: "Configuración", icon: Settings, route: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-20 ${isOpen ? "w-64" : "w-0 -translate-x-full md:translate-x-0 md:w-20"} overflow-hidden`}>
      <div className="flex flex-col h-full pt-16">
        <div className="px-3 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              className={`flex items-center gap-3 px-3 py-3 my-1 rounded-lg transition-colors ${
                activeItem === item.id
                  ? "bg-finance-blue-light text-finance-blue"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon className={`${isOpen ? "w-5 h-5" : "w-6 h-6 mx-auto"}`} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
        
        <div className="mt-auto px-3 py-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 my-1 rounded-lg w-full text-left text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut className={`${isOpen ? "w-5 h-5" : "w-6 h-6 mx-auto"} text-finance-red`} />
            {isOpen && <span className="font-medium text-finance-red">Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
