"use client";

import { ChangeEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Check,
  Filter,
  ImagePlus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

type GalleryImage = {
  id: number;
  src: string;
  eventId: number;
  eventTitle: string;
  eventSlug: string;
  date: string;
};

const initialImages: GalleryImage[] = [
  {
    id: 1,
    src: "/events/gallery/mentoring-1.jpg",
    eventId: 3,
    eventTitle: "WiseGen Mentoring Meeting",
    eventSlug: "wisegen-mentoring-meeting",
    date: "May 18, 2026",
  },
  {
    id: 2,
    src: "/events/gallery/mentoring-2.jpg",
    eventId: 3,
    eventTitle: "WiseGen Mentoring Meeting",
    eventSlug: "wisegen-mentoring-meeting",
    date: "May 18, 2026",
  },
  {
    id: 3,
    src: "/events/gallery/mentoring-3.jpg",
    eventId: 3,
    eventTitle: "WiseGen Mentoring Meeting",
    eventSlug: "wisegen-mentoring-meeting",
    date: "May 18, 2026",
  },
  {
    id: 4,
    src: "/events/gallery/mentoring-4.jpg",
    eventId: 3,
    eventTitle: "WiseGen Mentoring Meeting",
    eventSlug: "wisegen-mentoring-meeting",
    date: "May 18, 2026",
  },
  {
    id: 5,
    src: "/events/gallery/mentoring-5.jpg",
    eventId: 3,
    eventTitle: "WiseGen Mentoring Meeting",
    eventSlug: "wisegen-mentoring-meeting",
    date: "May 18, 2026",
  },
  {
    id: 6,
    src: "/events/gallery/mentoring-6.jpg",
    eventId: 3,
    eventTitle: "WiseGen Mentoring Meeting",
    eventSlug: "wisegen-mentoring-meeting",
    date: "May 18, 2026",
  },
];

const events = [
  {
    id: 3,
    title: "WiseGen Mentoring Meeting",
  },
  {
    id: 1,
    title: "WiseGen Youth Conference",
  },
  {
    id: 2,
    title: "Faith & Purpose Conversation",
  },
];

export default function GalleryPage() {
  const [images, setImages] =
    useState<GalleryImage[]>(initialImages);

  const [search, setSearch] = useState("");

  const [selectedEvent, setSelectedEvent] =
    useState("all");

  const [selectedImages, setSelectedImages] =
    useState<number[]>([]);

  const [previewImage, setPreviewImage] =
    useState<GalleryImage | null>(null);

  const [showUpload, setShowUpload] =
    useState(false);

  const [uploadEvent, setUploadEvent] =
    useState("");

  const [uploadFiles, setUploadFiles] =
    useState<string[]>([]);

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesSearch =
        image.eventTitle
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesEvent =
        selectedEvent === "all" ||
        image.eventId.toString() === selectedEvent;

      return matchesSearch && matchesEvent;
    });
  }, [images, search, selectedEvent]);

  const toggleSelected = (id: number) => {
    setSelectedImages((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const selectAll = () => {
    if (
      selectedImages.length === filteredImages.length &&
      filteredImages.length > 0
    ) {
      setSelectedImages([]);
      return;
    }

    setSelectedImages(
      filteredImages.map((image) => image.id)
    );
  };

  const deleteImage = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) return;

    setImages((current) =>
      current.filter((image) => image.id !== id)
    );

    setSelectedImages((current) =>
      current.filter((imageId) => imageId !== id)
    );

    setPreviewImage(null);
  };

  const deleteSelected = () => {
    if (!selectedImages.length) return;

    const confirmed = window.confirm(
      `Delete ${selectedImages.length} selected ${
        selectedImages.length === 1 ? "photo" : "photos"
      }?`
    );

    if (!confirmed) return;

    setImages((current) =>
      current.filter(
        (image) => !selectedImages.includes(image.id)
      )
    );

    setSelectedImages([]);
  };

  const handleUploadFiles = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setUploadFiles((current) => [
      ...current,
      ...previews,
    ]);
  };

  const removeUploadFile = (index: number) => {
    setUploadFiles((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const uploadImages = () => {
    if (!uploadEvent || uploadFiles.length === 0) {
      return;
    }

    const selectedEventData = events.find(
      (event) => event.id.toString() === uploadEvent
    );

    if (!selectedEventData) return;

    const newImages: GalleryImage[] =
      uploadFiles.map((src, index) => ({
        id: Date.now() + index,
        src,
        eventId: selectedEventData.id,
        eventTitle: selectedEventData.title,
        eventSlug: selectedEventData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        date: "Recently uploaded",
      }));

    setImages((current) => [
      ...newImages,
      ...current,
    ]);

    setUploadFiles([]);
    setUploadEvent("");
    setShowUpload(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Media Management
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                Gallery
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage photos from WiseGen events.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
            >
              <Upload size={17} />
              Upload Photos
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 lg:px-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Photos
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {images.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Camera size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Events With Photos
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {
                    new Set(
                      images.map((image) => image.eventId)
                    ).size
                  }
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
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Selected
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {selectedImages.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Check size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Container */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white">
          {/* Filters */}
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by event..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={selectedEvent}
                  onChange={(e) =>
                    setSelectedEvent(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 lg:w-64"
                >
                  <option value="all">
                    All Events
                  </option>

                  {events.map((event) => (
                    <option
                      key={event.id}
                      value={event.id}
                    >
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selection Toolbar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={selectAll}
                className="text-sm font-bold text-slate-600 transition hover:text-amber-600"
              >
                {selectedImages.length ===
                  filteredImages.length &&
                filteredImages.length > 0
                  ? "Deselect All"
                  : "Select All"}
              </button>

              {selectedImages.length > 0 && (
                <button
                  type="button"
                  onClick={deleteSelected}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={14} />
                  Delete Selected ({selectedImages.length})
                </button>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="p-5 sm:p-6">
            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredImages.map((image) => {
                  const isSelected =
                    selectedImages.includes(image.id);

                  return (
                    <div
                      key={image.id}
                      className={`group relative overflow-hidden rounded-2xl border bg-slate-100 transition ${
                        isSelected
                          ? "border-amber-400 ring-2 ring-amber-400"
                          : "border-slate-200"
                      }`}
                    >
                      {/* Image */}
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage(image)
                        }
                        className="block aspect-square w-full"
                      >
                        <img
                          src={image.src}
                          alt={image.eventTitle}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </button>

                      {/* Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-3 pt-10">
                        <p className="truncate text-xs font-bold text-white">
                          {image.eventTitle}
                        </p>

                        <p className="mt-1 text-[10px] text-white/60">
                          {image.date}
                        </p>
                      </div>

                      {/* Select */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleSelected(image.id)
                        }
                        className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                          isSelected
                            ? "border-amber-400 bg-amber-400 text-slate-950"
                            : "border-white/50 bg-slate-950/40 text-white backdrop-blur hover:bg-slate-950/70"
                        }`}
                      >
                        {isSelected && (
                          <Check size={15} />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          deleteImage(image.id)
                        }
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/60 text-white opacity-0 backdrop-blur transition hover:bg-red-500 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                  <Camera size={27} />
                </div>

                <h2 className="mt-5 text-lg font-black text-slate-800">
                  No photos found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  There are no photos matching your current
                  search or event filter.
                </p>

                <button
                  type="button"
                  onClick={() => setShowUpload(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                >
                  <ImagePlus size={17} />
                  Upload Photos
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-5"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={21} />
          </button>

          <div
            className="flex max-h-[92vh] max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage.src}
              alt={previewImage.eventTitle}
              className="max-h-[75vh] rounded-xl object-contain"
            />

            <div className="mt-4 text-center">
              <p className="font-bold text-white">
                {previewImage.eventTitle}
              </p>

              <p className="mt-1 text-xs text-white/50">
                {previewImage.date}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-black text-slate-950">
                  Upload Event Photos
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Add photos to an event gallery.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowUpload(false);
                  setUploadFiles([]);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Event */}
              <div>
                <label
                  htmlFor="upload-event"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Event
                </label>

                <select
                  id="upload-event"
                  value={uploadEvent}
                  onChange={(e) =>
                    setUploadEvent(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                >
                  <option value="">
                    Select an event
                  </option>

                  {events.map((event) => (
                    <option
                      key={event.id}
                      value={event.id}
                    >
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Area */}
              <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center transition hover:border-amber-400 hover:bg-amber-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                  <ImagePlus size={22} />
                </div>

                <span className="mt-3 text-sm font-bold text-slate-700">
                  Select photos
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  You can select multiple images
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUploadFiles}
                  className="hidden"
                />
              </label>

              {/* Selected Images */}
              {uploadFiles.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-700">
                      Selected Photos
                    </p>

                    <p className="text-xs text-slate-400">
                      {uploadFiles.length} selected
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {uploadFiles.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeUploadFile(index)
                          }
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-red-500"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowUpload(false);
                  setUploadFiles([]);
                }}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={uploadImages}
                disabled={
                  !uploadEvent ||
                  uploadFiles.length === 0
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Upload size={16} />
                Upload {uploadFiles.length > 0
                  ? `${uploadFiles.length} Photos`
                  : "Photos"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}