import { useState } from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { mockMessages } from "../../data/mockData";
import { Search, Mail, Inbox, Send as SendIcon, Archive, Trash2, Star } from "lucide-react";

export default function Communication() {
  const [selectedMessage, setSelectedMessage] = useState(mockMessages[0]);

  const folders = [
    { name: "Inbox", icon: Inbox, count: 12 },
    { name: "Sent", icon: SendIcon, count: 45 },
    { name: "Starred", icon: Star, count: 3 },
    { name: "Archive", icon: Archive, count: 128 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Communication</h1>
          <p className="text-gray-600 mt-1">Manage client communications</p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Folders Sidebar */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.name}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <folder.icon className="w-4 h-4" />
                  <span>{folder.name}</span>
                </div>
                <span className="text-xs text-gray-500">{folder.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="col-span-4 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage.id === message.id ? "bg-blue-50" : ""
                } ${message.unread ? "bg-blue-50/30" : ""}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className={`text-sm ${message.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                    {message.from}
                  </p>
                  <span className="text-xs text-gray-500">{message.date.split(" ")[0]}</span>
                </div>
                <p className={`text-sm ${message.unread ? "font-medium text-gray-900" : "text-gray-600"} mb-1`}>
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">{message.preview}</p>
                <div className="mt-2">
                  <Badge variant="default" className="text-xs">{message.matter}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message View */}
        <div className="col-span-6 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h2>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <Star className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <Archive className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">{selectedMessage.from[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedMessage.from}</p>
                <p className="text-xs text-gray-500">{selectedMessage.date}</p>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="default">{selectedMessage.matter}</Badge>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="prose max-w-none">
              <p className="text-gray-900">{selectedMessage.preview}</p>
              <p className="text-gray-900 mt-4">
                Thank you for your time and assistance with this matter. I look forward to hearing from you soon.
              </p>
              <p className="text-gray-900 mt-4">Best regards,<br />{selectedMessage.from}</p>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <Button className="w-full">Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
