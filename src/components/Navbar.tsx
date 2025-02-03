import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import { ModeToggle } from './ui/ModeToggle'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  if(!session) return null
  return (
    <div className='sticky top-0 inset-x-0 h-fit bg-zinc-100 dark:bg-background border-b border-border z-[10] py-2 px-2'>
      <div className='container max-w-7xl h-auto mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-zinc-700 dark:text-foreground text-sm font-medium md:block'>Bread</p>
        </Link>


        {/* actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar