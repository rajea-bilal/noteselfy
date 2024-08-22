
import Link from 'next/link';

export default function Hero() {

  return (
  <section className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_35%,#4F21A1_65%,#A46EDB_82%)] py-[72px] relative overflow-clip">
    <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-768px] rounded-[100%] bg-black left-1/2 -translate-x-1/2  bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)]"></div>
    <div className="container relative">

      <div className="flex justify-center">
      <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-center mt-8 inline-flex ">From Screenshots <br />to Shareable Insights</h1>
      </div>

    <div className="flex justify-center">
      <p className="text-center text-xl mt-8 max-w-md">NoteSelfy: Transform Screenshots into Organized, Shareable Content with AI</p>
    </div>

        <div className="flex justify-center mt-8">
          <Link href="/sign-up" className="cursor-pointer text-white transition"><button className="bg-white text-black py-3 px-5 rounded-lg font-medium">Sign up</button></Link>
        </div>
    </div>
  </section>
  )
}



