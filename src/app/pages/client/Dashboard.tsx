import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Calendar, MessageSquare, FileText, Receipt, Clock } from "lucide-react";

export default function ClientDashboard() {
  const appointments = [
    { date: "Apr 19, 2026", time: "2:00 PM", type: "Court Appearance", location: "District Court Room 3" },
    { date: "Apr 22, 2026", time: "10:00 AM", type: "Client Meeting", location: "Legal Case System Office" },
  ];

  const messages = [
    { from: "Muhammad Faizan Haider", subject: "Case Update", date: "Apr 17, 2026", unread: true },
    { from: "Advocate Maryam Siddiqui", subject: "Document Request", date: "Apr 16, 2026", unread: false },
  ];

  const documents = [
    { name: "Settlement Agreement Draft.pdf", date: "Apr 15, 2026", status: "Ready for Review" },
    { name: "Court Filing - Motion.pdf", date: "Apr 12, 2026", status: "Completed" },
  ];

  const invoices = [
    { number: "INV-2024-0046", amount: "Rs. 7,500", dueDate: "Apr 20, 2026", status: "Unpaid" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome Back, Fatima</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your case</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Messages</p>
                <p className="text-xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-xl font-semibold text-gray-900">12</p>
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
                <p className="text-sm text-gray-600">Unpaid</p>
                <p className="text-xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {appointments.map((apt, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{apt.type}</p>
                      <p className="text-sm text-gray-600 mt-1">{apt.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-xs text-gray-500">{apt.date} at {apt.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Messages</h3>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {messages.map((msg, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${msg.unread ? "font-semibold" : "font-medium"} text-gray-900`}>
                          {msg.subject}
                        </p>
                        {msg.unread && <Badge variant="info">New</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">From: {msg.from}</p>
                      <p className="text-xs text-gray-500 mt-1">{msg.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Documents</h3>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {documents.map((doc, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={doc.status === "Ready for Review" ? "warning" : "success"}>
                          {doc.status}
                        </Badge>
                        <p className="text-xs text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unpaid Invoices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Unpaid Invoices</h3>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {invoices.map((invoice, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <Receipt className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{invoice.number}</p>
                        <p className="text-sm font-semibold text-gray-900">{invoice.amount}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="warning">{invoice.status}</Badge>
                        <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                      </div>
                      <Button size="sm" className="mt-3 w-full">Pay Now</Button>
                    </div>
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
