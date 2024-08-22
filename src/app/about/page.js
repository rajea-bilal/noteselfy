import developerImage from '../../../public/rajea.png'
import endingImage from '../../../public/ending.png'
import Image from "next/image";
import Footer from '@/components/Footer'

export default async function About() {
  return (
    <>
      <section className="container rounded-lg mt-10 px-6 py-6 mb-[6rem]">
        {/* title */}
        <h1 className="font-bold text-6xl  md:text-7xl mb-12 text-center mt-8"> The Mind Behind <br />NoteSelfy</h1>

      {/* container with Image & text */}
        <div className="flex flex-col ">

            <div className="mx-auto mb-10">
              <Image 
              src={developerImage}
              alt="developers avatar"
              width={200}
              height={200}
              className="w-[20rem] border border-white/10 p-4 rounded-lg"
              />
            </div>

            <div className="max-w-[25rem] sm:max-w-[35rem] md:max-w-[40rem] lg:max-w-[50rem] mx-auto">
            

          <article className="text-white/70">
              <p>
                  In a world drowning in digital information, I found myself constantly capturing snippets of wisdom through screenshots. Like many of us, I'd promise to revisit these nuggets of inspiration later, only to have them vanish into the vast ocean of my phone's gallery. This common frustration became the spark for <span className=" bg-gradient-to-r from-red-400 to-blue-400 text-transparent bg-clip-text [-webkit-background-clip:text] font-extrabold text-2xl">NoteSelfy</span>.
              </p>

              <p className="mt-6">I'm <a className="font-bold text-white/90 " href="https://rajea-bilal.netlify.app/" target="_blank">Rajea Bilal</a>, a problem-solver at heart with a background in business and teaching. My journey into coding began with a simple desire: to create solutions for everyday challenges. </p> 

              <p className="mt-6">
              In 2023, I took a leap of faith and joined the <a href="https://schoolofcode.co.uk/" target="_blank" className="font-bold text-white/90 underline-offset-4">School of Code</a> bootcamp, where I honed my skills in web development. This intensive experience equipped me with technical knowledge and ignited a fire to build something meaningful.
              </p>


              <p className="mt-6">The result? <br /><span className="bg-gradient-to-r from-red-400 to-blue-400 text-transparent bg-clip-text [-webkit-background-clip:text] font-extrabold text-2xl ">NoteSelfy </span>– the tool I wished I'd had all along. A place where you can effortlessly upload those inspiration-filled screenshots, instantly extract the text, and finally put those words to use. Edit them, copy them, annotate them, share them – bring them back to life! Its a tool to effortlessly transform those forgotten screenshots into active, accessible knowledge.</p>

              <p className="mt-6">
                Outside of coding, I balance my time between family and creative pursuits. I enjoy designing with Adobe Illustrator, exploring photography, and reading widely. These interests provide a refreshing break from development but also inspire new ideas for my work. My children are a constant source of joy and motivation, reminding me of the importance of curiosity and continuous learning. 
              </p>


              <p className="mt-6">
                I'm always eager to learn and grow, and I'd love to hear from you. Feel free to reach out if you have any questions or just want to chat about tech, productivity, or history!
              </p>
          </article>


          </div>
        </div>

        {/* concluding icon  */}
        <div className="mx-auto flex justify-center mt-6">
          <Image 
          src={endingImage}
          alt="developers avatar"
          width={200}
          height={200}
          className="w-[20rem] p-4 rounded-lg"
          />
        </div>
      </section>
      <Footer />
    </>
  )
}