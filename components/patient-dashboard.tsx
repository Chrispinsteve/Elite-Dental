"use client"

import React, { useState } from "react"
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  Edit3,
  Camera,
  ChevronRight,
  ArrowRight,
  Check,
  X,
  Upload,
  Activity,
  Pill,
  AlertCircle,
  History,
  Menu,
  LogOut,
} from "lucide-react"

interface PatientDashboardProps {
  setCurrentPage: (page: string) => void
  setIsLoggedIn?: (value: boolean) => void
}

type Tab = "overview" | "appointments" | "records" | "profile"

const mockPatient = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "(561) 555-0199",
  dob: "1990-03-15",
  address: "456 Oak Avenue, Lake Worth, FL 33467",
  insurance: "Delta Dental PPO",
  memberId: "DD-78901234",
  profilePicture: "",
}

const mockAppointments = [
  {
    id: 1,
    date: "Feb 20, 2026",
    time: "10:00 AM",
    doctor: "Dr. Sarah Mitchell",
    service: "General Checkup",
    status: "upcoming" as const,
    notes: "Regular 6-month checkup",
  },
  {
    id: 2,
    date: "Mar 05, 2026",
    time: "2:00 PM",
    doctor: "Dr. James Wilson",
    service: "Teeth Whitening",
    status: "upcoming" as const,
    notes: "Follow-up whitening session",
  },
  {
    id: 3,
    date: "Jan 10, 2026",
    time: "11:00 AM",
    doctor: "Dr. Sarah Mitchell",
    service: "Teeth Cleaning",
    status: "completed" as const,
    notes: "Professional cleaning completed",
  },
  {
    id: 4,
    date: "Nov 15, 2025",
    time: "3:00 PM",
    doctor: "Dr. Emily Chen",
    service: "Cavity Filling",
    status: "completed" as const,
    notes: "Upper left molar filling",
  },
  {
    id: 5,
    date: "Sep 22, 2025",
    time: "9:00 AM",
    doctor: "Dr. Sarah Mitchell",
    service: "General Checkup",
    status: "completed" as const,
    notes: "Routine examination, all clear",
  },
]

const mockRecords = [
  {
    id: 1,
    date: "Jan 10, 2026",
    type: "Cleaning",
    doctor: "Dr. Mitchell",
    summary: "Professional teeth cleaning. No cavities detected. Gum health good.",
    attachments: ["X-Ray Report", "Cleaning Notes"],
  },
  {
    id: 2,
    date: "Nov 15, 2025",
    type: "Filling",
    doctor: "Dr. Chen",
    summary: "Composite filling on upper left molar (#14). Local anesthesia used.",
    attachments: ["X-Ray Pre-Op", "Treatment Plan"],
  },
  {
    id: 3,
    date: "Sep 22, 2025",
    type: "Checkup",
    doctor: "Dr. Mitchell",
    summary: "Routine exam. Minor plaque buildup noted. Recommended flossing more regularly.",
    attachments: ["Exam Report"],
  },
  {
    id: 4,
    date: "Jun 01, 2025",
    type: "X-Ray",
    doctor: "Dr. Wilson",
    summary: "Full mouth X-ray series. No abnormalities found. Wisdom teeth monitoring.",
    attachments: ["Full X-Ray Series", "Radiologist Notes"],
  },
]

/* ── Desktop Sidebar ── */
function PatientSidebar({
  activeTab,
  setActiveTab,
  patient,
  setCurrentPage,
}: {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  patient: typeof mockPatient
  setCurrentPage: (page: string) => void
}) {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "records", label: "Records", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 min-h-[calc(100vh-80px)] flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-sm text-gray-500">Patient</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
              activeTab === tab.id
                ? "bg-teal-50 text-teal-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 space-y-2">
        <button
          type="button"
          onClick={() => setCurrentPage("booking")}
          className="w-full py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors flex items-center justify-center gap-2"
        >
          <Calendar size={18} />
          Book Appointment
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage("home")}
          className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowRight size={18} className="rotate-180" />
          Back to Home
        </button>
      </div>
    </aside>
  )
}

/* ── Mobile Bottom Nav ── */
function MobileBottomNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}) {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Home", icon: Activity },
    { id: "appointments", label: "Visits", icon: Calendar },
    { id: "records", label: "Records", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[60px] ${
              activeTab === tab.id
                ? "text-teal-700"
                : "text-gray-400"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ── Overview Tab ── */
function OverviewTab({
  setCurrentPage,
  setActiveTab,
}: {
  setCurrentPage: (page: string) => void
  setActiveTab: (tab: Tab) => void
}) {
  const upcomingApts = mockAppointments.filter((a) => a.status === "upcoming")
  const completedCount = mockAppointments.filter((a) => a.status === "completed").length
  const nextApt = upcomingApts[0]

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
          Welcome back, {mockPatient.firstName}
        </h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">
          {"Here's"} a summary of your dental care
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-teal-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Calendar size={16} className="text-teal-700 lg:hidden" />
              <Calendar size={20} className="text-teal-700 hidden lg:block" />
            </div>
            <span className="text-xs lg:text-sm text-gray-500 hidden sm:block">Upcoming</span>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{upcomingApts.length}</p>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Appointments</p>
        </div>
        <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Check size={16} className="text-green-600 lg:hidden" />
              <Check size={20} className="text-green-600 hidden lg:block" />
            </div>
            <span className="text-xs lg:text-sm text-gray-500 hidden sm:block">Completed</span>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{completedCount}</p>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Visits</p>
        </div>
        <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <FileText size={16} className="text-cyan-600 lg:hidden" />
              <FileText size={20} className="text-cyan-600 hidden lg:block" />
            </div>
            <span className="text-xs lg:text-sm text-gray-500 hidden sm:block">Records</span>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{mockRecords.length}</p>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Documents</p>
        </div>
      </div>

      {nextApt && (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm lg:text-base">Next Appointment</h2>
            <span className="text-xs font-medium bg-teal-100 text-teal-700 px-2.5 lg:px-3 py-1 rounded-full">
              Upcoming
            </span>
          </div>
          <div className="p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 lg:gap-5">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-50 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-teal-700 lg:hidden" />
                <Calendar size={24} className="text-teal-700 hidden lg:block" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base lg:text-lg">{nextApt.service}</h3>
                <p className="text-gray-500 mt-1 text-sm">
                  {nextApt.date} at {nextApt.time}
                </p>
                <p className="text-gray-500 text-sm">with {nextApt.doctor}</p>
              </div>
              <div className="flex gap-2 self-start">
                <button
                  type="button"
                  className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("contact")}
                  className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors flex items-center gap-1.5"
                >
                  <Phone size={14} /> <span className="hidden sm:inline">Call Clinic</span><span className="sm:hidden">Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        <button
          type="button"
          onClick={() => setCurrentPage("booking")}
          className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-5 flex items-center gap-4 hover:border-teal-200 hover:shadow-sm transition-all text-left group"
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-700 transition-colors flex-shrink-0">
            <ArrowRight size={18} className="text-teal-700 group-hover:text-white transition-colors lg:hidden" />
            <ArrowRight size={20} className="text-teal-700 group-hover:text-white transition-colors hidden lg:block" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm lg:text-base">Book Appointment</p>
            <p className="text-xs lg:text-sm text-gray-500">Schedule your next visit</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("records")}
          className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-5 flex items-center gap-4 hover:border-teal-200 hover:shadow-sm transition-all text-left group"
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cyan-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-600 transition-colors flex-shrink-0">
            <FileText size={18} className="text-cyan-600 group-hover:text-white transition-colors lg:hidden" />
            <FileText size={20} className="text-cyan-600 group-hover:text-white transition-colors hidden lg:block" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm lg:text-base">View Records</p>
            <p className="text-xs lg:text-sm text-gray-500">Access your dental history</p>
          </div>
        </button>
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm lg:text-base">Appointment History</h2>
          <button
            type="button"
            onClick={() => setActiveTab("appointments")}
            className="text-xs lg:text-sm text-teal-700 font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {mockAppointments.slice(0, 3).map((apt) => (
            <div key={apt.id} className="px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <div
                  className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 ${
                    apt.status === "upcoming" ? "bg-teal-50" : "bg-green-50"
                  }`}
                >
                  <Calendar
                    size={16}
                    className={apt.status === "upcoming" ? "text-teal-700" : "text-green-600"}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{apt.service}</p>
                  <p className="text-xs lg:text-sm text-gray-500 truncate">
                    {apt.date} - {apt.doctor}
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] lg:text-xs font-medium px-2 lg:px-3 py-1 rounded-full capitalize flex-shrink-0 ml-2 ${
                  apt.status === "upcoming"
                    ? "bg-teal-100 text-teal-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Appointments Tab ── */
function AppointmentsTab({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all")

  const filtered =
    filter === "all"
      ? mockAppointments
      : mockAppointments.filter((a) => a.status === filter)

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">Manage your upcoming and past visits</p>
        </div>
        <button
          type="button"
          onClick={() => setCurrentPage("booking")}
          className="px-4 lg:px-5 py-2.5 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2 text-sm lg:text-base self-start sm:self-auto"
        >
          <Calendar size={18} /> Book New
        </button>
      </div>

      <div className="flex gap-2">
        {(["all", "upcoming", "completed"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm capitalize transition-colors ${
              filter === f
                ? "bg-teal-700 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3 lg:gap-4">
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  apt.status === "upcoming" ? "bg-teal-50" : "bg-green-50"
                }`}
              >
                <Calendar
                  size={18}
                  className={apt.status === "upcoming" ? "text-teal-700" : "text-green-600"}
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{apt.service}</h3>
                <p className="text-xs lg:text-sm text-gray-500">
                  {apt.date} at {apt.time}
                </p>
                <p className="text-xs lg:text-sm text-gray-500">{apt.doctor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span
                className={`text-xs font-medium px-2.5 lg:px-3 py-1 rounded-full capitalize ${
                  apt.status === "upcoming"
                    ? "bg-teal-100 text-teal-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {apt.status}
              </span>
              {apt.status === "upcoming" && (
                <button
                  type="button"
                  className="text-xs lg:text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Cancel
                </button>
              )}
              <ChevronRight size={18} className="text-gray-400 hidden sm:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Records Tab ── */
function RecordsTab() {
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Medical Records</h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">Your dental health history and documents</p>
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-5">
        <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2 text-sm lg:text-base">
          <AlertCircle size={18} className="text-teal-700" />
          Health Summary
        </h3>
        <div className="grid grid-cols-3 gap-2 lg:gap-4">
          <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
            <p className="text-[10px] lg:text-sm text-gray-500 mb-0.5 lg:mb-1">Last Visit</p>
            <p className="font-semibold text-gray-900 text-xs lg:text-base">Jan 10, 2026</p>
          </div>
          <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
            <p className="text-[10px] lg:text-sm text-gray-500 mb-0.5 lg:mb-1">Total Visits</p>
            <p className="font-semibold text-gray-900 text-xs lg:text-base">12</p>
          </div>
          <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
            <p className="text-[10px] lg:text-sm text-gray-500 mb-0.5 lg:mb-1">Next Due</p>
            <p className="font-semibold text-gray-900 text-xs lg:text-base">Jul 2026</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {mockRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden"
          >
            <button
              type="button"
              onClick={() =>
                setSelectedRecord(selectedRecord === record.id ? null : record.id)
              }
              className="w-full px-4 lg:px-5 py-3 lg:py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-cyan-50 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-cyan-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{record.type}</h3>
                  <p className="text-xs lg:text-sm text-gray-500 truncate">
                    {record.date} - {record.doctor}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={18}
                className={`text-gray-400 transition-transform flex-shrink-0 ml-2 ${
                  selectedRecord === record.id ? "rotate-90" : ""
                }`}
              />
            </button>
            {selectedRecord === record.id && (
              <div className="px-4 lg:px-5 pb-4 lg:pb-5 border-t border-gray-50">
                <p className="text-gray-600 mt-3 lg:mt-4 leading-relaxed text-sm">{record.summary}</p>
                {record.attachments.length > 0 && (
                  <div className="mt-3 lg:mt-4 flex flex-wrap gap-2">
                    {record.attachments.map((att, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 lg:py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs lg:text-sm font-medium"
                      >
                        <FileText size={12} className="lg:hidden" />
                        <FileText size={14} className="hidden lg:block" />
                        {att}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Profile Tab ── */
function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [patient, setPatient] = useState(mockPatient)
  const [editData, setEditData] = useState(mockPatient)

  const handleSave = () => {
    setPatient(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(patient)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 lg:px-5 py-2.5 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2 text-sm self-start sm:self-auto"
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 lg:px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
            >
              <X size={16} /> Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 lg:px-5 py-2.5 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2 text-sm"
            >
              <Check size={16} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6 pb-5 lg:pb-6 border-b border-gray-100">
          <div className="relative group flex-shrink-0">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl lg:text-2xl">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </div>
            {isEditing && (
              <button
                type="button"
                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera size={24} className="text-white" />
              </button>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-gray-500 text-sm lg:text-base">{patient.email}</p>
            {isEditing && (
              <button
                type="button"
                className="mt-2 text-sm text-teal-700 font-medium flex items-center gap-1 hover:underline mx-auto sm:mx-0"
              >
                <Upload size={14} /> Upload new photo
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-5 lg:mt-6">
          {[
            { label: "First Name", field: "firstName" as const, type: "text" },
            { label: "Last Name", field: "lastName" as const, type: "text" },
            { label: "Email", field: "email" as const, type: "email" },
            { label: "Phone", field: "phone" as const, type: "tel" },
            { label: "Date of Birth", field: "dob" as const, type: "date" },
            { label: "Address", field: "address" as const, type: "text" },
          ].map((item) => (
            <div key={item.field}>
              <label className="block text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-1.5">{item.label}</label>
              {isEditing ? (
                <input
                  type={item.type}
                  value={editData[item.field]}
                  onChange={(e) => setEditData({ ...editData, [item.field]: e.target.value })}
                  className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm lg:text-base"
                />
              ) : (
                <p className="text-gray-900 font-medium text-sm lg:text-base">{patient[item.field]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-6">
        <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Insurance Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-1.5">Provider</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.insurance}
                onChange={(e) => setEditData({ ...editData, insurance: e.target.value })}
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm lg:text-base"
              />
            ) : (
              <p className="text-gray-900 font-medium text-sm lg:text-base">{patient.insurance}</p>
            )}
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-1.5">Member ID</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.memberId}
                onChange={(e) => setEditData({ ...editData, memberId: e.target.value })}
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm lg:text-base"
              />
            ) : (
              <p className="text-gray-900 font-medium text-sm lg:text-base">{patient.memberId}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Dashboard ── */
export default function PatientDashboard({ setCurrentPage, setIsLoggedIn }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    if (setIsLoggedIn) setIsLoggedIn(false)
    setCurrentPage("home")
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              {mockPatient.firstName[0]}
              {mockPatient.lastName[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {mockPatient.firstName} {mockPatient.lastName}
              </p>
              <p className="text-xs text-gray-500">Patient Portal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="p-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("booking")
                  setMobileMenuOpen(false)
                }}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("home")
                  setMobileMenuOpen(false)
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight size={18} className="rotate-180" />
                Back to Home
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-3 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2"
          >
            <div className="w-11 h-11 bg-teal-600 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6.5 7.5 5 8.5 4 10C3 11.5 3 13.5 4 15C5 16.5 6 19 7 21C8 23 9 22 9.5 20C10 18 11 17 12 17C13 17 14 18 14.5 20C15 22 16 23 17 21C18 19 19 16.5 20 15C21 13.5 21 11.5 20 10C19 8.5 17.5 7.5 17 5.5C16.5 3.5 14.5 2 12 2Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Elite Dental</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {mockPatient.firstName} {mockPatient.lastName}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="pt-20 min-h-screen bg-gray-50 flex">
      <PatientSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        patient={mockPatient}
        setCurrentPage={setCurrentPage}
      />
      <main className="flex-1 p-4 pb-20 lg:p-8 lg:pb-8 overflow-auto max-w-5xl">
        {activeTab === "overview" && (
          <OverviewTab setCurrentPage={setCurrentPage} setActiveTab={setActiveTab} />
        )}
        {activeTab === "appointments" && <AppointmentsTab setCurrentPage={setCurrentPage} />}
        {activeTab === "records" && <RecordsTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
    </>
  )
}
