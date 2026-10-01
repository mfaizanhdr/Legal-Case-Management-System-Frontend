import { useState } from "react";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { FormField, Input, Select, Textarea } from "../../components/FormField";
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone, Building, User } from "lucide-react";
import { toast } from "sonner";

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  matters: number;
  status: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  type?: string;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Fatima Zahra", email: "fatima.zahra@email.com", phone: "+92 300 1234567", matters: 1, status: "Active", type: "Individual" },
    { id: 2, name: "Tariq Mehmood", email: "tariq.m@email.com", phone: "+92 321 2345678", matters: 1, status: "Active", type: "Individual" },
    { id: 3, name: "TechCorp Pakistan Ltd.", email: "legal@techcorp.pk", phone: "+92 333 3456789", matters: 1, status: "Active", type: "Business" },
    { id: 4, name: "Sana Sheikh", email: "sana.s@email.com", phone: "+92 345 4567890", matters: 1, status: "Active", type: "Individual" },
  ]);

  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Individual",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const handleCreateClient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newClient: Client = {
      id: clients.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      matters: 0,
      status: "Active",
      type: formData.type,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    setClients([newClient, ...clients]);
    setShowNewClientModal(false);
    resetForm();
    toast.success("Client created successfully!");
  };

  const handleEditClient = () => {
    if (!selectedClient) return;

    const updatedClients = clients.map(client =>
      client.id === selectedClient.id
        ? {
            ...client,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            type: formData.type,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          }
        : client
    );

    setClients(updatedClients);
    setShowEditModal(false);
    setSelectedClient(null);
    resetForm();
    toast.success("Client updated successfully!");
  };

  const handleDeleteClient = () => {
    if (!selectedClient) return;

    setClients(clients.filter(client => client.id !== selectedClient.id));
    setShowDeleteModal(false);
    setSelectedClient(null);
    toast.success("Client deleted successfully!");
  };

  const openEditModal = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      type: client.type || "Individual",
      address: client.address || "",
      city: client.city || "",
      state: client.state || "",
      zip: client.zip || "",
      notes: "",
    });
    setShowEditModal(true);
  };

  const openViewModal = (client: Client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const openDeleteModal = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "Individual",
      address: "",
      city: "",
      state: "",
      zip: "",
      notes: "",
    });
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage all client relationships</p>
        </div>
        <Button onClick={() => setShowNewClientModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Client
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Active Matters</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {client.type === "Business" ? (
                        <Building className="w-4 h-4 text-gray-400" />
                      ) : (
                        <User className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.matters}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="success">{client.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openViewModal(client)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(client)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(client)}
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

      {/* New Client Modal */}
      <Modal
        isOpen={showNewClientModal}
        onClose={() => {
          setShowNewClientModal(false);
          resetForm();
        }}
        title="Create New Client"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowNewClientModal(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateClient}>
              Create Client
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Client Type" required>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </Select>
          </FormField>
          <FormField label={formData.type === "Business" ? "Business Name" : "Full Name"} required>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={formData.type === "Business" ? "Enter business name" : "Enter full name"}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <FormField label="Address">
            <Input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street address"
            />
          </FormField>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="City">
              <Input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
              />
            </FormField>
            <FormField label="State">
              <Input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State"
              />
            </FormField>
            <FormField label="ZIP">
              <Input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                placeholder="ZIP code"
              />
            </FormField>
          </div>
          <FormField label="Notes">
            <Textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes..."
            />
          </FormField>
        </div>
      </Modal>

      {/* Edit Client Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedClient(null);
          resetForm();
        }}
        title="Edit Client"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowEditModal(false);
              setSelectedClient(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditClient}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Client Type">
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </Select>
          </FormField>
          <FormField label={formData.type === "Business" ? "Business Name" : "Full Name"} required>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <FormField label="Address">
            <Input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="City">
              <Input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </FormField>
            <FormField label="State">
              <Input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </FormField>
            <FormField label="ZIP">
              <Input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
              />
            </FormField>
          </div>
        </div>
      </Modal>

      {/* View Client Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedClient(null);
        }}
        title="Client Details"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowViewModal(false);
              setSelectedClient(null);
            }}>
              Close
            </Button>
            <Button onClick={() => {
              if (selectedClient) {
                setShowViewModal(false);
                openEditModal(selectedClient);
              }
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Client
            </Button>
          </>
        }
      >
        {selectedClient && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Client Type</label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  {selectedClient.type === "Business" ? (
                    <>
                      <Building className="w-4 h-4 text-gray-400" />
                      Business
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 text-gray-400" />
                      Individual
                    </>
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <Badge variant="success">{selectedClient.status}</Badge>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-gray-900 mt-1 font-semibold">{selectedClient.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {selectedClient.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {selectedClient.phone}
                </p>
              </div>
            </div>
            {selectedClient.address && (
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900 mt-1">
                  {selectedClient.address}
                  {selectedClient.city && `, ${selectedClient.city}`}
                  {selectedClient.state && `, ${selectedClient.state}`}
                  {selectedClient.zip && ` ${selectedClient.zip}`}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">Active Matters</label>
              <p className="text-gray-900 mt-1 font-semibold">{selectedClient.matters}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedClient(null);
        }}
        title="Delete Client"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowDeleteModal(false);
              setSelectedClient(null);
            }}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteClient}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete <strong>{selectedClient?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}