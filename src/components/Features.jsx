import { Pickaxe, Bot, Wallpaper  } from 'lucide-react'
const features = [
  {
    title: 'Instant Text Extraction',
    description: 'Upload your screenshots and watch as our AI instantly extracts all text, making your images searchable and editable in seconds.',
    icon: <Pickaxe />
  },
  {
    title: 'Smart Categorization',
    description: 'Our AI automatically organizes your extracted text into relevant categories, helping you find and manage your information effortlessly.',
    icon: <Bot />
  },
  {
    title: 'Seamless Integration',
    description: 'Access your extracted text and categories from any device. Copy, edit, and share your insights with just a few clicks.',
    icon: <Wallpaper />
  },
]

export default function Hero() {
  return (
    <section  className="bg-black text-white/90 py-[72px] sm:py-[96px] ">
      <div className="container">
        <h2 className="text-center font-bold text-5xl tracking-tighter sm:text-6xl ">Everything you need</h2>
        <div className="max-w-xl mx-auto">
        <p className="text-center mt-5 text-xl text-white/70">
          Transform your visual information into actionable, organized text with our AI-powered screenshot analysis tool.
        </p>
        </div>


        <div className="mt-16 flex flex-col gap-4 md:flex-row">
          {features.map(feature => (
            <article key={feature.title} className="border border-white/30 px-5 py-10 text-center rounded-xl sm:flex-1 ">
              <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">{feature.icon}</div>
              <h3 className="mt-6 font-bold ">{feature.title}</h3>
              <p className="mt-2 text-white/70">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}