import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Compass, Tag } from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: <User className="h-5 w-5" />, label: "For You", href: "/" },
  { icon: <Compass className="h-5 w-5" />, label: "Explore", href: "/explore" },
  { icon: <Tag className="h-5 w-5" />, label: "Deals", href: "/#deals" },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex flex-col justify-center items-center w-10 h-10 space-y-1"
      >
        <span
          className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <nav
        className={`absolute top-12 right-0 w-56 bg-background border rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-2 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                  ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "hover:bg-muted/60"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
