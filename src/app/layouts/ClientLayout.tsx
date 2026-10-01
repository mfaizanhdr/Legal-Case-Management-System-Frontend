import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Receipt, 
  Bell, 
  User,
  Briefcase,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/client", icon: LayoutDashboard },
  { name: "Messages", href: "/client/messages", icon: MessageSquare },
  { name: "Documents", href: "/client/documents", icon: FileText },
  { name: "Appointments", href: "/client/appointments", icon: Calendar },
  { name: "Invoices", href: "/client/invoices", icon: Receipt },
  { name: "Notifications", href: "/client/notifications", icon: Bell },
  { name: "Profile", href: "/client/profile", icon: User },
];

export default function ClientLayout() {
  const location = useLocation();

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
        
        <nav className="flex-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
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
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">Fatima Zahra</div>
              <div className="text-xs text-gray-500 truncate">Client</div>
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
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Client Portal</h1>
            <p className="text-sm text-gray-500">Case #2024-0156 - Zahra v. Khan Logistics</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
              Client Portal
            </span>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
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
