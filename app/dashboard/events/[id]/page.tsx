"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Clock3,
  Edit3,
  ImagePlus,
  MapPin,
  MoreVertical,
  Trash2,
  Users,
  X,
} from "lucide-react";

type Event = {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  content: string;
  status: "upcoming" | "past";
  attendees: number;
  coverImage: string;
  gallery: string[];
  registrationUrl?: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "WiseGen Youth Conference",
    slug: "wisegen-youth-conference",
    category: "Youth Conference",
    date: "October 24, 2026",
    time: "10:00 AM",
    location: "Venue to be announced",
    description:
      "A special gathering designed to help young people grow in faith, wisdom, character, and purpose.",
    content:
      "The WiseGen Youth Conference is a special gathering created to inspire, equip, and encourage teenagers and young adults. Participants will have opportunities to learn, ask questions, connect with others, and explore what it means to live with purpose and faith.",
    status: "upcoming",
    attendees: 0,
    coverImage: "/events/youth-conference.jpg",
    gallery: [],
    registrationUrl: "",
  },
  {
    id: 2,
    title: "Faith & Purpose Conversation",
    slug: "faith-purpose-conversation",
    category: "Faith & Growth",
    date: "November 14, 2026",
    time: "4:00 PM",
    location: "Venue to be announced",
    description:
      "An interactive conversation about faith, identity, purpose, relationships, and navigating life as a young person.",
    content:
      "This conversation will provide a safe and welcoming environment where young people can explore important questions about faith, identity, relationships, purpose, and the future.",
    status: "upcoming",
    attendees: 0,
    coverImage: "/events/faith-purpose.jpg",
    gallery: [],
    registrationUrl: "",
  },
  {
    id: 3,
    title: "WiseGen Mentoring Meeting",
    slug: "wisegen-mentoring-meeting",
    category: "Mentoring",
    date: "May 18, 2026",
    time: "4:00 PM",
    location: "WiseGen Meeting Venue",
    description:
      "A meaningful time of fellowship, biblical teaching, mentoring, conversations, and practical guidance.",
    content:
      "The WiseGen Mentoring Meeting brought young people together for fellowship, biblical teaching, prayer, meaningful conversations, and practical guidance. Participants had the opportunity to connect with mentors and discuss issues that affect their everyday lives.",
    status: "past",
    attendees: 28,
    coverImage: "/events/mentoring-meeting.jpg",
    gallery: [
      "/events/gallery/mentoring-1.jpg",
      "/events/gallery/mentoring-2.jpg",
      "/events/gallery/mentoring-3.jpg",
      "/events/gallery/mentoring-4.jpg",
      "/events/gallery/mentoring-5.jpg",
      "/events/gallery/mentoring-6.jpg",
    ],
    registrationUrl: "",
  },
];

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [gallery, setGallery] = useState<string[]>([]);

  /*
   * For now this uses dummy data.
   * Replace this with an API request using params.id.
   */
  const event = useMemo(() => {
    return events.find((item) => item.id === Number(params.id));
  }, [params.id]);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const allGalleryImages = gallery.length > 0 ? gallery : event?.gallery ?? [];

  const handleGalleryUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setGallery((current) => [...current, ...imageUrls]);
  };

  const removeGalleryImage = (image: string) => {
    setGallery((current) => current.filter((item) => item !== image));
  };

  if (!event) {
    return (
      <main className="min-h-screen bg-[#f8f6f0]">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <CalendarDays size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-950">
            Event not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The event you are looking for does not exist or may have been
            removed.
          </p>

          <Link
            href="/dashboard/events"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/dashboard/events"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-amber-600"
              >
                <ArrowLeft size={17} />
                Back to Events
              </Link>

              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  {event.title}
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                    event.status === "upcoming"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Manage event information and photos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/events/${event.slug}`}
                target="_blank"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                View Public Event
              </Link>

              <Link
                href={`/dashboard/events/${event.id}/edit`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
              >
                <Edit3 size={16} />
                Edit
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Cover Image */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/8] bg-slate-100">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-slate-950/80 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-slate-950">
                  {event.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {event.description}
                </p>
              </div>
            </section>

            {/* Event Details */}
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="font-black text-slate-950">
                  Event Details
                </h2>
              </div>

              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <CalendarDays
                      size={19}
                      className="text-amber-500"
                    />

                    <p className="mt-3 text-xs font-semibold text-slate-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {event.date}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <Clock3 size={19} className="text-amber-500" />

                    <p className="mt-3 text-xs font-semibold text-slate-400">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {event.time}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <MapPin size={19} className="text-amber-500" />

                    <p className="mt-3 text-xs font-semibold text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-base font-black text-slate-950">
                    About this event
                  </h3>

                  <div className="mt-4 whitespace-pre-line text-sm leading-8 text-slate-600">
                    {event.content}
                  </div>
                </div>

                {event.registrationUrl && (
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                    >
                      Registration Link
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Gallery */}
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-black text-slate-950">
                    Event Gallery
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {allGalleryImages.length}{" "}
                    {allGalleryImages.length === 1 ? "photo" : "photos"}
                  </p>
                </div>

                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-amber-400 hover:text-slate-950">
                  <ImagePlus size={16} />
                  Add Photos

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-6">
                {allGalleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {allGalleryImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className="h-full w-full"
                        >
                          <img
                            src={image}
                            alt={`${event.title} gallery ${index + 1}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(image)}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-white opacity-0 transition hover:bg-red-500 group-hover:opacity-100"
                          aria-label="Remove photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                      <Camera size={24} />
                    </div>

                    <h3 className="mt-4 font-bold text-slate-700">
                      No event photos yet
                    </h3>

                    <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">
                      Add photos after the event so visitors can see moments
                      from the WiseGen community.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Event Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="font-black text-slate-950">
                  Event Summary
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-slate-500">Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      event.status === "upcoming"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-slate-500">Category</span>

                  <span className="text-sm font-bold text-slate-800">
                    {event.category}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-slate-500">Attendees</span>

                  <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <Users size={15} />
                    {event.attendees}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-slate-500">Photos</span>

                  <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <Camera size={15} />
                    {allGalleryImages.length}
                  </span>
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-black text-slate-950">
                Event Actions
              </h2>

              <div className="mt-5 space-y-3">
                <Link
                  href={`/dashboard/events/${event.id}/edit`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                >
                  <Edit3 size={16} />
                  Edit Event
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete Event
                </button>
              </div>
            </section>

            {/* Public URL */}
            <section className="rounded-2xl bg-slate-950 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Public Event URL
              </p>

              <p className="mt-3 break-all text-xs leading-6 text-slate-400">
                /events/{event.slug}
              </p>

              <Link
                href={`/events/${event.slug}`}
                target="_blank"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-400 transition hover:text-amber-300"
              >
                Open public page
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </section>
          </aside>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-5"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={21} />
          </button>

          <img
            src={selectedImage}
            alt="Event preview"
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              Delete this event?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will permanently remove{" "}
              <span className="font-bold text-slate-700">
                {event.title}
              </span>{" "}
              and its associated event information.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);

                  // Connect your delete API here.
                  console.log("Delete event:", event.id);
                }}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}