import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {init,addTask,approve,verify,complete,brief,status} from "../src/core.js";
function fixture(){const d=fs.mkdtempSync(path.join(os.tmpdir(),"rs-"));init(d,{name:"Test",objective:"Exercise workflow"});return d}
test("initializes and refuses overwrite",()=>{const d=fixture();assert.equal(status(d).tasks.length,0);assert.throws(()=>init(d,{}),/overwrite/)});
test("brief includes pending task",()=>{const d=fixture();addTask(d,{id:"A",title:"Test task",check:"node -e \"process.exit(0)\""});assert.match(brief(d),/Test task/)});
test("requires approval and fresh passing evidence",()=>{const d=fixture();addTask(d,{id:"A",title:"Check",check:"node -e \"process.exit(0)\""});assert.throws(()=>complete(d,"A"),/approval/);approve(d,"A",{by:"Owner",reason:"Reviewed"});assert.equal(verify(d,"A").passed,true);complete(d,"A");assert.equal(status(d).complete,1)});
test("rejects stale evidence",()=>{const d=fixture();addTask(d,{id:"A",title:"Check",check:"node -e \"process.exit(0)\""});approve(d,"A",{by:"Owner",reason:"Reviewed"});verify(d,"A");fs.writeFileSync(path.join(d,"new.txt"),"mutation");assert.throws(()=>complete(d,"A"),/stale/)});
test("failed checks block completion",()=>{const d=fixture();addTask(d,{id:"A",title:"Fail",check:"node -e \"process.exit(4)\""});approve(d,"A",{by:"Owner",reason:"Reviewed"});assert.equal(verify(d,"A").passed,false);assert.throws(()=>complete(d,"A"),/passing verification/)});
