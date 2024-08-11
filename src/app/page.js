import Image from "next/image";
import { Button } from '@/components/ui/button'
import UploadForm from '@/components/UploadForm'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
     <Button>The solution to screenshots!</Button>
     <UploadForm />
    </main> 
  );
}
