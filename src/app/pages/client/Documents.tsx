import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { FileText, Download, Upload } from "lucide-react";

export default function ClientDocuments() {
  const documents = [
    { id: 1, name: "Settlement Agreement Draft.pdf", date: "Apr 15, 2026", size: "245 KB", status: "Ready for Review", category: "Legal Documents" },
    { id: 2, name: "Court Filing - Motion.pdf", date: "Apr 12, 2026", size: "186 KB", status: "Completed", category: "Court Filings" },
    { id: 3, name: "Medical Records.pdf", date: "Apr 10, 2026", size: "1.2 MB", status: "Completed", category: "Evidence" },
    { id: 4, name: "Intake Form.pdf", date: "Apr 05, 2026", size: "98 KB", status: "Completed", category: "Client Forms" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-1">Access your case documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4">
                    <Badge variant={doc.status === "Ready for Review" ? "warning" : "success"}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
