"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {ArrowRight, CalendarDays, Camera, CheckCircle2, Clock3, Edit3, MapPin, MoreVertical, Plus, Search, Trash2, Users, } from "lucide-react";
import axios from "axios";

type EventStatus = "upcoming" | "past";

const categories = [
  "All Categories",
  "Mentoring",
  "Youth Conference",
  "Faith & Growth",
  "Purpose",
  "Community",
];

export default function EventsPage() {

  interface Event {
    id: number;
    event_id: number;
    title: string;
    slug: string;
    category: string;
    date: string;
    time: string;
    location: string;
    description: string;
    status: EventStatus;
    attendees: number;
    photos: number;
    image: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<EventStatus>("upcoming");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try{
        const url = "http://localhost:8000/api/events";
        const response = await axios.get(url, {withCredentials: true});

        console.log(response.data);

        if (response.data.status === "success"){
          setEvents(response.data.events);
        }
      }catch (error) {
        if (axios.isAxiosError(error)){
          console.log(error.response?.data);
        }
      }
    }
    fetchEvents();
  },[])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesStatus = event.status === activeTab;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" || event.category === category;

      return matchesStatus && matchesSearch && matchesCategory;
    });
  }, [events, activeTab, search, category]);

  const deleteEvent = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setEvents((current) => current.filter((event) => event.id !== id));
    setOpenMenu(null);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Content Management
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                Events
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create, manage, and organize WiseGen events.
              </p>
            </div>

            <Link
              href="/dashboard/events/create"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
            >
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 lg:px-10">
        {/* Overview Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Events
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {events.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <CalendarDays size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Upcoming
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {events.filter((event) => event.status === "upcoming").length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Past Events
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {events.filter((event) => event.status === "past").length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <CheckCircle2 size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white">
          {/* Tabs */}
          <div className="border-b border-slate-100 px-5 pt-5 sm:px-6">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("upcoming")}
                className={`relative pb-4 text-sm font-bold transition ${
                  activeTab === "upcoming"
                    ? "text-slate-950"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Upcoming Events

                {activeTab === "upcoming" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-amber-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("past")}
                className={`relative pb-4 text-sm font-bold transition ${
                  activeTab === "past"
                    ? "text-slate-950"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Past Events

                {activeTab === "past" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-amber-400" />
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Events */}
          <div className="p-5 sm:p-6">
            {filteredEvents.length > 0 ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-amber-200 hover:shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative h-56 shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-48">
                        <img
                          src={`http://localhost:8000${event.image}`}
                          alt={event.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute left-3 top-3">
                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${
                              event.status === "upcoming"
                                ? "bg-green-400 text-green-950"
                                : "bg-slate-950/80 text-white"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                              {event.category}
                            </span>

                            <h2 className="mt-1 truncate text-lg font-black text-slate-950">
                              {event.title}
                            </h2>
                          </div>

                          {/* Menu */}
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu === event.id ? null : event.id
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                              <MoreVertical size={18} />
                            </button>

                            {openMenu === event.id && (
                              <div className="absolute right-0 top-10 z-20 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                                <Link
                                  href={`/dashboard/events/${event.id}`}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                  onClick={() => setOpenMenu(null)}
                                >
                                  <Edit3 size={15} />
                                  Edit Event
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => deleteEvent(event.id)}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 size={15} />
                                  Delete Event
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                          {event.description}
                        </p>

                        {/* Meta */}
                        <div className="mt-4 grid gap-2 text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={14}
                              className="text-amber-500"
                            />
                            {event.date}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock3
                              size={14}
                              className="text-amber-500"
                            />
                            {event.time}
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin
                              size={14}
                              className="text-amber-500"
                            />
                            {event.location}
                          </div>
                        </div>

                        {/* Bottom */}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                          <div className="flex gap-4 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <Users size={14} />
                              {event.attendees} attendees
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Camera size={14} />
                              {event.photos} photos
                            </span>
                          </div>

                          <Link
                            href={`/dashboard/events/${event.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 transition hover:text-amber-600"
                          >
                            Manage
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <CalendarDays size={28} />
                </div>

                <h2 className="mt-5 text-lg font-black text-slate-800">
                  No {activeTab} events found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  {search || category !== "All Categories"
                    ? "Try changing your search or filter to find an event."
                    : activeTab === "upcoming"
                      ? "Create your first upcoming event to get started."
                      : "Past events will appear here after they have taken place."}
                </p>

                {activeTab === "upcoming" &&
                  !search &&
                  category === "All Categories" && (
                    <Link
                      href="/dashboard/events/create"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                    >
                      <Plus size={17} />
                      Create Event
                    </Link>
                  )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}