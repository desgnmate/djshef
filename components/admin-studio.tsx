"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  ArrowClockwise,
  ArrowUpRight,
  CalendarBlank,
  Check,
  Eye,
  EyeSlash,
  GridFour,
  Images,
  LinkSimple,
  MusicNote,
  PencilSimple,
  Plus,
  SignOut,
  SpinnerGap,
  Trash,
  UploadSimple,
  X,
} from "@phosphor-icons/react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Section = "overview" | "gallery" | "events" | "mixes";
type Resource = "gallery" | "event" | "release";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  code: string;
  published: boolean;
  sort_order: number;
};

type EventItem = {
  id: string;
  year: string;
  city: string;
  venue: string;
  note: string;
  href: string;
  published: boolean;
  sort_order: number;
};

type ReleaseItem = {
  id: string;
  year: string;
  title: string;
  note: string;
  href: string;
  preview_url?: string | null;
  cover_image?: string | null;
  published: boolean;
  sort_order: number;
};

type CmsContent = {
  settings: Record<string, unknown>;
  mixes: ReleaseItem[];
  appearances: EventItem[];
  gallery: GalleryItem[];
  socials: Array<Record<string, unknown>>;
  pressKit: Record<string, unknown>;
};

type GalleryDraft = { src: string; alt: string; code: string; published: boolean };
type EventDraft = { year: string; city: string; venue: string; note: string; href: string; published: boolean };
type ReleaseDraft = { year: string; title: string; note: string; href: string; previewUrl: string; coverImage: string; published: boolean };
type Notice = { tone: "success" | "error" | "muted"; text: string } | null;

const blankGallery: GalleryDraft = { src: "", alt: "", code: "SHEF / ARCHIVE", published: true };
const blankEvent: EventDraft = { year: new Date().getFullYear().toString(), city: "", venue: "", note: "", href: "", published: true };
const blankRelease: ReleaseDraft = { year: new Date().getFullYear().toString(), title: "", note: "", href: "", previewUrl: "", coverImage: "", published: true };

async function fetchCmsContent() {
  const response = await fetch("/api/admin/content", { cache: "no-store" });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error ?? "Could not load CMS content.");
  return body as CmsContent;
}

function displayDate(value: string) {
  if (!value) return "No date";
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.valueOf()) && value.includes("-")) {
    return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(parsed);
  }
  return value;
}

function visibilityLabel(published: boolean) {
  return published ? "Live" : "Draft";
}

export function AdminStudio({ userEmail }: { userEmail: string }) {
  const [content, setContent] = useState<CmsContent | null>(null);
  const [active, setActive] = useState<Section>("overview");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<Resource | "upload" | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [composer, setComposer] = useState<Resource | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [galleryDraft, setGalleryDraft] = useState<GalleryDraft>(blankGallery);
  const [eventDraft, setEventDraft] = useState<EventDraft>(blankEvent);
  const [releaseDraft, setReleaseDraft] = useState<ReleaseDraft>(blankRelease);

  async function load(options: { silent?: boolean } = {}) {
    if (!options.silent) setLoading(true);
    try {
      const next = await fetchCmsContent();
      setContent(next);
      if (!options.silent) setNotice(null);
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Could not load content." });
    } finally {
      if (!options.silent) setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!composer) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setComposer(null);
        setEditingId(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [composer]);

  function closeComposer() {
    setComposer(null);
    setEditingId(null);
  }

  function startCreate(resource: Resource) {
    setActive(resource === "event" ? "events" : resource === "release" ? "mixes" : "gallery");
    setComposer(resource);
    setEditingId(null);
    if (resource === "gallery") setGalleryDraft({ ...blankGallery });
    if (resource === "event") setEventDraft({ ...blankEvent });
    if (resource === "release") setReleaseDraft({ ...blankRelease });
  }

  function startEditGallery(item: GalleryItem) {
    setActive("gallery");
    setComposer("gallery");
    setEditingId(item.id);
    setGalleryDraft({ src: item.src, alt: item.alt, code: item.code, published: item.published });
  }

  function startEditEvent(item: EventItem) {
    setActive("events");
    setComposer("event");
    setEditingId(item.id);
    setEventDraft({ year: item.year, city: item.city, venue: item.venue, note: item.note, href: item.href, published: item.published });
  }

  function startEditRelease(item: ReleaseItem) {
    setActive("mixes");
    setComposer("release");
    setEditingId(item.id);
    setReleaseDraft({ year: item.year, title: item.title, note: item.note, href: item.href, previewUrl: item.preview_url ?? "", coverImage: item.cover_image ?? "", published: item.published });
  }

  async function saveResource(resource: Resource, data: Record<string, unknown>) {
    setBusy(resource);
    setNotice({ tone: "muted", text: editingId ? "Updating content…" : "Publishing content…" });
    try {
      const response = await fetch("/api/admin/content", {
        method: editingId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resource, id: editingId ?? undefined, data }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? "Could not save this item.");
      const next = await fetchCmsContent();
      setContent(next);
      closeComposer();
      setNotice({ tone: "success", text: editingId ? "Changes saved to Supabase." : "New item published." });
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Could not save this item." });
    } finally {
      setBusy(null);
    }
  }

  async function removeResource(resource: Resource, id: string, label: string) {
    if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;
    setBusy(resource);
    setNotice({ tone: "muted", text: "Removing item…" });
    try {
      const response = await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resource, id }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? "Could not delete this item.");
      setContent(await fetchCmsContent());
      setNotice({ tone: "success", text: "Item deleted." });
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Could not delete this item." });
    } finally {
      setBusy(null);
    }
  }

  async function uploadGalleryImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy("upload");
    setNotice({ tone: "muted", text: "Uploading image to Supabase Storage…" });
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? "Could not upload this image.");
      setGalleryDraft((current) => ({ ...current, src: body.url }));
      setNotice({ tone: "success", text: "Image uploaded. Add a caption, then publish it." });
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Could not upload this image." });
    } finally {
      setBusy(null);
      event.target.value = "";
    }
  }

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    window.location.reload();
  }

  const counts = content ? {
    gallery: content.gallery.length,
    galleryLive: content.gallery.filter((item) => item.published).length,
    events: content.appearances.length,
    eventsLive: content.appearances.filter((item) => item.published).length,
    mixes: content.mixes.length,
    mixesLive: content.mixes.filter((item) => item.published).length,
  } : { gallery: 0, galleryLive: 0, events: 0, eventsLive: 0, mixes: 0, mixesLive: 0 };

  return (
    <div className="admin-shell">
      <header className="admin-app-header">
        <div className="admin-app-brand"><span className="admin-app-mark">S</span><div><span className="eyebrow">SHEF / website admin</span><strong>Content management</strong></div></div>
        <div className="admin-app-actions"><a href="/" target="_blank" rel="noreferrer">Open site <ArrowUpRight size={16} weight="bold" /></a><span className="admin-account">{userEmail}</span><button type="button" onClick={() => void signOut()}><SignOut size={16} /> Sign out</button></div>
      </header>

      <div className="admin-app-body">
        <aside className="admin-sidebar" aria-label="CMS sections">
          <div className="admin-side-label">Workspace</div>
          <nav>
            <button className={active === "overview" ? "is-active" : ""} type="button" onClick={() => { closeComposer(); setActive("overview"); }}><GridFour size={18} /> Overview</button>
            <button className={active === "gallery" ? "is-active" : ""} type="button" onClick={() => { closeComposer(); setActive("gallery"); }}><Images size={18} /> Gallery <span>{counts.gallery}</span></button>
            <button className={active === "events" ? "is-active" : ""} type="button" onClick={() => { closeComposer(); setActive("events"); }}><CalendarBlank size={18} /> Events <span>{counts.events}</span></button>
            <button className={active === "mixes" ? "is-active" : ""} type="button" onClick={() => { closeComposer(); setActive("mixes"); }}><MusicNote size={18} /> Mixes <span>{counts.mixes}</span></button>
          </nav>
          <div className="admin-side-foot"><span className="admin-status-dot" /> Connected to Supabase</div>
        </aside>

        <main className="admin-main">
          {notice && <div className={`admin-notice is-${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"}><span>{notice.tone === "success" ? <Check size={16} weight="bold" /> : notice.tone === "error" ? <X size={16} weight="bold" /> : <SpinnerGap size={16} className="admin-spin" />}</span>{notice.text}</div>}
          {loading && !content ? <LoadingState /> : content ? (
            <>
              {active === "overview" && <Overview content={content} counts={counts} onCreate={startCreate} onNavigate={setActive} />}
              {active === "gallery" && <GalleryManager content={content} draft={galleryDraft} setDraft={setGalleryDraft} composer={composer === "gallery"} editingId={editingId} busy={busy} onCreate={() => startCreate("gallery")} onEdit={startEditGallery} onDelete={(id, label) => void removeResource("gallery", id, label)} onClose={closeComposer} onSave={(event) => { event.preventDefault(); void saveResource("gallery", galleryDraft); }} onUpload={uploadGalleryImage} />}
              {active === "events" && <EventsManager content={content} draft={eventDraft} setDraft={setEventDraft} composer={composer === "event"} editingId={editingId} busy={busy} onCreate={() => startCreate("event")} onEdit={startEditEvent} onDelete={(id, label) => void removeResource("event", id, label)} onClose={closeComposer} onSave={(event) => { event.preventDefault(); void saveResource("event", eventDraft); }} />}
              {active === "mixes" && <MixesManager content={content} draft={releaseDraft} setDraft={setReleaseDraft} composer={composer === "release"} editingId={editingId} busy={busy} onCreate={() => startCreate("release")} onEdit={startEditRelease} onDelete={(id, label) => void removeResource("release", id, label)} onClose={closeComposer} onSave={(event) => { event.preventDefault(); void saveResource("release", releaseDraft); }} />}
            </>
          ) : <ErrorState onRetry={() => void load()} />}
        </main>
      </div>
    </div>
  );
}

function LoadingState() {
  return <div className="admin-loading"><SpinnerGap size={24} className="admin-spin" /><span>Loading content…</span></div>;
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return <section className="admin-empty admin-error-state"><X size={26} /><h2>We couldn’t load your content.</h2><p>Check the connection, then try again.</p><button className="admin-button admin-button-dark" type="button" onClick={onRetry}><ArrowClockwise size={16} /> Try again</button></section>;
}

function Overview({ content, counts, onCreate, onNavigate }: { content: CmsContent; counts: { gallery: number; galleryLive: number; events: number; eventsLive: number; mixes: number; mixesLive: number }; onCreate: (resource: Resource) => void; onNavigate: (section: Section) => void }) {
  return <>
    <div className="admin-page-intro"><div><span className="eyebrow">Workspace / Overview</span><h1>Content overview</h1><p>Manage the gallery, event listings, and mixes published on the SHEF website.</p></div><button className="admin-button admin-button-dark" type="button" onClick={() => onCreate("event")}><Plus size={18} weight="bold" /> New event</button></div>
    <div className="admin-stat-grid">
      <StatCard icon={<Images size={20} />} label="Gallery" value={counts.gallery} detail={`${counts.galleryLive} live`} onClick={() => onNavigate("gallery")} />
      <StatCard icon={<CalendarBlank size={20} />} label="Events" value={counts.events} detail={`${counts.eventsLive} live`} onClick={() => onNavigate("events")} />
      <StatCard icon={<MusicNote size={20} />} label="Mixes" value={counts.mixes} detail={`${counts.mixesLive} live`} onClick={() => onNavigate("mixes")} />
    </div>
    <section className="admin-overview-grid">
      <div className="admin-card admin-quick-card"><div className="admin-card-heading"><div><span className="eyebrow">Quick actions</span><h2>Create something new</h2></div></div><div className="admin-quick-actions"><button type="button" onClick={() => onCreate("gallery")}><Images size={22} /><span><strong>Add gallery image</strong><small>Upload a new visual to the archive</small></span><Plus size={18} /></button><button type="button" onClick={() => onCreate("event")}><CalendarBlank size={22} /><span><strong>Create event</strong><small>Add a show, tour stop, or radio feature</small></span><Plus size={18} /></button><button type="button" onClick={() => onCreate("release")}><MusicNote size={22} /><span><strong>Add mix</strong><small>Connect a set and optional preview</small></span><Plus size={18} /></button></div></div>
      <div className="admin-card admin-recent-card"><div className="admin-card-heading"><div><span className="eyebrow">Recent activity</span><h2>Latest events</h2></div><button className="admin-text-button" type="button" onClick={() => onNavigate("events")}>View all <ArrowUpRight size={15} /></button></div>{content.appearances.length ? <div className="admin-mini-list">{content.appearances.slice(0, 3).map((item) => <div className="admin-mini-row" key={item.id}><span>{displayDate(item.year)}</span><strong>{item.city}</strong><small>{item.venue}</small><StatusBadge published={item.published} /></div>)}</div> : <p className="admin-muted">No events yet. Create the first one from the Events section.</p>}</div>
    </section>
  </>;
}

function StatCard({ icon, label, value, detail, onClick }: { icon: React.ReactNode; label: string; value: number; detail: string; onClick: () => void }) {
  return <button className="admin-stat-card" type="button" onClick={onClick}><span className="admin-stat-icon">{icon}</span><span className="admin-stat-label">{label}</span><strong>{value.toString().padStart(2, "0")}</strong><small>{detail} <ArrowUpRight size={13} /></small></button>;
}

function SectionHeader({ eyebrow, title, description, actionLabel, onAction }: { eyebrow: string; title: string; description: string; actionLabel: string; onAction: () => void }) {
  return <div className="admin-section-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><button className="admin-button admin-button-dark" type="button" onClick={onAction}><Plus size={18} weight="bold" /> {actionLabel}</button></div>;
}

function StatusBadge({ published }: { published: boolean }) {
  return <span className={`admin-badge ${published ? "is-live" : "is-draft"}`}>{published ? <Eye size={13} /> : <EyeSlash size={13} />}{visibilityLabel(published)}</span>;
}

function GalleryManager({ content, draft, setDraft, composer, editingId, busy, onCreate, onEdit, onDelete, onClose, onSave, onUpload }: { content: CmsContent; draft: GalleryDraft; setDraft: React.Dispatch<React.SetStateAction<GalleryDraft>>; composer: boolean; editingId: string | null; busy: Resource | "upload" | null; onCreate: () => void; onEdit: (item: GalleryItem) => void; onDelete: (id: string, label: string) => void; onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <>
    <SectionHeader eyebrow="Content / Gallery" title="Gallery" description="Upload images, add accessible captions, and choose what is visible on the public site." actionLabel="Add image" onAction={onCreate} />
    {composer && <ModalFrame onClose={onClose}><GalleryForm draft={draft} setDraft={setDraft} editingId={editingId} busy={busy} onClose={onClose} onSave={onSave} onUpload={onUpload} /></ModalFrame>}
    {content.gallery.length ? <div className="admin-gallery-grid">{content.gallery.map((item) => <article className="admin-gallery-card" key={item.id}><div className="admin-gallery-image" style={{ backgroundImage: `url(${JSON.stringify(item.src)})` }}><StatusBadge published={item.published} /><span>{item.code}</span></div><div className="admin-record-meta"><div><strong>{item.alt}</strong><small>{item.src}</small></div><div className="admin-record-actions"><button type="button" aria-label={`Edit ${item.alt}`} onClick={() => onEdit(item)}><PencilSimple size={16} /></button><button type="button" aria-label={`Delete ${item.alt}`} onClick={() => onDelete(item.id, item.alt)}><Trash size={16} /></button></div></div></article>)}</div> : <EmptyCollection icon={<Images size={28} />} title="The archive is empty." description="Add the first image to start building the visual diary." actionLabel="Add gallery image" onAction={onCreate} />}
  </>;
}

function GalleryForm({ draft, setDraft, editingId, busy, onClose, onSave, onUpload }: { draft: GalleryDraft; setDraft: React.Dispatch<React.SetStateAction<GalleryDraft>>; editingId: string | null; busy: Resource | "upload" | null; onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <form className="admin-editor-card" onSubmit={onSave}><div className="admin-form-heading"><div><span className="eyebrow">{editingId ? "Edit gallery image" : "New gallery image"}</span><h2>{editingId ? "Update image" : "Add gallery image"}</h2></div><button className="admin-close-button" type="button" aria-label="Close form" onClick={onClose}><X size={20} /></button></div><div className="admin-form-layout"><div className="admin-form-preview" style={{ backgroundImage: draft.src ? `url(${JSON.stringify(draft.src)})` : undefined }}><div>{draft.src ? "Preview" : <><Images size={26} /><span>Image preview</span></>}</div></div><div className="admin-form-fields"><div className="admin-field-row"><label className="admin-field admin-field-wide"><span>Image URL or Supabase path</span><input value={draft.src} onChange={(event) => setDraft((current) => ({ ...current, src: event.target.value }))} placeholder="https://… or /images/photo.jpg" required /></label><label className="admin-upload-button"><UploadSimple size={17} /><span>Upload image</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onUpload} disabled={busy === "upload"} /></label></div><label className="admin-field"><span>Alt text</span><input value={draft.alt} onChange={(event) => setDraft((current) => ({ ...current, alt: event.target.value }))} placeholder="Describe the image" required /></label><label className="admin-field"><span>Archive label</span><input value={draft.code} onChange={(event) => setDraft((current) => ({ ...current, code: event.target.value }))} placeholder="LIVE / MELBOURNE" /></label><PublishToggle published={draft.published} onChange={(published) => setDraft((current) => ({ ...current, published }))} /><div className="admin-form-actions"><button className="admin-button admin-button-dark" type="submit" disabled={busy === "gallery" || busy === "upload"}>{busy === "gallery" ? <SpinnerGap size={17} className="admin-spin" /> : <Check size={17} />} {editingId ? "Save changes" : "Publish image"}</button><button className="admin-button admin-button-light" type="button" onClick={onClose}>Cancel</button></div></div></div></form>;
}

function EventsManager({ content, draft, setDraft, composer, editingId, busy, onCreate, onEdit, onDelete, onClose, onSave }: { content: CmsContent; draft: EventDraft; setDraft: React.Dispatch<React.SetStateAction<EventDraft>>; composer: boolean; editingId: string | null; busy: Resource | "upload" | null; onCreate: () => void; onEdit: (item: EventItem) => void; onDelete: (id: string, label: string) => void; onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void }) {
  return <>
    <SectionHeader eyebrow="Content / Events" title="Events" description="Create and manage show listings with dates, locations, notes, and ticket links." actionLabel="New event" onAction={onCreate} />
    {composer && <ModalFrame onClose={onClose}><EventForm draft={draft} setDraft={setDraft} editingId={editingId} busy={busy} onClose={onClose} onSave={onSave} /></ModalFrame>}
    {content.appearances.length ? <div className="admin-list"><div className="admin-list-head" aria-hidden="true"><span>Date</span><span>Event</span><span>Link</span><span>Status</span><span /></div>{content.appearances.map((item) => <article className="admin-list-row" key={item.id}><div className="admin-list-date"><span>{displayDate(item.year)}</span></div><div className="admin-list-main"><strong>{item.city}</strong><span>{item.venue}</span><small>{item.note || "No event details added"}</small></div><div className="admin-list-link">{item.href ? <a href={item.href} target="_blank" rel="noreferrer"><LinkSimple size={15} /> Open link</a> : <span>No link</span>}</div><StatusBadge published={item.published} /><div className="admin-record-actions"><button type="button" aria-label={`Edit ${item.city}`} onClick={() => onEdit(item)}><PencilSimple size={16} /></button><button type="button" aria-label={`Delete ${item.city}`} onClick={() => onDelete(item.id, item.city)}><Trash size={16} /></button></div></article>)}</div> : <EmptyCollection icon={<CalendarBlank size={28} />} title="No events yet." description="Create an upcoming booking, radio feature, or past highlight." actionLabel="New event" onAction={onCreate} />}
  </>;
}

function EventForm({ draft, setDraft, editingId, busy, onClose, onSave }: { draft: EventDraft; setDraft: React.Dispatch<React.SetStateAction<EventDraft>>; editingId: string | null; busy: Resource | "upload" | null; onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form className="admin-editor-card" onSubmit={onSave}><div className="admin-form-heading"><div><span className="eyebrow">{editingId ? "Edit event" : "New event"}</span><h2>{editingId ? "Update event" : "Create an event"}</h2></div><button className="admin-close-button" type="button" aria-label="Close form" onClick={onClose}><X size={20} /></button></div><div className="admin-field-grid"><label className="admin-field"><span>Date or year</span><input value={draft.year} onChange={(event) => setDraft((current) => ({ ...current, year: event.target.value }))} placeholder="2026 or 2026-11-14" required /></label><label className="admin-field"><span>City / location</span><input value={draft.city} onChange={(event) => setDraft((current) => ({ ...current, city: event.target.value }))} placeholder="Naarm / Melbourne" required /></label><label className="admin-field"><span>Venue or event name</span><input value={draft.venue} onChange={(event) => setDraft((current) => ({ ...current, venue: event.target.value }))} placeholder="STEMS Official" /></label><label className="admin-field"><span>Event link</span><input type="url" value={draft.href} onChange={(event) => setDraft((current) => ({ ...current, href: event.target.value }))} placeholder="https://instagram.com/…" /></label><label className="admin-field admin-field-wide"><span>Details / set note</span><textarea value={draft.note} onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))} placeholder="Opening set · tickets · lineup details" rows={3} /></label></div><PublishToggle published={draft.published} onChange={(published) => setDraft((current) => ({ ...current, published }))} /><div className="admin-form-actions"><button className="admin-button admin-button-dark" type="submit" disabled={busy === "event"}>{busy === "event" ? <SpinnerGap size={17} className="admin-spin" /> : <Check size={17} />} {editingId ? "Save changes" : "Publish event"}</button><button className="admin-button admin-button-light" type="button" onClick={onClose}>Cancel</button></div></form>;
}

function MixesManager({ content, draft, setDraft, composer, editingId, busy, onCreate, onEdit, onDelete, onClose, onSave }: { content: CmsContent; draft: ReleaseDraft; setDraft: React.Dispatch<React.SetStateAction<ReleaseDraft>>; composer: boolean; editingId: string | null; busy: Resource | "upload" | null; onCreate: () => void; onEdit: (item: ReleaseItem) => void; onDelete: (id: string, label: string) => void; onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void }) {
  return <>
    <SectionHeader eyebrow="Content / Mixes" title="Mixes" description="Manage SoundCloud releases and the optional audio previews used by the hero player." actionLabel="Add mix" onAction={onCreate} />
    {composer && <ModalFrame onClose={onClose}><ReleaseForm draft={draft} setDraft={setDraft} editingId={editingId} busy={busy} onClose={onClose} onSave={onSave} /></ModalFrame>}
    {content.mixes.length ? <div className="admin-list"><div className="admin-list-head admin-release-head" aria-hidden="true"><span /><span>Mix</span><span>Link</span><span>Status</span><span /></div>{content.mixes.map((item) => <article className="admin-list-row admin-release-row" key={item.id}><div className="admin-release-art" style={{ backgroundImage: item.cover_image ? `url(${JSON.stringify(item.cover_image)})` : undefined }}><MusicNote size={20} /></div><div className="admin-list-main"><strong>{item.title}</strong><span>{item.year} · {item.note}</span><small>{item.preview_url ? "Hero preview connected" : "No hero preview"}</small></div><div className="admin-list-link">{item.href ? <a href={item.href} target="_blank" rel="noreferrer"><LinkSimple size={15} /> SoundCloud</a> : <span>No link</span>}</div><StatusBadge published={item.published} /><div className="admin-record-actions"><button type="button" aria-label={`Edit ${item.title}`} onClick={() => onEdit(item)}><PencilSimple size={16} /></button><button type="button" aria-label={`Delete ${item.title}`} onClick={() => onDelete(item.id, item.title)}><Trash size={16} /></button></div></article>)}</div> : <EmptyCollection icon={<MusicNote size={28} />} title="No mixes yet." description="Add a SoundCloud set and connect an optional preview for the hero player." actionLabel="Add mix" onAction={onCreate} />}
  </>;
}

function ReleaseForm({ draft, setDraft, editingId, busy, onClose, onSave }: { draft: ReleaseDraft; setDraft: React.Dispatch<React.SetStateAction<ReleaseDraft>>; editingId: string | null; busy: Resource | "upload" | null; onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form className="admin-editor-card" onSubmit={onSave}><div className="admin-form-heading"><div><span className="eyebrow">{editingId ? "Edit mix" : "New mix"}</span><h2>{editingId ? "Update mix" : "Add a mix"}</h2></div><button className="admin-close-button" type="button" aria-label="Close form" onClick={onClose}><X size={20} /></button></div><div className="admin-field-grid"><label className="admin-field"><span>Year</span><input value={draft.year} onChange={(event) => setDraft((current) => ({ ...current, year: event.target.value }))} placeholder="2026" required /></label><label className="admin-field"><span>Title</span><input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Psytrance Freestyle Mix" required /></label><label className="admin-field admin-field-wide"><span>SoundCloud link</span><input type="url" value={draft.href} onChange={(event) => setDraft((current) => ({ ...current, href: event.target.value }))} placeholder="https://soundcloud.com/…" required /></label><label className="admin-field"><span>Short note</span><input value={draft.note} onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))} placeholder="Psytrance · freestyle session" /></label><label className="admin-field"><span>Hero preview URL</span><input value={draft.previewUrl} onChange={(event) => setDraft((current) => ({ ...current, previewUrl: event.target.value }))} placeholder="/audio/preview.mp3" /></label><label className="admin-field"><span>Cover image URL</span><input value={draft.coverImage} onChange={(event) => setDraft((current) => ({ ...current, coverImage: event.target.value }))} placeholder="/images/cover.jpg" /></label></div><PublishToggle published={draft.published} onChange={(published) => setDraft((current) => ({ ...current, published }))} /><div className="admin-form-actions"><button className="admin-button admin-button-dark" type="submit" disabled={busy === "release"}>{busy === "release" ? <SpinnerGap size={17} className="admin-spin" /> : <Check size={17} />} {editingId ? "Save changes" : "Publish mix"}</button><button className="admin-button admin-button-light" type="button" onClick={onClose}>Cancel</button></div></form>;
}

function ModalFrame({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="admin-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>{children}</div></div>;
}

function PublishToggle({ published, onChange }: { published: boolean; onChange: (published: boolean) => void }) {
  return <label className="admin-publish-toggle"><input type="checkbox" checked={published} onChange={(event) => onChange(event.target.checked)} /><span className="admin-toggle-track"><span /></span><span><strong>{published ? "Published" : "Draft"}</strong><small>{published ? "Visible on the public site" : "Hidden until you publish"}</small></span></label>;
}

function EmptyCollection({ icon, title, description, actionLabel, onAction }: { icon: React.ReactNode; title: string; description: string; actionLabel: string; onAction: () => void }) {
  return <section className="admin-empty"><span className="admin-empty-icon">{icon}</span><h2>{title}</h2><p>{description}</p><button className="admin-button admin-button-light" type="button" onClick={onAction}><Plus size={17} /> {actionLabel}</button></section>;
}
