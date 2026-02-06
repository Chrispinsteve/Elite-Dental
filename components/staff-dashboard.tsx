"use client"

import React, { useState } from "react"
import {
  Calendar,
  Clock,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  FileText,
  MessageSquare,
  Settings,
  Activity,
  Eye,
  Search,
  Send,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Stethoscope,
  ArrowLeft,
  Menu,
  LogOut,
  ArrowRight,
} from "lucide-react"

interface StaffDashboardProps {
  setCurrentPage: (page: string) => void
  setIsLoggedIn?: (value: boolean) => void
}

type StaffTab = "overview" | "calendar" | "patients" | "messages" | "availability"
type CalendarView = "day" | "week" | "month"

const doctors = [
  { id: "dr-mitchell", name: "Dr. Sarah Mitchell", specialty: "General Dentistry", color: "bg-teal-500" },
  { id: "dr-wilson", name: "Dr. James Wilson", specialty: "Orthodontics", color: "bg-cyan-500" },
  { id: "dr-chen", name: "Dr. Emily Chen", specialty: "Pediatric", color: "bg-pink-500" },
  { id: "dr-brown", name: "Dr. Michael Brown", specialty: "Oral Surgery", color: "bg-amber-500" },
]

const currentDoctor = doctors[0]

const allAppointments = [
  { id: 1, patientName: "Alice Johnson", patientId: "p1", service: "General Checkup", doctorId: "dr-mitchell", date: "2026-02-06", time: "09:00", duration: 30, status: "confirmed" as const, reason: "Regular 6-month checkup" },
  { id: 2, patientName: "Bob Smith", patientId: "p2", service: "Teeth Cleaning", doctorId: "dr-mitchell", date: "2026-02-06", time: "10:00", duration: 45, status: "in-progress" as const, reason: "Professional cleaning + tartar removal" },
  { id: 3, patientName: "Carol Davis", patientId: "p3", service: "Cavity Filling", doctorId: "dr-mitchell", date: "2026-02-06", time: "11:00", duration: 60, status: "confirmed" as const, reason: "Filling on lower right molar" },
  { id: 4, patientName: "David Lee", patientId: "p4", service: "Root Canal", doctorId: "dr-wilson", date: "2026-02-06", time: "09:30", duration: 90, status: "confirmed" as const, reason: "Root canal treatment on #19" },
  { id: 5, patientName: "Eva Martinez", patientId: "p5", service: "Orthodontics Consultation", doctorId: "dr-wilson", date: "2026-02-06", time: "14:00", duration: 45, status: "confirmed" as const, reason: "Initial braces consultation" },
  { id: 6, patientName: "Frank White", patientId: "p6", service: "Emergency Visit", doctorId: "dr-mitchell", date: "2026-02-06", time: "14:00", duration: 30, status: "confirmed" as const, reason: "Severe tooth pain, possible abscess" },
  { id: 7, patientName: "Grace Kim", patientId: "p7", service: "Teeth Whitening", doctorId: "dr-chen", date: "2026-02-06", time: "10:00", duration: 60, status: "confirmed" as const, reason: "Professional whitening session" },
  { id: 8, patientName: "Henry Taylor", patientId: "p8", service: "General Checkup", doctorId: "dr-mitchell", date: "2026-02-07", time: "09:00", duration: 30, status: "confirmed" as const, reason: "Annual checkup" },
  { id: 9, patientName: "Iris Anderson", patientId: "p9", service: "Cleaning", doctorId: "dr-mitchell", date: "2026-02-07", time: "10:30", duration: 45, status: "confirmed" as const, reason: "Bi-annual cleaning" },
  { id: 10, patientName: "Jack Wilson", patientId: "p10", service: "Crown Fitting", doctorId: "dr-brown", date: "2026-02-06", time: "11:00", duration: 90, status: "confirmed" as const, reason: "Permanent crown placement" },
]

const patients = [
  { id: "p1", name: "Alice Johnson", age: 34, phone: "(555) 111-2222", email: "alice@email.com", lastVisit: "Jan 10, 2026", nextVisit: "Feb 06, 2026", conditions: ["Mild gingivitis"], allergies: ["Penicillin"] },
  { id: "p2", name: "Bob Smith", age: 45, phone: "(555) 333-4444", email: "bob@email.com", lastVisit: "Dec 05, 2025", nextVisit: "Feb 06, 2026", conditions: ["Receding gums"], allergies: [] },
  { id: "p3", name: "Carol Davis", age: 28, phone: "(555) 555-6666", email: "carol@email.com", lastVisit: "Nov 15, 2025", nextVisit: "Feb 06, 2026", conditions: [], allergies: ["Latex"] },
  { id: "p4", name: "David Lee", age: 52, phone: "(555) 777-8888", email: "david@email.com", lastVisit: "Jan 20, 2026", nextVisit: "Feb 06, 2026", conditions: ["Periodontal disease"], allergies: [] },
  { id: "p5", name: "Eva Martinez", age: 19, phone: "(555) 999-0000", email: "eva@email.com", lastVisit: "Oct 01, 2025", nextVisit: "Feb 06, 2026", conditions: [], allergies: [] },
  { id: "p6", name: "Frank White", age: 41, phone: "(555) 222-3333", email: "frank@email.com", lastVisit: "Sep 12, 2025", nextVisit: "Feb 06, 2026", conditions: ["Bruxism"], allergies: ["Aspirin"] },
]

const mockMessages = [
  { id: 1, from: "Dr. James Wilson", fromId: "dr-wilson", message: "Can you take a look at David Lee's X-rays? I need a second opinion on the root canal approach.", time: "10:30 AM", unread: true },
  { id: 2, from: "Dr. Emily Chen", fromId: "dr-chen", message: "Grace Kim's whitening session went well. She's scheduled for a follow-up in 2 weeks.", time: "9:15 AM", unread: false },
  { id: 3, from: "Dr. Michael Brown", fromId: "dr-brown", message: "I'll be running about 15 minutes late for my afternoon patients. Can you let the front desk know?", time: "Yesterday", unread: false },
]

const availabilitySlots = [
  { day: "Monday", start: "08:00", end: "17:00", enabled: true },
  { day: "Tuesday", start: "08:00", end: "17:00", enabled: true },
  { day: "Wednesday", start: "08:00", end: "14:00", enabled: true },
  { day: "Thursday", start: "08:00", end: "17:00", enabled: true },
  { day: "Friday", start: "08:00", end: "15:00", enabled: true },
  { day: "Saturday", start: "09:00", end: "13:00", enabled: false },
  { day: "Sunday", start: "00:00", end: "00:00", enabled: false },
]

/* ── Desktop Sidebar ── */
function StaffSidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: StaffTab
  setActiveTab: (tab: StaffTab) => void
}) {
  const tabs: { id: StaffTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "patients", label: "Patients", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 1 },
    { id: "availability", label: "Availability", icon: Settings },
  ]

  return (
    <aside className="hidden lg:flex w-72 bg-gray-900 min-h-[calc(100vh-80px)] flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
            SM
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{currentDoctor.name}</p>
            <p className="text-sm text-gray-400">{currentDoctor.specialty}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all ${
              activeTab === tab.id
                ? "bg-teal-700/30 text-teal-300"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
          >
            <span className="flex items-center gap-3">
              <tab.icon size={20} />
              {tab.label}
            </span>
            {tab.badge && (
              <span className="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Today</p>
          <p className="text-white font-semibold">
            {allAppointments.filter((a) => a.date === "2026-02-06" && a.doctorId === currentDoctor.id).length} appointments
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Next: {allAppointments.find((a) => a.date === "2026-02-06" && a.doctorId === currentDoctor.id && a.status === "confirmed")?.time || "None"}
          </p>
        </div>
      </div>
    </aside>
  )
}

/* ── Mobile Bottom Nav ── */
function StaffMobileBottomNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: StaffTab
  setActiveTab: (tab: StaffTab) => void
}) {
  const tabs: { id: StaffTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "overview", label: "Home", icon: Activity },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "patients", label: "Patients", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 1 },
    { id: "availability", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors min-w-[52px] ${
              activeTab === tab.id
                ? "text-teal-400"
                : "text-gray-500"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {tab.badge && (
              <span className="absolute -top-0.5 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ── Staff Overview ── */
function StaffOverview() {
  const todayApts = allAppointments.filter((a) => a.date === "2026-02-06" && a.doctorId === currentDoctor.id)
  const confirmed = todayApts.filter((a) => a.status === "confirmed").length
  const inProgress = todayApts.filter((a) => a.status === "in-progress").length

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">
          Thursday, February 6, 2026
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-teal-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Calendar size={16} className="text-teal-700 lg:hidden" />
              <Calendar size={20} className="text-teal-700 hidden lg:block" />
            </div>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{todayApts.length}</p>
          <p className="text-xs lg:text-sm text-gray-500">{"Today's"} Appts</p>
        </div>
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <CheckCircle2 size={16} className="text-green-600 lg:hidden" />
              <CheckCircle2 size={20} className="text-green-600 hidden lg:block" />
            </div>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{confirmed}</p>
          <p className="text-xs lg:text-sm text-gray-500">Confirmed</p>
        </div>
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Timer size={16} className="text-cyan-600 lg:hidden" />
              <Timer size={20} className="text-cyan-600 hidden lg:block" />
            </div>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{inProgress}</p>
          <p className="text-xs lg:text-sm text-gray-500">In Progress</p>
        </div>
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-gray-100">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Users size={16} className="text-amber-600 lg:hidden" />
              <Users size={20} className="text-amber-600 hidden lg:block" />
            </div>
          </div>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{patients.length}</p>
          <p className="text-xs lg:text-sm text-gray-500">Patients</p>
        </div>
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm lg:text-base">{"Today's"} Schedule</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {todayApts.map((apt) => (
            <div key={apt.id} className="px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <div className="text-center w-12 lg:w-16 flex-shrink-0">
                  <p className="text-xs lg:text-sm font-bold text-teal-700">{apt.time}</p>
                  <p className="text-[10px] lg:text-xs text-gray-400">{apt.duration}min</p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs lg:text-sm flex-shrink-0">
                  {apt.patientName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{apt.patientName}</p>
                  <p className="text-xs lg:text-sm text-gray-500 truncate">{apt.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 ml-2">
                <span
                  className={`text-[10px] lg:text-xs font-medium px-2 lg:px-3 py-1 rounded-full capitalize hidden sm:inline-flex ${
                    apt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : apt.status === "in-progress"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {apt.status === "in-progress" ? "In Progress" : apt.status}
                </span>
                <div
                  className={`w-2.5 h-2.5 rounded-full sm:hidden ${
                    apt.status === "confirmed"
                      ? "bg-green-500"
                      : apt.status === "in-progress"
                        ? "bg-cyan-500"
                        : "bg-gray-400"
                  }`}
                />
                <button type="button" className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye size={14} className="text-gray-400 lg:hidden" />
                  <Eye size={16} className="text-gray-400 hidden lg:block" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockMessages.filter((m) => m.unread).length > 0 && (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm lg:text-base">Unread Messages</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {mockMessages.filter((m) => m.unread).map((msg) => (
              <div key={msg.id} className="px-4 lg:px-6 py-3 lg:py-4 flex items-start gap-3 lg:gap-4">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-xs lg:text-sm flex-shrink-0">
                  {msg.from.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">{msg.from}</p>
                    <span className="text-[10px] lg:text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1 line-clamp-2">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Calendar Tab ── */
function CalendarTab() {
  const [view, setView] = useState<CalendarView>("day")
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 6))
  const [showAllDoctors, setShowAllDoctors] = useState(false)

  const hours = Array.from({ length: 10 }, (_, i) => i + 8)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const filteredAppointments = showAllDoctors
    ? allAppointments.filter((a) => a.date === "2026-02-06")
    : allAppointments.filter((a) => a.date === "2026-02-06" && a.doctorId === currentDoctor.id)

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const offset = firstDay === 0 ? 6 : firstDay - 1
    const days: (number | null)[] = Array(offset).fill(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }

  const hasAppointment = (day: number) =>
    allAppointments.some(
      (a) =>
        a.date ===
        `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    )

  const navigateDate = (dir: -1 | 1) => {
    const d = new Date(currentDate)
    if (view === "day") d.setDate(d.getDate() + dir)
    else if (view === "week") d.setDate(d.getDate() + dir * 7)
    else d.setMonth(d.getMonth() + dir)
    setCurrentDate(d)
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">Manage your schedule</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showAllDoctors}
              onChange={(e) => setShowAllDoctors(e.target.checked)}
              className="rounded accent-teal-700"
            />
            Show all doctors
          </label>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {(["day", "week", "month"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-3 lg:px-4 py-1.5 rounded-md text-xs lg:text-sm font-medium capitalize transition-colors ${
                  view === v ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button
          type="button"
          onClick={() => navigateDate(-1)}
          className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-600 lg:hidden" />
          <ChevronLeft size={20} className="text-gray-600 hidden lg:block" />
        </button>
        <h2 className="text-sm lg:text-lg font-semibold text-gray-900 flex-1 text-center">
          {view === "day" &&
            currentDate.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" })}
          {view === "week" &&
            `Week of ${currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
          {view === "month" &&
            currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button
          type="button"
          onClick={() => navigateDate(1)}
          className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={18} className="text-gray-600 lg:hidden" />
          <ChevronRight size={20} className="text-gray-600 hidden lg:block" />
        </button>
      </div>

      {/* Day view */}
      {view === "day" && (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden">
          {showAllDoctors && (
            <div className="px-3 lg:px-6 py-2 lg:py-3 border-b border-gray-100 flex flex-wrap items-center gap-3 lg:gap-4">
              {doctors.map((doc) => (
                <div key={doc.id} className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-gray-600">
                  <div className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full ${doc.color}`} />
                  <span className="hidden sm:inline">{doc.name.replace("Dr. ", "")}</span>
                  <span className="sm:hidden">{doc.name.replace("Dr. ", "").split(" ")[1]}</span>
                </div>
              ))}
            </div>
          )}
          <div className="divide-y divide-gray-50">
            {hours.map((hour) => {
              const timeStr = `${String(hour).padStart(2, "0")}:00`
              const halfStr = `${String(hour).padStart(2, "0")}:30`
              const aptsAtHour = filteredAppointments.filter((a) => a.time === timeStr)
              const aptsAtHalf = filteredAppointments.filter((a) => a.time === halfStr)
              const allApts = [...aptsAtHour, ...aptsAtHalf]

              return (
                <div key={hour} className="flex min-h-[60px] lg:min-h-[72px]">
                  <div className="w-14 lg:w-20 py-2 lg:py-3 px-2 lg:px-4 text-[10px] lg:text-sm text-gray-400 font-medium flex-shrink-0 border-r border-gray-50">
                    {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 ${hour === 12 ? "PM" : "AM"}`}
                  </div>
                  <div className="flex-1 py-1.5 lg:py-2 px-2 lg:px-4 flex flex-col lg:flex-row flex-wrap gap-1.5 lg:gap-2">
                    {allApts.map((apt) => (
                      <div
                        key={apt.id}
                        className={`lg:flex-1 lg:min-w-[200px] px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl border-l-4 ${
                          apt.status === "in-progress"
                            ? "bg-cyan-50 border-cyan-500"
                            : "bg-teal-50 border-teal-500"
                        }`}
                        style={showAllDoctors ? { borderLeftColor: apt.doctorId === "dr-mitchell" ? "#14b8a6" : apt.doctorId === "dr-wilson" ? "#06b6d4" : apt.doctorId === "dr-chen" ? "#ec4899" : "#f59e0b" } : undefined}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{apt.patientName}</p>
                          <span className="text-[10px] lg:text-xs text-gray-500 flex-shrink-0 ml-2">{apt.time} ({apt.duration}m)</span>
                        </div>
                        <p className="text-[10px] lg:text-xs text-gray-500 mt-0.5 truncate">
                          {apt.service}
                          {showAllDoctors && ` - ${doctors.find((d) => d.id === apt.doctorId)?.name}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Week view -- show simplified on mobile */}
      {view === "week" && (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-7 border-b border-gray-100">
              <div className="w-14 lg:w-20" />
              {weekDays.map((day, i) => (
                <div key={day} className="py-2 lg:py-3 text-center">
                  <p className="text-[10px] lg:text-xs text-gray-400 font-medium">{day}</p>
                  <p className={`text-sm lg:text-lg font-semibold ${i === 4 ? "text-teal-700" : "text-gray-900"}`}>
                    {2 + i}
                  </p>
                </div>
              ))}
            </div>
            <div className="divide-y divide-gray-50">
              {hours.slice(0, 8).map((hour) => (
                <div key={hour} className="flex min-h-[48px] lg:min-h-[56px]">
                  <div className="w-14 lg:w-20 py-2 px-2 lg:px-4 text-[10px] lg:text-xs text-gray-400 font-medium flex-shrink-0 border-r border-gray-50">
                    {hour > 12 ? `${hour - 12} PM` : `${hour} ${hour === 12 ? "PM" : "AM"}`}
                  </div>
                  <div className="flex-1 grid grid-cols-6">
                    {weekDays.map((_, dayIdx) => {
                      const dateStr = `2026-02-${String(2 + dayIdx).padStart(2, "0")}`
                      const timeStr = `${String(hour).padStart(2, "0")}:00`
                      const dayApts = allAppointments.filter(
                        (a) => a.date === dateStr && a.time === timeStr && (showAllDoctors || a.doctorId === currentDoctor.id)
                      )
                      return (
                        <div key={dayIdx} className="border-r border-gray-50 p-0.5 lg:p-1">
                          {dayApts.map((apt) => (
                            <div
                              key={apt.id}
                              className="bg-teal-100 text-teal-800 rounded-md lg:rounded-lg px-1.5 lg:px-2 py-0.5 lg:py-1 text-[10px] lg:text-xs font-medium truncate"
                              style={showAllDoctors ? { backgroundColor: apt.doctorId === "dr-mitchell" ? "#ccfbf1" : apt.doctorId === "dr-wilson" ? "#e0f2fe" : apt.doctorId === "dr-chen" ? "#fce7f3" : "#fef3c7" } : undefined}
                            >
                              {apt.patientName.split(" ")[0]}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Month view */}
      {view === "month" && (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-100">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="py-2 lg:py-3 text-center text-[10px] lg:text-xs text-gray-400 font-medium">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {getMonthDays().map((day, i) => (
              <div
                key={i}
                className={`min-h-[44px] lg:min-h-[80px] border-b border-r border-gray-50 p-1 lg:p-2 ${
                  day === 6 ? "bg-teal-50/50" : ""
                }`}
              >
                {day && (
                  <>
                    <p className={`text-xs lg:text-sm font-medium ${day === 6 ? "text-teal-700" : "text-gray-900"}`}>
                      {day}
                    </p>
                    {hasAppointment(day) && (
                      <div className="mt-0.5 lg:mt-1 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-teal-500 rounded-full" />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Patients Tab ── */
function PatientsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selected = patients.find((p) => p.id === selectedPatient)

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Patients</h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">View and manage assigned patients</p>
      </div>

      {/* Mobile: show list or detail. Desktop: side-by-side */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Patient list - hide on mobile when a patient is selected */}
        <div className={`${selected ? "hidden lg:flex" : "flex"} w-full lg:w-80 flex-col gap-3 lg:gap-4 flex-shrink-0`}>
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex flex-col gap-2 max-h-[calc(100vh-320px)] overflow-y-auto">
            {filteredPatients.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPatient(p.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selectedPatient === p.id
                    ? "bg-teal-50 border border-teal-200"
                    : "bg-white border border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">Next: {p.nextVisit}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 ml-auto flex-shrink-0 lg:hidden" />
              </button>
            ))}
          </div>
        </div>

        {/* Patient detail */}
        <div className={`flex-1 ${selected ? "block" : "hidden lg:block"}`}>
          {selected ? (
            <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 lg:px-6 py-4 lg:py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3 lg:gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPatient(null)}
                    className="lg:hidden p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={18} className="text-gray-600" />
                  </button>
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm lg:text-base">
                    {selected.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="text-base lg:text-lg font-semibold text-gray-900">{selected.name}</h2>
                    <p className="text-xs lg:text-sm text-gray-500">Age: {selected.age}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
                    <p className="text-[10px] lg:text-xs text-gray-500 mb-0.5 lg:mb-1">Phone</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900">{selected.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
                    <p className="text-[10px] lg:text-xs text-gray-500 mb-0.5 lg:mb-1">Email</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">{selected.email}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
                    <p className="text-[10px] lg:text-xs text-gray-500 mb-0.5 lg:mb-1">Last Visit</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900">{selected.lastVisit}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4">
                    <p className="text-[10px] lg:text-xs text-gray-500 mb-0.5 lg:mb-1">Next Visit</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900">{selected.nextVisit}</p>
                  </div>
                </div>

                {selected.conditions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2 text-sm">
                      <Stethoscope size={16} /> Conditions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.conditions.map((c, i) => (
                        <span key={i} className="px-2.5 lg:px-3 py-1 lg:py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs lg:text-sm font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.allergies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2 text-sm">
                      <AlertCircle size={16} className="text-red-500" /> Allergies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.allergies.map((a, i) => (
                        <span key={i} className="px-2.5 lg:px-3 py-1 lg:py-1.5 bg-red-50 text-red-700 rounded-lg text-xs lg:text-sm font-medium">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-sm">Visit History</h3>
                  <div className="flex flex-col gap-2">
                    {allAppointments
                      .filter((a) => a.patientId === selected.id)
                      .map((apt) => (
                        <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg lg:rounded-xl gap-1">
                          <div className="flex items-center gap-2 lg:gap-3">
                            <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs lg:text-sm font-medium text-gray-900">{apt.service}</p>
                              <p className="text-[10px] lg:text-xs text-gray-500">{apt.date} at {apt.time}</p>
                            </div>
                          </div>
                          <p className="text-[10px] lg:text-xs text-gray-500 pl-6 sm:pl-0 truncate">{apt.reason}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 h-64 lg:h-full flex items-center justify-center p-8 lg:p-12">
              <div className="text-center">
                <Users size={40} className="text-gray-300 mx-auto mb-3 lg:mb-4" />
                <p className="text-gray-500 font-medium text-sm lg:text-base">Select a patient to view their profile</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Messages Tab ── */
function MessagesTab() {
  const [selectedConvo, setSelectedConvo] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Record<number, string[]>>({
    1: ["Sure, I'll review them this afternoon.", "Thanks for flagging this."],
    2: [],
    3: [],
  })

  const selected = mockMessages.find((m) => m.id === selectedConvo)

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">Communicate with other staff members</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 h-auto lg:h-[calc(100vh-280px)]">
        {/* Conversation list - hide on mobile when viewing a chat */}
        <div className={`${selected ? "hidden lg:flex" : "flex"} w-full lg:w-72 bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden flex-col flex-shrink-0`}>
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border-none rounded-lg text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockMessages.map((msg) => (
              <button
                key={msg.id}
                type="button"
                onClick={() => setSelectedConvo(msg.id)}
                className={`w-full p-3 lg:p-4 flex items-start gap-3 text-left border-b border-gray-50 transition-colors ${
                  selectedConvo === msg.id ? "bg-teal-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs flex-shrink-0">
                  {msg.from.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs lg:text-sm font-medium truncate ${msg.unread ? "text-gray-900" : "text-gray-600"}`}>
                      {msg.from.replace("Dr. ", "")}
                    </p>
                    <span className="text-[10px] lg:text-xs text-gray-400 flex-shrink-0 ml-2">{msg.time}</span>
                  </div>
                  <p className="text-[10px] lg:text-xs text-gray-500 truncate mt-0.5 lg:mt-1">{msg.message}</p>
                </div>
                {msg.unread && <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0 mt-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className={`flex-1 bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden flex flex-col ${selected ? "flex" : "hidden lg:flex"} min-h-[400px] lg:min-h-0`}>
          {selected ? (
            <>
              <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex items-center gap-3 lg:gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedConvo(null)}
                  className="lg:hidden p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={18} className="text-gray-600" />
                </button>
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-xs lg:text-sm">
                  {selected.from.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">{selected.from}</p>
                  <p className="text-[10px] lg:text-xs text-gray-500">
                    {doctors.find((d) => d.id === selected.fromId)?.specialty}
                  </p>
                </div>
              </div>
              <div className="flex-1 p-4 lg:p-6 overflow-y-auto flex flex-col gap-3 lg:gap-4">
                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-[10px] lg:text-xs flex-shrink-0">
                    {selected.from.split(" ").slice(1).map((n) => n[0]).join("")}
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 lg:px-4 py-2 lg:py-3 max-w-[80%] lg:max-w-[75%]">
                    <p className="text-xs lg:text-sm text-gray-900">{selected.message}</p>
                    <p className="text-[10px] lg:text-xs text-gray-400 mt-1">{selected.time}</p>
                  </div>
                </div>
                {(chatHistory[selected.id] || []).map((msg, i) => (
                  <div key={i} className="flex items-start gap-2 lg:gap-3 justify-end">
                    <div className="bg-teal-700 rounded-2xl rounded-tr-sm px-3 lg:px-4 py-2 lg:py-3 max-w-[80%] lg:max-w-[75%]">
                      <p className="text-xs lg:text-sm text-white">{msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 lg:p-4 border-t border-gray-100">
                <div className="flex items-center gap-2 lg:gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newMessage.trim()) {
                        setChatHistory((prev) => ({
                          ...prev,
                          [selected.id]: [...(prev[selected.id] || []), newMessage.trim()],
                        }))
                        setNewMessage("")
                      }
                    }}
                    className="flex-1 px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newMessage.trim()) {
                        setChatHistory((prev) => ({
                          ...prev,
                          [selected.id]: [...(prev[selected.id] || []), newMessage.trim()],
                        }))
                        setNewMessage("")
                      }
                    }}
                    className="p-2 lg:p-2.5 bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition-colors"
                  >
                    <Send size={16} className="lg:hidden" />
                    <Send size={18} className="hidden lg:block" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full py-16 lg:py-0">
              <div className="text-center">
                <MessageSquare size={40} className="text-gray-300 mx-auto mb-3 lg:mb-4" />
                <p className="text-gray-500 font-medium text-sm lg:text-base">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Availability Tab ── */
function AvailabilityTab() {
  const [slots, setSlots] = useState(availabilitySlots)
  const [visitDuration, setVisitDuration] = useState(30)
  const [maxPerDay, setMaxPerDay] = useState(12)

  const toggleDay = (day: string) => {
    setSlots(slots.map((s) => (s.day === day ? { ...s, enabled: !s.enabled } : s)))
  }

  const updateSlot = (day: string, field: "start" | "end", value: string) => {
    setSlots(slots.map((s) => (s.day === day ? { ...s, [field]: value } : s)))
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Availability</h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">Set your working hours and appointment preferences</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-6">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Default Visit Duration</h3>
          <p className="text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">Standard appointment length</p>
          <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
            {[15, 30, 45, 60].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setVisitDuration(d)}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                  visitDuration === d
                    ? "bg-teal-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-6">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Max Appointments/Day</h3>
          <p className="text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">Prevent overbooking</p>
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => setMaxPerDay(Math.max(1, maxPerDay - 1))}
              className="w-9 h-9 lg:w-10 lg:h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="text-xl lg:text-2xl font-bold text-gray-900 w-10 lg:w-12 text-center">{maxPerDay}</span>
            <button
              type="button"
              onClick={() => setMaxPerDay(maxPerDay + 1)}
              className="w-9 h-9 lg:w-10 lg:h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Weekly Schedule</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {slots.map((slot) => (
            <div key={slot.day} className="px-4 lg:px-6 py-3 lg:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-3 lg:gap-4">
                <button
                  type="button"
                  onClick={() => toggleDay(slot.day)}
                  className={`w-9 h-5 lg:w-10 lg:h-6 rounded-full transition-colors relative flex-shrink-0 ${
                    slot.enabled ? "bg-teal-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 lg:w-4 lg:h-4 bg-white rounded-full absolute top-[3px] lg:top-1 transition-transform ${
                      slot.enabled ? "translate-x-[18px] lg:translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`font-medium text-xs lg:text-sm w-20 lg:w-24 ${slot.enabled ? "text-gray-900" : "text-gray-400"}`}>
                  {slot.day}
                </span>
              </div>
              {slot.enabled ? (
                <div className="flex items-center gap-2 lg:gap-3 pl-12 sm:pl-0">
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) => updateSlot(slot.day, "start", e.target.value)}
                    className="px-2 lg:px-3 py-1 lg:py-1.5 border border-gray-200 rounded-lg text-xs lg:text-sm outline-none focus:ring-2 focus:ring-teal-500 w-[100px] lg:w-auto"
                  />
                  <span className="text-gray-400 text-xs lg:text-sm">to</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) => updateSlot(slot.day, "end", e.target.value)}
                    className="px-2 lg:px-3 py-1 lg:py-1.5 border border-gray-200 rounded-lg text-xs lg:text-sm outline-none focus:ring-2 focus:ring-teal-500 w-[100px] lg:w-auto"
                  />
                </div>
              ) : (
                <span className="text-xs lg:text-sm text-gray-400 pl-12 sm:pl-0">Day off</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="px-5 lg:px-6 py-2.5 lg:py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors text-sm lg:text-base"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

/* ── Main Dashboard ── */
export default function StaffDashboard({ setCurrentPage, setIsLoggedIn }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState<StaffTab>("overview")

  const handleLogout = () => {
    if (setIsLoggedIn) setIsLoggedIn(false)
    setCurrentPage("home")
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
              {currentDoctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="font-semibold text-gray-900 text-sm">
              {currentDoctor.name.split(' ')[1]}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
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
            <span className="text-sm text-gray-600">{currentDoctor.name}</span>
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
      <StaffSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 pb-20 lg:p-8 lg:pb-8 overflow-auto">
        {activeTab === "overview" && <StaffOverview />}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "patients" && <PatientsTab />}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "availability" && <AvailabilityTab />}
      </main>
      <StaffMobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
    </>
  )
}
