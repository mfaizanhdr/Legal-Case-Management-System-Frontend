import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

export default function ClientAppointments() {
  const appointments = [
    { 
      id: 1, 
      type: "Court Appearance", 
      date: "Apr 19, 2026", 
      time: "2:00 PM", 
      duration: "2 hours",
      location: "District Court Room 3, 123 Court St",
      attorney: "Muhammad Faizan Haider",
      status: "Confirmed",
      notes: "Please arrive 15 minutes early. Bring valid ID."
    },
    { 
      id: 2, 
      type: "Client Meeting", 
      date: "Apr 22, 2026", 
      time: "10:00 AM", 
      duration: "1 hour",
      location: "Legal Case System Office",
      attorney: "Muhammad Faizan Haider",
      status: "Confirmed",
      notes: "Case strategy discussion"
    },
    { 
      id: 3, 
      type: "Video Consultation", 
      date: "Apr 25, 2026", 
      time: "3:00 PM", 
      duration: "30 minutes",
      location: "Virtual Meeting",
      attorney: "Advocate Maryam Siddiqui",
      status: "Pending",
      notes: "Link will be sent 1 hour before meeting"
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage your appointments</p>
        </div>
        <Button>Request Appointment</Button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {apt.location === "Virtual Meeting" ? (
                      <Video className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Calendar className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{apt.type}</h3>
                    <p className="text-sm text-gray-600">with {apt.attorney}</p>
                  </div>
                </div>
                <Badge variant={apt.status === "Confirmed" ? "success" : "warning"}>
                  {apt.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{apt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{apt.time} ({apt.duration})</span>
                </div>
                <div className="flex items-start gap-2 col-span-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-900">{apt.location}</span>
                </div>
              </div>
              {apt.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{apt.notes}</p>
                </div>
              )}
              <div className="mt-4 flex gap-3">
                {apt.location === "Virtual Meeting" && (
                  <Button size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Join Meeting
                  </Button>
                )}
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
