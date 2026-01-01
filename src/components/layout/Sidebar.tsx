import { User, Compass, Tag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <User className="h-5 w-5" />, label: "For You", href: "/" },
  { icon: <Compass className="h-5 w-5" />, label: "Explore", href: "/explore" },
  { icon: <Tag className="h-5 w-5" />, label: "Deals", href: "/" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-20 lg:w-56 bg-sidebar border-r border-sidebar-border z-40 hidden lg:block">
      <nav className="p-3 lg:p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`sidebar-item w-full ${isActive ? "sidebar-item-active" : ""}`}
            >
              {item.icon}
              <span className="hidden lg:block text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
