#!/usr/bin/env node
import path from "node:path";
import {init,addTask,approve,verify,complete,brief,checkpoint,dashboard,status,load} from "./core.js";
const a=process.argv.slice(2),cmd=a[0],sub=a[1];
const flag=n=>{const i=a.indexOf("--"+n);return i<0?"":a[i+1]||""};
const help=()=>console.log(`RepoSentinel CLI\ninit <dir> --name NAME --objective TEXT\nstatus <dir>\ntask add <dir> --id ID --title TEXT [--check COMMAND]\ntask list <dir>\napprove <dir> <id> --by PERSON --reason TEXT\nverify <dir> <id>\ncomplete <dir> <id>\nbrief <dir>\ncheckpoint <dir> [note]\nrecover <dir>\ndashboard <dir>`);
const dir=a[cmd==="task"?2:1]||".";
try{
 if(!cmd||cmd==="help"){help()}
 else if(cmd==="init"){init(dir,{name:flag("name"),objective:flag("objective")});console.log("Initialized in "+path.resolve(dir))}
 else if(cmd==="status"){const s=status(dir);console.log(`${s.project.name}: ${s.complete}/${s.tasks.length} complete`);s.tasks.forEach(t=>console.log(`${t.id} [${t.status}] ${t.title}`))}
 else if(cmd==="task"&&sub==="add"){const t=addTask(dir,{id:flag("id"),title:flag("title"),check:flag("check"),priority:flag("priority"),dependencies:flag("depends").split(",").filter(Boolean)});console.log("Added "+t.id)}
 else if(cmd==="task"&&sub==="list"){load(dir).tasks.forEach(t=>console.log(`${t.id}\t${t.status}\t${t.title}`))}
 else if(cmd==="approve"){approve(dir,a[2],{by:flag("by"),reason:flag("reason")});console.log("Approval recorded")}
 else if(cmd==="verify"){const r=verify(dir,a[2]);console.log(`${r.passed?"PASSED":"FAILED"} receipt ${r.id}`);r.results.forEach(x=>console.log(`exit=${x.exitCode} ${x.command}`));if(!r.passed)process.exitCode=1}
 else if(cmd==="complete"){complete(dir,a[2]);console.log("Task completed")}
 else if(cmd==="brief"){console.log(brief(dir))}
 else if(cmd==="checkpoint"){checkpoint(dir,a.slice(2).join(" "));console.log("Checkpoint saved")}
 else if(cmd==="recover"){const s=status(dir);console.log(`${s.open} open tasks`);s.tasks.filter(t=>t.status!=="complete").forEach(t=>console.log(`${t.id} ${t.status}: ${t.title}`))}
 else if(cmd==="dashboard"){console.log("Generated "+dashboard(dir))}
 else help()
}catch(e){console.error("RepoSentinel: "+e.message);process.exitCode=1}
