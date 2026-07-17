# Q-Sentra System Architecture

Q-Sentra is designed as a modular, scalable, and secure platform for orchestrating post-quantum cryptographic transitions.

## High-Level Architecture

The platform follows a traditional Client-Server architecture with asynchronous background processing capabilities.

1. **Frontend (React 18 + Vite)**: A single-page application (SPA) providing operational dashboards, CBOM visualization, and remediation playbooks. It communicates with the backend via REST APIs and WebSockets for real-time updates.
2. **Backend (FastAPI)**: A high-performance async Python backend serving the REST API. It handles authentication, RBAC, asset discovery, risk scoring, and integrates with backend data stores.
3. **Data Layer**:
   - **PostgreSQL**: Stores relational data (assets, certificates, users, compliance).
   - **MongoDB**: Stores complex document data (raw scan results, CBOM graphs).
   - **Redis**: Used as a fast caching layer and a message broker for Celery.
4. **Task Queue (Celery)**: Handles long-running background tasks such as network discovery scanning, TLS/SSL cryptographic inspection, and CBOM generation without blocking the main API thread.

## Core Engines

- **Discovery Engine**: Uses active network scanning to map domains, IPs, and active services.
- **Scanner Engine**: Connects to discovered services to extract TLS/SSL configurations, certificate chains, and supported cipher suites.
- **CBOM Engine**: Parses scan data to generate Cryptographic Bill of Materials (CBOM) representing cryptographic dependencies.
- **PQC Validator**: Compares discovered algorithms against NIST PQC standards (e.g., FIPS 203/204/205).
- **Risk Analyzer**: Calculates quantitative risk scores based on asset exposure and algorithm agility.
- **Remediation Engine**: AI-assisted component that maps vulnerable algorithms to their quantum-safe equivalents and generates migration playbooks.

## Data Flow

1. User initiates a scan via the Frontend dashboard.
2. FastAPI backend receives the request and pushes a task to Redis.
3. Celery worker picks up the task, executes the `Scanner Engine`, and saves raw results to MongoDB.
4. The worker updates the status in PostgreSQL and emits a WebSocket event.
5. The Frontend receives the WebSocket event and fetches the updated CBOM and Risk Score from the API.
