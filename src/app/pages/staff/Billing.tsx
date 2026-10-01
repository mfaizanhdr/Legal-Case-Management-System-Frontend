import { useState } from "react";
import { Link } from "react-router";
import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { mockInvoices, mockTimeEntries } from "../../data/mockData";
import { Plus, Search, Clock, Receipt, Filter } from "lucide-react";

export default function Billing() {
  const [activeTab, setActiveTab] = useState<"time" | "invoices">("time");

  const getStatusVariant = (status: string) => {
    return status === "Paid" ? "success" : status === "Overdue" ? "danger" : "warning";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
          <p className="text-gray-600 mt-1">Track time and manage invoices</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {activeTab === "time" ? "Log Time" : "Create Invoice"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unbilled Hours</p>
                <p className="text-2xl font-semibold text-gray-900">24.5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Outstanding</p>
                <p className="text-2xl font-semibold text-gray-900">Rs. 30,050</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-semibold text-gray-900">Rs. 11,250</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Collected (MTD)</p>
                <p className="text-2xl font-semibold text-gray-900">Rs. 97,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-6">
          <button
            onClick={() => setActiveTab("time")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "time"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time Tracking
            </div>
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "invoices"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Invoices
            </div>
          </button>
        </nav>
      </div>

      {/* Time Tracking Tab */}
      {activeTab === "time" && (
        <>
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search time entries..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Attorney</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Matter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTimeEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.attorney}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.matter}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.hours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="warning">Unbilled</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <>
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Invoice #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Matter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/billing/invoices/${invoice.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          {invoice.number}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.client}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{invoice.matter}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.hours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(invoice.status)}>{invoice.status}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
