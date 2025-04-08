
# 🧠 CaughtUp – Stay Sharp, Stay Informed

**CaughtUp** is a cross-platform mobile and web app that delivers daily news-based quizzes personalized to your generation and interests — helping you stay informed in just minutes a day.

> Think of it as “Wordle meets current events.”

---

## ✨ Features

- ✅ **Daily & Weekly Quizzes** based on real-world news
- ✅ **Cross-Platform**: React Native (Expo) + Next.js
- ✅ **Personalized Onboarding**: Gen, Interests, Themes
- ✅ **Free & Premium Tiers**
- ✅ **Realtime Firebase Auth**
- ✅ **Quiz Results + Streaks**
- ✅ **Customizable Themes**
- ✅ **Shared Code & Utils in a Monorepo**
- ✅ **PostgreSQL-Ready Backend** with Express

---

## 🔧 Tech Stack

| Layer       | Tech                                                                 |
|-------------|----------------------------------------------------------------------|
| 🖥 Frontend  | Next.js + Tailwind (Web) / React Native + Expo + `twrnc` (Mobile)    |
| 🧠 Backend   | Node.js + Express.js REST API                                        |
| 🗄 Database  | PostgreSQL (via Prisma coming soon)                                  |
| 🔐 Auth      | Firebase Authentication (email/password)                             |
| 📦 Monorepo  | Yarn Workspaces, Shared Utils, Shared Types                         |
| 🧪 Testing   | Manual & Postman API testing, with plans for Unit + E2E             |

---

## 📸 Screenshots

| Onboarding | Daily Quiz | Results |
|------------|------------|---------|
| ![](assets/screens/onboarding.png) | ![](assets/screens/quiz.png) | ![](assets/screens/results.png) |

---

## 🚀 How to Run Locally

### 1. Clone the monorepo

```bash
git clone https://github.com/kevinwongdev/caughtup.git
cd caughtup
yarn install
```

### 2. Start the Backend

```bash
cd backend
yarn dev
```

> Will run at `http://localhost:3001`

### 3. Start the Web Frontend

```bash
cd frontend-web
yarn dev
```

> Will run at `http://localhost:3000`

### 4. Start the Mobile App

```bash
cd frontend-mobile
yarn expo start
```

> Scan QR code with Expo Go

---

## 🔐 Environment Variables

Create a `.env` file in each workspace based on `.env.example`, including:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_API_URL`
- `FIREBASE_SERVICE_ACCOUNT`
- `DATABASE_URL` (coming soon)

---

## 🤝 Contributing

CaughtUp is still in active development — if you're interested in collaborating or building with me, reach out via [email](mailto:kevin@example.com) or [LinkedIn](https://www.linkedin.com/in/kevin-wong/).

---

## 📌 Roadmap

- [x] Firebase Email Auth
- [x] Daily Quiz Engine
- [x] Onboarding Flow
- [ ] Leaderboard + Streaks
- [ ] AI-Generated News Questions (via GPT)
- [ ] Admin Panel for Custom Questions
- [ ] Subscription Stripe Billing

---

## 🙌 Built With Passion by

**Kevin Wong**  
💼 Software Engineer  
🌐 [kevinwong.dev](https://kevinwong.dev)  
🐦 [@kevinwong](https://twitter.com/kevinwong)

---

> ⚡️ Stay sharp. Stay current. Get CaughtUp.

---

### 💡 Tips

- Swap out screenshot paths and contact info as needed
- Add shields (npm, Firebase, deployment) later
- Pin this repo on your GitHub profile!

Let me know if you want a shorter version for mobile, or a version that includes deployment instructions (e.g. Vercel + Supabase).
