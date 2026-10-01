import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Mail } from "lucide-react";

export default function ClientMessages() {
  const messages = [
    { id: 1, from: "Muhammad Faizan Haider", subject: "Case Update", date: "Apr 17, 2026 10:30 AM", unread: true, preview: "I wanted to update you on the recent developments in your case..." },
    { id: 2, from: "Advocate Maryam Siddiqui", subject: "Document Request", date: "Apr 16, 2026 2:15 PM", unread: false, preview: "Please review the attached settlement agreement draft..." },
    { id: 3, from: "Muhammad Faizan Haider", subject: "Next Steps", date: "Apr 15, 2026 11:00 AM", unread: false, preview: "Following our meeting, here are the action items..." },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communicate with your legal team</p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <Card>
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className={`p-6 cursor-pointer hover:bg-gray-50 ${message.unread ? "bg-blue-50/30" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className={`text-sm ${message.unread ? "font-semibold" : "font-medium"} text-gray-900`}>
                      {message.subject}
                    </p>
                    {message.unread && <Badge variant="info">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">From: {message.from}</p>
                  <p className="text-sm text-gray-700 mt-2">{message.preview}</p>
                  <p className="text-xs text-gray-500 mt-2">{message.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
