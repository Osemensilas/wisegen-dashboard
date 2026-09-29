"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ImagePlus,
  MapPin,
  Save,
  Upload,
  X,
} from "lucide-react";

const categories = [
  "Mentoring",
  "Youth Conference",
  "Faith & Growth",
  "Purpose",
  "Community",
  "Other",
];

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Mentoring");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCoverImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCoverImage(imageUrl);
  };

  const handleGalleryImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setGalleryImages((current) => [...current, ...imageUrls]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((current) =>
      current.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const eventData = {
      title,
      category,
      date,
      time,
      location,
      description,
      content,
      registrationUrl,
      coverImage,
      galleryImages,
    };

    console.log("Event data:", eventData);

    // Connect your API here.
    //
    // Example:
    //
    // await fetch("/api/events", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(eventData),
    // });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-6 sm:px-8 lg:px-10">
          <Link
            href="/dashboard/events"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-amber-600"
          >
            <ArrowLeft size={17} />
            Back to Events
          </Link>

          <div>
            <p className="text-sm font-semibold text-amber-600">
              Event Management
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Create Event
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create a new event that will appear on the WiseGen website.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-8 sm:px-8 lg:px-10">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Main Form */}
            <div className="space-y-8">
              {/* Basic Information */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="font-black text-slate-950">
                    Event Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Basic information about the event.
                  </p>
                </div>

                <div className="space-y-5 p-6">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Event title
                    </label>

                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. WiseGen Youth Conference"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                    >
                      {categories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Short description
                    </label>

                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Briefly describe the event..."
                      rows={4}
                      maxLength={300}
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                    />

                    <p className="mt-1.5 text-right text-xs text-slate-400">
                      {description.length}/300
                    </p>
                  </div>

                  {/* Full Content */}
                  <div>
                    <label
                      htmlFor="content"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Event details
                    </label>

                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write everything visitors should know about this event..."
                      rows={10}
                      required
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Include information such as the purpose of the event,
                      activities, speakers, what participants should expect,
                      and any other important information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Date and Location */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="font-black text-slate-950">
                    Date & Location
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Tell visitors when and where the event will take place.
                  </p>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Event date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label
                      htmlFor="time"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Event time
                    </label>

                    <div className="relative">
                      <Clock3
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="location"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Location
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. WiseGen Meeting Venue, Abuja"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Registration */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="font-black text-slate-950">
                    Registration
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Add a registration link if attendees need to register.
                  </p>
                </div>

                <div className="p-6">
                  <label
                    htmlFor="registrationUrl"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Registration URL
                  </label>

                  <input
                    id="registrationUrl"
                    type="url"
                    value={registrationUrl}
                    onChange={(e) => setRegistrationUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Leave this empty if registration is not required.
                  </p>
                </div>
              </section>

              {/* Gallery */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="font-black text-slate-950">
                    Event Gallery
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Upload photos related to the event.
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {galleryImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative aspect-video overflow-hidden rounded-xl bg-slate-100"
                      >
                        <img
                          src={image}
                          alt={`Event gallery ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-red-500"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}

                    <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-amber-400 hover:bg-amber-50/50">
                      <ImagePlus
                        size={25}
                        className="text-slate-400"
                      />

                      <span className="mt-3 text-sm font-bold text-slate-600">
                        Add gallery photos
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        Select multiple images
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryImages}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Cover Image */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="font-black text-slate-950">
                    Cover Image
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Main image for the event.
                  </p>
                </div>

                <div className="p-6">
                  {coverImage ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={coverImage}
                        alt="Event cover preview"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => setCoverImage(null)}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-red-500"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-amber-400 hover:bg-amber-50/50">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                        <Upload size={21} />
                      </div>

                      <span className="mt-4 text-sm font-bold text-slate-600">
                        Upload cover image
                      </span>

                      <span className="mt-1 text-center text-xs leading-5 text-slate-400">
                        JPG, PNG or WebP
                        <br />
                        Recommended: 1200 × 800px
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImage}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </section>

              {/* Publishing */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="font-black text-slate-950">
                    Publishing
                  </h2>
                </div>

                <div className="p-6">
                  <div className="rounded-xl bg-amber-50 p-4">
                    <p className="text-sm font-bold text-amber-900">
                      Ready to publish?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-800/70">
                      Once published, this event can appear on the public
                      WiseGen events page.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={17} />

                    {isSubmitting ? "Saving..." : "Create Event"}
                  </button>

                  <Link
                    href="/dashboard/events"
                    className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </Link>
                </div>
              </section>

              {/* Event Flow */}
              <section className="rounded-2xl bg-slate-950 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Event lifecycle
                </p>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />

                    <p className="text-xs leading-5 text-slate-300">
                      Create the event and publish its details.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />

                    <p className="text-xs leading-5 text-slate-300">
                      The event appears in Upcoming Events.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />

                    <p className="text-xs leading-5 text-slate-300">
                      After the event date, it becomes a Past Event.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />

                    <p className="text-xs leading-5 text-slate-300">
                      Add event photos to the past-event gallery.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}