
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, CreditCard, Wallet, PieChart, MessageCircle, Settings, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, route: "/" },
    { id: "accounts", label: "Mis Cuentas", icon: Wallet, route: "/accounts" },
    { id: "cards", label: "Tarjetas", icon: CreditCard, route: "/cards" },
    { id: "analytics", label: "Análisis", icon: PieChart, route: "/analytics" },
    { id: "chatbot", label: "Asistente", icon: MessageCircle, route: "/chatbot" },
    { id: "settings", label: "Configuración", icon: Settings, route: "/settings" },
  ];

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
        
        {isOpen && (
          <div className="mt-auto mb-6 mx-3">
            <div className="bg-finance-blue-light rounded-lg p-4">
              <h3 className="text-finance-blue font-medium mb-2">¿Necesitas ayuda?</h3>
              <p className="text-sm text-finance-gray-dark mb-3">Consulta con nuestro asistente financiero</p>
              <Link 
                to="/chatbot"
                className="flex items-center text-sm text-finance-blue font-medium"
              >
                Ir a Asistente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
