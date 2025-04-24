(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_eca14a69._.js", {

"[project]/src/app/types/Task.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TaskPriority": (()=>TaskPriority),
    "TaskState": (()=>TaskState),
    "UserRole": (()=>UserRole)
});
var TaskPriority = /*#__PURE__*/ function(TaskPriority) {
    TaskPriority["LOW"] = "low";
    TaskPriority["MEDIUM"] = "medium";
    TaskPriority["HIGH"] = "high";
    return TaskPriority;
}({});
var TaskState = /*#__PURE__*/ function(TaskState) {
    TaskState["TODO"] = "todo";
    TaskState["DOING"] = "doing";
    TaskState["DONE"] = "done";
    return TaskState;
}({});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["DEVELOPER"] = "developer";
    UserRole["DEVOPS"] = "devops";
    return UserRole;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/services/TaskService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "taskService": (()=>taskService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/types/Task.ts [app-client] (ecmascript)");
;
class TaskService {
    tasks = [];
    getAllTasks() {
        return this.tasks;
    }
    getTaskById(id) {
        return this.tasks.find((task)=>task.id === id);
    }
    addTask(task) {
        if (!task.id) {
            task.id = this.generateId();
            task.dateAdded = new Date();
        }
        const index = this.tasks.findIndex((t)=>t.id === task.id);
        if (index !== -1) {
            // Update existing task
            this.tasks[index] = {
                ...task
            };
        } else {
            // Add new task
            this.tasks.push(task);
        }
        this.saveToLocalStorage();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task)=>task.id !== id);
        this.saveToLocalStorage();
    }
    assignUserToTask(taskId, user) {
        const task = this.tasks.find((t)=>t.id === taskId);
        if (task && task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].TODO) {
            task.assignedUser = user;
            task.state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DOING;
            task.dateStarted = new Date();
            this.saveToLocalStorage();
        }
    }
    completeTask(taskId) {
        const task = this.tasks.find((t)=>t.id === taskId);
        if (task && task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DOING && task.assignedUser) {
            task.state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DONE;
            task.dateCompleted = new Date();
            this.saveToLocalStorage();
        }
    }
    getTasksByState(state) {
        return this.tasks.filter((task)=>task.state === state);
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    saveToLocalStorage() {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
    loadFromLocalStorage() {
        if ("TURBOPACK compile-time truthy", 1) {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                this.tasks = JSON.parse(storedTasks).map((task)=>({
                        ...task,
                        dateAdded: new Date(task.dateAdded),
                        dateStarted: task.dateStarted ? new Date(task.dateStarted) : undefined,
                        dateCompleted: task.dateCompleted ? new Date(task.dateCompleted) : undefined
                    }));
            }
        }
    }
    constructor(){
        this.loadFromLocalStorage();
    }
}
const taskService = new TaskService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/services/UserStoryService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UserStoryService": (()=>UserStoryService),
    "userStoryService": (()=>userStoryService)
});
class UserStoryService {
    storageKey = 'userStories';
    constructor(){
        if ("TURBOPACK compile-time truthy", 1) {
            this.initializeStorage();
        }
    }
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }
    getAllStories() {
        try {
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (error) {
            console.error('Error getting stories:', error);
            return [];
        }
    }
    getStoriesByState(state) {
        const stories = this.getAllStories();
        return stories.filter((story)=>story.state === state);
    }
    getStoriesByProject(projectId) {
        const stories = this.getAllStories();
        return stories.filter((story)=>story.project === projectId);
    }
    getStoryById(id) {
        const stories = this.getAllStories();
        return stories.find((story)=>story.id === id) || null;
    }
    createStory(storyData) {
        try {
            const stories = this.getAllStories();
            const newStory = {
                ...storyData,
                id: this.generateId(),
                dateCreated: new Date().toISOString()
            };
            stories.push(newStory);
            localStorage.setItem(this.storageKey, JSON.stringify(stories));
            return newStory;
        } catch (error) {
            console.error('Error creating story:', error);
            return null;
        }
    }
    updateStory(id, storyData) {
        try {
            const stories = this.getAllStories();
            const index = stories.findIndex((story)=>story.id === id);
            if (index === -1) {
                return null;
            }
            const updatedStory = {
                ...stories[index],
                ...storyData
            };
            stories[index] = updatedStory;
            localStorage.setItem(this.storageKey, JSON.stringify(stories));
            return updatedStory;
        } catch (error) {
            console.error('Error updating story:', error);
            return null;
        }
    }
    deleteStory(id) {
        try {
            const stories = this.getAllStories();
            const filteredStories = stories.filter((story)=>story.id !== id);
            if (filteredStories.length === stories.length) {
                return false; // Nothing was deleted
            }
            localStorage.setItem(this.storageKey, JSON.stringify(filteredStories));
            return true;
        } catch (error) {
            console.error('Error deleting story:', error);
            return false;
        }
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    }
}
const userStoryService = new UserStoryService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/TaskForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TaskForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/types/Task.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/TaskService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$UserStoryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/UserStoryService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TaskForm({ task, onSubmit, onCancel }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskPriority"].MEDIUM);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].TODO);
    const [userStoryId, setUserStoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [estimatedTime, setEstimatedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [userStories, setUserStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskForm.useEffect": ()=>{
            // Load user stories for dropdown
            const stories = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$UserStoryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userStoryService"].getAllStories();
            setUserStories(stories);
            // Populate form if editing existing task
            if (task) {
                setName(task.name);
                setDescription(task.description);
                setPriority(task.priority);
                setState(task.state);
                setUserStoryId(task.userStoryId);
                setEstimatedTime(task.estimatedTime);
            }
        }
    }["TaskForm.useEffect"], [
        task
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        const taskToSave = {
            id: task?.id,
            name,
            description,
            priority,
            state,
            userStoryId,
            estimatedTime,
            dateAdded: task?.dateAdded || new Date(),
            dateStarted: task?.dateStarted,
            dateCompleted: task?.dateCompleted,
            assignedUser: task?.assignedUser
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].addTask(taskToSave);
        onSubmit();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "Nazwa Zadania"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: name,
                        onChange: (e)=>setName(e.target.value),
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "Opis Zadania"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: description,
                        onChange: (e)=>setDescription(e.target.value),
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "Stan Zadania"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: state,
                        onChange: (e)=>setState(e.target.value),
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"]).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: s,
                                children: s === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].TODO ? 'Do zrobienia' : s === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DOING ? 'W trakcie' : 'Zakończone'
                            }, s, false, {
                                fileName: "[project]/src/app/components/TaskForm.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "Priorytet"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: priority,
                        onChange: (e)=>setPriority(e.target.value),
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskPriority"]).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: p,
                                children: p
                            }, p, false, {
                                fileName: "[project]/src/app/components/TaskForm.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "Historyjka"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: userStoryId,
                        onChange: (e)=>setUserStoryId(e.target.value),
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Wybierz historyjkę"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/TaskForm.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            userStories.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: story.id,
                                    children: story.name
                                }, story.id, false, {
                                    fileName: "[project]/src/app/components/TaskForm.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-gray-700 text-sm font-bold mb-2",
                        children: "Przewidywany czas wykonania (godz.)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        value: estimatedTime,
                        onChange: (e)=>setEstimatedTime(Number(e.target.value)),
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        min: "0",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                        children: task ? 'Aktualizuj Zadanie' : 'Dodaj Zadanie'
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onCancel,
                        className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                        children: "Anuluj"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/TaskForm.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/TaskForm.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/TaskForm.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(TaskForm, "HXOK14D4NhaK6NktzMYrresAHxg=");
_c = TaskForm;
var _c;
__turbopack_context__.k.register(_c, "TaskForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/TaskDetail.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TaskDetail)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/types/Task.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/TaskService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$UserStoryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/UserStoryService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TaskDetail({ taskId, onClose }) {
    _s();
    const [task, setTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [assignedUser, setAssignedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskDetail.useEffect": ()=>{
            const fetchedTask = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].getTaskById(taskId);
            if (fetchedTask) {
                setTask(fetchedTask);
                setAssignedUser(fetchedTask.assignedUser || null);
            }
        }
    }["TaskDetail.useEffect"], [
        taskId
    ]);
    if (!task) return null;
    const userStory = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$UserStoryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userStoryService"].getAllStories().find((story)=>story.id === task.userStoryId);
    const handleAssignUser = ()=>{
        const name = prompt('Podaj imię użytkownika:');
        const role = prompt('Wybierz rolę (developer/devops):');
        if (name && (role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].DEVELOPER || role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].DEVOPS)) {
            const user = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                role
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].assignUserToTask(taskId, user);
            // Refresh task data
            const updatedTask = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].getTaskById(taskId);
            if (updatedTask) {
                setTask(updatedTask);
                setAssignedUser(updatedTask.assignedUser || null);
            }
        } else {
            alert('Nieprawidłowe dane użytkownika');
        }
    };
    const handleCompleteTask = ()=>{
        if (task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DOING && assignedUser) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].completeTask(taskId);
            // Refresh task data
            const updatedTask = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].getTaskById(taskId);
            if (updatedTask) {
                setTask(updatedTask);
            }
        } else {
            alert('Zadanie musi być w trakcie realizacji i mieć przypisanego użytkownika');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg max-w-2xl w-full relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-4 text-red-500 hover:text-red-700",
                    children: "Zamknij"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4",
                    children: task.name
                }, void 0, false, {
                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold",
                                    children: "Opis:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: task.description
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mt-4",
                                    children: "Priorytet:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: task.priority
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mt-4",
                                    children: "Stan:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: task.state
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/TaskDetail.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold",
                                    children: "Historyjka:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: userStory?.name || 'Brak historyjki'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mt-4",
                                    children: "Przewidywany czas:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        task.estimatedTime,
                                        " godz."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mt-4",
                                    children: "Daty:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Dodano: ",
                                        task.dateAdded.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                task.dateStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Rozpoczęto: ",
                                        task.dateStarted.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 104,
                                    columnNumber: 34
                                }, this),
                                task.dateCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Zakończono: ",
                                        task.dateCompleted.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 105,
                                    columnNumber: 36
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mt-4",
                                    children: "Przypisany użytkownik:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                assignedUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        assignedUser.name,
                                        " (",
                                        assignedUser.role,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Nie przypisano"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/TaskDetail.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex space-x-4",
                    children: [
                        !assignedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleAssignUser,
                            className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
                            children: "Przypisz użytkownika"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/TaskDetail.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this),
                        task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DOING && assignedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCompleteTask,
                            className: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded",
                            children: "Zakończ zadanie"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/TaskDetail.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/TaskDetail.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/TaskDetail.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/TaskDetail.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(TaskDetail, "2h70RV7hJon5Onm4UdLjwQir4I4=");
_c = TaskDetail;
var _c;
__turbopack_context__.k.register(_c, "TaskDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/zadania/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TaskKanbanBoard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/types/Task.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/TaskService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$TaskForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/TaskForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$TaskDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/TaskDetail.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function TaskKanbanBoard() {
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isFormVisible, setIsFormVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingTask, setEditingTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTaskId, setSelectedTaskId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskKanbanBoard.useEffect": ()=>{
            loadTasks();
        }
    }["TaskKanbanBoard.useEffect"], []);
    const loadTasks = ()=>{
        const allTasks = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].getAllTasks();
        setTasks(allTasks);
    };
    const handleCreateTask = ()=>{
        setEditingTask(null);
        setIsFormVisible(true);
    };
    const handleEditTask = (task)=>{
        setEditingTask(task);
        setIsFormVisible(true);
    };
    const handleDeleteTask = (id)=>{
        if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$TaskService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskService"].deleteTask(id);
            loadTasks();
        }
    };
    const handleFormClose = ()=>{
        setIsFormVisible(false);
        setEditingTask(null);
    };
    const handleFormSubmit = ()=>{
        loadTasks();
        setIsFormVisible(false);
        setEditingTask(null);
    };
    const todoTasks = tasks.filter((task)=>task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].TODO);
    const doingTasks = tasks.filter((task)=>task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DOING);
    const doneTasks = tasks.filter((task)=>task.state === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$types$2f$Task$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskState"].DONE);
    const renderTaskColumn = (tasks, title)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-100 p-4 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/app/zadania/page.tsx",
                    lineNumber: 58,
                    columnNumber: 7
                }, this),
                tasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50",
                        onClick: ()=>task.id && setSelectedTaskId(task.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold",
                                        children: task.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/zadania/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    handleEditTask(task);
                                                },
                                                className: "text-blue-500 hover:text-blue-700",
                                                children: "Edytuj"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/zadania/page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    handleDeleteTask(task.id);
                                                },
                                                className: "text-red-500 hover:text-red-700",
                                                children: "Usuń"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/zadania/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/zadania/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/zadania/page.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-2",
                                children: task.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/zadania/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `
              px-2 py-1 rounded text-xs
              ${task.priority === 'high' ? 'bg-red-200 text-red-800' : task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}
            `,
                                        children: task.priority
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/zadania/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    task.assignedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-600",
                                        children: task.assignedUser.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/zadania/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/zadania/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, task.id, true, {
                        fileName: "[project]/src/app/zadania/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/zadania/page.tsx",
            lineNumber: 57,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6",
                children: "Zadania"
            }, void 0, false, {
                fileName: "[project]/src/app/zadania/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleCreateTask,
                className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6",
                children: "Dodaj nowe zadanie"
            }, void 0, false, {
                fileName: "[project]/src/app/zadania/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            isFormVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$TaskForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                task: editingTask,
                onSubmit: handleFormSubmit,
                onCancel: handleFormClose
            }, void 0, false, {
                fileName: "[project]/src/app/zadania/page.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this),
            selectedTaskId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$TaskDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                taskId: selectedTaskId,
                onClose: ()=>setSelectedTaskId(null)
            }, void 0, false, {
                fileName: "[project]/src/app/zadania/page.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                children: [
                    renderTaskColumn(todoTasks, 'Do zrobienia'),
                    renderTaskColumn(doingTasks, 'W trakcie'),
                    renderTaskColumn(doneTasks, 'Zakończone')
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/zadania/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/zadania/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(TaskKanbanBoard, "QuQirqCpuD7raK4wEt+WTUhNRo8=");
_c = TaskKanbanBoard;
var _c;
__turbopack_context__.k.register(_c, "TaskKanbanBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_eca14a69._.js.map