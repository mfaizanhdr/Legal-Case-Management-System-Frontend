import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Tag, 
  MessageSquare,
  FileText,
  CheckCircle
} from "lucide-react";
import { mockLeads } from "../../data/mockData";

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  
  const lead = mockLeads.find(l => l.id === Number(id));
  
  if (!lead) {
    return <div className="p-6">Lead not found</div>;
  }

  const communications = [
    { type: "Email", subject: "Initial inquiry received", date: "2026-04-15 2:30 PM", from: lead.name },
    { type: "Call", subject: "Follow-up call", date: "2026-04-15 4:15 PM", from: "Advocate Maryam Siddiqui" },
    { type: "Email", subject: "Sent consultation information", date: "2026-04-16 10:00 AM", from: "Advocate Maryam Siddiqui" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigate("/leads")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{lead.name}</h1>
            <p className="text-gray-600 mt-1">{lead.practiceArea} Lead</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowScheduleModal(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button onClick={() => setShowConvertModal(true)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Convert to Client
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Contact Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Assigned To</p>
                    <p className="text-sm text-gray-900">{lead.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Created Date</p>
                    <p className="text-sm text-gray-900">{lead.createdAt}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Communication History</h3>
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {communications.map((comm, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        comm.type === "Email" ? "bg-blue-100" : "bg-green-100"
                      }`}>
                        {comm.type === "Email" ? (
                          <Mail className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Phone className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={comm.type === "Email" ? "info" : "success"}>{comm.type}</Badge>
                          <span className="text-sm text-gray-900 font-medium">{comm.subject}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">From: {comm.from}</p>
                        <p className="text-xs text-gray-500 mt-1">{comm.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notes</h3>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm text-gray-900">Initial contact regarding family dispute proceedings. Client mentioned ongoing custody dispute.</p>
                  <p className="text-xs text-gray-500 mt-2">Advocate Maryam Siddiqui • 2026-04-15</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <p className="text-sm text-gray-900">Follow-up call completed. Client interested in moving forward. Scheduled consultation for next week.</p>
                  <p className="text-xs text-gray-500 mt-2">Advocate Maryam Siddiqui • 2026-04-16</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lead Details */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Lead Details</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Stage</p>
                  <Badge variant="info">{lead.stage}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Practice Area</p>
                  <p className="text-sm text-gray-900">{lead.practiceArea}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Lead Source</p>
                  <p className="text-sm text-gray-900">{lead.source}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
                  <p className="text-sm font-medium text-gray-900">{lead.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Tags</h3>
                <button className="text-blue-600 hover:text-blue-800">
                  <Tag className="w-4 h-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag, i) => (
                  <Badge key={i} variant="default">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Log Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Consultation Modal */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule Consultation"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
            <Button onClick={() => setShowScheduleModal(false)}>Schedule</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
              <option>2 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
          </div>
        </div>
      </Modal>

      {/* Convert to Client Modal */}
      <Modal
        isOpen={showConvertModal}
        onClose={() => setShowConvertModal(false)}
        title="Convert Lead to Client"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowConvertModal(false)}>Cancel</Button>
            <Button onClick={() => setShowConvertModal(false)}>Convert</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Converting this lead will create a new client and matter record.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matter Title</label>
            <input 
              type="text" 
              defaultValue={`${lead.name} - ${lead.practiceArea}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matter Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Litigation</option>
              <option>Transactional</option>
              <option>Estate Planning</option>
              <option>Family Law</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Attorney</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={lead.assignedTo}>
              <option>Muhammad Faizan Haider</option>
              <option>Advocate Maryam Siddiqui</option>
              <option>Bilal Ahmed</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
