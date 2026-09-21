/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { stat } from 'original-fs';
import './index.css';

const OpenSettings = document.getElementById("OpenSettings");
const BackToMain = document.getElementById("BackToMain");
const settingsscreen = document.getElementById("settingsScreen");
const mainscreen = document.getElementById("mainScreen");
const taskList = document.getElementById("taskList");
const input = document.getElementById("taskInput") as HTMLInputElement;
const AddTaskButton = document.getElementById("AddTask");
const CompletedLabel = document.getElementById("Completed")
const TasksLabel = document.getElementById("Tasks")
const AllowDupsCheck = document.getElementById("allowdups") as HTMLInputElement

let currentidx = 0
let taskamount = 0
let completedamount = 0

let Settings = {
  AllowDuplicates:false
}

const usedTexts: Record<string, boolean> = {};

function addTask(text: string): any {
    const task = document.createElement("div");

    if ((usedTexts[text] && Settings.AllowDuplicates != true) || text.length <= 0) {
      return undefined;
    };

    usedTexts[text] = true

    currentidx += 1;
    taskamount += 1;
    updatelabels()

    task.innerHTML = `
        <input type="checkbox" id="id_${currentidx}">
        <label class="tasklabel">${text}</label>
    `;

    const taskinput = task.querySelector("input")

    function updatelabels(){
        if (TasksLabel && CompletedLabel) {
          TasksLabel.textContent = "Tasks: " + taskamount;
          CompletedLabel.textContent = "Completed: " + completedamount;
        }
    }
    
    task.addEventListener("change", () => {
      const state = task as HTMLInputElement;

      console.log(taskinput?.checked);

      if (taskinput?.checked) {
          completedamount += 1;
      } else {
          completedamount -= 1;
      }

      updatelabels();
    }); 

    taskList?.appendChild(task);
}

OpenSettings?.addEventListener("click", () => {
  console.log("Clicked");

  mainscreen?.setAttribute("hidden", "");
  settingsscreen?.removeAttribute("hidden");
})

BackToMain?.addEventListener("click", () => {
  mainscreen?.removeAttribute("hidden");
  settingsscreen?.setAttribute("hidden", "")
})

AddTaskButton?.addEventListener("click", () => {
  addTask(input.value)
})

AllowDupsCheck?.addEventListener("change", () => {
  Settings.AllowDuplicates = AllowDupsCheck.checked
})

console.log("hello yellow verity")