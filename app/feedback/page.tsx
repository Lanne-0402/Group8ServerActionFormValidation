import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Góp ý khách hàng" };

export default async function FeedbackPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main className="feed-shell">
      <FeedHeader currentUser={currentUser} />
      <div className="feed-content">
        <p>
          <Link href="/feed">← Quay lại bảng tin</Link>
        </p>
        <FeedbackForm />
      </div>
    </main>
  );
}
