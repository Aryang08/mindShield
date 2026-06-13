# 🛡️ MindShield AI

> **AI-Powered Mental Wellness Companion for Exam Students**

MindShield AI is a Generative AI-powered platform that helps students preparing for high-stakes examinations (NEET, JEE, CUET, CAT, GATE, UPSC, Board Exams) monitor, understand, and improve their mental well-being throughout their preparation journey.

---

## 🎯 Chosen Vertical

**Mental Wellness Tracker** — A GenAI-powered solution that goes beyond simple mood tracking by leveraging advanced AI to analyze journals, detect hidden stress patterns, predict burnout, and provide personalized wellness coaching.

---

## 🧠 Approach & Logic

### The Problem
Students preparing for competitive exams face severe stress, burnout, anxiety, and self-doubt. Traditional mood trackers only collect ratings — they don't understand the *why* behind emotions or provide intelligent, personalized support.

### Our Solution
MindShield AI acts as a trusted AI wellness companion that:

1. **Understands emotions through natural language** — Students write daily journals, and our AI extracts emotional states, stress levels, anxiety indicators, confidence scores, burnout signals, and hidden triggers using advanced NLP analysis.

2. **Detects hidden stress patterns** — The AI identifies recurring negative phrases like "not good enough" or "everyone is ahead" and maps them to psychological patterns (comparison anxiety, perfectionism, impostor syndrome).

3. **Predicts burnout before it happens** — A multi-factor Burnout Prediction Engine analyzes journal sentiment, mood history, study hours, and sleep data to generate risk scores with explainable reasoning.

4. **Provides personalized coping mechanisms** — Based on the student's exam type, emotional history, and current state, the AI generates tailored advice, adaptive mindfulness exercises, and recovery plans.

5. **Maintains safety standards** — A dedicated Crisis Safety Layer detects severe distress indicators and immediately provides emergency helpline resources, never pretending to be a therapist.

### How It Works

```
Student writes journal entry
        ↓
AI analyzes emotional state, stress, triggers
        ↓
Hidden patterns detected across entries
        ↓
Burnout risk predicted with explanation
        ↓
Personalized recommendations generated
        ↓
Adaptive exercises & coaching provided
```

### AI Architecture

- **Prompt Engineering**: Structured prompts with clinical psychology principles, cognitive behavioral therapy frameworks, and positive psychology techniques
- **Contextual Memory**: AI maintains awareness of user's exam type, weak subjects, study goals, and emotional history
- **Explainable AI**: Every score includes reasoning and contributing factors — never just numbers
- **Safety First**: Multi-layer crisis detection with Indian mental health helpline resources

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 **AI Journal Analyzer** | Write daily journals; AI extracts emotions, stress, triggers, and provides personalized feedback |
| 😊 **Mood Tracking** | Daily mood logging with emoji input, intensity scales, and trend visualization |
| 🔥 **Burnout Prediction Engine** | AI-based risk scoring (Low→Critical) with explainable multi-factor analysis |
| 🤖 **AI Wellness Coach** | 24/7 conversational AI that understands your exam context and emotional history |
| 🧘 **Adaptive Mindfulness** | Personalized breathing exercises (Box Breathing, 4-7-8) and meditation dynamically chosen by AI |
| 💡 **Smart Motivation** | Context-aware motivational messages based on actual progress data, never generic |
| 📊 **Emotional Analytics** | Trend charts, mood heatmaps, trigger analysis, and AI pattern insights |
| 🔮 **Stress Forecasting** | Predict future stress periods based on study patterns and upcoming events |
| 🏥 **Recovery Plans** | Personalized roadmaps when stress becomes high |
| ⚠️ **Crisis Safety Layer** | Responsible AI with emergency resource escalation |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion (motion) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **AI** | Google Gemini 2.0 Flash API |
| **Storage** | localStorage (client-side) |
| **Deployment** | Vercel-ready |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mindshield-ai.git
cd mindshield-ai

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env.local
# Add your Gemini API key to .env.local (optional - app works without it)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key for real AI analysis. Get free at [aistudio.google.com](https://aistudio.google.com/apikey) |

> **Note:** The app works fully without any API keys using intelligent fallback responses with keyword-based analysis.

---

## 📁 Project Structure

```
mindshield-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout with SEO
│   │   ├── globals.css                 # Design system
│   │   ├── dashboard/page.tsx          # Dashboard
│   │   ├── journal/page.tsx            # Journal + AI Analysis
│   │   ├── analytics/page.tsx          # Emotional Analytics
│   │   ├── wellness/page.tsx           # Wellness Hub
│   │   ├── coach/page.tsx              # AI Coach Chat
│   │   └── api/
│   │       ├── journal/analyze/        # Journal analysis endpoint
│   │       ├── coach/chat/             # AI coach endpoint
│   │       ├── burnout/predict/        # Burnout prediction endpoint
│   │       ├── motivation/generate/    # Motivation generator endpoint
│   │       ├── stress/forecast/        # Stress forecast endpoint
│   │       └── crisis/detect/          # Crisis detection endpoint
│   ├── components/
│   │   └── layout/
│   │       └── DashboardLayout.tsx     # Shared dashboard layout
│   └── lib/
│       ├── types/index.ts              # TypeScript interfaces
│       ├── storage/index.ts            # localStorage adapter
│       └── ai/
│           ├── prompts.ts              # AI prompt templates
│           ├── gemini.ts               # Gemini API client + fallbacks
│           └── safety.ts               # Crisis detection framework
├── .env.example
├── package.json
└── README.md
```

---

## 🛡️ Mental Health Safety Framework

MindShield AI takes mental health safety seriously:

1. **The AI never pretends to be a therapist** or provides clinical diagnoses
2. **Crisis Detection** scans for keywords indicating self-harm or severe distress
3. **Emergency Resources** are immediately displayed when crisis indicators are detected:
   - 📞 iCall: 9152987821
   - 📞 Vandrevala Foundation: 1860-2662-345
   - 📞 NIMHANS: 080-46110007
   - 📞 AASRA: 9820466726
4. **Supportive Language** encourages reaching out to trusted adults and professionals
5. **No Dangerous Advice** — the AI validates emotions and suggests healthy coping, never minimizing feelings

---

## 🎨 Design Philosophy

- **Calming Dark Theme** — Deep blues and soft purples reduce eye strain during late-night study sessions
- **Glassmorphism** — Frosted glass effects create depth without visual clutter
- **Micro-Animations** — Smooth transitions and subtle movements make the interface feel alive
- **Mobile-First** — Fully responsive design for students on any device
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, reduced motion support

---

## 🏆 Competitive Advantages

| Differentiator | How It Stands Out |
|----------------|-------------------|
| Hidden Trigger Detection | Maps recurring phrases to psychological patterns (comparison anxiety, perfectionism, impostor syndrome) |
| Burnout Prediction | Multi-factor analysis with explainable reasoning, not just scores |
| Exam-Specific Coaching | Context-aware advice tailored to NEET/JEE/UPSC/CAT/GATE/CUET/Board exams |
| Explainable AI | Every score explains WHY — which entries contributed, what patterns emerged |
| Adaptive Mindfulness | AI dynamically selects exercises based on current emotional state |
| Human-Centered Safety | Responsible AI with crisis detection and professional resource referrals |
| Premium UX | Award-winning glassmorphism design with smooth animations |

---

## 📝 Assumptions

1. Students have access to a modern web browser (Chrome, Firefox, Safari, Edge)
2. The platform is designed for the Indian education context (exam types, helpline numbers)
3. Data is stored locally in the browser for privacy — no account creation required
4. AI analysis works best with English text input
5. The Gemini API free tier is sufficient for demo/hackathon usage

---

## 📄 License

This project is built for the PromptWars Hackathon. All rights reserved.

---

<p align="center">
  Built with ❤️ for student mental wellness<br/>
  <strong>MindShield AI</strong> — Because your mental health matters more than any exam score.
</p>
