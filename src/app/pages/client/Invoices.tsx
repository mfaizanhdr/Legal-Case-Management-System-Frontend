import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Download, CreditCard } from "lucide-react";

export default function ClientInvoices() {
  const invoices = [
    { id: 1, number: "INV-2024-0048", date: "Apr 15, 2026", dueDate: "Apr 30, 2026", amount: "Rs. 7,500", status: "Unpaid" },
    { id: 2, number: "INV-2024-0045", date: "Apr 01, 2026", dueDate: "Apr 15, 2026", amount: "Rs. 5,000", status: "Paid" },
    { id: 3, number: "INV-2024-0038", date: "Mar 15, 2026", dueDate: "Mar 30, 2026", amount: "Rs. 6,250", status: "Paid" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <p className="text-gray-600 mt-1">View and pay your invoices</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600">Total Outstanding</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">Rs. 7,500</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600">Paid This Year</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">Rs. 11,250</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600">Total Invoices</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">3</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {invoice.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={invoice.status === "Paid" ? "success" : "warning"}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {invoice.status === "Unpaid" && (
                        <Button size="sm">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
