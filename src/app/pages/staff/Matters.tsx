import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import {
  FormField,
  Input,
  Select,
  Textarea,
} from "../../components/FormField";
import { mockMatters as initialMockMatters } from "../../data/mockData";
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  User,
} from "lucide-react";
import { toast } from "sonner";

type Matter = {
  id: number;
  number: string;
  title: string;
  client: string;
  type: string;
  practiceArea: string;
  status: string;
  assignedAttorney: string;
  openDate: string;
  billableHours: number;
  totalBilled: string;
  nextDeadline: string;
  description: string;
};

export default function Matters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [matters, setMatters] = useState<Matter[]>(
    initialMockMatters,
  );
  const [showNewMatterModal, setShowNewMatterModal] =
    useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMatter, setSelectedMatter] =
    useState<Matter | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    type: "",
    practiceArea: "",
    status: "Active",
    assignedAttorney: "",
    description: "",
  });

  const getStatusVariant = (status: string) => {
    return status === "Active"
      ? "success"
      : status === "Pending"
        ? "warning"
        : "default";
  };

  const handleCreateMatter = () => {
    if (
      !formData.title ||
      !formData.client ||
      !formData.practiceArea
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const currentYear = new Date().getFullYear();
    const matterNumber = `${currentYear}-${String(matters.length + 200).padStart(4, "0")}`;

    const newMatter: Matter = {
      id: matters.length + 1,
      number: matterNumber,
      title: formData.title,
      client: formData.client,
      type: formData.type,
      practiceArea: formData.practiceArea,
      status: formData.status,
      assignedAttorney: formData.assignedAttorney,
      openDate: new Date().toISOString().split("T")[0],
      billableHours: 0,
      totalBilled: "Rs. 0",
      nextDeadline: "",
      description: formData.description,
    };

    setMatters([newMatter, ...matters]);
    setShowNewMatterModal(false);
    resetForm();
    toast.success("Matter created successfully!");
  };

  const handleEditMatter = () => {
    if (!selectedMatter) return;

    const updatedMatters = matters.map((matter) =>
      matter.id === selectedMatter.id
        ? {
            ...matter,
            title: formData.title,
            client: formData.client,
            type: formData.type,
            practiceArea: formData.practiceArea,
            status: formData.status,
            assignedAttorney: formData.assignedAttorney,
            description: formData.description,
          }
        : matter,
    );

    setMatters(updatedMatters);
    setShowEditModal(false);
    setSelectedMatter(null);
    resetForm();
    toast.success("Matter updated successfully!");
  };

  const handleDeleteMatter = () => {
    if (!selectedMatter) return;

    setMatters(
      matters.filter(
        (matter) => matter.id !== selectedMatter.id,
      ),
    );
    setShowDeleteModal(false);
    setSelectedMatter(null);
    toast.success("Matter deleted successfully!");
  };

  const openEditModal = (matter: Matter) => {
    setSelectedMatter(matter);
    setFormData({
      title: matter.title,
      client: matter.client,
      type: matter.type,
      practiceArea: matter.practiceArea,
      status: matter.status,
      assignedAttorney: matter.assignedAttorney,
      description: matter.description,
    });
    setShowEditModal(true);
  };

  const openViewModal = (matter: Matter) => {
    setSelectedMatter(matter);
    setShowViewModal(true);
  };

  const openDeleteModal = (matter: Matter) => {
    setSelectedMatter(matter);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      client: "",
      type: "",
      practiceArea: "",
      status: "Active",
      assignedAttorney: "",
      description: "",
    });
  };

  const filteredMatters = matters.filter(
    (matter) =>
      matter.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      matter.client
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      matter.number.includes(searchQuery),
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Matters
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all client matters and cases
          </p>
        </div>
        <Button onClick={() => setShowNewMatterModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Matter
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search matters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Matter #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Practice Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Attorney
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Billed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMatters.map((matter) => (
                <tr
                  key={matter.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/matters/${matter.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      {matter.number}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {matter.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {matter.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {matter.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {matter.practiceArea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={getStatusVariant(matter.status)}
                    >
                      {matter.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {matter.assignedAttorney}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {matter.totalBilled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openViewModal(matter)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(matter)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(matter)}
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

      {/* New Matter Modal */}
      <Modal
        isOpen={showNewMatterModal}
        onClose={() => {
          setShowNewMatterModal(false);
          resetForm();
        }}
        title="Create New Matter"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewMatterModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateMatter}>
              Create Matter
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Matter Title" required>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="e.g., Johnson v. Smith, Estate of Williams"
            />
          </FormField>
          <FormField label="Client" required>
            <Select
              value={formData.client}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  client: e.target.value,
                })
              }
            >
              <option value="">Select client</option>
              <option value="Fatima Zahra">
                Fatima Zahra
              </option>
              <option value="Tariq Mehmood">
                Tariq Mehmood
              </option>
              <option value="TechCorp Pakistan Ltd.">
                TechCorp Pakistan Ltd.
              </option>
              <option value="Sana Sheikh">
                Sana Sheikh
              </option>
            </Select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Matter Type" required>
              <Select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  })
                }
              >
                <option value="">Select type</option>
                <option value="Litigation">Litigation</option>
                <option value="Transactional">
                  Transactional
                </option>
                <option value="Estate Planning">
                  Estate Planning
                </option>
                <option value="Family Law">Family Law</option>
                <option value="Corporate">Corporate</option>
              </Select>
            </FormField>
            <FormField label="Practice Area" required>
              <Select
                value={formData.practiceArea}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    practiceArea: e.target.value,
                  })
                }
              >
                <option value="">Select practice area</option>
                <option value="Personal Injury">
                  Personal Injury
                </option>
                <option value="Estate Planning">
                  Estate Planning
                </option>
                <option value="Business Law">
                  Business Law
                </option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Defense">
                  Criminal Defense
                </option>
                <option value="Real Estate">Real Estate</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Assigned Attorney" required>
              <Select
                value={formData.assignedAttorney}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedAttorney: e.target.value,
                  })
                }
              >
                <option value="">Select attorney</option>
                <option value="Muhammad Faizan Haider">Muhammad Faizan Haider</option>
                <option value="Advocate Maryam Siddiqui">
                  Advocate Maryam Siddiqui
                </option>
                <option value="Bilal Ahmed">
                  Bilal Ahmed
                </option>
                <option value="Zainab Malik">Zainab Malik</option>
              </Select>
            </FormField>
            <FormField label="Status">
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </Select>
            </FormField>
          </div>
          <FormField label="Description">
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Brief description of the matter..."
            />
          </FormField>
        </div>
      </Modal>

      {/* Edit Matter Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedMatter(null);
          resetForm();
        }}
        title="Edit Matter"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedMatter(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditMatter}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Matter Title" required>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </FormField>
          <FormField label="Client" required>
            <Select
              value={formData.client}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  client: e.target.value,
                })
              }
            >
              <option value="">Select client</option>
              <option value="Fatima Zahra">
                Fatima Zahra
              </option>
              <option value="Tariq Mehmood">
                Tariq Mehmood
              </option>
              <option value="TechCorp Pakistan Ltd.">
                TechCorp Pakistan Ltd.
              </option>
              <option value="Sana Sheikh">
                Sana Sheikh
              </option>
            </Select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Matter Type">
              <Select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  })
                }
              >
                <option value="">Select type</option>
                <option value="Litigation">Litigation</option>
                <option value="Transactional">
                  Transactional
                </option>
                <option value="Estate Planning">
                  Estate Planning
                </option>
                <option value="Family Law">Family Law</option>
                <option value="Corporate">Corporate</option>
              </Select>
            </FormField>
            <FormField label="Practice Area">
              <Select
                value={formData.practiceArea}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    practiceArea: e.target.value,
                  })
                }
              >
                <option value="">Select practice area</option>
                <option value="Personal Injury">
                  Personal Injury
                </option>
                <option value="Estate Planning">
                  Estate Planning
                </option>
                <option value="Business Law">
                  Business Law
                </option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Defense">
                  Criminal Defense
                </option>
                <option value="Real Estate">Real Estate</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Assigned Attorney">
              <Select
                value={formData.assignedAttorney}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedAttorney: e.target.value,
                  })
                }
              >
                <option value="">Select attorney</option>
                <option value="Muhammad Faizan Haider">Muhammad Faizan Haider</option>
                <option value="Advocate Maryam Siddiqui">
                  Advocate Maryam Siddiqui
                </option>
                <option value="Bilal Ahmed">
                  Bilal Ahmed
                </option>
                <option value="Zainab Malik">Zainab Malik</option>
              </Select>
            </FormField>
            <FormField label="Status">
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </Select>
            </FormField>
          </div>
          <FormField label="Description">
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      </Modal>

      {/* View Matter Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedMatter(null);
        }}
        title="Matter Details"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowViewModal(false);
                setSelectedMatter(null);
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                if (selectedMatter) {
                  setShowViewModal(false);
                  openEditModal(selectedMatter);
                }
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Matter
            </Button>
          </>
        }
      >
        {selectedMatter && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Matter Number
                </label>
                <p className="text-gray-900 mt-1 font-semibold">
                  {selectedMatter.number}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <div className="mt-1">
                  <Badge
                    variant={getStatusVariant(
                      selectedMatter.status,
                    )}
                  >
                    {selectedMatter.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Title
              </label>
              <p className="text-gray-900 mt-1 font-semibold">
                {selectedMatter.title}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Description
              </label>
              <p className="text-gray-900 mt-1">
                {selectedMatter.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Client
                </label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  {selectedMatter.client}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Assigned Attorney
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedMatter.assignedAttorney}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Matter Type
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedMatter.type}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Practice Area
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedMatter.practiceArea}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Open Date
                </label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {selectedMatter.openDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Next Deadline
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedMatter.nextDeadline || "None"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Billable Hours
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedMatter.billableHours} hours
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Total Billed
                </label>
                <p className="text-gray-900 mt-1 flex items-center gap-2 font-semibold">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  {selectedMatter.totalBilled}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedMatter(null);
        }}
        title="Delete Matter"
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedMatter(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteMatter}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete the matter{" "}
          <strong>
            {selectedMatter?.number} - {selectedMatter?.title}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}