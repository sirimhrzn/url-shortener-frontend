'use client'
import { usePathname, useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const logout = () => {
    localStorage.clear()
    router.push("/login")
    router.refresh()
  }
  //  bg-[#191717]
  return (
    <main>
      <div className="drawer lg:drawer-open bg-[#fffafa]">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {children}
        </div>
        <div className="drawer-side  ">
          <div className="min-h-full shadow-xl bg-[#fffafa] flex flex-col">
            <ul className="menu p-4 w-80 space-y-4 text-base-content">
              <li className="bg-gray-200 rounded-lg"><a> Dashboard</a></li>
            </ul>
            <div className="mt-auto">
              <button className="btn w-full" onClick={() => logout()}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}











