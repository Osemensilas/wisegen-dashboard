"use client";

import Link from "next/link";
import {ArrowRight, CalendarDays, ChevronRight, Clock3, FileText, Image as ImageIcon, Plus, Users } from "lucide-react";
import Header from "@/components/header";
import {useState, useEffect} from "react";
import axios from "axios";

const stats = [
  // {
  //   title: "Members",
  //   value: "0",
  //   description: "Registered community members",
  //   icon: Users,
  // },
  {
    title: "Upcoming Events",
    value: "0",
    description: "Events currently scheduled",
    icon: CalendarDays,
  },
  // {
  //   title: "News Articles",
  //   value: "0",
  //   description: "Published articles",
  //   icon: FileText,
  // },
  {
    title: "Past Events",
    value: "0",
    description: "Events in the archive",
    icon: Clock3,
  },
];

const quickActions = [
  {
    title: "Create Event",
    description: "Add a new WiseGen event",
    href: "/dashboard/events/create",
    icon: CalendarDays,
  },
  // {
  //   title: "Write News",
  //   description: "Publish a new article",
  //   href: "/dashboard/news/create",
  //   icon: FileText,
  // },
  // {
  //   title: "View Members",
  //   description: "Manage community members",
  //   href: "/dashboard/members",
  //   icon: Users,
  // },
  // {
  //   title: "Event Gallery",
  //   description: "Manage event photos",
  //   href: "/dashboard/gallery",
  //   icon: ImageIcon,
  // },
];

type EventStatus = "upcoming" | "past";

export default function DashboardPage() {

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

    const upcomingEvents = events.filter(
      (event) => event.status === "upcoming"
    );

    const pastEvents = events.filter(
      (event) => event.status === "past"
    );

    const dashboardStats = [
      {
        title: "Upcoming Events",
        value: upcomingEvents.length,
        description: "Events currently scheduled",
        icon: CalendarDays,
      },
      {
        title: "Past Events",
        value: pastEvents.length,
        description: "Events in the archive",
        icon: Clock3,
      },
    ];

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <Header />
      <div className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 lg:px-10">
        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 sm:px-8 lg:px-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300">
              Admin Overview
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Welcome to WiseGen.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Manage your community, events, news, members, and media from
              one place.
            </p>

            <Link
              href="/"
              target="_blank"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              View Public Website
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-3xl font-black text-slate-950">
                        {stat.value}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Icon size={21} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-black text-slate-950">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Latest activity on your platform
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-bold text-amber-600 transition hover:text-amber-700"
              >
                View all
              </button>
            </div>

            {/* Empty State */}
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Clock3 size={25} />
              </div>

              <h3 className="mt-5 font-bold text-slate-800">
                No recent activity
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Activity such as new members, published news, and created
                events will appear here.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="font-black text-slate-950">Quick Actions</h2>

              <p className="mt-1 text-xs text-slate-400">
                Common administrative tasks
              </p>
            </div>

            <div className="p-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group flex items-center gap-4 rounded-xl p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition group-hover:bg-amber-400 group-hover:text-slate-950">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        {action.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {action.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-black text-slate-950">Upcoming Events</h2>

              <p className="mt-1 text-xs text-slate-400">
                Events scheduled on the WiseGen website
              </p>
            </div>

            <Link
              href="/dashboard/events"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
            >
              Manage Events
              <ArrowRight size={14} />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center"
                >
                  {/* Event Image */}
                  <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-28">
                    <img
                      src={`http://localhost:8000${event.image}`}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Event Information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700">
                        {event.category}
                      </span>

                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-green-700">
                        Upcoming
                      </span>
                    </div>

                    <h3 className="mt-2 truncate text-base font-black text-slate-950">
                      {event.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {event.date}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {event.time}
                      </span>
                    </div>
                  </div>

                  {/* View Event */}
                  <Link
                    href={`/dashboard/events/${event.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-slate-950"
                  >
                    View
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[180px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <CalendarDays size={22} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-700">
                No upcoming events
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Create an event to see it here.
              </p>

              <Link
                href="/dashboard/events/create"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                <Plus size={15} />
                Create Event
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}