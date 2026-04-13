                ┌──────────────────────────────┐
                │        Layer 1 (UI)          │
                │   Presentation Layer (View)  │
                │                              │
                │  - ERP Pages (/erp)          │
                │  - New Vendor Form           │
                │  - Vendor Table Display      │
                └──────────────┬───────────────┘
                               │ HTTP Requests (fetch)
                               ▼
                ┌──────────────────────────────┐
                │      Layer 2 (Server)        │
                │   Application Layer         │
                │  (Controllers + Logic)      │
                │                              │
                │  - /api/add-vendor           │
                │  - /api/display-vendors1     │
                │  - Server Handlers           │
                └──────────────┬───────────────┘
                               │ Supabase Client
                               ▼
                ┌──────────────────────────────┐
                │      Layer 3 (Database)      │
                │     Data Layer (Model)       │
                │                              │
                │  - Supabase Database         │
                │  - vendor table              │
                │  - RLS Policies              │
                └──────────────────────────────┘
