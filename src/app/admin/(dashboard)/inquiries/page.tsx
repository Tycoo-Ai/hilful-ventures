"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Mail,
  Phone,
  Globe,
  Tag,
} from "lucide-react";
import type { ContactSubmission, SubmissionStatus } from "@/lib/contact-submission";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      try {
        const res = await fetch("/api/admin/inquiries");
        if (res.ok && isMounted) {
          const json = await res.json();
          setInquiries(json.inquiries || []);
        }
      } catch (err) {
        console.error("Failed to load inquiries:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: SubmissionStatus) => {
    setUpdating(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setStatusMessage({ type: "success", text: `Inquiry status updated to ${newStatus}` });
      } else {
        setStatusMessage({ type: "error", text: "Failed to update inquiry status." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setUpdating(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countNew = inquiries.filter((i) => i.status === "NEW").length;
  const countInProgress = inquiries.filter((i) => i.status === "IN_PROGRESS").length;
  const countReviewed = inquiries.filter((i) => i.status === "REVIEWED").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6" style={{borderBottom:'1px solid rgba(168,104,58,0.15)'}}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--caramel,#C9935A)',display:'inline-block'}} />
            <span style={{fontSize:'0.5625rem',fontWeight:500,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--caramel,#C9935A)'}}>
              COMMERCIAL INTAKE
            </span>
          </div>
          <h1 style={{fontFamily:"var(--font-heading-stack,'Cormorant Garamond',serif)",fontSize:'2.25rem',fontWeight:300,color:'var(--ivory,#F6F0E4)',letterSpacing:'-0.01em',margin:0}}>
            Enquiries
          </h1>
          <p style={{fontSize:'0.75rem',color:'rgba(246,240,228,0.4)',marginTop:'0.25rem'}}>
            All incoming commercial enquiries and product requests
          </p>
        </div>

        <button
          onClick={loadInquiries}
          style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:'rgba(168,104,58,0.1)',border:'1px solid rgba(168,104,58,0.2)',color:'rgba(246,240,228,0.75)',fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit'}}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          {label:'Total',val:inquiries.length,color:'rgba(246,240,228,0.85)'},
          {label:'New',val:countNew,color:'var(--caramel,#C9935A)'},
          {label:'In Progress',val:countInProgress,color:'#fbbf24'},
          {label:'Reviewed',val:countReviewed,color:'#4ade80'},
        ].map(k=>(
          <div key={k.label} style={{padding:'1.25rem',background:'rgba(59,35,20,0.35)',border:'1px solid rgba(168,104,58,0.15)'}}>
            <span style={{fontSize:'0.5625rem',fontWeight:500,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(246,240,228,0.35)',display:'block',marginBottom:'0.5rem'}}>{k.label}</span>
            <span style={{fontFamily:"var(--font-heading-stack,'Cormorant Garamond',serif)",fontSize:'2.5rem',fontWeight:300,color:k.color,lineHeight:1}}>{k.val}</span>
          </div>
        ))}
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-sm text-xs font-mono flex items-center gap-3 border ${
            statusMessage.type === "success"
              ? "bg-[#0b2416] border-[#1d633b] text-emerald-300"
              : "bg-[#2d1115] border-[#6b2128] text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'1rem',padding:'1rem',background:'rgba(59,35,20,0.3)',border:'1px solid rgba(168,104,58,0.15)'}}>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-400" />
          <div className="flex items-center gap-1">
            {["ALL","NEW","REVIEWED","IN_PROGRESS","CLOSED"].map((f)=>(
              <button key={f} onClick={()=>setStatusFilter(f)} style={{padding:'0.35rem 0.75rem',background:statusFilter===f?'var(--caramel,#C9935A)':'rgba(168,104,58,0.08)',border:'1px solid rgba(168,104,58,0.2)',color:statusFilter===f?'var(--espresso,#1E130C)':'rgba(246,240,228,0.6)',fontSize:'0.625rem',fontWeight:statusFilter===f?600:400,letterSpacing:'0.12em',textTransform:'uppercase',cursor:'pointer',fontFamily:'inherit'}}>{f}</button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5" style={{position:'absolute',left:'0.65rem',top:'50%',transform:'translateY(-50%)',color:'rgba(246,240,228,0.3)'}} />
          <input type="text" placeholder="Search enquiries..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} style={{paddingLeft:'2rem',paddingRight:'0.75rem',paddingTop:'0.4rem',paddingBottom:'0.4rem',background:'rgba(30,19,12,0.5)',border:'1px solid rgba(168,104,58,0.2)',color:'var(--ivory,#F6F0E4)',fontSize:'0.8125rem',outline:'none',fontFamily:'inherit',width:'220px'}} />
        </div>
      </div>

      {/* Inquiries Table */}
      <div style={{background:'rgba(59,35,20,0.3)',border:'1px solid rgba(168,104,58,0.15)',overflow:'hidden'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr style={{borderBottom:'1px solid rgba(168,104,58,0.1)',background:'rgba(30,19,12,0.4)',fontSize:'0.5625rem',fontWeight:500,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(246,240,228,0.35)'}}>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Company &amp; Region</th>
                <th className="py-3.5 px-4">Enquiry Type</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182a3e] font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono text-xs">
                    Loading inquiries...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono text-xs">
                    No inquiries match the active criteria.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-[#122336]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{item.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-neutral-200 font-medium">{item.company}</div>
                      <div className="text-[11px] text-neutral-400">{item.country}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#122740] border border-[#234b73] text-accent-300">
                        {item.enquiryType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] font-mono text-neutral-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs font-bold ${
                          item.status === "NEW"
                            ? "bg-accent-500/20 text-accent-300 border border-accent-500/40"
                            : item.status === "IN_PROGRESS"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : item.status === "REVIEWED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-neutral-700/20 text-neutral-400 border border-neutral-700/40"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#122740] hover:bg-[#19375b] text-neutral-200 hover:text-white border border-[#234b73] text-xs font-mono transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-[#0a1420] border border-[#1e3c60] rounded-sm shadow-2xl p-6 text-white space-y-6">
            <div className="flex items-start justify-between border-b border-[#182a3e] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400 block mb-1">
                  INQUIRY SPECIFICATION · {selectedInquiry.id}
                </span>
                <h3 className="text-xl font-bold font-sans">{selectedInquiry.name}</h3>
                <p className="text-xs text-neutral-400 font-mono">{selectedInquiry.company}</p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xs text-neutral-400 hover:text-white hover:bg-[#122740] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#070e17] p-4 rounded-sm border border-[#182a3e]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-neutral-300">{selectedInquiry.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-neutral-300">{selectedInquiry.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-neutral-300">{selectedInquiry.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-neutral-300">{selectedInquiry.areaOfInterest}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Enquiry Details &amp; Scope Requirements:
              </span>
              <div className="p-4 rounded-sm bg-[#070e17] border border-[#182a3e] text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Management Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[#182a3e]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">Update Status:</span>
                {(["NEW", "REVIEWED", "IN_PROGRESS", "CLOSED"] as SubmissionStatus[]).map(
                  (statusVal) => (
                    <button
                      key={statusVal}
                      disabled={updating || selectedInquiry.status === statusVal}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, statusVal)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs cursor-pointer ${
                        selectedInquiry.status === statusVal
                          ? "bg-accent-500 text-neutral-950 font-bold"
                          : "bg-[#122740] hover:bg-[#1a385c] text-neutral-300"
                      }`}
                    >
                      {statusVal}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xs bg-[#162f4d] hover:bg-[#1f426c] text-white text-xs font-mono cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
