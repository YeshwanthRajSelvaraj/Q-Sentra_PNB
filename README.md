<h1 align="center">Q-Sentra V2</h1>

<div align="center">
  <h3>PNB QuantumGuard: Quantum-Safe Cryptographic Asset Management Platform</h3>
  <p>A comprehensive enterprise dashboard and automated analysis pipeline for post-quantum cryptography (PQC) readiness, certificate lifecycle management, and cryptographic asset discovery.</p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi"/>
    <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <img alt="Leaflet" src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white"/>
  </p>
</div>

---

## 🌟 Overview

**Q-Sentra V2** is built to prepare enterprise infrastructures—specifically modeled around Punjab National Bank (PNB)—for the post-quantum cryptographic transition. It offers real-time discovery, analysis, risk scoring, and remediation playbooks based on NIST's latest FIPS 203/204/205 standards.

The platform provides a futuristic, highly responsive single-pane-of-glass dashboard that unifies asset tracking, geolocation mapping, and deep cryptographic inspections.

## ✨ Key Features

- **🌐 Geographic Asset Distribution**: Real-time interactive satellite map tracks and permanently labels assets globally using ESRI imagery and Leaflet.
- **🛡️ Enterprise PQC Readiness Score**: Consolidated risk evaluation with interactive charting powered by Recharts.
- **🔍 Asset Discovery Pipeline**: Multi-tab interface isolating Domains, IP Subnets, SSL Certificates, and Software logic using CT Logs and active scanning.
- **⚡ Remediation Playbooks**: Auto-generated actionable tasks for bringing specific assets up to PQC compliance.
- **📄 Extensible Reporting Hub**: Generates Executive, Auditor, and DevOps-targeted reports.
- **🔌 Unified API Service**: React frontend seamlessly hooks into a FastAPI-powered backend with automatic proxying and fallback mock-data handling.

---

## 🏗️ Architecture

Q-Sentra V2 is built using a decoupled modern stack:

### Frontend
- **React (Vite 8 / OXC)**: Blazing fast modular UI.
- **Tailwind CSS v4**: Utility-first styling with advanced glassmorphism and modern UI design.
- **Lucide Icons**: Professional vector icons replacing outdated emojis.
- **React-Leaflet**: Geospatial mapping.

### Backend
- **FastAPI / Python 3**: High-performance async API server.
- **Uvicorn**: ASGI web server implementation.
- **PostgreSQL & MongoDB**: Asynchronous databases via asyncpg and Motor.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v24+)
- Python (3.12+)

### 1. Start the Backend API
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
*The API docs will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

### 2. Start the Frontend Application
```powershell
cd frontend
npm install
npm run dev
```
*The UI will automatically proxy `/api` calls to the backend on port 8000 and run on [http://localhost:3000](http://localhost:3000).*

---

## 📸 Screenshots

*(To be added)*
- Main Dashboard & Satellite View
- Asset Discovery & Topology Graph
- Cybertating Breakdown

---

## 🔐 Security & Compliance

Q-Sentra's validations are built around migrating traditional RSA/ECC implementations to NIST Standardized algorithms:
- **Kyber (FIPS 203)**: Key Encapsulation
- **Dilithium (FIPS 204)**: Digital Signatures
- **SPHINCS+ (FIPS 205)**: Hash-based Signatures

---

<div align="center">
  <p>Built by <b>YeshwanthRajSelvaraj</b></p>
</div>
