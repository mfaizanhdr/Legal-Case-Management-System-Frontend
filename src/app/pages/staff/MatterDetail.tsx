import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { ArrowLeft, User, Calendar, DollarSign, FileText, MessageSquare } from "lucide-react";
import { mockMatters, mockTasks, mockDocuments, mockTimeEntries } from "../../data/mockData";

export default function MatterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const matter = mockMatters.find(m => m.id === Number(id));
  
  if (!matter) {
    return <div className="p-6">Matter not found</div>;
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "tasks", label: "Tasks" },
    { id: "documents", label: "Documents" },
    { id: "billing", label: "Billing" },
    { id: "communication", label: "Communication" },
    { id: "notes", label: "Notes" },
  ];

  const timeline = [
    { date: "2026-04-17", event: "Motion filed", description: "Motion for summary judgment filed with court", type: "filing" },
    { date: "2026-04-15", event: "Client meeting", description: "Status update meeting with client", type: "meeting" },
    { date: "2026-04-10", event: "Discovery completed", description: "All discovery documents received", type: "milestone" },
    { date: "2026-04-05", event: "Matter opened", description: "Initial client consultation completed", type: "milestone" },
  ];

  return (
    <div className="p-6">
      <button onClick={() => navigate("/matters")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Matters
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{matter.title}</h1>
            <Badge variant="success">{matter.status}</Badge>
          </div>
          <p className="text-gray-600 mt-1">Matter #{matter.number} • {matter.practiceArea}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Message Client
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Matter Summary</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-900">{matter.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Opened Date</p>
                    <p className="text-sm text-gray-900 mt-1">{matter.openDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Deadline</p>
                    <p className="text-sm text-gray-900 mt-1">{matter.nextDeadline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Matter Type</p>
                    <p className="text-sm text-gray-900 mt-1">{matter.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Assigned Attorney</p>
                    <p className="text-sm text-gray-900 mt-1">{matter.assignedAttorney}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {timeline.slice(0, 3).map((item, index) => (
                    <div key={index} className="px-6 py-4">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.event}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Upcoming Tasks</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTasks.filter(t => t.matter === matter.title).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-600">Due: {task.dueDate}</p>
                      </div>
                      <Badge variant={task.priority === "High" ? "danger" : "warning"}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Client Information</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{matter.client}</p>
                    <p className="text-sm text-gray-600">Primary Contact</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Email: client@email.com</p>
                  <p className="text-gray-600">Phone: (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Billing Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Total Billed</p>
                      <p className="text-lg font-semibold text-gray-900">{matter.totalBilled}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Billable Hours</p>
                      <p className="text-lg font-semibold text-gray-900">{matter.billableHours}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Create Invoice</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    {index < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-300 my-2"></div>}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "tasks" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockTasks.filter(t => t.matter === matter.title).map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.assignedTo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.dueDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant={task.priority === "High" ? "danger" : "warning"}>{task.priority}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="info">{task.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Uploaded By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockDocuments.filter(d => d.matter === matter.title).map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{doc.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadedAt}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-gray-600">Total Billed</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{matter.totalBilled}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-gray-600">Billable Hours</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{matter.billableHours}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-gray-600">Avg Rate</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">Rs. 500</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Time Entries</h3>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Attorney</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockTimeEntries.filter(t => t.matter === matter.title).map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{entry.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.attorney}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.hours}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{entry.rate}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
