import { Linkedin, Github, BriefcaseBusiness } from 'lucide-react'

export default function Footer() {
  return (

    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="text-center ">{new Date().getFullYear()} NoteSelfy, Inc. Developed by Rajea Bilal. All rights reserved.</div>
            <ul className="flex justify-center gap-2.5 ">
                <li  className="cursor-pointer hover:text-white transition"><a href="https://www.linkedin.com/in/rajea-bilal/" target="_blank"><Linkedin /></a></li>
                <li className="cursor-pointer hover:text-white transition"><a href="https://github.com/rajea-bilal" target="_blank" ><Github /></a></li>
                <li className="cursor-pointer hover:text-white transition"><a href="https://rajea-bilal.netlify.app/" target="_blank"><BriefcaseBusiness /></a></li>
            </ul>
        </div>
      </div>
    </footer>
  )
}