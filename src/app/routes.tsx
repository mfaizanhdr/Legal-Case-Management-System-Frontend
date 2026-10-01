import { createBrowserRouter, Navigate, Outlet } from "react-router";
import StaffLayout from "./layouts/StaffLayout";
import ClientLayout from "./layouts/ClientLayout";
import Login from "./pages/Login";

// Staff Pages
import StaffDashboard from "./pages/staff/Dashboard";
import Leads from "./pages/staff/Leads";
import LeadDetail from "./pages/staff/LeadDetail";
import Clients from "./pages/staff/Clients";
import Matters from "./pages/staff/Matters";
import MatterDetail from "./pages/staff/MatterDetail";
import TasksCalendar from "./pages/staff/TasksCalendar";
import Documents from "./pages/staff/Documents";
import Billing from "./pages/staff/Billing";
import InvoiceDetail from "./pages/staff/InvoiceDetail";
import TrustAccounting from "./pages/staff/TrustAccounting";
import Communication from "./pages/staff/Communication";
import Reports from "./pages/staff/Reports";
import Settings from "./pages/staff/Settings";

// Client Pages
import ClientDashboard from "./pages/client/Dashboard";
import ClientMessages from "./pages/client/Messages";
import ClientDocuments from "./pages/client/Documents";
import ClientAppointments from "./pages/client/Appointments";
import ClientInvoices from "./pages/client/Invoices";
import ClientNotifications from "./pages/client/Notifications";
import ClientProfile from "./pages/client/Profile";

// Guard: Only Staff can access
function RequireStaff() {
  const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
  // If logged in as client, forbid staff access and redirect to client portal
  if (role === "client") {
    return <Navigate to="/client" replace />;
  }
  // If not logged in, redirect to login screen
  if (role !== "staff") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

// Guard: Only Client can access
function RequireClient() {
  const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
  // If logged in as staff, forbid client portal and redirect to staff dashboard
  if (role === "staff") {
    return <Navigate to="/dashboard" replace />;
  }
  // If not logged in, redirect to login screen
  if (role !== "client") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export const router = createBrowserRouter([
  // Initial Screen: Gamified Login
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },

  // Protected Staff Area (Clients are blocked)
  {
    element: <RequireStaff />,
    children: [
      {
        Component: StaffLayout,
        children: [
          { path: "dashboard", Component: StaffDashboard },
          { path: "staff", Component: StaffDashboard },
          { path: "leads", Component: Leads },
          { path: "leads/:id", Component: LeadDetail },
          { path: "clients", Component: Clients },
          { path: "matters", Component: Matters },
          { path: "matters/:id", Component: MatterDetail },
          { path: "tasks", Component: TasksCalendar },
          { path: "documents", Component: Documents },
          { path: "billing", Component: Billing },
          { path: "billing/invoices/:id", Component: InvoiceDetail },
          { path: "trust-accounting", Component: TrustAccounting },
          { path: "communication", Component: Communication },
          { path: "reports", Component: Reports },
          { path: "settings", Component: Settings },
        ],
      },
    ],
  },

  // Protected Client Area (Staff are blocked)
  {
    path: "/client",
    element: <RequireClient />,
    children: [
      {
        Component: ClientLayout,
        children: [
          { index: true, Component: ClientDashboard },
          { path: "messages", Component: ClientMessages },
          { path: "documents", Component: ClientDocuments },
          { path: "appointments", Component: ClientAppointments },
          { path: "invoices", Component: ClientInvoices },
          { path: "notifications", Component: ClientNotifications },
          { path: "profile", Component: ClientProfile },
        ],
      },
    ],
  },
]);
