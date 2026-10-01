import { useState } from "react";
import { Link } from "react-router";
import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { FormField, Input, Select, Textarea } from "../../components/FormField";
import { mockLeads as initialMockLeads } from "../../data/mockData";
import { Plus, Search, Filter, LayoutGrid, List, GripVertical, Edit, Trash2, Eye, Phone, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  stage: string;
  practiceArea: string;
  source: string;
  assignedTo: string;
  createdAt: string;
  value: string;
  tags: string[];
};

export default function Leads() {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>(initialMockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceArea: "",
    source: "",
    assignedTo: "",
    value: "",
    stage: "New Lead",
    notes: "",
  });

  const stages = [
    "New Lead",
    "Contacted",
    "Consultation Scheduled",
    "Qualified",
    "Hired",
    "Closed Lost"
  ];

  const getStageColor = (stage: string) => {
    const colors: Record<string, "default" | "info" | "warning" | "success" | "danger"> = {
      "New Lead": "info",
      "Contacted": "default",
      "Consultation Scheduled": "warning",
      "Qualified": "success",
      "Hired": "success",
      "Closed Lost": "danger",
    };
    return colors[stage] || "default";
  };

  const handleCreateLead = () => {
    if (!formData.firstName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newLead: Lead = {
      id: leads.length + 1,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      stage: formData.stage,
      practiceArea: formData.practiceArea,
      source: formData.source,
      assignedTo: formData.assignedTo,
      createdAt: new Date().toISOString().split('T')[0],
      value: formData.value,
      tags: [],
    };

    setLeads([newLead, ...leads]);
    setShowNewLeadModal(false);
    resetForm();
    toast.success("Lead created successfully!");
  };

  const handleEditLead = () => {
    if (!selectedLead) return;

    const updatedLeads = leads.map(lead =>
      lead.id === selectedLead.id
        ? {
            ...lead,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            stage: formData.stage,
            practiceArea: formData.practiceArea,
            source: formData.source,
            assignedTo: formData.assignedTo,
            value: formData.value,
          }
        : lead
    );

    setLeads(updatedLeads);
    setShowEditModal(false);
    setSelectedLead(null);
    resetForm();
    toast.success("Lead updated successfully!");
  };

  const handleDeleteLead = () => {
    if (!selectedLead) return;

    setLeads(leads.filter(lead => lead.id !== selectedLead.id));
    setShowDeleteModal(false);
    setSelectedLead(null);
    toast.success("Lead deleted successfully!");
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    const [firstName, ...lastNameParts] = lead.name.split(" ");
    setFormData({
      firstName: firstName || "",
      lastName: lastNameParts.join(" ") || "",
      email: lead.email,
      phone: lead.phone,
      practiceArea: lead.practiceArea,
      source: lead.source,
      assignedTo: lead.assignedTo,
      value: lead.value,
      stage: lead.stage,
      notes: "",
    });
    setShowEditModal(true);
  };

  const openViewModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const openDeleteModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      practiceArea: "",
      source: "",
      assignedTo: "",
      value: "",
      stage: "New Lead",
      notes: "",
    });
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track potential clients</p>
        </div>
        <Button onClick={() => setShowNewLeadModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Lead
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className="flex gap-2 border-l border-gray-300 pl-4">
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded ${view === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`p-2 rounded ${view === "kanban" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List View */}
      {view === "list" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Practice Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/leads/${lead.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStageColor(lead.stage)}>{lead.stage}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.practiceArea}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.assignedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewModal(lead)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(lead)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(lead)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Kanban View */}
      {view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageLeads = filteredLeads.filter((lead) => lead.stage === stage);
            return (
              <div key={stage} className="flex-shrink-0 w-80">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{stage}</h3>
                    <Badge variant="default">{stageLeads.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {stageLeads.map((lead) => (
                      <Card key={lead.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="py-3">
                          <div className="flex items-start gap-2">
                            <GripVertical className="w-4 h-4 text-gray-400 mt-1 cursor-move" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <Link to={`/leads/${lead.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                                  {lead.name}
                                </Link>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => openEditModal(lead)}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => openDeleteModal(lead)}
                                    className="text-gray-400 hover:text-red-600"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{lead.practiceArea}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500">{lead.source}</span>
                                <span className="text-xs font-medium text-gray-900">{lead.value}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {lead.tags.map((tag, i) => (
                                  <Badge key={i} variant="default">{tag}</Badge>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">Assigned: {lead.assignedTo}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Lead Modal */}
      <Modal
        isOpen={showNewLeadModal}
        onClose={() => {
          setShowNewLeadModal(false);
          resetForm();
        }}
        title="Create New Lead"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowNewLeadModal(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateLead}>
              Create Lead
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First Name" required>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Enter first name"
              />
            </FormField>
            <FormField label="Last Name">
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Enter last name"
              />
            </FormField>
          </div>
          <FormField label="Email" required>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </FormField>
          <FormField label="Phone" required>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Practice Area" required>
              <Select
                value={formData.practiceArea}
                onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
              >
                <option value="">Select practice area</option>
                <option value="Family Law">Family Law</option>
                <option value="Estate Planning">Estate Planning</option>
                <option value="Business Law">Business Law</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Criminal Defense">Criminal Defense</option>
                <option value="Real Estate">Real Estate</option>
              </Select>
            </FormField>
            <FormField label="Lead Source" required>
              <Select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Google Ads">Google Ads</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Walk-in">Walk-in</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Assign To" required>
              <Select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              >
                <option value="">Select attorney</option>
                <option value="Muhammad Faizan Haider">Muhammad Faizan Haider</option>
                <option value="Advocate Maryam Siddiqui">Advocate Maryam Siddiqui</option>
                <option value="Bilal Ahmed">Bilal Ahmed</option>
                <option value="Zainab Malik">Zainab Malik</option>
              </Select>
            </FormField>
            <FormField label="Estimated Value">
              <Input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="Rs. 5,000"
              />
            </FormField>
          </div>
          <FormField label="Stage">
            <Select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Notes">
            <Textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes or details..."
            />
          </FormField>
        </div>
      </Modal>

      {/* Edit Lead Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedLead(null);
          resetForm();
        }}
        title="Edit Lead"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowEditModal(false);
              setSelectedLead(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditLead}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First Name" required>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </FormField>
            <FormField label="Last Name">
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </FormField>
          </div>
          <FormField label="Email" required>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormField>
          <FormField label="Phone" required>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Practice Area">
              <Select
                value={formData.practiceArea}
                onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
              >
                <option value="">Select practice area</option>
                <option value="Family Law">Family Law</option>
                <option value="Estate Planning">Estate Planning</option>
                <option value="Business Law">Business Law</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Criminal Defense">Criminal Defense</option>
                <option value="Real Estate">Real Estate</option>
              </Select>
            </FormField>
            <FormField label="Lead Source">
              <Select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Google Ads">Google Ads</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Walk-in">Walk-in</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Assign To">
              <Select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              >
                <option value="">Select attorney</option>
                <option value="Muhammad Faizan Haider">Muhammad Faizan Haider</option>
                <option value="Advocate Maryam Siddiqui">Advocate Maryam Siddiqui</option>
                <option value="Bilal Ahmed">Bilal Ahmed</option>
                <option value="Zainab Malik">Zainab Malik</option>
              </Select>
            </FormField>
            <FormField label="Estimated Value">
              <Input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </FormField>
          </div>
          <FormField label="Stage">
            <Select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </Select>
          </FormField>
        </div>
      </Modal>

      {/* View Lead Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedLead(null);
        }}
        title="Lead Details"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowViewModal(false);
              setSelectedLead(null);
            }}>
              Close
            </Button>
            <Button onClick={() => {
              if (selectedLead) {
                setShowViewModal(false);
                openEditModal(selectedLead);
              }
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Lead
            </Button>
          </>
        }
      >
        {selectedLead && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900 mt-1">{selectedLead.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Stage</label>
                <div className="mt-1">
                  <Badge variant={getStageColor(selectedLead.stage)}>{selectedLead.stage}</Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {selectedLead.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {selectedLead.phone}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Practice Area</label>
                <p className="text-gray-900 mt-1">{selectedLead.practiceArea}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Source</label>
                <p className="text-gray-900 mt-1">{selectedLead.source}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Assigned To</label>
                <p className="text-gray-900 mt-1">{selectedLead.assignedTo}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Estimated Value</label>
                <p className="text-gray-900 mt-1 font-semibold">{selectedLead.value}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Created Date</label>
              <p className="text-gray-900 mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {selectedLead.createdAt}
              </p>
            </div>
            {selectedLead.tags.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Tags</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedLead.tags.map((tag, i) => (
                    <Badge key={i} variant="default">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedLead(null);
        }}
        title="Delete Lead"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowDeleteModal(false);
              setSelectedLead(null);
            }}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteLead}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete the lead <strong>{selectedLead?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}