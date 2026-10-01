import { useParams, useNavigate } from "react-router";
import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { ArrowLeft, Download, Send, Printer } from "lucide-react";
import { mockInvoices, mockTimeEntries } from "../../data/mockData";

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = mockInvoices.find(i => i.id === Number(id));
  
  if (!invoice) return <div className="p-6">Invoice not found</div>;

  return (
    <div className="p-6">
      <button onClick={() => navigate("/billing")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Billing
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{invoice.number}</h1>
          <p className="text-gray-600 mt-1">{invoice.client} • {invoice.matter}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Printer className="w-4 h-4 mr-2" />Print</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Download</Button>
          <Button><Send className="w-4 h-4 mr-2" />Send to Client</Button>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Legal Case System</h2>
              <p className="text-gray-600 mt-2">Gulberg III, Main Boulevard<br />Lahore, Pakistan<br />Phone: +92 300 1234567</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold text-gray-900">INVOICE</h3>
              <p className="text-gray-600 mt-2">
                Invoice #: {invoice.number}<br />
                Date: {invoice.date}<br />
                Due Date: {invoice.dueDate}
              </p>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Bill To:</h4>
            <p className="text-gray-900">{invoice.client}</p>
            <p className="text-gray-600">Re: {invoice.matter}</p>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 text-gray-900">Description</th>
                <th className="text-right py-3 text-gray-900">Hours</th>
                <th className="text-right py-3 text-gray-900">Rate</th>
                <th className="text-right py-3 text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTimeEntries.filter(e => e.matter === invoice.matter).map((entry) => (
                <tr key={entry.id}>
                  <td className="py-3 text-gray-900">{entry.description}</td>
                  <td className="text-right py-3 text-gray-900">{entry.hours}</td>
                  <td className="text-right py-3 text-gray-900">{entry.rate}</td>
                  <td className="text-right py-3 text-gray-900">{entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">{invoice.amount}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-semibold text-gray-900">{invoice.amount}</span>
              </div>
              <div className="mt-4">
                <Badge variant={invoice.status === "Paid" ? "success" : invoice.status === "Overdue" ? "danger" : "warning"}>
                  {invoice.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
            <p>Payment is due within 15 days of invoice date. Please make checks payable to Legal Case System.</p>
            <p className="mt-2">Thank you for your business.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
