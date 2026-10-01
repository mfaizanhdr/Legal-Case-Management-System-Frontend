import { Card, CardHeader, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Download, Filter } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Reports() {
  const revenueData = [
    { month: "Jan", revenue: 85000 },
    { month: "Feb", revenue: 92000 },
    { month: "Mar", revenue: 105000 },
    { month: "Apr", revenue: 127500 },
  ];

  const leadSourceData = [
    { name: "Website", value: 35 },
    { name: "Referral", value: 28 },
    { name: "Google Ads", value: 22 },
    { name: "LinkedIn", value: 15 },
  ];

  const matterStatusData = [
    { status: "Active", count: 24 },
    { status: "Pending", count: 8 },
    { status: "Closed", count: 45 },
    { status: "On Hold", count: 3 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-gray-600">Total Revenue (YTD)</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">Rs. 409,500</p>
            <p className="text-xs text-green-600 mt-1">+18% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-gray-600">New Clients (MTD)</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">12</p>
            <p className="text-xs text-green-600 mt-1">+25% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-gray-600">Avg Case Value</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">Rs. 8,750</p>
            <p className="text-xs text-gray-600 mt-1">Across all matters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-gray-600">Collection Rate</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">87%</p>
            <p className="text-xs text-green-600 mt-1">+5% vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Revenue Trend</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Lead Sources</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Matter Status Distribution</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={matterStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Top Practice Areas</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "Personal Injury", revenue: "Rs. 145,000", percentage: 35 },
                { area: "Family Law", revenue: "Rs. 98,000", percentage: 24 },
                { area: "Estate Planning", revenue: "Rs. 87,000", percentage: 21 },
                { area: "Business Law", revenue: "Rs. 79,500", percentage: 20 },
              ].map((item) => (
                <div key={item.area}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-900">{item.area}</span>
                    <span className="text-sm font-medium text-gray-900">{item.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
