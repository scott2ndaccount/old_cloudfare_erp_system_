Update the Readme.md file on GitHub by including an architectural diagram of your project: The first part of your readme should be a visualization of your "Software Architecture". Explain how you applied a mix of MVC and the N-tier or layered architecture to design your course project. Highlight how the main components in your project will be organized into at least 3 layers and the communication between them. Below is a sample sketch of how you should be organizing the components into layers. The sketch does not show arrows to indicate communications but you will need to provide those. Use Visio or draw.io or any drawing software of your choice. The second part will be an explanation of the visual indicating the MVC classes as components inside the different layers and how they communicate with each other. For example, you can say components 4 and 5 in layer 2 will be reading data xyzzy from component 6 in layer 3 and so on.. except that you should replace component 1 with it's actual name (e.g., ReservationController). Layer 1: the X layer component 1 component 2 component 3 Layer 2: the Z layer component 4 component 5 Layer 3: the Y layer component 6
                
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
