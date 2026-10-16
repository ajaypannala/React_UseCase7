import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">Account</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>
              <p className="mt-2 text-slate-500">Your personal information and account details.</p>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 sm:h-40" />
              <div className="px-5 pb-6 sm:px-8 sm:pb-8">
                <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-sm sm:h-28 sm:w-28 sm:text-4xl">
                    {initials}
                  </div>
                  <span className="self-start rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold capitalize text-emerald-700 ring-1 ring-inset ring-emerald-600/20 sm:mb-1 sm:self-auto">
                    {user?.role || "Account"}
                  </span>
                </div>
                <div className="mt-5">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    {user?.name || "Your profile"}
                  </h2>
                  <p className="mt-1 text-slate-500">{user?.email}</p>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Personal information
                  </h3>
                  <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <dt className="text-sm font-medium text-slate-500">Full name</dt>
                      <dd className="mt-1 break-words font-semibold text-slate-900">{user?.name || "—"}</dd>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <dt className="text-sm font-medium text-slate-500">Email address</dt>
                      <dd className="mt-1 break-all font-semibold text-slate-900">{user?.email || "—"}</dd>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:col-span-2">
                      <dt className="text-sm font-medium text-slate-500">Account role</dt>
                      <dd className="mt-1 font-semibold capitalize text-slate-900">{user?.role || "—"}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Profile;