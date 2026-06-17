"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2, Send, Sparkles, Eye, Code, FileText, Mail, Paperclip } from "lucide-react";

export const runtime = "edge";

interface InvoiceItem {
  name: string;
  qty: number;
  rate: number;
}

interface Attachment {
  name: string;
  type: string;
  base64: string;
  size: number;
}

export default function AdminEmailDrafterPage() {
  // Input states
  const [templateType, setTemplateType] = useState<"general" | "invoice">("general");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { name: "Custom Website Development", qty: 1, rate: 35000 },
  ]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Generated states
  const [generatedSubject, setGeneratedSubject] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [previewMode, setPreviewMode] = useState<"visual" | "html">("visual");

  // Status states
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(",")[1] || "";
        setAttachments(prev => [
          ...prev,
          {
            name: file.name,
            type: file.type,
            base64: base64Data,
            size: file.size,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  function removeAttachment(index: number) {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  }

  const totalAmount = invoiceItems.reduce((acc, item) => acc + item.qty * item.rate, 0);

  function addInvoiceItem() {
    setInvoiceItems([...invoiceItems, { name: "", qty: 1, rate: 0 }]);
  }

  function removeInvoiceItem(index: number) {
    if (invoiceItems.length === 1) return;
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  }

  function updateInvoiceItem(index: number, field: keyof InvoiceItem, value: any) {
    const updated = [...invoiceItems];
    updated[index] = { ...updated[index], [field]: value };
    setInvoiceItems(updated);
  }

  async function handleGenerate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: templateType,
          recipientName,
          prompt,
          invoiceDetails: templateType === "invoice" ? {
            items: invoiceItems,
            total: totalAmount,
            currency,
          } : undefined,
        }),
      });

      const data = await res.json() as { subject?: string; htmlBody?: string; error?: string };
      if (!res.ok) {
        alert(data.error || "Failed to generate draft");
        return;
      }

      setGeneratedSubject(data.subject || "");
      setGeneratedHtml(data.htmlBody || "");
    } catch (err) {
      console.error(err);
      alert("Error contacting generator API.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSend() {
    if (!recipientEmail) {
      alert("Please provide a recipient email address.");
      return;
    }
    if (!generatedSubject || !generatedHtml) {
      alert("Please generate a draft email first.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/ai/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientEmail,
          subject: generatedSubject,
          htmlBody: generatedHtml,
          attachments: attachments.map(att => ({
            filename: att.name,
            mimeType: att.type,
            content: att.base64,
          })),
        }),
      });

      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) {
        alert(data.error || "Failed to send email");
        return;
      }

      alert("Email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-hairline pb-5">
        <div>
          <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>AI Email & Quotation Drafter</h1>
          <p className="body-sm-figma text-ink/60 mt-1">Compose custom client emails or stylized modern quotations with AI, and send them directly via your Gmail API.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="bg-canvas border border-hairline rounded-lg p-8 space-y-6 shadow-sm">
          <div>
            <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">Template Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemplateType("general")}
                className={`py-2.5 px-3 rounded-md border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  templateType === "general"
                    ? "bg-ink border-ink text-canvas"
                    : "bg-surface-soft border-hairline text-ink/75 hover:bg-ink/5"
                }`}
              >
                <Mail className="h-4 w-4" /> General Email
              </button>
              <button
                type="button"
                onClick={() => setTemplateType("invoice")}
                className={`py-2.5 px-3 rounded-md border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  templateType === "invoice"
                    ? "bg-ink border-ink text-canvas"
                    : "bg-surface-soft border-hairline text-ink/75 hover:bg-ink/5"
                }`}
              >
                <FileText className="h-4 w-4" /> Quotation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">Recipient Name</label>
              <input
                placeholder="e.g. John Doe"
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">Recipient Email *</label>
              <input
                type="email"
                placeholder="client@example.com"
                value={recipientEmail}
                onChange={e => setRecipientEmail(e.target.value)}
                required
                className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </div>
          </div>

          {/* Conditional Invoice Items section */}
          {templateType === "invoice" && (
            <div className="space-y-4 border-t border-hairline pt-4">
              <div className="flex items-center justify-between">
                <label className="caption-mono text-ink/60 text-xs uppercase font-semibold">Quotation Items</label>
                <div className="flex items-center gap-2">
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    className="bg-surface-soft border border-hairline rounded px-2 py-0.5 text-xs text-ink focus:outline-none"
                  >
                    <option value="₹">₹ (INR)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                  </select>
                  <button
                    type="button"
                    onClick={addInvoiceItem}
                    className="text-xs text-ink font-semibold flex items-center hover:underline"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {invoiceItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      placeholder="Item name / service"
                      value={item.name}
                      onChange={e => updateInvoiceItem(idx, "name", e.target.value)}
                      className="flex-1 bg-surface-soft border border-hairline rounded px-2.5 py-1.5 text-xs text-ink outline-none focus:border-ink"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={e => updateInvoiceItem(idx, "qty", parseInt(e.target.value) || 0)}
                      className="w-14 bg-surface-soft border border-hairline rounded px-2.5 py-1.5 text-xs text-ink text-center outline-none focus:border-ink"
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={e => updateInvoiceItem(idx, "rate", parseInt(e.target.value) || 0)}
                      className="w-20 bg-surface-soft border border-hairline rounded px-2.5 py-1.5 text-xs text-ink text-right outline-none focus:border-ink"
                    />
                    <button
                      type="button"
                      onClick={() => removeInvoiceItem(idx)}
                      disabled={invoiceItems.length === 1}
                      className="p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center bg-surface-soft rounded-lg p-3 border border-hairline text-sm">
                <span className="font-semibold text-ink/70">Total Quotation Amount:</span>
                <span className="font-bold text-ink">{currency}{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="border-t border-hairline pt-4">
            <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">AI Instructions / Context</label>
            <textarea
              placeholder={
                templateType === "invoice"
                  ? "e.g. Include 50% advance payment terms for the website project. Mention validity is 30 days."
                  : "e.g. Follow up on our website kickoff call. Propose two time slots next Tuesday for our feedback session."
              }
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="w-full btn-primary-figma flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Drafting with AI...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate AI Draft
              </>
            )}
          </button>
        </div>

        {/* Right Column: Draft Preview and Editor */}
        <div className="space-y-4">
          <div className="bg-canvas border border-hairline rounded-lg p-6 shadow-sm space-y-4 min-h-[500px] flex flex-col justify-between">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="caption-mono text-ink/50 text-xs">Generated Output</span>
                {generatedHtml && (
                  <div className="flex rounded border border-hairline overflow-hidden">
                    <button
                      onClick={() => setPreviewMode("visual")}
                      className={`px-3 py-1 text-xs font-semibold flex items-center gap-1 transition-colors ${
                        previewMode === "visual" ? "bg-ink text-canvas" : "bg-surface-soft text-ink/75 hover:bg-ink/5"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" /> Visual
                    </button>
                    <button
                      onClick={() => setPreviewMode("html")}
                      className={`px-3 py-1 text-xs font-semibold flex items-center gap-1 transition-colors ${
                        previewMode === "html" ? "bg-ink text-canvas" : "bg-surface-soft text-ink/75 hover:bg-ink/5"
                      }`}
                    >
                      <Code className="h-3.5 w-3.5" /> HTML Source
                    </button>
                  </div>
                )}
              </div>

              {/* Subject line input */}
              <div>
                <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">Subject Line</label>
                <input
                  placeholder="Subject will be generated by AI..."
                  value={generatedSubject}
                  onChange={e => setGeneratedSubject(e.target.value)}
                  className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink font-medium"
                />
              </div>

              {/* Body editor */}
              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">Email Body (HTML)</label>
                {previewMode === "html" || !generatedHtml ? (
                  <textarea
                    placeholder="HTML body will be generated by AI. You can manually edit the HTML directly here..."
                    value={generatedHtml}
                    onChange={e => setGeneratedHtml(e.target.value)}
                    className="w-full flex-1 bg-surface-soft border border-hairline rounded-md px-3 py-2 text-xs font-mono text-ink outline-none focus:border-ink resize-none min-h-[280px]"
                  />
                ) : (
                  <div className="w-full flex-1 border border-hairline rounded-md bg-white overflow-y-auto max-h-[380px] p-4">
                    <iframe
                      srcDoc={generatedHtml}
                      title="Email Preview"
                      className="w-full h-full border-none min-h-[340px]"
                    />
                  </div>
                )}
              </div>

              {/* Attachments Section */}
              <div className="space-y-2.5 border-t border-hairline pt-4">
                <div className="flex items-center justify-between">
                  <label className="caption-mono text-ink/60 text-xs uppercase block">Attachments</label>
                  <label className="cursor-pointer text-xs font-semibold text-ink hover:underline flex items-center gap-1">
                    <Paperclip className="h-3.5 w-3.5" />
                    Attach Files
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {attachments.length > 0 ? (
                  <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                    {attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-surface-soft border border-hairline rounded px-2.5 py-1.5 text-xs text-ink"
                      >
                        <div className="flex items-center gap-2 truncate mr-2">
                          <Paperclip className="h-3.5 w-3.5 text-ink/40 flex-shrink-0" />
                          <span className="truncate font-medium">{file.name}</span>
                          <span className="text-ink/40 text-[10px]">({formatBytes(file.size)})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-hairline rounded-md p-4 text-center text-xs text-ink/40 bg-surface-soft/30">
                    No files attached yet.
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-hairline pt-4 flex justify-between items-center">
              <span className="text-xs text-ink/50">
                {recipientEmail ? `To: ${recipientEmail}` : "No recipient email specified"}
              </span>
              <button
                type="button"
                onClick={handleSend}
                disabled={sending || !generatedHtml || !recipientEmail}
                className="btn-primary-figma flex items-center gap-2 px-6 py-2.5 disabled:opacity-40"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Email via API
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
