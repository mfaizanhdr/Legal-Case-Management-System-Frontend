import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { 
  Briefcase, 
  UserPlus, 
  DollarSign, 
  CheckSquare, 
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react";
import { mockTasks, mockMatters, mockInvoices } from "../../data/mockData";

export default function Dashboard() {
  const kpiCards = [
    { label: "Active Matters", value: "24", change: "+3 this week", icon: Briefcase, color: "blue" },
    { label: "New Leads", value: "12", change: "+5 this week", icon: UserPlus, color: "green" },
    { label: "Revenue (MTD)", value: "Rs. 127,500", change: "+12% vs last month", icon: DollarSign, color: "purple" },
    { label: "Pending Tasks", value: "18", change: "5 due today", icon: CheckSquare, color: "orange" },
  ];

  const recentActivity = [
    { action: "New lead assigned", detail: "Syed Ali Raza - Family Law", time: "10 minutes ago", type: "lead" },
    { action: "Invoice paid", detail: "Fatima Zahra - Rs. 7,500", time: "1 hour ago", type: "payment" },
    { action: "Document uploaded", detail: "Contract Amendment - TechCorp Pakistan", time: "2 hours ago", type: "document" },
    { action: "Task completed", detail: "Draft motion - Sheikh Family Matter", time: "3 hours ago", type: "task" },
    { action: "New matter opened", detail: "Estate Planning - Tariq Mehmood", time: "5 hours ago", type: "matter" },
  ];

  const upcomingDeadlines = [
    { title: "File motion for summary judgment", matter: "Zahra v. Khan Logistics", date: "Apr 18, 2026", priority: "High" },
    { title: "Court appearance", matter: "Sheikh Family Matter", date: "Apr 19, 2026", priority: "High" },
    { title: "Draft trust documents", matter: "Estate of Tariq Mehmood", date: "Apr 20, 2026", priority: "Medium" },
    { title: "Client consultation", matter: "New Lead - Syed Ali Raza", date: "Apr 17, 2026", priority: "High" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Muhammad Faizan Haider. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${kpi.color}-100 rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity, index) => (
                <div key={index} className="px-6 py-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
              <Badge variant="danger">4 urgent</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="px-6 py-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      deadline.priority === "High" ? "text-red-500" : "text-orange-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-sm text-gray-600">{deadline.matter}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{deadline.date}</p>
                        <Badge variant={deadline.priority === "High" ? "danger" : "warning"} className="ml-2">
                          {deadline.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Summary */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">My Tasks</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.matter}</p>
                  </div>
                  <Badge variant={
                    task.priority === "High" ? "danger" : 
                    task.priority === "Medium" ? "warning" : "default"
                  }>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Matters */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Active Matters</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMatters.filter(m => m.status === "Active").slice(0, 5).map((matter) => (
                <div key={matter.id} className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">{matter.title}</p>
                  <p className="text-xs text-gray-600">{matter.client}</p>
                  <p className="text-xs text-gray-500 mt-1">{matter.billableHours} hours • {matter.totalBilled}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Billing Summary</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Outstanding</span>
                  <span className="text-sm font-semibold text-gray-900">Rs. 30,050</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Collected (MTD)</span>
                  <span className="text-sm font-semibold text-gray-900">Rs. 97,450</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overdue Invoices</span>
                  <Badge variant="danger">
                    {mockInvoices.filter(i => i.status === "Overdue").length}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
