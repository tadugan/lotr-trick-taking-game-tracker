import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
          {!isHome && (
            <Link to="/" className="-ml-2.5 p-2.5 text-gray-600 active:text-gray-900">
              <ChevronLeft size={24} />
            </Link>
          )}
          <span className="text-base font-semibold tracking-tight text-gray-900">
            LotR Trick-Taking Tracker
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
