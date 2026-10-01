import { useState } from "react";
import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { mockTasks } from "../../data/mockData";
import { Plus, Calendar as CalendarIcon, List, ChevronLeft, ChevronRight } from "lucide-react";

export default function TasksCalendar() {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tasks & Calendar</h1>
          <p className="text-gray-600 mt-1">Manage tasks and deadlines</p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded ${view === "list" ? "bg-white shadow-sm" : ""}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 rounded ${view === "calendar" ? "bg-white shadow-sm" : ""}`}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">My Tasks</h3>
                <Badge variant="danger">5 overdue</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {mockTasks.map((task) => (
                  <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{task.matter}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">{task.dueDate}</span>
                          <Badge variant={task.priority === "High" ? "danger" : "warning"}>
                            {task.priority}
                          </Badge>
                          <Badge variant="info">{task.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {mockTasks.filter(t => t.category === "Court Filing").map((task) => (
                  <div key={task.id} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="w-5 h-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.matter}</p>
                        <p className="text-xs text-gray-500 mt-1">{task.dueDate}</p>
                      </div>
                      <Badge variant="danger">Critical</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-semibold text-gray-900">April 2026</h3>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Today</Button>
                <Button size="sm" variant="outline">Month</Button>
                <Button size="sm" variant="outline">Week</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-600">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const hasEvent = [17, 18, 19, 20, 22].includes(day);
                return (
                  <div key={i} className={`bg-white p-2 min-h-24 ${day < 1 || day > 30 ? "text-gray-400" : ""}`}>
                    <div className="text-sm">{day > 0 && day <= 30 ? day : ""}</div>
                    {hasEvent && day === 17 && (
                      <div className="mt-1 text-xs bg-blue-100 text-blue-700 p-1 rounded truncate">
                        Client Meeting
                      </div>
                    )}
                    {hasEvent && day === 18 && (
                      <div className="mt-1 text-xs bg-red-100 text-red-700 p-1 rounded truncate">
                        Court Filing
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
