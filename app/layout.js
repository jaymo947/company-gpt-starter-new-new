import './globals.css'
export const metadata = {
  title: 'Company GPT',
  description: 'Embeddable chat for investor/BD Q&A',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  )
}
