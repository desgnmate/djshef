import { AdminLogin } from "@/components/admin-login";
import { AdminStudio } from "@/components/admin-studio";
import { getCmsAdminUser } from "@/lib/supabase/auth";

export const metadata = {
  title: "SHEF Content Management",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await getCmsAdminUser();

  return (
    <main className="admin-page">
      {user ? <AdminStudio userEmail={user.email ?? "CMS admin"} /> : <AdminLogin />}
    </main>
  );
}
