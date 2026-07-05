(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/redux/tasks/taskAdapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "taskAdapter",
    ()=>taskAdapter,
    "taskInitialState",
    ()=>taskInitialState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const taskAdapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createEntityAdapter"])({
    sortComparer: (a, b)=>b.updatedAt - a.updatedAt
});
const taskInitialState = taskAdapter.getInitialState({
    loading: false,
    error: null,
    page: 1,
    pageSize: 20,
    total: 0,
    search: "",
    statusFilter: "",
    typeFilter: "",
    sortOrder: "updatedAt",
    selectedTaskId: null,
    isCacheStale: false
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/tasks/taskSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "removeTask",
    ()=>removeTask,
    "setCacheStale",
    ()=>setCacheStale,
    "setError",
    ()=>setError,
    "setLoading",
    ()=>setLoading,
    "setPagination",
    ()=>setPagination,
    "setSearch",
    ()=>setSearch,
    "setSelectedTask",
    ()=>setSelectedTask,
    "setSortOrder",
    ()=>setSortOrder,
    "setStatusFilter",
    ()=>setStatusFilter,
    "setTasks",
    ()=>setTasks,
    "setTypeFilter",
    ()=>setTypeFilter,
    "updateTask",
    ()=>updateTask,
    "upsertTask",
    ()=>upsertTask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/tasks/taskAdapter.ts [app-client] (ecmascript)");
;
;
const taskSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "tasks",
    initialState: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskInitialState"],
    reducers: {
        setTasks: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskAdapter"].setAll,
        upsertTask: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskAdapter"].upsertOne,
        updateTask: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskAdapter"].updateOne,
        removeTask: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskAdapter"].removeOne,
        setLoading (state, action) {
            state.loading = action.payload;
        },
        setError (state, action) {
            state.error = action.payload;
        },
        setSelectedTask (state, action) {
            state.selectedTaskId = action.payload;
        },
        setSortOrder (state, action) {
            state.sortOrder = action.payload;
        },
        setSearch (state, action) {
            state.search = action.payload;
        },
        setStatusFilter (state, action) {
            state.statusFilter = action.payload;
        },
        setTypeFilter (state, action) {
            state.typeFilter = action.payload;
        },
        setPagination (state, action) {
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
            state.total = action.payload.total;
        },
        setCacheStale (state, action) {
            state.isCacheStale = action.payload;
        }
    }
});
const { setTasks, upsertTask, updateTask, removeTask, setLoading, setError, setSortOrder, setSelectedTask, setSearch, setStatusFilter, setTypeFilter, setPagination, setCacheStale } = taskSlice.actions;
const __TURBOPACK__default__export__ = taskSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/normalize.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeTask",
    ()=>normalizeTask
]);
const typeMap = {
    image: "image",
    audio: "audio",
    text: "text"
};
const statusMap = {
    odo: "TODO",
    in_progress: "IN_PROGRESS",
    inprogress: "IN_PROGRESS",
    done: "DONE",
    qa: "QA",
    blocked: "BLOCKED"
};
function normalizeTask(raw) {
    const normalizedType = typeMap[raw.type.toLowerCase()] ?? "unknown";
    const normalizedStatus = statusMap[raw.status.toLowerCase()] ?? "UNKNOWN";
    const updatedAt = typeof raw.updatedAt === "string" ? new Date(raw.updatedAt).getTime() : raw.updatedAt;
    const annotationCount = typeof raw.annotationCount === "string" ? Number(raw.annotationCount) : raw.annotationCount;
    return {
        id: raw.id,
        title: raw.title,
        type: normalizedType,
        status: normalizedStatus,
        assignee: raw.assignee,
        annotationCount: Number.isNaN(annotationCount) ? 0 : annotationCount,
        updatedAt,
        priority: raw.meta?.priority === "high" || raw.meta?.priority === "medium" || raw.meta?.priority === "low" ? raw.meta.priority : undefined,
        note: raw.meta?.note
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/db/localDb.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearTasks",
    ()=>clearTasks,
    "getSummary",
    ()=>getSummary,
    "getTasks",
    ()=>getTasks,
    "saveSummary",
    ()=>saveSummary,
    "saveTasks",
    ()=>saveTasks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$localforage$2f$dist$2f$localforage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/localforage/dist/localforage.js [app-client] (ecmascript)");
;
const taskStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$localforage$2f$dist$2f$localforage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createInstance({
    name: "annotation-console",
    storeName: "tasks"
});
const summaryStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$localforage$2f$dist$2f$localforage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createInstance({
    name: "annotation-console",
    storeName: "summaries"
});
async function saveTasks(tasks) {
    await taskStore.setItem("task-list", tasks);
}
async function getTasks() {
    const tasks = await taskStore.getItem("task-list");
    return tasks ?? [];
}
async function clearTasks() {
    await taskStore.removeItem("task-list");
}
async function saveSummary(taskId, summary) {
    await summaryStore.setItem(taskId, summary);
}
async function getSummary(taskId) {
    return summaryStore.getItem(taskId);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/syncTasks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "syncTasks",
    ()=>syncTasks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/normalize.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$localDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/localDb.ts [app-client] (ecmascript)");
;
;
async function syncTasks(rawTasks) {
    const normalized = rawTasks.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeTask"]);
    // Don't await if you want background write
    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$localDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveTasks"])(normalized);
    return normalized;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/services/taskApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "taskApi",
    ()=>taskApi,
    "useGetTaskQuery",
    ()=>useGetTaskQuery,
    "useGetTasksQuery",
    ()=>useGetTasksQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$syncTasks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/syncTasks.ts [app-client] (ecmascript)");
;
;
const taskApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "taskApi",
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
        baseUrl: ("TURBOPACK compile-time value", "http://localhost:4000/api")
    }),
    tagTypes: [
        "Tasks"
    ],
    endpoints: (builder)=>({
            getTasks: builder.query({
                query: ({ page, pageSize })=>`/tasks?page=${page}&pageSize=${pageSize}`,
                transformResponse: async (response)=>{
                    const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$syncTasks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncTasks"])(response.items);
                    return {
                        ...response,
                        items
                    };
                },
                providesTags: [
                    "Tasks"
                ]
            }),
            getTask: builder.query({
                query: (id)=>`/tasks/${id}`
            })
        })
});
const { useGetTasksQuery, useGetTaskQuery } = taskApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/tasks/taskSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$taskApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/services/taskApi.ts [app-client] (ecmascript)");
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        tasks: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$tasks$2f$taskSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$taskApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$taskApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskApi"].reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$taskApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taskApi"].middleware)
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/store.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/redux/provider.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = ReduxProvider;
var _c;
__turbopack_context__.k.register(_c, "ReduxProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1u1kbix._.js.map