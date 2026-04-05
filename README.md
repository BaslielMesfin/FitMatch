# FitMatch

FitMatch is a premium, AI-powered fashion discovery PWA (Progressive Web App). It learns your "Style DNA" and curates a Pinterest-style feed of clothing items, utilizing the Gemini 2.0 API for multimodal aesthetic translation and the Serper Shopping API to pull live product data from top brands like Zara, ASOS, SSENSE, H&M, Uniqlo, Urban Outfitters, and Aritzia.

## Features
- **AI Stylist Chat**: Talk to an AI or upload photos to get tailored outfit recommendations and matching products.
- **Smart Discovery Feed**: Dynamic Pinterest-style masonry grid showing trending clothes tailored to your taste profile with infinite scrolling.
- **Style DNA Learning**: As you like items, the local algorithm learns your preferences (e.g., "Old Money", "Streetwear") and adapts your feed using exponential moving averages.
- **Boards**: Curate your favorite fashion finds into customized digital mood boards.
- **Authentication**: Email and Google sign-in powered by Supabase with onboarding questionnaire for personalized experience.
- **PWA Ready**: Mobile-first design, installable on your home screen, with smooth app-like navigation and Framer Motion micro-animations.

## Technology Stack

**Frontend:**
- React 19 + Vite 8
- Vanilla CSS (Custom Design Tokens, Glassmorphism, CSS Variables)
- Framer Motion (Animations)
- React Router v7
- Supabase Auth (Authentication)
- Vite PWA Plugin

**Backend:**
- Python 3.10+ & FastAPI
- Google GenAI SDK (Gemini 2.0 Flash)
- Serper.dev API (Google Shopping Search)
- Pydantic Settings
- Uvicorn

## How to Run Locally

### 1. Backend Setup
1. Open the `server` directory.
2. Initialize and activate a Python virtual environment:
   ```bash
   cd server
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn google-genai httpx pydantic-settings python-dotenv pillow PyJWT supabase
   ```
4. Set up Env Variables:
   Create a `.env` file inside the `server/` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   SERPER_API_KEY=your_serper_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_JWT_SECRET=your_supabase_jwt_secret
   ```
5. Start the server:
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### 2. Frontend Setup
1. In a new terminal, open the root directory.
2. Create a `.env` file in the root:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`.

## Architecture Note for Vercel Deployment
FitMatch is designed with separation of concerns in mind (SOLID principles).
- **Frontend**: Fully compatible to be deployed statically to **Vercel**.
- **Backend (FastAPI)**: To deploy alongside Vercel, you can either wrap FastAPI using Vercel's Serverless Python runtimes, or deploy the backend separately to Render/Railway and update the `CORS_ORIGINS` in `.env`.
