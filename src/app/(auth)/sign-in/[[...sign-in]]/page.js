import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center flex-col gap-6 min-h-screen">
      <h1 className="font-bold">Create your own personalised account on NoteSelfy</h1>
      <SignIn />
    </div>
  )
}