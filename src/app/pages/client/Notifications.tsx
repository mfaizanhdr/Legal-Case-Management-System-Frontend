import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Calendar, FileText, MessageSquare, Receipt, AlertCircle } from "lucide-react";

export default function ClientNotifications() {
  const notifications = [
    { 
      id: 1, 
      type: "appointment", 
      title: "Upcoming Court Appearance", 
      message: "You have a court appearance scheduled for Apr 19, 2026 at 2:00 PM",
      date: "Apr 17, 2026 9:00 AM",
      unread: true,
      icon: Calendar,
      color: "blue"
    },
    { 
      id: 2, 
      type: "message", 
      title: "New Message from Muhammad Faizan Haider", 
      message: "Case update regarding recent developments",
      date: "Apr 17, 2026 10:30 AM",
      unread: true,
      icon: MessageSquare,
      color: "green"
    },
    { 
      id: 3, 
      type: "document", 
      title: "New Document Available", 
      message: "Settlement Agreement Draft is ready for review",
      date: "Apr 15, 2026 3:15 PM",
      unread: false,
      icon: FileText,
      color: "purple"
    },
    { 
      id: 4, 
      type: "invoice", 
      title: "Invoice Due Soon", 
      message: "Invoice INV-2024-0048 for Rs. 7,500 is due on Apr 30, 2026",
      date: "Apr 15, 2026 9:00 AM",
      unread: false,
      icon: Receipt,
      color: "orange"
    },
    { 
      id: 5, 
      type: "alert", 
      title: "Document Signature Required", 
      message: "Please review and sign the settlement agreement",
      date: "Apr 14, 2026 2:00 PM",
      unread: false,
      icon: AlertCircle,
      color: "red"
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Stay updated on your case activities</p>
      </div>

      <Card>
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id} 
                className={`p-6 ${notification.unread ? "bg-blue-50/30" : ""} hover:bg-gray-50 cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-${notification.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${notification.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${notification.unread ? "font-semibold" : "font-medium"} text-gray-900`}>
                        {notification.title}
                      </p>
                      {notification.unread && <Badge variant="info">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
