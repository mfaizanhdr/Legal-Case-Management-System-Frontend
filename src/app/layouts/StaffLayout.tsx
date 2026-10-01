import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  FileText, 
  DollarSign, 
  Building, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  User,
  UserPlus,
  LogOut
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: UserPlus },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Matters", href: "/matters", icon: Briefcase },
  { name: "Tasks & Calendar", href: "/tasks", icon: CheckSquare },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Billing", href: "/billing", icon: DollarSign },
  { name: "Trust Accounting", href: "/trust-accounting", icon: Building },
  { name: "Communication", href: "/communication", icon: MessageSquare },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function StaffLayout() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Legal Case System</span>
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">Muhammad Faizan Haider</div>
              <div className="text-xs text-gray-500 truncate">Senior Partner</div>
            </div>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("userRole");
                localStorage.removeItem("userName");
              }}
              title="Sign Out"
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients, matters, documents..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { title: "New lead assigned", time: "5 min ago", type: "lead" },
                      { title: "Court filing deadline tomorrow", time: "1 hour ago", type: "deadline" },
                      { title: "Payment received: Rs. 5,000", time: "2 hours ago", type: "payment" },
                    ].map((notif, i) => (
                      <div key={i} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                        <div className="text-sm font-medium text-gray-900">{notif.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{notif.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
              Staff Portal
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
