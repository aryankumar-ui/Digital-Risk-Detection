import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Network, Search, ZoomIn, ZoomOut, Maximize2, Info, X, Play, Smartphone, ShieldAlert, CalendarClock, Share2, Download, Building2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import "./graph-styles.css";

const colors = { official: "#00d6ae", suspicious: "#ff3f76", evidence: "#765bff", external: "#ffbd43" };
const edgeColors = { suspicious: colors.suspicious, evidence: colors.evidence, external: colors.external };
const typeLabels = { suspicious: "Suspicious relationship", evidence: "Supporting evidence", external: "External entity" };

function nodeGlyph(kind) {
  return { official: "▣", suspicious: "▶", evidence: "T", external: "●" }[kind] || "•";
}

function paintNode(node, ctx, scale, selectedId, isLight) {
  const x = node.x || 0, y = node.y || 0;
  const r = node.kind === "official" ? 28 : node.kind === "suspicious" ? 24 : 19;
  const c = colors[node.kind] || "#9aa9c2";
  
  ctx.save();
  ctx.shadowColor = c;
  ctx.shadowBlur = node.id === selectedId ? 22 : 10;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = isLight ? "#ffffff" : "#101a31";
  ctx.fill();
  ctx.lineWidth = node.id === selectedId ? 3.5 : 2;
  ctx.strokeStyle = c;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(x, y, r - 6, 0, Math.PI * 2);
  ctx.fillStyle = c + "24";
  ctx.fill();
  ctx.fillStyle = isLight ? "#0f172a" : "#f6f8ff";
  ctx.font = `700 ${node.kind === "official" ? 18 : 14}px Inter,system-ui,sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(nodeGlyph(node.kind), x, y + 1);
  
  const label = (node.name || "").length > 26 ? (node.name || "").slice(0, 24) + "…" : (node.name || "");
  const font = Math.max(10, 11 / Math.sqrt(Math.max(0.6, scale)));
  ctx.font = `600 ${font}px Inter,system-ui,sans-serif`;
  const w = Math.min(210, Math.max(88, ctx.measureText(label).width + 18));
  const ly = y + r + 7;
  
  ctx.fillStyle = isLight ? "#f1f5f9" : "#0b1428";
  ctx.strokeStyle = node.id === selectedId ? c : (isLight ? "#cbd5e1" : "#283956");
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - w / 2, ly, w, 34, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = isLight ? "#0f172a" : "#edf3ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, ly + 11);
  ctx.fillStyle = isLight ? "#475569" : "#93a3c0";
  ctx.font = `400 ${Math.max(8, font - 1)}px Inter,system-ui,sans-serif`;
  ctx.fillText((node.subtitle || "").split(" · ")[0], x, ly + 24);
  ctx.restore();
}

export const ThreatGraphView = () => {
  const { 
    brands, 
    appFindings,
    socialFindings,
    selectedAppFinding, 
    selectedSocialFinding,
    selectedBrandId,
    theme 
  } = useApp();
  
  const graphRef = useRef();
  const wrapRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 850, height: 480 });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState([]);
  const [showTable, setShowTable] = useState(true);
  
  const isLight = theme === "light";
  
  // Fallback to the first available finding for the brand if none is selected
  const activeBrandId = selectedAppFinding?.brandId || selectedSocialFinding?.brandId || selectedBrandId || brands[0]?.id;
  const defaultAppFinding = appFindings?.find(f => f.brandId === activeBrandId) || appFindings?.[0];
  const defaultSocialFinding = socialFindings?.find(f => f.brandId === activeBrandId) || socialFindings?.[0];
  
  const activeFinding = selectedAppFinding || selectedSocialFinding || defaultAppFinding || defaultSocialFinding;
  const findingType = (selectedAppFinding || (!selectedSocialFinding && defaultAppFinding)) ? "app" : (activeFinding ? "social" : null);

  const brand = brands.find(b => b.id === activeBrandId) || brands[0];

  const data = useMemo(() => {
    if (!activeFinding || !brand) return { nodes: [], links: [] };
    
    let nodes = [];
    let links = [];
    
    // 1. Official Node
    const offId = "official";
    if (findingType === "app") {
      const officialApp = brand.mobileApps?.[0];
      nodes.push({
        id: offId,
        name: officialApp ? officialApp.appName : brand.name + " Official",
        kind: "official",
        subtitle: "Official App · Verified publisher",
        risk: "Verified",
        detail: "Official application used as the trusted reference."
      });
    } else {
      nodes.push({
        id: offId,
        name: brand.name + " Official",
        kind: "official",
        subtitle: "Official Profile · Verified",
        risk: "Verified",
        detail: "Official brand profile used as the trusted reference."
      });
    }

    // 2. Suspicious Candidate Node
    const candId = "candidate_" + activeFinding.id;
    const name = activeFinding.appName || activeFinding.accountName || activeFinding.handle || "Unknown Entity";
    nodes.push({
      id: candId,
      name: name,
      kind: "suspicious",
      subtitle: `${activeFinding.store || activeFinding.platform || "Platform"} · Suspicious listing`,
      risk: `${(activeFinding.riskLevel || "medium").toUpperCase()} · ${activeFinding.riskScore || 0}/100`,
      detail: activeFinding.detectionReason || "Suspicious entity detected."
    });
    
    links.push({
      source: offId,
      target: candId,
      label: "Compared against",
      type: "suspicious",
      detail: "The candidate was compared against the verified official asset."
    });

    // 3. Evidence Nodes
    const reason = (activeFinding.detectionReason || "").toLowerCase();
    
    // Evidence A: Name Similarity
    const nameNodeId = "ev_name";
    nodes.push({
      id: nameNodeId,
      name: "Name similarity analysis",
      kind: "evidence",
      subtitle: "Text matching signal",
      risk: activeFinding.similarityScore > 80 ? "Strong match" : "Weak match",
      detail: "Name-matching signal indicates resemblance to the protected brand name."
    });
    links.push({
      source: candId,
      target: nameNodeId,
      label: "Analyzed text",
      type: "evidence",
      detail: `The candidate name '${name}' was analyzed against the official asset.`
    });

    // Evidence B: Risk Assessment Model
    const riskNodeId = "ev_risk";
    nodes.push({
      id: riskNodeId,
      name: "Risk assessment model",
      kind: "evidence",
      subtitle: "Machine learning classifier",
      risk: "Computed risk",
      detail: `The heuristic risk engine assigned a score of ${activeFinding.riskScore || 0}/100.`
    });
    links.push({
      source: candId,
      target: riskNodeId,
      label: "Scored by model",
      type: "evidence",
      detail: "Candidate was processed by the detection engine."
    });

    // Evidence C: Distribution Platform
    const platform = activeFinding.store || activeFinding.platform || "Unknown platform";
    const platformNodeId = "ev_platform_" + platform.replace(/[^a-zA-Z0-9]/g, "");
    nodes.push({
      id: platformNodeId,
      name: platform,
      kind: "external",
      subtitle: "Distribution Source",
      risk: "Third-party platform",
      detail: `Entity found hosted or listed on ${platform}.`
    });
    links.push({
      source: candId,
      target: platformNodeId,
      label: "Distributed via",
      type: "external",
      detail: `The candidate is listed on ${platform}.`
    });

    // Evidence D: Visual/Logo Similarity
    if (reason.includes("icon") || reason.includes("logo") || reason.includes("visual")) {
      const iconNodeId = "ev_icon";
      nodes.push({
        id: iconNodeId,
        name: "Visual similarity",
        kind: "evidence",
        subtitle: "Visual matching signal",
        risk: "Strong match",
        detail: "Visual comparison indicates a resemblance to official brand assets."
      });
      links.push({
        source: candId,
        target: iconNodeId,
        label: "Similar visual assets",
        type: "evidence",
        detail: "Candidate uses graphics similar to the official brand."
      });
    }

    // Evidence E: Developer / Publisher
    if (activeFinding.developer && activeFinding.developer.toLowerCase() !== brand.name.toLowerCase()) {
      const devNodeId = "dev_" + activeFinding.developer.replace(/[^a-zA-Z0-9]/g, "");
      nodes.push({
        id: devNodeId,
        name: activeFinding.developer,
        kind: "external",
        subtitle: "Developer / Publisher",
        risk: "Publisher mismatch",
        detail: `Developer associated with the candidate. Does not match authorized publisher.`
      });
      links.push({
        source: candId,
        target: devNodeId,
        label: "Published by",
        type: "external",
        detail: `The candidate lists '${activeFinding.developer}' as its developer.`
      });
    } else if (!activeFinding.developer) {
      const genericEvId = "ev_generic";
      nodes.push({
        id: genericEvId,
        name: "Behavioral flags",
        kind: "evidence",
        subtitle: "Risk signal",
        risk: "Review needed",
        detail: activeFinding.detectionReason || "Multiple risk factors contributed to the score."
      });
      links.push({
        source: candId,
        target: genericEvId,
        label: "Detection flags",
        type: "evidence",
        detail: "The system flagged this candidate based on heuristic rules."
      });
    }

    return { nodes, links };
  }, [brand, activeFinding, findingType]);

  // Initially select the suspicious candidate
  useEffect(() => {
    if (data.nodes.length > 0) {
      const candidate = data.nodes.find(n => n.kind === "suspicious");
      setSelected(candidate || data.nodes[0]);
    } else {
      setSelected(null);
    }
  }, [data]);

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    return new Set(data.nodes.filter(n => !q || `${n.name} ${n.subtitle} ${n.kind} ${n.detail}`.toLowerCase().includes(q)).map(n => n.id));
  }, [data, search]);
  
  const links = useMemo(() => data.links.filter(l => {
    const s = typeof l.source === "object" ? l.source.id : l.source;
    const t = typeof l.target === "object" ? l.target.id : l.target;
    return (!activeTypes.length || activeTypes.includes(l.type)) && matches.has(s) && matches.has(t);
  }), [data, activeTypes, matches]);
  
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(es => {
      const r = es[0].contentRect;
      setDimensions({ width: Math.max(300, r.width), height: Math.max(400, r.height) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [activeFinding]);
  
  useEffect(() => {
    const g = graphRef.current;
    if (g) {
      g.d3Force("charge")?.strength(-400);
      g.d3Force("link")?.distance(120);
      g.d3Force("center")?.strength(0.1);
      setTimeout(() => g.zoomToFit(400, 50), 100);
    }
  }, [data]);
  
  const nodePaint = useCallback((n, ctx, scale) => paintNode(n, ctx, scale, selected?.id, isLight), [selected, isLight]);
  const linkPaint = useCallback((l, ctx, scale) => {
    const s = l.source, t = l.target;
    if (!s || !t || typeof s !== "object" || typeof t !== "object") return;
    
    // Highlight if selected node is part of this link
    const isRelated = selected && (s.id === selected.id || t.id === selected.id);
    const c = edgeColors[l.type] || colors.evidence;
    
    ctx.save();
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.lineWidth = (isRelated ? 2.5 : 1.5) / Math.max(0.7, scale);
    ctx.globalAlpha = isRelated ? 1 : 0.4;
    ctx.setLineDash(l.type === "external" ? [5/scale, 4/scale] : []);
    
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(t.x, t.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    const a = Math.atan2(t.y - s.y, t.x - s.x);
    const len = (isRelated ? 8 : 6) / Math.max(0.7, scale);
    ctx.beginPath();
    ctx.moveTo(t.x, t.y);
    ctx.lineTo(t.x - len * Math.cos(a - 0.45), t.y - len * Math.sin(a - 0.45));
    ctx.lineTo(t.x - len * Math.cos(a + 0.45), t.y - len * Math.sin(a + 0.45));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, [selected]);
  
  const toggle = t => setActiveTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const reset = () => graphRef.current?.zoomToFit(500, 45);
  
  const exportOne = () => {
    const body = `Selected evidence,Value\nEntity,${selected?.name || "None"}\nType,${selected?.kind || ""}\nRisk,${selected?.risk || ""}\nDetails,"${(selected?.detail || "").replaceAll('"', '""')}"`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected-evidence.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cardStyle = isLight ? { background: "#ffffff", borderColor: "#e2e8f0" } : {};
  const headerStyle = isLight ? { borderBottomColor: "#e2e8f0", color: "#0f172a" } : {};
  const toolbarStyle = isLight ? { borderBottomColor: "#e2e8f0", background: "#f8fafc" } : {};
  const searchStyle = isLight ? { background: "#ffffff", borderColor: "#e2e8f0", color: "#0f172a" } : {};
  const btnStyle = isLight ? { background: "#ffffff", borderColor: "#cbd5e1", color: "#475569" } : {};
  const legendStyle = isLight ? { background: "#f8fafc", borderLeftColor: "#e2e8f0" } : {};
  const entityStyle = isLight ? { background: "#ffffff", borderColor: "#e2e8f0" } : {};
  const bottomStyle = isLight ? { background: "#f8fafc", borderTopColor: "#e2e8f0" } : {};
  const tableStyle = isLight ? { background: "#ffffff", borderTopColor: "#e2e8f0", color: "#0f172a" } : {};
  const footerStyle = isLight ? { borderTopColor: "#e2e8f0", color: "#64748b" } : {};

  const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!activeFinding) {
    if (isInitializing) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", width: "100%", flexDirection: "column" }}>
          <div className="animate-spin" style={{ width: 32, height: 32, border: `3px solid ${isLight ? "#e2e8f0" : "#1e293b"}`, borderTopColor: "#3b82f6", borderRadius: "50%", marginBottom: 16 }} />
          <div style={{ color: isLight ? "#64748b" : "#94a3b8", fontSize: "14px", fontWeight: 500 }}>
            Analyzing Evidence Graph...
          </div>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: "100vw", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Network size={48} color={isLight ? "#cbd5e1" : "#334155"} style={{ marginBottom: 16 }} />
        <h2 style={{ color: isLight ? "#0f172a" : "#ffffff", margin: 0 }}>No Finding Selected</h2>
        <p style={{ color: "#64748b", maxWidth: 400, textAlign: "center" }}>
          Please select a finding from App Store Monitoring or Social Media Monitoring and click "Inspect Evidence" to explore its evidence graph.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: "100vw" }}>
      {/* Brand & Finding Selection Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: isLight ? "#0f172a" : "#ffffff" }}>
            Threat Evidence Graph
          </h1>
          <p style={{ color: "#64748b", margin: 0, marginTop: 4 }}>
            Explore why '{activeFinding?.appName || activeFinding?.accountName || activeFinding?.handle || "this asset"}' was flagged.
          </p>
        </div>
        
        <div style={{ display: "flex", gap: 12 }}>
          <select 
            value={activeBrandId || ""}
            onChange={(e) => {
              // Selecting a brand resets to the first available finding for that brand
              const newBrandId = e.target.value;
              const defaultApp = appFindings?.find(f => f.brandId === newBrandId);
              const defaultSoc = socialFindings?.find(f => f.brandId === newBrandId);
              if (defaultApp) {
                setSelectedAppFinding(defaultApp);
                setSelectedSocialFinding(null);
              } else if (defaultSoc) {
                setSelectedSocialFinding(defaultSoc);
                setSelectedAppFinding(null);
              }
            }}
            style={{
              padding: "8px 12px",
              backgroundColor: isLight ? "#ffffff" : "#1e293b",
              border: `1px solid ${isLight ? "#e2e8f0" : "#334155"}`,
              borderRadius: 8,
              color: isLight ? "#0f172a" : "#f8fafc",
              outline: "none"
            }}
          >
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <select 
            value={activeFinding?.id || ""}
            onChange={(e) => {
              const val = e.target.value;
              const appF = appFindings?.find(f => f.id === val);
              if (appF) {
                setSelectedAppFinding(appF);
                setSelectedSocialFinding(null);
              } else {
                const socF = socialFindings?.find(f => f.id === val);
                if (socF) {
                  setSelectedSocialFinding(socF);
                  setSelectedAppFinding(null);
                }
              }
            }}
            style={{
              padding: "8px 12px",
              backgroundColor: isLight ? "#ffffff" : "#1e293b",
              border: `1px solid ${isLight ? "#e2e8f0" : "#334155"}`,
              borderRadius: 8,
              color: isLight ? "#0f172a" : "#f8fafc",
              outline: "none",
              minWidth: 250
            }}
          >
            <optgroup label="App Store Monitoring">
              {appFindings?.filter(f => f.brandId === activeBrandId).map(f => (
                <option key={f.id} value={f.id}>{f.appName} ({f.store})</option>
              ))}
            </optgroup>
            <optgroup label="Social Media Monitoring">
              {socialFindings?.filter(f => f.brandId === activeBrandId).map(f => (
                <option key={f.id} value={f.id}>{f.handle || f.displayName} ({f.platform})</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      <section className={`evidence-card ${isLight ? 'light' : ''}`} style={cardStyle}>
        <div className="graph-heading" style={headerStyle}>
          <div className="graph-title-icon"><Network size={21}/></div>
          <div>
            <h2 style={{color: isLight ? "#0f172a" : undefined}}>Evidence Graph for {brand?.name}</h2>
            <p>Targeted investigation of official assets and candidate evidence.</p>
          </div>
          <div className="graph-count"><span className="live-dot"/>{data.nodes.length} nodes <b>·</b> {links.length} relationships</div>
        </div>
        
        <div className="graph-toolbar" style={toolbarStyle}>
          <label className="graph-search" style={searchStyle}>
            <Search size={15}/>
            <input style={{color: isLight ? "#0f172a" : undefined}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search node or evidence…"/>
            <kbd>⌕</kbd>
          </label>
          <div className="graph-actions">
            <button title="Zoom in" onClick={()=>graphRef.current?.zoom((graphRef.current?.zoom()||1)*1.3,250)} style={btnStyle}><ZoomIn size={16}/></button>
            <button title="Zoom out" onClick={()=>graphRef.current?.zoom((graphRef.current?.zoom()||1)/1.3,250)} style={btnStyle}><ZoomOut size={16}/></button>
            <button title="Fit graph" onClick={reset} style={btnStyle}><Maximize2 size={15}/><span>Reset view</span></button>
          </div>
        </div>

        <div className="graph-layout">
          <div className="graph-canvas" ref={wrapRef}>
            <div className="canvas-tag"><span className="live-dot"/> {findingType.toUpperCase()} EVIDENCE MAP</div>
            <ForceGraph2D 
              ref={graphRef} 
              graphData={{nodes:data.nodes.filter(n=>matches.has(n.id)),links}} 
              width={dimensions.width} 
              height={dimensions.height} 
              backgroundColor={isLight?"#f8fafc":"#071022"} 
              nodeCanvasObject={nodePaint} 
              nodePointerAreaPaint={(n,c,ctx)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(n.x,n.y,n.kind==="official"?33:28,0,Math.PI*2);ctx.fill()}} 
              linkCanvasObjectMode={()=>"replace"} 
              linkCanvasObject={linkPaint} 
              onNodeClick={n=>setSelected(n)} 
              onBackgroundClick={()=>setSelected(null)} 
              onNodeDragEnd={(node) => { node.fx = node.x; node.fy = node.y; }} 
              cooldownTicks={150} 
              enableNodeDrag 
              d3AlphaDecay={0.05} 
              d3VelocityDecay={0.4}
            />
            <div className="canvas-hint">Drag nodes to explore · Select a node to inspect evidence</div>
          </div>
          
          <aside className="graph-legend" style={legendStyle}>
            <div className="inspector-head">
              <div><span className="eyebrow">EVIDENCE INSPECTOR</span><h3 style={{color: isLight ? "#0f172a" : undefined}}>Selected Evidence</h3></div>
              <button className="icon-button" onClick={()=>setSelected(null)} title="Clear selection"><X size={15}/></button>
            </div>
            {selected ? (
              <>
                <div className={`selected-entity ${selected.kind}`} style={entityStyle}>
                  <div className="entity-icon">{nodeGlyph(selected.kind)}</div>
                  <div className="entity-title"><strong style={{color: isLight ? "#0f172a" : undefined}}>{selected.name}</strong><small>{selected.subtitle}</small></div>
                  <span className={`risk-pill ${selected.kind}`}>{(selected.risk||"").split(" · ")[0]}</span>
                </div>
                <div className="detail-list">
                  <div><span><ShieldAlert size={14}/> Risk / status</span><b className={selected.kind}>{selected.risk}</b></div>
                  <div><span><Smartphone size={14}/> Entity type</span><b>{({official:"Official asset",suspicious:"Suspicious candidate",evidence:"Supporting evidence",external:"External entity"})[selected.kind]}</b></div>
                  <div className="analysis-label"><span><Info size={14}/> Analysis Details</span></div>
                  <p>{selected.detail}</p>
                </div>
                <button className="export-selected" onClick={exportOne}><Download size={14}/> Export selected evidence</button>
              </>
            ) : (
              <div className="empty-inspector"><Info size={22}/><p>Select a graph node to see its risk, context, and supporting signals.</p></div>
            )}
            <div className="timeline">
              <h3 style={{color: isLight ? "#0f172a" : undefined}}><CalendarClock size={15}/> Evidence Timeline</h3>
              <div className="timeline-item"><i className="pink-dot"/><div><small>Just now</small><strong style={{color: isLight ? "#0f172a" : undefined}}>Graph Generated</strong><p>Analyzed relationship logic for selected candidate.</p></div></div>
              <div className="timeline-item"><i className="purple-dot"/><div><small>Past 24h</small><strong style={{color: isLight ? "#0f172a" : undefined}}>Evidence detected</strong><p>System flagged {activeFinding.appName || activeFinding.handle} as suspicious.</p></div></div>
            </div>
          </aside>
        </div>
        
        <div className="graph-bottom" style={bottomStyle}>
          <div className="filter-strip">
            <strong style={{color: isLight ? "#0f172a" : undefined}}>Relationship filters</strong>
            {Object.keys(edgeColors).map(t=><label key={t} className="filter-chip"><input type="checkbox" checked={activeTypes.includes(t)} onChange={()=>toggle(t)}/><i style={{background:edgeColors[t]}}/>{typeLabels[t]}</label>)}
            <button onClick={()=>{setActiveTypes([]);setSearch("")}}>Clear filters</button>
          </div>
          <button className="table-toggle" onClick={()=>setShowTable(v=>!v)}>{showTable?"Hide":"Show"} relationship details</button>
        </div>
        
        {showTable && (
          <div className="relationship-table-wrap" style={tableStyle}>
            <div className="table-heading" style={isLight ? {color: "#0f172a"} : {}}>
              <Share2 size={16}/><strong>Relationship Details</strong><span>Showing {links.length} connections</span>
            </div>
            <div className="table-scroll">
              <table>
                <thead style={isLight ? {background:"#f1f5f9"} : {}}>
                  <tr style={isLight ? {color: "#475569"} : {}}>
                    <th>FROM</th><th>RELATIONSHIP</th><th>TO</th><th>DETAILS</th><th/>
                  </tr>
                </thead>
                <tbody>
                  {links.map((l,i) => {
                    const source = typeof l.source==="object" ? l.source : data.nodes.find(n=>n.id===l.source);
                    const target = typeof l.target==="object" ? l.target : data.nodes.find(n=>n.id===l.target);
                    // Click highlights the specific node in the evidence inspector and centers graph
                    return (
                      <tr key={i} onClick={() => {
                        setSelected(target);
                        graphRef.current?.centerAt(target.x, target.y, 500);
                        graphRef.current?.zoom(2.5, 500);
                      }} style={isLight ? {color: "#0f172a", borderTopColor: "#e2e8f0"} : {}}>
                        <td><span className={`mini-node ${source?.kind}`}/>{source?.name}</td>
                        <td><span className="relationship-pill" style={{borderColor:edgeColors[l.type],color:edgeColors[l.type]}}>{l.label}</span></td>
                        <td><span className={`mini-node ${target?.kind}`}/>{target?.name}</td>
                        <td style={isLight ? {color: "#475569"} : {}}>{l.detail || (l.type==="suspicious"?"Potential impersonation signal":l.type==="evidence"?"Supporting match signal":"Association requires verification")}</td>
                        <td>›</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <footer className="graph-footer" style={footerStyle}>
          <span><i/> {findingType.charAt(0).toUpperCase() + findingType.slice(1)} Evidence Map</span>
          <span>Relationships are suspected or observed links, not proof of malicious intent.</span>
        </footer>
      </section>
    </div>
  );
}
