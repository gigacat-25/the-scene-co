"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    PlusCircle,
    Trash2,
    Loader2,
    LogOut,
    X,
    Check,
    ImageIcon,
    Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface Event {
    id: number;
    title: string;
    category: string;
    date: string;
    description: string;
    image_url: string;
    gallery_urls: string;
    likes: number;
    created_at: string;
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    order_index: number;
}

interface Service {
    id: number;
    title: string;
    description: string;
    image_url: string;
    icon_name: string;
    features: string;
    eco_highlights: string;
    order_index: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);
    const teamFileRef = useRef<HTMLInputElement>(null);
    const serviceFileRef = useRef<HTMLInputElement>(null);

    // -- Events State --
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [uploadedPreview, setUploadedPreview] = useState("");
    const [localNote, setLocalNote] = useState("");

    const [form, setForm] = useState({
        title: "",
        category: "",
        date: "",
        description: "",
        gallery_urls: "",
    });

    // -- Team State --
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loadingTeam, setLoadingTeam] = useState(true);
    const [showTeamForm, setShowTeamForm] = useState(false);
    const [submittingTeam, setSubmittingTeam] = useState(false);
    const [deletingTeamId, setDeletingTeamId] = useState<number | null>(null);
    const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
    const [uploadingTeamFile, setUploadingTeamFile] = useState(false);
    const [uploadedTeamUrl, setUploadedTeamUrl] = useState("");
    const [uploadedTeamPreview, setUploadedTeamPreview] = useState("");

    const [teamForm, setTeamForm] = useState({
        name: "",
        role: "",
        description: "",
    });

    // -- Services State --
    const [services, setServices] = useState<Service[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [submittingService, setSubmittingService] = useState(false);
    const [deletingServiceId, setDeletingServiceId] = useState<number | null>(null);
    const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
    const [uploadingServiceFile, setUploadingServiceFile] = useState(false);
    const [uploadedServiceUrl, setUploadedServiceUrl] = useState("");
    const [uploadedServicePreview, setUploadedServicePreview] = useState("");

    const [serviceForm, setServiceForm] = useState({
        title: "",
        description: "",
        icon_name: "Briefcase",
        features: "",          // newline separated
        eco_highlights: ""     // newline separated
    });

    async function fetchEvents() {
        setLoading(true);
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            if (data._local && !localNote) setLocalNote(data.note ?? "");
            setEvents(data.events || []);
        } catch {
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }

    async function fetchTeam() {
        setLoadingTeam(true);
        try {
            const res = await fetch("/api/team");
            const data = await res.json();
            setTeam(data.team || []);
        } catch {
            setTeam([]);
        } finally {
            setLoadingTeam(false);
        }
    }

    async function fetchServices() {
        setLoadingServices(true);
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data.services || []);
        } catch {
            setServices([]);
        } finally {
            setLoadingServices(false);
        }
    }

    useEffect(() => {
        fetchEvents();
        fetchTeam();
        fetchServices();
    }, []);

    // ── Upload file to R2 ──────────────────────────────────────────────────────
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Local preview
        setUploadedPreview(URL.createObjectURL(file));
        setUploadingFile(true);
        setUploadedUrl("");

        const fd = new FormData();
        fd.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();

            if (res.ok) {
                setUploadedUrl(data.url);
            } else {
                alert(data.error ?? "Upload failed");
                setUploadedPreview("");
            }
        } catch {
            alert("Upload failed — are you on Cloudflare?");
            setUploadedPreview("");
        } finally {
            setUploadingFile(false);
        }
    }

    // ── Add or Update event ────────────────────────────────────────────────────
    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        const method = editingId ? "PUT" : "POST";
        const endpoint = editingId ? `/api/events/${editingId}` : "/api/events";

        // If we're editing but didn't upload a new file, we use the existing image URL
        // (which we loaded into uploadedUrl during handleEditClick)
        const finalImageUrl = uploadedUrl;

        let urlsArray: string[] = [];
        if (form.gallery_urls) {
            urlsArray = form.gallery_urls.split(/[\n,]+/).map(i => i.trim()).filter(Boolean);
        }

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, image_url: finalImageUrl, gallery_urls: urlsArray }),
            });

            if (res.status === 401) {
                router.push("/admin/login");
                return;
            }

            const data = await res.json();
            if (res.ok) {
                setForm({ title: "", category: "", date: "", description: "", gallery_urls: "" });
                setUploadedUrl("");
                setUploadedPreview("");
                setShowForm(false);
                setEditingId(null);
                fetchEvents();
            } else {
                alert(data.error ?? "Failed to save event");
            }
        } finally {
            setSubmitting(false);
        }
    }

    function handleEditClick(event: Event) {
        setEditingId(event.id);
        let parsedGallery = "";
        try {
            const urls = JSON.parse(event.gallery_urls || "[]");
            parsedGallery = urls.join("\n");
        } catch { }

        setForm({
            title: event.title,
            category: event.category,
            date: event.date,
            description: event.description,
            gallery_urls: parsedGallery,
        });
        setUploadedUrl(event.image_url);
        setUploadedPreview(event.image_url);
        setShowForm(true);

        // Scroll to top to see the form
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleForm() {
        if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title: "", category: "", date: "", description: "", gallery_urls: "" });
            setUploadedPreview("");
            setUploadedUrl("");
        } else {
            setShowForm(true);
        }
    }

    // ── Delete event ───────────────────────────────────────────────────────────
    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            if (res.status === 401) {
                router.push("/admin/login");
                return;
            }
            if (res.ok) fetchEvents();
        } finally {
            setDeletingId(null);
        }
    }

    // ── Team Functions ─────────────────────────────────────────────────────────
    async function handleTeamFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedTeamPreview(URL.createObjectURL(file));
        setUploadingTeamFile(true);
        setUploadedTeamUrl("");

        const fd = new FormData();
        fd.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (res.ok) setUploadedTeamUrl(data.url);
            else { alert(data.error); setUploadedTeamPreview(""); }
        } catch {
            alert("Upload failed.");
            setUploadedTeamPreview("");
        } finally {
            setUploadingTeamFile(false);
        }
    }

    async function handleTeamSave(e: React.FormEvent) {
        e.preventDefault();
        setSubmittingTeam(true);

        const method = editingTeamId ? "PUT" : "POST";
        const endpoint = editingTeamId ? `/api/team/${editingTeamId}` : "/api/team";

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...teamForm, image_url: uploadedTeamUrl }),
            });

            if (res.status === 401) { router.push("/admin/login"); return; }

            if (res.ok) {
                setTeamForm({ name: "", role: "", description: "" });
                setUploadedTeamUrl("");
                setUploadedTeamPreview("");
                setShowTeamForm(false);
                setEditingTeamId(null);
                fetchTeam();
            } else {
                const data = await res.json();
                alert(data.error ?? "Failed to save team member");
            }
        } finally {
            setSubmittingTeam(false);
        }
    }

    function handleTeamEditClick(member: TeamMember) {
        setEditingTeamId(member.id);
        setTeamForm({
            name: member.name,
            role: member.role,
            description: member.bio,
        });
        setUploadedTeamUrl(member.image_url);
        setUploadedTeamPreview(member.image_url);
        setShowTeamForm(true);
    }

    function toggleTeamForm() {
        if (showTeamForm) {
            setShowTeamForm(false);
            setEditingTeamId(null);
            setTeamForm({ name: "", role: "", description: "" });
            setUploadedTeamPreview("");
            setUploadedTeamUrl("");
        } else {
            setShowTeamForm(true);
        }
    }

    async function handleDeleteTeam(id: number) {
        if (!confirm("Are you sure you want to remove this team member?")) return;
        setDeletingTeamId(id);
        try {
            const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
            if (res.status === 401) { router.push("/admin/login"); return; }
            if (res.ok) fetchTeam();
        } finally {
            setDeletingTeamId(null);
        }
    }

    async function handleLogout() {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.push("/admin/login");
    }

    // ── Services Functions ──────────────────────────────────────────────────────
    async function handleServiceFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedServicePreview(URL.createObjectURL(file));
        setUploadingServiceFile(true);
        setUploadedServiceUrl("");

        const fd = new FormData();
        fd.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (res.ok) setUploadedServiceUrl(data.url);
            else { alert(data.error); setUploadedServicePreview(""); }
        } catch {
            alert("Upload failed.");
            setUploadedServicePreview("");
        } finally {
            setUploadingServiceFile(false);
        }
    }

    async function handleServiceSave(e: React.FormEvent) {
        e.preventDefault();
        setSubmittingService(true);

        const method = editingServiceId ? "PUT" : "POST";
        const endpoint = editingServiceId ? `/api/services/${editingServiceId}` : "/api/services";

        // Parse textarea separated by newline into arrays
        const featuresArray = serviceForm.features.split("\n").map(i => i.trim()).filter(Boolean);
        const ecoArray = serviceForm.eco_highlights.split("\n").map(i => i.trim()).filter(Boolean);

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...serviceForm,
                    features: featuresArray,
                    eco_highlights: ecoArray,
                    image_url: uploadedServiceUrl
                }),
            });

            if (res.status === 401) { router.push("/admin/login"); return; }

            if (res.ok) {
                setServiceForm({ title: "", description: "", icon_name: "Briefcase", features: "", eco_highlights: "" });
                setUploadedServiceUrl("");
                setUploadedServicePreview("");
                setShowServiceForm(false);
                setEditingServiceId(null);
                fetchServices();
            } else {
                const data = await res.json();
                alert(data.error ?? "Failed to save service");
            }
        } finally {
            setSubmittingService(false);
        }
    }

    function handleServiceEditClick(service: Service) {
        setEditingServiceId(service.id);
        let parsedFeatures = "";
        let parsedEco = "";
        try {
            parsedFeatures = JSON.parse(service.features).join("\n");
            parsedEco = JSON.parse(service.eco_highlights).join("\n");
        } catch { }

        setServiceForm({
            title: service.title,
            description: service.description,
            icon_name: service.icon_name || "Briefcase",
            features: parsedFeatures,
            eco_highlights: parsedEco,
        });
        setUploadedServiceUrl(service.image_url);
        setUploadedServicePreview(service.image_url);
        setShowServiceForm(true);
    }

    function toggleServiceForm() {
        if (showServiceForm) {
            setShowServiceForm(false);
            setEditingServiceId(null);
            setServiceForm({ title: "", description: "", icon_name: "Briefcase", features: "", eco_highlights: "" });
            setUploadedServicePreview("");
            setUploadedServiceUrl("");
        } else {
            setShowServiceForm(true);
        }
    }

    async function handleDeleteService(id: number) {
        if (!confirm("Are you sure you want to remove this service?")) return;
        setDeletingServiceId(id);
        try {
            const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
            if (res.status === 401) { router.push("/admin/login"); return; }
            if (res.ok) fetchServices();
        } finally {
            setDeletingServiceId(null);
        }
    }

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-3">
                    <Image src="/logo.jpeg" alt="logo" width={40} height={40} className="rounded-lg" />
                    <div>
                        <h1 className="font-headline text-3xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-muted-foreground text-sm">Manage past events</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={toggleForm}
                        className="flex items-center gap-2 font-semibold"
                    >
                        {showForm ? <X className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                        {showForm ? "Cancel" : "Add New Event"}
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-red-400">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Local dev notice */}
            {localNote && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                    ⚠️ {localNote}
                </div>
            )}

            {/* Add / Edit Event Form */}
            {showForm && (
                <form
                    onSubmit={handleSave}
                    className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4"
                >
                    <h2 className="text-white font-bold text-lg">
                        {editingId ? "Edit Event Details" : "New Event Details"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Event Title *"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            className="bg-input border-border"
                        />
                        <Input
                            placeholder="Category (TEDx, Corporate, Brand…) *"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            required
                            className="bg-input border-border"
                        />
                        <Input
                            placeholder="Date (e.g. March 2025) *"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            required
                            className="bg-input border-border"
                        />
                    </div>

                    <Textarea
                        placeholder="Short description *"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                        className="bg-input border-border min-h-[100px]"
                    />

                    <Textarea
                        placeholder="📸 Gallery Image URLs (optional) — Paste URLs separated by a new line or comma"
                        value={form.gallery_urls}
                        onChange={(e) => setForm({ ...form, gallery_urls: e.target.value })}
                        className="bg-input border-border min-h-[80px]"
                    />

                    {/* R2 File Upload */}
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Event Photo / Video (optional)</p>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                            ref={fileRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div
                            onClick={() => fileRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${uploadedPreview
                                ? "border-primary/50 bg-primary/5"
                                : "border-white/10 hover:border-primary/40 hover:bg-white/5"
                                }`}
                        >
                            {uploadingFile ? (
                                <><Loader2 className="h-6 w-6 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Uploading to R2…</p></>
                            ) : uploadedPreview ? (
                                <>
                                    <img src={uploadedPreview} alt="preview" className="max-h-40 rounded-lg object-contain" />
                                    {uploadedUrl ? (
                                        <p className="text-xs text-green-400 flex items-center gap-1"><Check className="h-3 w-3" />Ready to display</p>
                                    ) : (
                                        <p className="text-xs text-yellow-400">Upload failed — R2 requires Cloudflare</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground text-center">
                                        Click to upload image or video<br />
                                        <span className="text-xs">JPG, PNG, WebP, GIF, MP4, WebM · Max 50MB</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <Button type="submit" disabled={submitting || uploadingFile} className="font-bold">
                        {submitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
                        ) : (
                            <><Check className="mr-2 h-4 w-4" />{editingId ? "Update Event" : "Save Event"}</>
                        )}
                    </Button>
                </form>
            )}

            {/* Events Table */}
            <div className="bg-secondary/20 border border-white/10 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto w-full">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="p-4 font-semibold text-white">Photo</th>
                                    <th className="p-4 font-semibold text-white">Title</th>
                                    <th className="p-4 font-semibold text-white">Category</th>
                                    <th className="p-4 font-semibold text-white">Date</th>
                                    <th className="p-4 font-semibold text-white">❤️</th>
                                    <th className="p-4 font-semibold text-white text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {events.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                            No events yet. Click "Add New Event" to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((event) => (
                                        <tr key={event.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-3">
                                                <img
                                                    src={event.image_url}
                                                    alt={event.title}
                                                    className="w-16 h-12 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td className="p-4 font-medium text-white max-w-[180px] truncate">{event.title}</td>
                                            <td className="p-4 text-muted-foreground">{event.category}</td>
                                            <td className="p-4 text-muted-foreground">{event.date}</td>
                                            <td className="p-4 text-muted-foreground">{event.likes}</td>
                                            <td className="p-4 flex gap-2 justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-white transition-colors"
                                                    onClick={() => handleEditClick(event)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-red-400 opacity-60 group-hover:opacity-100 transition-all"
                                                    onClick={() => handleDelete(event.id)}
                                                    disabled={deletingId === event.id}
                                                >
                                                    {deletingId === event.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────────────────────── */}
            {/* ── Team Section ── */}
            {/* ──────────────────────────────────────────────────────────────────────── */}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-20 mb-8 gap-4">
                <div>
                    <h2 className="font-headline text-2xl font-bold text-white">Event Architects</h2>
                    <p className="text-muted-foreground text-sm">Manage team members</p>
                </div>
                <Button
                    onClick={toggleTeamForm}
                    variant="outline"
                    className="flex items-center gap-2 border-white/10 text-white bg-transparent hover:bg-white/5"
                >
                    {showTeamForm ? <X className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                    {showTeamForm ? "Cancel" : "Add Team Member"}
                </Button>
            </div>

            {showTeamForm && (
                <form
                    onSubmit={handleTeamSave}
                    className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4"
                >
                    <h2 className="text-white font-bold text-lg">
                        {editingTeamId ? "Edit Team Member" : "New Team Member"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Name *"
                            value={teamForm.name}
                            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                            required
                            className="bg-input border-border"
                        />
                        <Input
                            placeholder="Role (e.g. Creative Director) *"
                            value={teamForm.role}
                            onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                            required
                            className="bg-input border-border"
                        />
                    </div>

                    <Textarea
                        placeholder="Short bio/description *"
                        value={teamForm.description}
                        onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                        required
                        className="bg-input border-border min-h-[100px]"
                    />

                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Profile Photo (optional)</p>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            ref={teamFileRef}
                            onChange={handleTeamFileChange}
                            className="hidden"
                        />
                        <div
                            onClick={() => teamFileRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${uploadedTeamPreview
                                ? "border-primary/50 bg-primary/5"
                                : "border-white/10 hover:border-primary/40 hover:bg-white/5"
                                }`}
                        >
                            {uploadingTeamFile ? (
                                <><Loader2 className="h-6 w-6 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Uploading…</p></>
                            ) : uploadedTeamPreview ? (
                                <>
                                    <img src={uploadedTeamPreview} alt="preview" className="max-h-40 rounded-lg object-contain" />
                                    {uploadedTeamUrl ? (
                                        <p className="text-xs text-green-400 flex items-center gap-1"><Check className="h-3 w-3" />Ready to display</p>
                                    ) : (
                                        <p className="text-xs text-yellow-400">Upload failed</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground text-center">Click to upload photo<br /><span className="text-xs">JPG, PNG, WebP</span></p>
                                </>
                            )}
                        </div>
                    </div>

                    <Button type="submit" disabled={submittingTeam || uploadingTeamFile} className="font-bold">
                        {submittingTeam ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
                        ) : (
                            <><Check className="mr-2 h-4 w-4" />{editingTeamId ? "Update Member" : "Save Member"}</>
                        )}
                    </Button>
                </form>
            )}

            {/* Team Table */}
            <div className="bg-secondary/20 border border-white/10 rounded-xl overflow-hidden shadow-lg mb-12">
                <div className="overflow-x-auto w-full">
                    {loadingTeam ? (
                        <div className="p-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                    ) : (
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="p-4 font-semibold text-white">Photo</th>
                                    <th className="p-4 font-semibold text-white">Name</th>
                                    <th className="p-4 font-semibold text-white">Role</th>
                                    <th className="p-4 font-semibold text-white text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {team.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                            No team members yet. Click "Add Team Member" to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    team.map((member) => (
                                        <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-3">
                                                <img
                                                    src={member.image_url}
                                                    alt={member.name}
                                                    className="w-12 h-12 object-cover rounded-full"
                                                />
                                            </td>
                                            <td className="p-4 font-medium text-white max-w-[180px] truncate">{member.name}</td>
                                            <td className="p-4 text-muted-foreground">{member.role}</td>
                                            <td className="p-4 flex gap-2 justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-white transition-colors"
                                                    onClick={() => handleTeamEditClick(member)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-red-400 opacity-60 group-hover:opacity-100 transition-all"
                                                    onClick={() => handleDeleteTeam(member.id)}
                                                    disabled={deletingTeamId === member.id}
                                                >
                                                    {deletingTeamId === member.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────────────────────── */}
            {/* ── Services Section ── */}
            {/* ──────────────────────────────────────────────────────────────────────── */}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-20 mb-8 gap-4">
                <div>
                    <h2 className="font-headline text-2xl font-bold text-white">Services & Expertise</h2>
                    <p className="text-muted-foreground text-sm">Manage service packages and expertise</p>
                </div>
                <Button
                    onClick={toggleServiceForm}
                    variant="outline"
                    className="flex items-center gap-2 border-white/10 text-white bg-transparent hover:bg-white/5"
                >
                    {showServiceForm ? <X className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                    {showServiceForm ? "Cancel" : "Add Service"}
                </Button>
            </div>

            {showServiceForm && (
                <form
                    onSubmit={handleServiceSave}
                    className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4"
                >
                    <h2 className="text-white font-bold text-lg">
                        {editingServiceId ? "Edit Service" : "New Service"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Title (e.g. Corporate & Business) *"
                            value={serviceForm.title}
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            required
                            className="bg-input border-border"
                        />
                        <Input
                            placeholder="Icon Name (e.g. Briefcase, Mic, Megaphone)"
                            value={serviceForm.icon_name}
                            onChange={(e) => setServiceForm({ ...serviceForm, icon_name: e.target.value })}
                            className="bg-input border-border"
                        />
                    </div>

                    <Textarea
                        placeholder="Short description *"
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        required
                        className="bg-input border-border min-h-[60px]"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Features (One per line)</p>
                            <Textarea
                                placeholder="Stage & Set Design&#10;Speaker Coordination..."
                                value={serviceForm.features}
                                onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                                className="bg-input border-border min-h-[100px]"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Eco Highlights (One per line)</p>
                            <Textarea
                                placeholder="Recycled material staging&#10;Digital ticketing..."
                                value={serviceForm.eco_highlights}
                                onChange={(e) => setServiceForm({ ...serviceForm, eco_highlights: e.target.value })}
                                className="bg-input border-border min-h-[100px]"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Cover Image (optional)</p>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            ref={serviceFileRef}
                            onChange={handleServiceFileChange}
                            className="hidden"
                        />
                        <div
                            onClick={() => serviceFileRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${uploadedServicePreview
                                ? "border-primary/50 bg-primary/5"
                                : "border-white/10 hover:border-primary/40 hover:bg-white/5"
                                }`}
                        >
                            {uploadingServiceFile ? (
                                <><Loader2 className="h-6 w-6 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Uploading…</p></>
                            ) : uploadedServicePreview ? (
                                <>
                                    <img src={uploadedServicePreview} alt="preview" className="max-h-40 rounded-lg object-contain" />
                                    {uploadedServiceUrl && <p className="text-xs text-green-400 flex items-center gap-1"><Check className="h-3 w-3" />Ready</p>}
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground text-center">Click to upload image<br /><span className="text-xs">JPG, PNG, WebP</span></p>
                                </>
                            )}
                        </div>
                    </div>

                    <Button type="submit" disabled={submittingService || uploadingServiceFile} className="font-bold">
                        {submittingService ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
                        ) : (
                            <><Check className="mr-2 h-4 w-4" />{editingServiceId ? "Update Service" : "Save Service"}</>
                        )}
                    </Button>
                </form>
            )}

            {/* Services Table */}
            <div className="bg-secondary/20 border border-white/10 rounded-xl overflow-hidden shadow-lg pb-12">
                <div className="overflow-x-auto w-full">
                    {loadingServices ? (
                        <div className="p-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                    ) : (
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="p-4 font-semibold text-white">Image</th>
                                    <th className="p-4 font-semibold text-white">Title</th>
                                    <th className="p-4 font-semibold text-white text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {services.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-muted-foreground">
                                            No services yet. Click "Add Service" to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    services.map((svc) => (
                                        <tr key={svc.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-3">
                                                <img
                                                    src={svc.image_url}
                                                    alt={svc.title}
                                                    className="w-16 h-10 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td className="p-4 font-medium text-white max-w-[250px] truncate">{svc.title}</td>
                                            <td className="p-4 flex gap-2 justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-white transition-colors"
                                                    onClick={() => handleServiceEditClick(svc)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-red-400 opacity-60 group-hover:opacity-100 transition-all"
                                                    onClick={() => handleDeleteService(svc.id)}
                                                    disabled={deletingServiceId === svc.id}
                                                >
                                                    {deletingServiceId === svc.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
