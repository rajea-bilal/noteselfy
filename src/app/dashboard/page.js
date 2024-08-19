import DashboardContent from '@/components/DashboardContent';
import { auth, currentUser } from '@clerk/nextjs'

import UploadForm from '@/components/UploadForm'

export default async function DashboardPage() {

  // const { userId } = auth()
  // console.log(userId)

  // const user = await currentUser()
  // console.log(user)

  // if(!userId) {
  //   return <div>You are logged in </div>
  // }
  return (
    <div className="container mx-auto px-4 py-8 border">
      <h1 className="text-2xl font-bold mb-6">NoteSelfy Dashboard</h1>

      <section className="flex flex-col items-center justify-center p-24 gap-6">
        <UploadForm />
      </section>
      {/* <DashboardContent /> */}
    </div>
  );

}