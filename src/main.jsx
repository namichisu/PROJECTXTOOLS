import React,{useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {Layers3,Moon,Sun,Search,FileText,Image,Type,Code2,GraduationCap,Calculator,X,Download,Lock,Smartphone,Zap} from "lucide-react";
import {tools} from "./data/tools";
import "./styles.css";

const iconMap={"PDF & Files":FileText,"Image Tools":Image,"Text Tools":Type,"Developer Tools":Code2,"Student Tools":GraduationCap,"Finance & Everyday":Calculator};

function ToolModal({tool,onClose}){
 if(!tool)return null;
 const [text,setText]=useState("");
 const [result,setResult]=useState("");
 const [file,setFile]=useState(null);
 const action=()=>{
   const id=tool[4];
   if(id==="wordCounter"){const t=text.trim();setResult(`Words: ${t?t.split(/\\s+/).length:0} | Characters: ${text.length}`)}
   if(id==="wordCounter"){const t=text.trim();setResult(`Words: ${t?t.split(/\s+/).length:0} | Characters: ${text.length}`)}
   else if(id==="jsonFormatter"){try{setResult(JSON.stringify(JSON.parse(text),null,2))}catch{setResult("Invalid JSON")}}
   else if(id==="caseConverter")setResult(text.toUpperCase());
   else if(id==="reverseText")setResult([...text].reverse().join(""));
   else if(id==="slug")setResult(text.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""));
   else if(id==="uuid")setResult(crypto.randomUUID());
   else if(id==="percentage"){const [a,b]=text.split(",").map(Number);setResult(b?`${(a/b*100).toFixed(2)}%`:"Enter: part,total")}
   else if(id==="calculator"){try{if(!/^[0-9+\-*/().%\s]+$/.test(text))throw 0;setResult(String(Function(`return (${text})`)()))}catch{setResult("Invalid expression")}}
   else if(id==="password"){let chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";let s="";for(let i=0;i<16;i++)s+=chars[Math.floor(Math.random()*chars.length)];setResult(s)}
   else if(id==="base64"){try{setResult(btoa(text))}catch{setResult("Could not encode text")}}
   else if(id==="textRepeater")setResult(Array(5).fill(text).join("\n"));
   else if(id==="pdfText"||id==="photoPdf"||id==="mergePdf")setResult(file?`File selected: ${file.name}. Advanced PDF processing module is ready to be connected here.`:"Please choose a file.");
   else setResult("Tool UI is ready. This module can be expanded with its specific processing logic.");
 };
 return <div className="modalBackdrop" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal">
   <button className="closeBtn" onClick={onClose}><X/></button><div className="modalIcon"><FileText/></div>
   <h2>{tool[2]}</h2><p>{tool[3]}</p>
   {["pdfText","photoPdf","mergePdf","splitPdf","imageResize","imageConvert","imageCompress","imageRotate","imageBase64","favicon"].includes(tool[4])?<input type="file" onChange={e=>setFile(e.target.files?.[0])}/>:<textarea value={text} onChange={e=>setText(e.target.value)} placeholder={`Enter data for ${tool[2]}...`}/>}
   <button className="primary" onClick={action}>Run Tool</button>
   {result&&<pre className="result">{result}</pre>}
 </div></div>
}

function App(){
 const [dark,setDark]=useState(false),[query,setQuery]=useState(""),[category,setCategory]=useState("All"),[selected,setSelected]=useState(null);
 const categories=["All",...new Set(tools.map(t=>t[0]))];
 const filtered=useMemo(()=>tools.filter(t=>(category==="All"||t[0]===category)&&`${t[0]} ${t[2]} ${t[3]}`.toLowerCase().includes(query.toLowerCase())),[query,category]);
 return <div className={dark?"app dark":"app"}>
 <header><a className="brand"><Layers3/> PROJECT<span>X</span>TOOLS</a><button className="iconBtn" onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</button></header>
 <section className="hero"><div className="pill"><Zap size={14}/> FAST • FREE • USEFUL</div><h1>All Your <em>Useful Tools</em><br/>In One Place.</h1><p>Free PDF, image, text, developer, student and finance tools — built to work simply and quickly.</p>
 <div className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 60+ tools..."/><button>Search</button></div></section>
 <section className="stats"><div><b>{tools.length}</b><span>Tools</span></div><div><b>6</b><span>Categories</span></div><div><b>100%</b><span>Free to use</span></div></section>
 <div className="ad">Advertisement Space</div>
 <section className="explore"><h2>Explore Tools</h2><p>Choose a category or search for exactly what you need.</p><div className="cats">{categories.map(c=><button className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></section>
 <main className="grid">{filtered.map((t,i)=>{const Icon=iconMap[t[0]]||Calculator;return <article key={i} onClick={()=>setSelected(t)}><div className="toolIcon"><Icon/></div><h3>{t[2]}</h3><p>{t[3]}</p><small>{t[0]} →</small></article>})}</main>
 <section className="why"><div><Zap/><h3>Fast</h3><p>Simple tools with no unnecessary clutter.</p></div><div><Lock/><h3>Privacy First</h3><p>Many tools can process data locally.</p></div><div><Smartphone/><h3>Mobile Friendly</h3><p>Works on phones, tablets and desktops.</p></div><div><Download/><h3>Free</h3><p>Useful tools available in one place.</p></div></section>
 <footer><div><h2>PROJECT<span>X</span>TOOLS</h2><p>Your all-in-one collection of free online utility tools.</p></div><small>© 2026 PROJECTX Tools. All rights reserved.</small></footer>
 <ToolModal tool={selected} onClose={()=>setSelected(null)}/>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
