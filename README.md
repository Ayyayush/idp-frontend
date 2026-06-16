# Intelligent Document Processing Platform - Frontend

A modern React-based frontend for an AI-powered Intelligent Document Processing (IDP) Platform.

The application provides a clean dashboard interface for document upload, extraction visualization, AI-generated summaries, and document interaction workflows.

---

## Features

* Modern SaaS Dashboard
* Dark Theme UI
* Responsive Design
* Drag & Drop Document Upload
* Document Processing Pipeline Visualization
* Entity Extraction Dashboard
* Structured JSON Viewer
* AI Summary Interface
* Document Assistant Chat UI
* REST API Integration Ready
* FastAPI Backend Compatible

---

## Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### UI Libraries

* Lucide React
* React Hot Toast
* React Dropzone
* React Markdown
* React JSON View

---

## Project Structure

```text
frontend/

├── src/

│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── UploadBox.jsx
│   │   ├── ProcessingStatus.jsx
│   │   ├── EntityCard.jsx
│   │   ├── JsonViewer.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── ValidationCard.jsx
│   │   ├── ConfidenceCard.jsx
│   │   └── RecentDocuments.jsx

│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── UploadPage.jsx
│   │   ├── ExtractionPage.jsx
│   │   ├── SummaryPage.jsx
│   │   └── ChatPage.jsx

│   ├── layouts/
│   │   └── MainLayout.jsx

│   ├── routes/
│   │   └── AppRoutes.jsx

│   ├── services/
│   │   ├── api.js
│   │   └── uploadService.js

│   ├── App.jsx
│   ├── main.jsx
│   └── index.css

├── package.json
└── vite.config.js
```

---

## Pages

### Dashboard

Displays:

* Total Documents
* Processed Documents
* Success Rate
* Recent Documents
* Processing Pipeline Status

### Upload

Supports:

* PDF Upload
* PNG Upload
* JPG Upload
* JPEG Upload
* Drag & Drop Interface

### Extraction

Displays:

* Document Classification
* Extracted Entities
* Structured JSON Output

### Summary

Displays:

* AI Generated Summary
* Confidence Score
* Validation Status

### Document Assistant

Chat-style interface for future document interaction using Retrieval-Augmented Generation (RAG).

---

## Backend Integration

The frontend is designed to work with the FastAPI backend.

Expected API Endpoints:

```http
POST /upload
POST /extract
GET /summary
```

Default Backend URL:

```text
http://localhost:8000
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Future Enhancements

* Real-time Backend Integration
* Document Preview
* Multi-document Support
* RAG-based Document Chat
* Authentication & Authorization
* Analytics Dashboard
* Export to PDF / Excel
* Advanced Search

---

## Author

Ayush

MCA, NIT Jamshedpur
