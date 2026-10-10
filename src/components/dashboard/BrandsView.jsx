// import React, { useState } from "react";
// import { useApp } from "../../context/AppContext";
// import {
//   Plus,
//   Search,
//   ExternalLink,
//   Trash2,
//   CheckCircle,
//   Eye,
//   X,
//   Smartphone,
//   Share2,
// } from "lucide-react";

// export const BrandsView = () => {
//   const {
//     brands,
//     addBrand,
//     deleteBrand,
//     setSelectedBrandId,
//     selectedBrandId,
//     triggerScan,
//   } = useApp();

//   const [searchFilter, setSearchFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [isAddingBrand, setIsAddingBrand] = useState(false);
//   const [inspectingBrand, setInspectingBrand] = useState(null);
//   const [brandDetailTab, setBrandDetailTab] = useState("overview");

//   // Form State for Adding Brand
//   const [formData, setFormData] = useState({
//     name: "",
//     legalName: "",
//     description: "",
//     industry: "Financial Technology",
//     region: "Global",
//     website: "",
//     logoUrl:
//       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
//     aliases: [""],
//     trustedDomains: [""],
//     keywords: [""],
//     verifiedStatus: "verified",
//     // First sample social asset
//     socialHandle: "",
//     socialPlatform: "x",
//     socialUrl: "",
//     // First sample official mobile app
//     appName: "",
//     appStore: "google_play",
//     appPackageId: "",
//     appPublisher: "",
//     // First publisher
//     pubName: "",
//     pubIdentifier: "",
//   });

//   const filteredBrands = brands.filter((b) => {
//     const matchesSearch =
//       b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
//       b.website.toLowerCase().includes(searchFilter.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || b.verifiedStatus === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleSaveBrand = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.website) return;

//     addBrand({
//       name: formData.name,
//       legalName: formData.legalName || `${formData.name} Inc.`,
//       description: formData.description || "Registered commercial brand.",
//       industry: formData.industry,
//       region: formData.region,
//       website: formData.website,
//       logoUrl: formData.logoUrl,
//       aliases: formData.aliases.filter(Boolean),
//       socialAssets: formData.socialHandle
//         ? [
//             {
//               id: `soc-${Date.now()}`,
//               platform: formData.socialPlatform,
//               handle: formData.socialHandle,
//               url:
//                 formData.socialUrl ||
//                 `https://${formData.socialPlatform}.com/${formData.socialHandle.replace("@", "")}`,
//               isVerified: true,
//             },
//           ]
//         : [],
//       mobileApps:
//         formData.appName && formData.appPackageId
//           ? [
//               {
//                 id: `app-${Date.now()}`,
//                 name: formData.appName,
//                 store: formData.appStore,
//                 listingUrl: `https://play.google.com/store/apps/details?id=${formData.appPackageId}`,
//                 packageId: formData.appPackageId,
//                 publisherName: formData.appPublisher || formData.name,
//                 isVerified: true,
//               },
//             ]
//           : [],
//       authorizedPublishers: formData.pubName
//         ? [
//             {
//               id: `pub-${Date.now()}`,
//               name: formData.pubName,
//               website: formData.website,
//               identifier:
//                 formData.pubIdentifier ||
//                 `PUB-${formData.name.toUpperCase().slice(0, 4)}`,
//             },
//           ]
//         : [],
//       trustedDomains: formData.trustedDomains.filter(Boolean),
//       keywords: formData.keywords.filter(Boolean),
//       verifiedStatus: "verified",
//     });

//     setIsAddingBrand(false);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       {/* Page Header */}
//       <div
//         className="sm-flex-row sm-items-center"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           gap: 16,
//         }}
//       >
//         <div>
//           <h1
//             className="sm-text-2xl dark-text-white"
//             style={{
//               fontSize: "1.25rem",
//               fontWeight: 700,
//               color: "#0f172a",
//               letterSpacing: "-0.025em",
//               margin: 0,
//             }}
//           >
//             Brand Profiles
//           </h1>
//           <p
//             className="dark-text-slate-400"
//             style={{
//               fontSize: "0.75rem",
//               color: "#64748b",
//               marginTop: 4,
//               margin: 0,
//             }}
//           >
//             Manage official brand trademarks, approved mobile packages, and
//             verified social accounts.
//           </p>
//         </div>

//         <button
//           onClick={() => setIsAddingBrand(true)}
//           className="hover-bg-indigo-500 cursor-pointer transition-colors sm-self-auto hover-shadow"
//           style={{
//             padding: "8px 16px",
//             fontSize: "0.75rem",
//             fontWeight: 600,
//             color: "#ffffff",
//             backgroundColor: "#4f46e5",
//             borderRadius: 8,
//             boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             border: "none",
//             alignSelf: "flex-start",
//           }}
//         >
//           <Plus style={{ width: 14, height: 14 }} />
//           <span>Add Brand Profile</span>
//         </button>
//       </div>

//       {/* Search and Filters Bar */}
//       <div
//         className="sm-flex-row dark-bg-slate-900 dark-border-slate-800"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: 12,
//           padding: 12,
//           backgroundColor: "#ffffff",
//           border: "1px solid #e2e8f0",
//           borderRadius: 12,
//         }}
//       >
//         <div
//           className="sm-w-72"
//           style={{ position: "relative", width: "100%" }}
//         >
//           <Search
//             style={{
//               width: 14,
//               height: 14,
//               color: "#94a3b8",
//               position: "absolute",
//               left: 12,
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Search registered brands..."
//             value={searchFilter}
//             onChange={(e) => setSearchFilter(e.target.value)}
//             className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-100 placeholder-text-slate-400 focus-ring-indigo-500"
//             style={{
//               width: "100%",
//               padding: "6px 12px 6px 36px",
//               fontSize: "0.75rem",
//               backgroundColor: "#f8fafc",
//               border: "1px solid #e2e8f0",
//               borderRadius: 8,
//               color: "#0f172a",
//               outline: "none",
//               boxSizing: "border-box",
//             }}
//           />
//         </div>

//         <div
//           className="sm-self-auto"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             fontSize: "0.75rem",
//             alignSelf: "flex-end",
//           }}
//         >
//           <span style={{ color: "#94a3b8", fontSize: "11px" }}>Filter:</span>
//           <button
//             onClick={() => setStatusFilter("all")}
//             className={`cursor-pointer transition-colors ${
//               statusFilter === "all"
//                 ? "dark-bg-slate-100 dark-text-slate-900"
//                 : "dark-text-slate-400 dark-hover-bg-slate-800 hover-bg-slate-100"
//             }`}
//             style={{
//               padding: "4px 10px",
//               borderRadius: 6,
//               fontWeight: 500,
//               fontSize: "0.75rem",
//               border: "none",
//               backgroundColor:
//                 statusFilter === "all" ? "#0f172a" : "transparent",
//               color: statusFilter === "all" ? "#ffffff" : "#475569",
//             }}
//           >
//             All Brands
//           </button>
//           <button
//             onClick={() => setStatusFilter("verified")}
//             className={`cursor-pointer transition-colors ${
//               statusFilter === "verified"
//                 ? "dark-bg-slate-100 dark-text-slate-900"
//                 : "dark-text-slate-400 dark-hover-bg-slate-800 hover-bg-slate-100"
//             }`}
//             style={{
//               padding: "4px 10px",
//               borderRadius: 6,
//               fontWeight: 500,
//               fontSize: "0.75rem",
//               border: "none",
//               backgroundColor:
//                 statusFilter === "verified" ? "#0f172a" : "transparent",
//               color: statusFilter === "verified" ? "#ffffff" : "#475569",
//             }}
//           >
//             Verified Only
//           </button>
//         </div>
//       </div>

//       {/* Brands Table */}
//       <div
//         className="dark-bg-slate-900 dark-border-slate-800"
//         style={{
//           backgroundColor: "#ffffff",
//           border: "1px solid #e2e8f0",
//           borderRadius: 12,
//           overflow: "hidden",
//           boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//         }}
//       >
//         <div style={{ overflowX: "auto" }}>
//           <table
//             style={{
//               width: "100%",
//               textAlign: "left",
//               fontSize: "0.75rem",
//               borderCollapse: "collapse",
//             }}
//           >
//             <thead
//               className="dark-bg-slate-800-90 dark-border-slate-700"
//               style={{
//                 backgroundColor: "#f1f5f9",
//                 borderBottom: "1px solid #e2e8f0",
//               }}
//             >
//               <tr
//                 className="dark-text-slate-100"
//                 style={{
//                   textTransform: "uppercase",
//                   letterSpacing: "0.05em",
//                   fontSize: "11px",
//                   fontWeight: 700,
//                   color: "#1e293b",
//                 }}
//               >
//                 <th style={{ padding: "12px 16px" }}>Brand Entity</th>
//                 <th style={{ padding: "12px 16px" }}>Official Website</th>
//                 <th style={{ padding: "12px 16px" }}>Social Assets</th>
//                 <th style={{ padding: "12px 16px" }}>Mobile Apps</th>
//                 <th style={{ padding: "12px 16px" }}>Verification</th>
//                 <th style={{ padding: "12px 16px" }}>Last Scanned</th>
//                 <th style={{ padding: "12px 16px", textAlign: "right" }}>
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="dark-divide-slate-800 divide-slate-100">
//               {filteredBrands.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     style={{
//                       padding: "32px 0",
//                       textAlign: "center",
//                       color: "#94a3b8",
//                     }}
//                   >
//                     No brand profiles match your search criteria.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredBrands.map((brand) => (
//                   <tr
//                     key={brand.id}
//                     className="hover-bg-slate-50-80 dark-hover-bg-slate-800-40 transition-colors"
//                     style={{ borderBottom: "1px solid #f1f5f9" }}
//                   >
//                     <td style={{ padding: "14px 16px" }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 12,
//                         }}
//                       >
//                         <div
//                           className="dark-bg-indigo-900-30 dark-border-indigo-800 dark-text-indigo-400"
//                           style={{
//                             width: 32,
//                             height: 32,
//                             borderRadius: 8,
//                             backgroundColor: "rgba(79, 70, 229, 0.1)",
//                             border: "1px solid #e0e7ff",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontWeight: 700,
//                             color: "#4f46e5",
//                             flexShrink: 0,
//                           }}
//                         >
//                           {brand.name.slice(0, 2).toUpperCase()}
//                         </div>
//                         <div>
//                           <div
//                             className="dark-text-white"
//                             style={{
//                               fontWeight: 600,
//                               color: "#0f172a",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 6,
//                             }}
//                           >
//                             <span>{brand.name}</span>
//                             {brand.id === selectedBrandId && (
//                               <span
//                                 className="dark-bg-indigo-950-60 dark-text-indigo-400"
//                                 style={{
//                                   fontSize: "10px",
//                                   backgroundColor: "#eef2ff",
//                                   color: "#4f46e5",
//                                   padding: "2px 6px",
//                                   borderRadius: 4,
//                                   fontFamily: "'JetBrains Mono', monospace",
//                                 }}
//                               >
//                                 Active
//                               </span>
//                             )}
//                           </div>
//                           <div
//                             className="truncate"
//                             style={{
//                               fontSize: "11px",
//                               color: "#64748b",
//                               maxWidth: 320,
//                             }}
//                           >
//                             {brand.legalName}
//                           </div>
//                         </div>
//                       </div>
//                     </td>

//                     <td
//                       className="dark-text-indigo-400"
//                       style={{
//                         padding: "14px 16px",
//                         fontFamily: "'JetBrains Mono', monospace",
//                         fontSize: "11px",
//                         color: "#4f46e5",
//                       }}
//                     >
//                       <a
//                         href={brand.website}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="hover-underline"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 4,
//                           textDecoration: "none",
//                           color: "inherit",
//                         }}
//                       >
//                         <span>{brand.website.replace("https://", "")}</span>
//                         <ExternalLink
//                           style={{ width: 12, height: 12, color: "#94a3b8" }}
//                         />
//                       </a>
//                     </td>

//                     <td
//                       className="dark-text-slate-300"
//                       style={{ padding: "14px 16px", color: "#475569" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 4,
//                           fontFamily: "'JetBrains Mono', monospace",
//                           fontSize: "0.75rem",
//                         }}
//                       >
//                         <Share2
//                           style={{ width: 14, height: 14, color: "#94a3b8" }}
//                         />
//                         <span>{brand.socialAssets.length} handles</span>
//                       </div>
//                     </td>

//                     <td
//                       className="dark-text-slate-300"
//                       style={{ padding: "14px 16px", color: "#475569" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 4,
//                           fontFamily: "'JetBrains Mono', monospace",
//                           fontSize: "0.75rem",
//                         }}
//                       >
//                         <Smartphone
//                           style={{ width: 14, height: 14, color: "#94a3b8" }}
//                         />
//                         <span>{brand.mobileApps.length} packages</span>
//                       </div>
//                     </td>

//                     <td style={{ padding: "14px 16px" }}>
//                       <span
//                         className="dark-text-emerald-400"
//                         style={{
//                           display: "inline-flex",
//                           alignItems: "center",
//                           gap: 4,
//                           fontSize: "11px",
//                           fontWeight: 500,
//                           color: "#059669",
//                         }}
//                       >
//                         <CheckCircle style={{ width: 12, height: 12 }} />
//                         <span>Verified</span>
//                       </span>
//                     </td>

//                     <td
//                       style={{
//                         padding: "14px 16px",
//                         color: "#94a3b8",
//                         fontFamily: "'JetBrains Mono', monospace",
//                         fontSize: "11px",
//                       }}
//                     >
//                       {brand.lastScannedAt}
//                     </td>

//                     <td style={{ padding: "14px 16px", textAlign: "right" }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 4,
//                           justifyContent: "flex-end",
//                         }}
//                       >
//                         <button
//                           onClick={() => {
//                             setSelectedBrandId(brand.id);
//                             setInspectingBrand(brand);
//                           }}
//                           className="dark-text-slate-200 dark-hover-bg-slate-800 hover-bg-slate-100 transition-colors cursor-pointer"
//                           style={{
//                             padding: "4px 10px",
//                             fontSize: "11px",
//                             fontWeight: 600,
//                             color: "#334155",
//                             backgroundColor: "transparent",
//                             borderRadius: 4,
//                             display: "inline-flex",
//                             alignItems: "center",
//                             gap: 4,
//                             border: "none",
//                           }}
//                         >
//                           <Eye style={{ width: 12, height: 12 }} />
//                           <span>Details</span>
//                         </button>
//                         <button
//                           onClick={() => deleteBrand(brand.id)}
//                           className="hover-text-rose-500 transition-colors cursor-pointer"
//                           title="Remove Brand"
//                           style={{
//                             padding: 4,
//                             color: "#94a3b8",
//                             background: "none",
//                             border: "none",
//                           }}
//                         >
//                           <Trash2 style={{ width: 14, height: 14 }} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Multi-Section "Add Brand" Modal */}
//       {isAddingBrand && (
//         <div
//           className="fade-in dark-bg-slate-900-60"
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 50,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 16,
//             backgroundColor: "rgba(15, 23, 42, 0.6)",
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           <div
//             className="dark-bg-slate-900 dark-border-slate-800 dark-text-white"
//             style={{
//               backgroundColor: "#ffffff",
//               border: "1px solid #e2e8f0",
//               borderRadius: 16,
//               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//               maxWidth: "42rem",
//               width: "100%",
//               maxHeight: "90vh",
//               overflowY: "auto",
//               padding: 24,
//               display: "flex",
//               flexDirection: "column",
//               gap: 24,
//               color: "#0f172a",
//             }}
//           >
//             <div
//               className="dark-border-slate-800"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 paddingBottom: 12,
//                 borderBottom: "1px solid #f1f5f9",
//               }}
//             >
//               <div>
//                 <h3 style={{ fontSize: "0.75rem", fontWeight: 700, margin: 0 }}>
//                   Register New Brand Profile
//                 </h3>
//                 <p
//                   style={{
//                     fontSize: "0.75rem",
//                     color: "#64748b",
//                     marginTop: 2,
//                     margin: 0,
//                   }}
//                 >
//                   Establish the authorized baseline for automated impersonation
//                   detection
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsAddingBrand(false)}
//                 className="dark-hover-text-slate-200 cursor-pointer"
//                 style={{
//                   padding: 4,
//                   color: "#94a3b8",
//                   background: "none",
//                   border: "none",
//                 }}
//               >
//                 <X style={{ width: 20, height: 20 }} />
//               </button>
//             </div>

//             <form
//               onSubmit={handleSaveBrand}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 24,
//                 fontSize: "0.75rem",
//               }}
//             >
//               {/* Section 1: Basic Information */}
//               <div
//                 style={{ display: "flex", flexDirection: "column", gap: 12 }}
//               >
//                 <div
//                   className="dark-text-indigo-400"
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "0.75rem",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                     color: "#4f46e5",
//                   }}
//                 >
//                   Section 1 · Basic Information
//                 </div>
//                 <div
//                   className="sm-grid-cols-2"
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
//                     gap: 12,
//                   }}
//                 >
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Brand Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       placeholder="e.g. Acme Corp"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Official Website *
//                     </label>
//                     <input
//                       type="url"
//                       required
//                       placeholder="https://acmecorp.io"
//                       value={formData.website}
//                       onChange={(e) =>
//                         setFormData({ ...formData, website: e.target.value })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     className="dark-text-slate-300"
//                     style={{
//                       display: "block",
//                       fontSize: "11px",
//                       fontWeight: 500,
//                       color: "#475569",
//                       marginBottom: 4,
//                     }}
//                   >
//                     Legal Company Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Acme Technologies International Ltd."
//                     value={formData.legalName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, legalName: e.target.value })
//                     }
//                     className="dark-bg-slate-800 dark-border-slate-700"
//                     style={{
//                       width: "100%",
//                       padding: 8,
//                       backgroundColor: "#f8fafc",
//                       border: "1px solid #e2e8f0",
//                       borderRadius: 8,
//                       color: "inherit",
//                       boxSizing: "border-box",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Section 2: Official Mobile Application (Critical for App Store Monitoring) */}
//               <div
//                 className="dark-border-slate-800"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 12,
//                   paddingTop: 12,
//                   borderTop: "1px solid #f1f5f9",
//                 }}
//               >
//                 <div
//                   className="dark-text-indigo-400"
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "0.75rem",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                     color: "#4f46e5",
//                   }}
//                 >
//                   Section 2 · Official Mobile Application Asset
//                 </div>
//                 <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
//                   Registered package IDs are automatically whitelisted so
//                   legitimate releases are never flagged.
//                 </p>
//                 <div
//                   className="sm-grid-cols-2"
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
//                     gap: 12,
//                   }}
//                 >
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Official App Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Acme Mobile"
//                       value={formData.appName}
//                       onChange={(e) =>
//                         setFormData({ ...formData, appName: e.target.value })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Android Package ID (or Bundle ID)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="com.acmecorp.app"
//                       value={formData.appPackageId}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           appPackageId: e.target.value,
//                         })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         fontFamily: "'JetBrains Mono', monospace",
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Section 3: Official Social Channels */}
//               <div
//                 className="dark-border-slate-800"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 12,
//                   paddingTop: 12,
//                   borderTop: "1px solid #f1f5f9",
//                 }}
//               >
//                 <div
//                   className="dark-text-indigo-400"
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "0.75rem",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                     color: "#4f46e5",
//                   }}
//                 >
//                   Section 3 · Official Social Account
//                 </div>
//                 <div
//                   className="sm-grid-cols-2"
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
//                     gap: 12,
//                   }}
//                 >
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Platform
//                     </label>
//                     <select
//                       value={formData.socialPlatform}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           socialPlatform: e.target.value,
//                         })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     >
//                       <option value="x">X / Twitter</option>
//                       <option value="instagram">Instagram</option>
//                       <option value="linkedin">LinkedIn</option>
//                       <option value="facebook">Facebook</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Official Handle
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="@AcmeCorpOfficial"
//                       value={formData.socialHandle}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           socialHandle: e.target.value,
//                         })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Section 4: Authorized Developer / Publisher Whitelist */}
//               <div
//                 className="dark-border-slate-800"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 12,
//                   paddingTop: 12,
//                   borderTop: "1px solid #f1f5f9",
//                 }}
//               >
//                 <div
//                   className="dark-text-indigo-400"
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "0.75rem",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                     color: "#4f46e5",
//                   }}
//                 >
//                   Section 4 · Authorized Publisher
//                 </div>
//                 <div
//                   className="sm-grid-cols-2"
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
//                     gap: 12,
//                   }}
//                 >
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Publisher / Developer Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Acme Technologies Ltd"
//                       value={formData.pubName}
//                       onChange={(e) =>
//                         setFormData({ ...formData, pubName: e.target.value })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label
//                       className="dark-text-slate-300"
//                       style={{
//                         display: "block",
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         color: "#475569",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Publisher Registry ID
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="PUB-ACM-2026"
//                       value={formData.pubIdentifier}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           pubIdentifier: e.target.value,
//                         })
//                       }
//                       className="dark-bg-slate-800 dark-border-slate-700"
//                       style={{
//                         width: "100%",
//                         padding: 8,
//                         fontFamily: "'JetBrains Mono', monospace",
//                         backgroundColor: "#f8fafc",
//                         border: "1px solid #e2e8f0",
//                         borderRadius: 8,
//                         color: "inherit",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Buttons */}
//               <div
//                 className="dark-border-slate-800"
//                 style={{
//                   paddingTop: 16,
//                   borderTop: "1px solid #f1f5f9",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "flex-end",
//                   gap: 12,
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={() => setIsAddingBrand(false)}
//                   className="dark-text-slate-300 dark-hover-bg-slate-800 hover-bg-slate-100 cursor-pointer"
//                   style={{
//                     padding: "8px 16px",
//                     fontSize: "0.75rem",
//                     fontWeight: 500,
//                     color: "#475569",
//                     backgroundColor: "transparent",
//                     borderRadius: 8,
//                     border: "none",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="hover-bg-indigo-500 cursor-pointer hover-shadow"
//                   style={{
//                     padding: "8px 20px",
//                     fontSize: "0.75rem",
//                     fontWeight: 600,
//                     color: "#ffffff",
//                     backgroundColor: "#4f46e5",
//                     borderRadius: 8,
//                     border: "none",
//                     boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//                   }}
//                 >
//                   Save Brand Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Brand Detail Modal */}
//       {inspectingBrand && (
//         <div
//           className="fade-in dark-bg-slate-900-60"
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 50,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 16,
//             backgroundColor: "rgba(15, 23, 42, 0.6)",
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           <div
//             className="dark-bg-slate-900 dark-border-slate-800 dark-text-white"
//             style={{
//               backgroundColor: "#ffffff",
//               border: "1px solid #e2e8f0",
//               borderRadius: 16,
//               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//               maxWidth: "48rem",
//               width: "100%",
//               maxHeight: "90vh",
//               overflowY: "auto",
//               padding: 24,
//               display: "flex",
//               flexDirection: "column",
//               gap: 24,
//               color: "#0f172a",
//             }}
//           >
//             <div
//               className="dark-border-slate-800"
//               style={{
//                 display: "flex",
//                 alignItems: "flex-start",
//                 justifyContent: "space-between",
//                 paddingBottom: 16,
//                 borderBottom: "1px solid #f1f5f9",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                 <div
//                   className="dark-bg-indigo-900-30 dark-border-indigo-800 dark-text-indigo-400"
//                   style={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: 12,
//                     backgroundColor: "rgba(79, 70, 229, 0.1)",
//                     border: "1px solid #e0e7ff",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: 700,
//                     color: "#4f46e5",
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   {inspectingBrand.name.slice(0, 2).toUpperCase()}
//                 </div>
//                 <div>
//                   <h3 style={{ fontSize: "0.75rem", fontWeight: 700, margin: 0 }}>
//                     {inspectingBrand.name}
//                   </h3>
//                   <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
//                     {inspectingBrand.legalName}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setInspectingBrand(null)}
//                 className="dark-hover-text-slate-200 cursor-pointer"
//                 style={{
//                   padding: 4,
//                   color: "#94a3b8",
//                   background: "none",
//                   border: "none",
//                 }}
//               >
//                 <X style={{ width: 20, height: 20 }} />
//               </button>
//             </div>

//             {/* Tabs */}
//             <div
//               className="dark-border-slate-800"
//               style={{
//                 display: "flex",
//                 borderBottom: "1px solid #e2e8f0",
//                 fontSize: "0.75rem",
//               }}
//             >
//               <button
//                 onClick={() => setBrandDetailTab("overview")}
//                 className={`transition-colors cursor-pointer ${
//                   brandDetailTab === "overview" ? "dark-text-indigo-400" : ""
//                 }`}
//                 style={{
//                   paddingBottom: 8,
//                   paddingLeft: 12,
//                   paddingRight: 12,
//                   fontWeight: 500,
//                   borderBottom:
//                     brandDetailTab === "overview"
//                       ? "2px solid #4f46e5"
//                       : "2px solid transparent",
//                   color: brandDetailTab === "overview" ? "#4f46e5" : "#64748b",
//                   background: "none",
//                 }}
//               >
//                 Overview
//               </button>
//               <button
//                 onClick={() => setBrandDetailTab("apps")}
//                 className={`transition-colors cursor-pointer ${
//                   brandDetailTab === "apps" ? "dark-text-indigo-400" : ""
//                 }`}
//                 style={{
//                   paddingBottom: 8,
//                   paddingLeft: 12,
//                   paddingRight: 12,
//                   fontWeight: 500,
//                   borderBottom:
//                     brandDetailTab === "apps"
//                       ? "2px solid #4f46e5"
//                       : "2px solid transparent",
//                   color: brandDetailTab === "apps" ? "#4f46e5" : "#64748b",
//                   background: "none",
//                 }}
//               >
//                 Mobile Apps ({inspectingBrand.mobileApps.length})
//               </button>
//               <button
//                 onClick={() => setBrandDetailTab("social")}
//                 className={`transition-colors cursor-pointer ${
//                   brandDetailTab === "social" ? "dark-text-indigo-400" : ""
//                 }`}
//                 style={{
//                   paddingBottom: 8,
//                   paddingLeft: 12,
//                   paddingRight: 12,
//                   fontWeight: 500,
//                   borderBottom:
//                     brandDetailTab === "social"
//                       ? "2px solid #4f46e5"
//                       : "2px solid transparent",
//                   color: brandDetailTab === "social" ? "#4f46e5" : "#64748b",
//                   background: "none",
//                 }}
//               >
//                 Social Assets ({inspectingBrand.socialAssets.length})
//               </button>
//               <button
//                 onClick={() => setBrandDetailTab("publishers")}
//                 className={`transition-colors cursor-pointer ${
//                   brandDetailTab === "publishers" ? "dark-text-indigo-400" : ""
//                 }`}
//                 style={{
//                   paddingBottom: 8,
//                   paddingLeft: 12,
//                   paddingRight: 12,
//                   fontWeight: 500,
//                   borderBottom:
//                     brandDetailTab === "publishers"
//                       ? "2px solid #4f46e5"
//                       : "2px solid transparent",
//                   color:
//                     brandDetailTab === "publishers" ? "#4f46e5" : "#64748b",
//                   background: "none",
//                 }}
//               >
//                 Authorized Publishers (
//                 {inspectingBrand.authorizedPublishers.length})
//               </button>
//             </div>

//             {/* Tab Content */}
//             <div
//               style={{
//                 fontSize: "0.75rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 16,
//               }}
//             >
//               {brandDetailTab === "overview" && (
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 16 }}
//                 >
//                   <p
//                     className="dark-text-slate-300"
//                     style={{ color: "#475569", lineHeight: 1.625, margin: 0 }}
//                   >
//                     {inspectingBrand.description}
//                   </p>
//                   <div
//                     className="dark-bg-slate-800-40"
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
//                       gap: 16,
//                       padding: 16,
//                       backgroundColor: "#f8fafc",
//                       borderRadius: 12,
//                     }}
//                   >
//                     <div>
//                       <span
//                         style={{
//                           color: "#94a3b8",
//                           fontSize: "11px",
//                           display: "block",
//                         }}
//                       >
//                         Industry:
//                       </span>
//                       <span style={{ fontWeight: 500 }}>
//                         {inspectingBrand.industry}
//                       </span>
//                     </div>
//                     <div>
//                       <span
//                         style={{
//                           color: "#94a3b8",
//                           fontSize: "11px",
//                           display: "block",
//                         }}
//                       >
//                         Operating Region:
//                       </span>
//                       <span style={{ fontWeight: 500 }}>
//                         {inspectingBrand.region}
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         color: "#94a3b8",
//                         fontSize: "11px",
//                         display: "block",
//                         marginBottom: 4,
//                       }}
//                     >
//                       Approved Brand Aliases:
//                     </span>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                       {inspectingBrand.aliases.map((a) => (
//                         <span
//                           key={a}
//                           className="dark-bg-slate-800"
//                           style={{
//                             padding: "2px 8px",
//                             borderRadius: 4,
//                             backgroundColor: "#f1f5f9",
//                             fontSize: "11px",
//                           }}
//                         >
//                           {a}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {brandDetailTab === "apps" && (
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 12 }}
//                 >
//                   {inspectingBrand.mobileApps.map((app) => (
//                     <div
//                       key={app.id}
//                       className="dark-bg-slate-800-60 dark-border-slate-800"
//                       style={{
//                         padding: 12,
//                         backgroundColor: "#f8fafc",
//                         borderRadius: 12,
//                         border: "1px solid #f1f5f9",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div>
//                         <div
//                           className="dark-text-white"
//                           style={{ fontWeight: 700, color: "#0f172a" }}
//                         >
//                           {app.name}
//                         </div>
//                         <div
//                           style={{
//                             color: "#64748b",
//                             fontFamily: "'JetBrains Mono', monospace",
//                             fontSize: "11px",
//                           }}
//                         >
//                           Package ID: {app.packageId}
//                         </div>
//                         <div style={{ fontSize: "10px", color: "#94a3b8" }}>
//                           Publisher: {app.publisherName}
//                         </div>
//                       </div>
//                       <span
//                         className="dark-text-emerald-400"
//                         style={{
//                           color: "#059669",
//                           fontSize: "11px",
//                           fontWeight: 600,
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 4,
//                         }}
//                       >
//                         <CheckCircle style={{ width: 14, height: 14 }} />
//                         <span>Verified Whitelisted</span>
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {brandDetailTab === "social" && (
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 12 }}
//                 >
//                   {inspectingBrand.socialAssets.map((soc) => (
//                     <div
//                       key={soc.id}
//                       className="dark-bg-slate-800-60 dark-border-slate-800"
//                       style={{
//                         padding: 12,
//                         backgroundColor: "#f8fafc",
//                         borderRadius: 12,
//                         border: "1px solid #f1f5f9",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div>
//                         <div style={{ fontWeight: 700 }}>{soc.handle}</div>
//                         <div
//                           style={{
//                             fontSize: "11px",
//                             color: "#94a3b8",
//                             textTransform: "uppercase",
//                             fontFamily: "'JetBrains Mono', monospace",
//                           }}
//                         >
//                           {soc.platform}
//                         </div>
//                       </div>
//                       <a
//                         href={soc.url}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="dark-text-indigo-400 hover-underline"
//                         style={{
//                           color: "#4f46e5",
//                           display: "inline-flex",
//                           alignItems: "center",
//                           gap: 4,
//                           fontSize: "11px",
//                           textDecoration: "none",
//                         }}
//                       >
//                         <span>Inspect Profile</span>
//                         <ExternalLink style={{ width: 12, height: 12 }} />
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {brandDetailTab === "publishers" && (
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 12 }}
//                 >
//                   {inspectingBrand.authorizedPublishers.map((pub) => (
//                     <div
//                       key={pub.id}
//                       className="dark-bg-slate-800-60 dark-border-slate-800"
//                       style={{
//                         padding: 12,
//                         backgroundColor: "#f8fafc",
//                         borderRadius: 12,
//                         border: "1px solid #f1f5f9",
//                       }}
//                     >
//                       <div
//                         className="dark-text-white"
//                         style={{ fontWeight: 700, color: "#0f172a" }}
//                       >
//                         {pub.name}
//                       </div>
//                       <div
//                         style={{
//                           color: "#64748b",
//                           fontFamily: "'JetBrains Mono', monospace",
//                           fontSize: "11px",
//                           marginTop: 2,
//                         }}
//                       >
//                         Registry ID: {pub.identifier}
//                       </div>
//                       {pub.notes && (
//                         <p
//                           style={{
//                             fontSize: "11px",
//                             color: "#94a3b8",
//                             marginTop: 4,
//                             margin: 0,
//                           }}
//                         >
//                           {pub.notes}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div
//               className="dark-border-slate-800"
//               style={{
//                 paddingTop: 12,
//                 borderTop: "1px solid #f1f5f9",
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <button
//                 onClick={() => setInspectingBrand(null)}
//                 className="dark-bg-slate-800 dark-text-slate-200 cursor-pointer"
//                 style={{
//                   padding: "6px 16px",
//                   fontSize: "0.75rem",
//                   fontWeight: 600,
//                   backgroundColor: "#f1f5f9",
//                   borderRadius: 8,
//                   color: "#334155",
//                   border: "none",
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Plus,
  Search,
  ExternalLink,
  Trash2,
  CheckCircle,
  Eye,
  X,
  Smartphone,
  Share2,
} from "lucide-react";

export const BrandsView = () => {
  const {
    brands,
    addBrand,
    deleteBrand,
    setSelectedBrandId,
    selectedBrandId,
    triggerScan,
  } = useApp();

  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [inspectingBrand, setInspectingBrand] = useState(null);
  const [brandDetailTab, setBrandDetailTab] = useState("overview");

  // Form State for Adding Brand
  const [formData, setFormData] = useState({
    name: "",
    legalName: "",
    description: "",
    industry: "Financial Technology",
    region: "Global",
    website: "",
    logoUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    aliases: [""],
    trustedDomains: [""],
    keywords: [""],
    verifiedStatus: "verified",
    // First sample social asset
    socialHandle: "",
    socialPlatform: "x",
    socialUrl: "",
    // First sample official mobile app
    appName: "",
    appStore: "google_play",
    appPackageId: "",
    appPublisher: "",
    // First publisher
    pubName: "",
    pubIdentifier: "",
  });

  const filteredBrands = brands.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.website.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || b.verifiedStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [isSavingBrand, setIsSavingBrand] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    if (isSavingBrand) return;

    const name = formData.name.trim();
    if (!name) return;

    const aliases = (formData.aliasesText || "")
      .split(",")
      .map((alias) => alias.trim())
      .filter(Boolean);
    const website = (formData.website || "").trim();
    setIsSavingBrand(true);
    setSaveError("");

    try {
      // Send the three form fields to the Python backend first.
      const response = await fetch(
        `${import.meta.env.VITE_BRAND_API_URL || ""}/api/brand-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, aliases, website: website || null }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
       throw new Error(result.detail || "Brand discovery failed");
     }

const profile = result.profile;

// Use this profile to update your brand details and counts.
console.log("Discovered social accounts:", profile.social_accounts);
console.log("Discovered mobile apps:", profile.mobile_apps);
console.log(
  "Discovered publishers:",
  profile.brand_identifiers?.known_publishers
);
      // Only save to Firestore after the backend accepts the input.
        
      const socialAssets = (profile?.social_accounts || []).map(
        (item, index) => ({
          id: `soc-${Date.now()}-${index}`,
          platform: item.platform || "Unknown",
          handle: item.handle || item.name || item.platform_url || "",
          url: item.platform_url || "",
          isVerified:
            item.verification_status ===
            "cross_linked_from_reference_website",
          verificationStatus:
            item.verification_status || "unverified_candidate",
        })
      );

      const mobileApps = (profile?.mobile_apps || []).map(
        (item, index) => ({
          id: `app-${Date.now()}-${index}`,
          name: item.app_name || "Unknown app",
          store: item.store || "Unknown store",
          listingUrl: item.store_url || "",
          packageId: item.app_id || "",
          publisherName: item.developer || "",
          isVerified:
            item.verification_status ===
            "cross_linked_from_reference_website",
          verificationStatus:
            item.verification_status || "unverified_candidate",
        })
      );

      const publisherNames = [
        ...new Set(
          (profile?.brand_identifiers?.known_publishers || [])
            .filter(
              (name) =>
                name &&
                !/^verified publisher name$/i.test(name.trim())
            )
            .map((name) => name.trim())
        ),
      ];

      const authorizedPublishers = publisherNames.map(
        (name, index) => ({
          id: `pub-${Date.now()}-${index}`,
          name,
          website: result.website || website,
          identifier: "",
          isVerified: false,
        })
      );

      await addBrand({
        name: result.name || name,
        aliases: result.aliases || aliases,
        website: result.website || website,
        legalName: result.name || name,
        description:
          profile?.website_metadata?.description ||
          "Brand profile registered for digital risk monitoring.",
        industry: "Other",
        region: "Global",
        logoUrl:
          profile?.official_logo?.logo_candidates?.[0]?.image_url || "",
        socialAssets,
        mobileApps,
        authorizedPublishers,
        discoveryProfile: profile,
        trustAssessment:
          result.trust_assessment ||
          profile?.trust_assessment ||
          null,
        outputFolder:
          result.output_folder || profile?.output_folder || null,
        trustedDomains: (result.website || website)
          ? [
              (result.website || website)
                .replace(/^https?:\/\//i, "")
                .replace(/\/$/, ""),
            ]
          : [],
        keywords: result.aliases || aliases,
        verifiedStatus: "pending",
        backendReceived: true,
      });

      setFormData((prev) => ({ ...prev, name: "", website: "", aliasesText: "" }));
      setIsAddingBrand(false);
    } catch (error) {
      console.error("Brand profile save failed:", error);
      setSaveError(error.message || "Could not connect to the Python backend.");
    } finally {
      setIsSavingBrand(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Page Header */}
      <div
        className="sm-flex-row sm-items-center"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <h1
            className="sm-text-2xl dark-text-white"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Brand Profiles
          </h1>
          <p
            className="dark-text-slate-400"
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              marginTop: 4,
              margin: 0,
            }}
          >
            Manage official brand trademarks, approved mobile packages, and
            verified social accounts.
          </p>
        </div>

        <button
          onClick={() => setIsAddingBrand(true)}
          className="hover-bg-indigo-500 cursor-pointer transition-colors sm-self-auto hover-shadow"
          style={{
            padding: "8px 16px",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#ffffff",
            backgroundColor: "#4f46e5",
            borderRadius: 8,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "none",
            alignSelf: "flex-start",
          }}
        >
          <Plus style={{ width: 14, height: 14 }} />
          <span>Add Brand Profile</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div
        className="sm-flex-row dark-bg-slate-900 dark-border-slate-800"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: 12,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
        }}
      >
        <div
          className="sm-w-72"
          style={{ position: "relative", width: "100%" }}
        >
          <Search
            style={{
              width: 14,
              height: 14,
              color: "#94a3b8",
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            placeholder="Search registered brands..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-100 placeholder-text-slate-400 focus-ring-indigo-500"
            style={{
              width: "100%",
              padding: "6px 12px 6px 36px",
              fontSize: "0.75rem",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#0f172a",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          className="sm-self-auto"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.75rem",
            alignSelf: "flex-end",
          }}
        >
          <span style={{ color: "#94a3b8", fontSize: "11px" }}>Filter:</span>
          <button
            onClick={() => setStatusFilter("all")}
            className={`cursor-pointer transition-colors ${
              statusFilter === "all"
                ? "dark-bg-slate-100 dark-text-slate-900"
                : "dark-text-slate-400 dark-hover-bg-slate-800 hover-bg-slate-100"
            }`}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              fontWeight: 500,
              fontSize: "0.75rem",
              border: "none",
              backgroundColor:
                statusFilter === "all" ? "#0f172a" : "transparent",
              color: statusFilter === "all" ? "#ffffff" : "#475569",
            }}
          >
            All Brands
          </button>
          <button
            onClick={() => setStatusFilter("verified")}
            className={`cursor-pointer transition-colors ${
              statusFilter === "verified"
                ? "dark-bg-slate-100 dark-text-slate-900"
                : "dark-text-slate-400 dark-hover-bg-slate-800 hover-bg-slate-100"
            }`}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              fontWeight: 500,
              fontSize: "0.75rem",
              border: "none",
              backgroundColor:
                statusFilter === "verified" ? "#0f172a" : "transparent",
              color: statusFilter === "verified" ? "#ffffff" : "#475569",
            }}
          >
            Verified Only
          </button>
        </div>
      </div>

      {/* Brands Table */}
      <div
        className="dark-bg-slate-900 dark-border-slate-800"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: "0.75rem",
              borderCollapse: "collapse",
            }}
          >
            <thead
              className="dark-bg-slate-800-90 dark-border-slate-700"
              style={{
                backgroundColor: "#f1f5f9",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <tr
                className="dark-text-slate-100"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                <th style={{ padding: "12px 16px" }}>Brand Entity</th>
                <th style={{ padding: "12px 16px" }}>Official Website</th>
                <th style={{ padding: "12px 16px" }}>Social Assets</th>
                <th style={{ padding: "12px 16px" }}>Mobile Apps</th>
                <th style={{ padding: "12px 16px" }}>Verification</th>
                <th style={{ padding: "12px 16px" }}>Last Scanned</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark-divide-slate-800 divide-slate-100">
              {filteredBrands.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding: "32px 0",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No brand profiles match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover-bg-slate-50-80 dark-hover-bg-slate-800-40 transition-colors"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          className="dark-bg-indigo-900-30 dark-border-indigo-800 dark-text-indigo-400"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            backgroundColor: "rgba(79, 70, 229, 0.1)",
                            border: "1px solid #e0e7ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "#4f46e5",
                            flexShrink: 0,
                          }}
                        >
                          {brand.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div
                            className="dark-text-white"
                            style={{
                              fontWeight: 600,
                              color: "#0f172a",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <span>{brand.name}</span>
                            {brand.id === selectedBrandId && (
                              <span
                                className="dark-bg-indigo-950-60 dark-text-indigo-400"
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: "#eef2ff",
                                  color: "#4f46e5",
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  fontFamily: "'JetBrains Mono', monospace",
                                }}
                              >
                                Active
                              </span>
                            )}
                          </div>
                          <div
                            className="truncate"
                            style={{
                              fontSize: "11px",
                              color: "#64748b",
                              maxWidth: 320,
                            }}
                          >
                            {brand.legalName}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      className="dark-text-indigo-400"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "#4f46e5",
                      }}
                    >
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover-underline"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <span>{brand.website.replace("https://", "")}</span>
                        <ExternalLink
                          style={{ width: 12, height: 12, color: "#94a3b8" }}
                        />
                      </a>
                    </td>

                    <td
                      className="dark-text-slate-300"
                      style={{ padding: "14px 16px", color: "#475569" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.75rem",
                        }}
                      >
                        <Share2
                          style={{ width: 14, height: 14, color: "#94a3b8" }}
                        />
                        <span>{brand.socialAssets.length} handles</span>
                      </div>
                    </td>

                    <td
                      className="dark-text-slate-300"
                      style={{ padding: "14px 16px", color: "#475569" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.75rem",
                        }}
                      >
                        <Smartphone
                          style={{ width: 14, height: 14, color: "#94a3b8" }}
                        />
                        <span>{brand.mobileApps.length} packages</span>
                      </div>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        className="dark-text-emerald-400"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#059669",
                        }}
                      >
                        <CheckCircle style={{ width: 12, height: 12 }} />
                        <span>Verified</span>
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "14px 16px",
                        color: "#94a3b8",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                      }}
                    >
                      {brand.lastScannedAt}
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          onClick={() => {
                            setSelectedBrandId(brand.id);
                            setInspectingBrand(brand);
                          }}
                          className="dark-text-slate-200 dark-hover-bg-slate-800 hover-bg-slate-100 transition-colors cursor-pointer"
                          style={{
                            padding: "4px 10px",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#334155",
                            backgroundColor: "transparent",
                            borderRadius: 4,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            border: "none",
                          }}
                        >
                          <Eye style={{ width: 12, height: 12 }} />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => deleteBrand(brand.id)}
                          className="hover-text-rose-500 transition-colors cursor-pointer"
                          title="Remove Brand"
                          style={{
                            padding: 4,
                            color: "#94a3b8",
                            background: "none",
                            border: "none",
                          }}
                        >
                          <Trash2 style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Brand Profile Modal: only fields used by the Python brand-profile script */}
      {isAddingBrand && (
        <div
          className="fade-in dark-bg-slate-900-60"
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backgroundColor: "rgba(5, 10, 25, 0.78)", backdropFilter: "blur(6px)" }}
        >
          <div className="dark-bg-slate-900 dark-border-slate-800 dark-text-white" style={{ width: "100%", maxWidth: 620, background: "#0f172a", border: "1px solid #263449", borderRadius: 18, padding: 28, boxShadow: "0 24px 80px rgba(0,0,0,.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
              <div>
                <div style={{ color: "#818cf8", fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Brand intelligence · New profile</div>
                <h2 style={{ margin: 0, color: "#f8fafc", fontSize: 23, fontWeight: 750 }}>Register a brand</h2>
                <p style={{ margin: "8px 0 0", color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>Add the known identity details used to identify possible impersonation.</p>
              </div>
              <button type="button" onClick={() => setIsAddingBrand(false)} aria-label="Close" style={{ border: "1px solid #334155", background: "#1e293b", color: "#cbd5e1", borderRadius: 9, padding: 8, cursor: "pointer" }}><X size={17} /></button>
            </div>
            <form onSubmit={handleSaveBrand} style={{ display: "flex", flexDirection: "column", gap: 19 }}>
              {saveError && <div role="alert" style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.35)", color: "#fca5a5", fontSize: 13 }}>{saveError} Make sure the Python backend is running.</div>}
              <div>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Company / Brand Name <span style={{ color: "#f87171" }}>*</span></label>
                <input autoFocus required type="text" placeholder="e.g. Acme Corp" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", boxSizing: "border-box", padding: "12px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#f8fafc", outlineColor: "#6366f1", fontSize: 14 }} />
                <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 11 }}>The primary name your monitoring system should search for.</p>
              </div>
              <div>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Known Brand Aliases <span style={{ color: "#64748b", fontWeight: 400 }}>(optional)</span></label>
                <input type="text" placeholder="Acme, Acme Technologies, Acme Official" value={formData.aliasesText || ""} onChange={(e) => setFormData({ ...formData, aliasesText: e.target.value })} style={{ width: "100%", boxSizing: "border-box", padding: "12px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#f8fafc", outlineColor: "#6366f1", fontSize: 14 }} />
                <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 11 }}>Separate each alternative name with a comma.</p>
              </div>
              <div>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Official Website / Domain</label>
                <input type="text" placeholder="e.g. https://nike.com or nike.com" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} style={{ width: "100%", boxSizing: "border-box", padding: "12px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#f8fafc", outlineColor: "#6366f1", fontSize: 14 }} />
                <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 11 }}>Enter only a website/domain you independently confirmed.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, borderTop: "1px solid #263449", paddingTop: 18, marginTop: 3 }}>
                <button type="button" onClick={() => setIsAddingBrand(false)} style={{ padding: "10px 16px", border: "1px solid #334155", borderRadius: 9, background: "transparent", color: "#cbd5e1", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={isSavingBrand} style={{ padding: "10px 18px", border: 0, borderRadius: 9, background: isSavingBrand ? "#6366f1" : "#4f46e5", color: "white", fontWeight: 700, cursor: isSavingBrand ? "wait" : "pointer", opacity: isSavingBrand ? 0.75 : 1, boxShadow: "0 5px 18px rgba(79,70,229,.25)" }}>{isSavingBrand ? "Submitting brand profile…" : "Save Brand Profile"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Detail Modal */}
      {inspectingBrand && (
        <div
          className="fade-in dark-bg-slate-900-60"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="dark-bg-slate-900 dark-border-slate-800 dark-text-white"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxWidth: "48rem",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              color: "#0f172a",
            }}
          >
            <div
              className="dark-border-slate-800"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 16,
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  className="dark-bg-indigo-900-30 dark-border-indigo-800 dark-text-indigo-400"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: "rgba(79, 70, 229, 0.1)",
                    border: "1px solid #e0e7ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#4f46e5",
                    fontSize: "0.75rem",
                  }}
                >
                  {inspectingBrand.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontSize: "0.75rem", fontWeight: 700, margin: 0 }}>
                    {inspectingBrand.name}
                  </h3>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    {inspectingBrand.legalName}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectingBrand(null)}
                className="dark-hover-text-slate-200 cursor-pointer"
                style={{
                  padding: 4,
                  color: "#94a3b8",
                  background: "none",
                  border: "none",
                }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* Tabs */}
            <div
              className="dark-border-slate-800"
              style={{
                display: "flex",
                borderBottom: "1px solid #e2e8f0",
                fontSize: "0.75rem",
              }}
            >
              <button
                onClick={() => setBrandDetailTab("overview")}
                className={`transition-colors cursor-pointer ${
                  brandDetailTab === "overview" ? "dark-text-indigo-400" : ""
                }`}
                style={{
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontWeight: 500,
                  borderBottom:
                    brandDetailTab === "overview"
                      ? "2px solid #4f46e5"
                      : "2px solid transparent",
                  color: brandDetailTab === "overview" ? "#4f46e5" : "#64748b",
                  background: "none",
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setBrandDetailTab("apps")}
                className={`transition-colors cursor-pointer ${
                  brandDetailTab === "apps" ? "dark-text-indigo-400" : ""
                }`}
                style={{
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontWeight: 500,
                  borderBottom:
                    brandDetailTab === "apps"
                      ? "2px solid #4f46e5"
                      : "2px solid transparent",
                  color: brandDetailTab === "apps" ? "#4f46e5" : "#64748b",
                  background: "none",
                }}
              >
                Mobile Apps ({inspectingBrand.mobileApps.length})
              </button>
              <button
                onClick={() => setBrandDetailTab("social")}
                className={`transition-colors cursor-pointer ${
                  brandDetailTab === "social" ? "dark-text-indigo-400" : ""
                }`}
                style={{
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontWeight: 500,
                  borderBottom:
                    brandDetailTab === "social"
                      ? "2px solid #4f46e5"
                      : "2px solid transparent",
                  color: brandDetailTab === "social" ? "#4f46e5" : "#64748b",
                  background: "none",
                }}
              >
                Social Assets ({inspectingBrand.socialAssets.length})
              </button>
              <button
                onClick={() => setBrandDetailTab("publishers")}
                className={`transition-colors cursor-pointer ${
                  brandDetailTab === "publishers" ? "dark-text-indigo-400" : ""
                }`}
                style={{
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontWeight: 500,
                  borderBottom:
                    brandDetailTab === "publishers"
                      ? "2px solid #4f46e5"
                      : "2px solid transparent",
                  color:
                    brandDetailTab === "publishers" ? "#4f46e5" : "#64748b",
                  background: "none",
                }}
              >
                Authorized Publishers (
                {inspectingBrand.authorizedPublishers.length})
              </button>
            </div>

            {/* Tab Content */}
            <div
              style={{
                fontSize: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {brandDetailTab === "overview" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <p
                    className="dark-text-slate-300"
                    style={{ color: "#475569", lineHeight: 1.625, margin: 0 }}
                  >
                    {inspectingBrand.description}
                  </p>
                  <div
                    className="dark-bg-slate-800-40"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 16,
                      padding: 16,
                      backgroundColor: "#f8fafc",
                      borderRadius: 12,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "11px",
                          display: "block",
                        }}
                      >
                        Industry:
                      </span>
                      <span style={{ fontWeight: 500 }}>
                        {inspectingBrand.industry}
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "11px",
                          display: "block",
                        }}
                      >
                        Operating Region:
                      </span>
                      <span style={{ fontWeight: 500 }}>
                        {inspectingBrand.region}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "11px",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Approved Brand Aliases:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {inspectingBrand.aliases.map((a) => (
                        <span
                          key={a}
                          className="dark-bg-slate-800"
                          style={{
                            padding: "2px 8px",
                            borderRadius: 4,
                            backgroundColor: "#f1f5f9",
                            fontSize: "11px",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {brandDetailTab === "apps" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {inspectingBrand.mobileApps.map((app) => (
                    <div
                      key={app.id}
                      className="dark-bg-slate-800-60 dark-border-slate-800"
                      style={{
                        padding: 12,
                        backgroundColor: "#f8fafc",
                        borderRadius: 12,
                        border: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          className="dark-text-white"
                          style={{ fontWeight: 700, color: "#0f172a" }}
                        >
                          {app.name}
                        </div>
                        <div
                          style={{
                            color: "#64748b",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "11px",
                          }}
                        >
                          Package ID: {app.packageId}
                        </div>
                        <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                          Publisher: {app.publisherName}
                        </div>
                      </div>
                      <span
                        className="dark-text-emerald-400"
                        style={{
                          color: "#059669",
                          fontSize: "11px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <CheckCircle style={{ width: 14, height: 14 }} />
                        <span>Verified Whitelisted</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {brandDetailTab === "social" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {inspectingBrand.socialAssets.map((soc) => (
                    <div
                      key={soc.id}
                      className="dark-bg-slate-800-60 dark-border-slate-800"
                      style={{
                        padding: 12,
                        backgroundColor: "#f8fafc",
                        borderRadius: 12,
                        border: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700 }}>{soc.handle}</div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {soc.platform}
                        </div>
                      </div>
                      <a
                        href={soc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="dark-text-indigo-400 hover-underline"
                        style={{
                          color: "#4f46e5",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "11px",
                          textDecoration: "none",
                        }}
                      >
                        <span>Inspect Profile</span>
                        <ExternalLink style={{ width: 12, height: 12 }} />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {brandDetailTab === "publishers" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {inspectingBrand.authorizedPublishers.map((pub) => (
                    <div
                      key={pub.id}
                      className="dark-bg-slate-800-60 dark-border-slate-800"
                      style={{
                        padding: 12,
                        backgroundColor: "#f8fafc",
                        borderRadius: 12,
                        border: "1px solid #f1f5f9",
                      }}
                    >
                      <div
                        className="dark-text-white"
                        style={{ fontWeight: 700, color: "#0f172a" }}
                      >
                        {pub.name}
                      </div>
                      <div
                        style={{
                          color: "#64748b",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                          marginTop: 2,
                        }}
                      >
                        Registry ID: {pub.identifier}
                      </div>
                      {pub.notes && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#94a3b8",
                            marginTop: 4,
                            margin: 0,
                          }}
                        >
                          {pub.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="dark-border-slate-800"
              style={{
                paddingTop: 12,
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setInspectingBrand(null)}
                className="dark-bg-slate-800 dark-text-slate-200 cursor-pointer"
                style={{
                  padding: "6px 16px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  backgroundColor: "#f1f5f9",
                  borderRadius: 8,
                  color: "#334155",
                  border: "none",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
