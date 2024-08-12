import Image from "next/image";
import { Button } from '@/components/ui/button'
import UploadForm from '@/components/UploadForm'
import Header from '@/components/Header'


export default function Home() {
  return (
    <div className="border min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center p-24 gap-6">
      <UploadForm />
      </main> 

    </div>
  );
}
