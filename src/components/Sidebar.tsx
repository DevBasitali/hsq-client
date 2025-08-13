import React from "react";
import { useLocation, Link } from "react-router-dom";
import HSQ from "../../public/HSQ.png";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Bed,
  LogOut,
  X,
  Home,
  Star,
  Ticket,
  Settings,
  Archive,
  FileText,
  Percent,
  Calendar1,
} from "lucide-react";
interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  console.log("isAdmin", isAdmin);
  // Main navigation items
  const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home, roles: ["admin"] },
    {
      name: "Guests",
      href: "/guests",
      icon: Users,
      roles: ["admin", "receptionist"],
    },
    {
      name: "Reservation",
      href: "/reservation",
      icon: Calendar1,
      roles: ["admin", "receptionist"],
    },
    {
      name: "Rooms",
      href: "/rooms",
      icon: Bed,
      roles: ["admin", "receptionist"],
    },
    {
      name: "Discounts",
      href: "/Discount",
      icon: Ticket,
      roles: ["admin", "manager"],
    },
    { name: "GST & Tax", href: "/Gst", icon: Percent, roles: ["admin"] },
    {
      name: "Inventory",
      href: "/Inventory",
      icon: Archive,
      roles: ["admin", "accountant"],
    },
    { name: "Invoices", href: "/Invoices", icon: FileText, roles: ["admin"] },
    {
      name: "Revenue",
      href: "/Revenue",
      icon: FileText,
      roles: ["admin", "accountant"],
    },
    {
      name: "Setting",
      href: "/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ];
  // Filter items based on user role
  const filteredNavItems = mainNavItems.filter(
    (item) =>
      !item.roles ||
      item.roles.map((r) => r.toLowerCase()).includes(user?.role?.toLowerCase())
  );

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  // Helper function to render navigation links
  const renderNavLinks = (
    items: Array<{ name: string; href: string; icon: React.ElementType }>
  ) => {
    return items.map((item) => {
      const Icon = item.icon;
      const active = isActive(item.href);
      return (
        <Link
          key={item.name}
          to={item.href}
          onClick={onClose}
          className={`
              group flex items-center px-4 py-3 text-sm rounded-lg
              transition-all duration-200 relative overflow-hidden
              ${
                active
                  ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 shadow-lg shadow-amber-500/10"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }
            `}
        >
          {active && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600" />
          )}
          <Icon
            className={`
              mr-3 h-5 w-5 transition-all duration-200
              ${
                active
                  ? "text-amber-400"
                  : "text-slate-400 group-hover:text-slate-300"
              }
            `}
          />
          <span className="font-light tracking-wide">{item.name}</span>
          {active && <Star className="ml-auto h-3 w-3 text-amber-400/60" />}
        </Link>
      );
    });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-72 h-fit bottom-2 bg-gradient-to-b from-slate-900 to-slate-950
        shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo Section */}
        <div className="h-20 px-6 flex items-center border-b border-slate-800/50">
          <div className="flex items-center space-x-3">
            <img className="w-8 h-8 rounded-lg" src={HSQ} alt="HSQ" />
            <div>
              <h1 className="text-xl font-light tracking-wider text-white">
                HSQ ADMIN
              </h1>
              <p className="text-xs text-amber-400/80 tracking-widest uppercase">
                Management Panel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 flex flex-col mb-30">
          <div className="flex-grow">
            <div className="space-y-1 mb-20">
              {renderNavLinks(filteredNavItems)}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex-shrink-0">
            <div className="my-4 px-4">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>
            <div className="space-y-1">
              {/* {renderNavLinks(systemNavItems)} */}
              <button className="group flex items-center px-4 py-3 text-sm text-slate-300 rounded-lg hover:text-white hover:bg-slate-800/50 w-full transition-all duration-200">
                <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-300" />
                <span className="font-light tracking-wide">Sign out</span>
              </button>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800/50 bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium text-slate-900">AM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-light text-white truncate">
                Admin Manager
              </p>
              <p className="text-xs text-slate-400 truncate">
                admin@hsqtowers.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
