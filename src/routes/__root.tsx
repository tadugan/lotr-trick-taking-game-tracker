import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'LotR Trick-Taking Tracker' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}
