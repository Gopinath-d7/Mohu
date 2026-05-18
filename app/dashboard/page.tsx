import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  // Read session securely on the server
  const session = await getServerSession(authOptions);

  // Kick unauthorized traffic back to login route cleanly
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-950">
              Welcome back, {session.user?.name || "Store Owner"}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">Logged in as: {session.user?.email}</p>
          </div>
          <Link href="/api/auth/signout" className="text-xs font-medium text-red-600 hover:underline bg-red-50 px-4 py-2 rounded-lg">
            Sign Out
          </Link>
        </div>

        {/* Dashboard Grid Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sales Metrics</h3>
            <p className="text-3xl font-black text-gray-950">$12,480.00</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Inventory</h3>
            <p className="text-3xl font-black text-gray-950">3 Products Listed</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Store Orders</h3>
            <p className="text-3xl font-black text-gray-950">48 Pending</p>
          </div>
        </div>
      </div>
    </main>
  );
}