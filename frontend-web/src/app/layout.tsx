// frontend-web/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'CaughtUp',
  description: 'Stay caught up with news quizzes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
