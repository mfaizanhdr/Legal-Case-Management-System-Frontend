import { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { mockDocuments } from "../../data/mockData";
import { Plus, Search, Folder, FileText, Upload } from "lucide-react";

export default function Documents() {
  const [selectedFolder, setSelectedFolder] = useState("All Documents");

  const folders = [
    { name: "All Documents", count: mockDocuments.length },
    { name: "Court Filings", count: 3 },
    { name: "Evidence", count: 2 },
    { name: "Legal Documents", count: 4 },
    { name: "Contracts", count: 2 },
    { name: "Templates", count: 8 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-1">Manage all case documents and files</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar - Folders */}
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Folders</h3>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                      selectedFolder === folder.name
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{folder.count}</span>
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Matter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Uploaded By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-blue-600">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{doc.matter}</td>
                      <td className="px-6 py-4">
                        <Badge variant="default">{doc.type}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{doc.uploadedBy}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadedAt}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                      <td className="px-6 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
