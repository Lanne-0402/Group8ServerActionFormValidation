"use server";

import { getCurrentUser } from "@/lib/auth/session";
import type { FormActionState } from "@/lib/types/forms";
import { feedbackSchema } from "@/lib/validations/feedback";

export async function submitFeedbackAction(
  input: unknown,
): Promise<FormActionState> {
  const parsed = feedbackSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch {
    return {
      status: "error",
      formError: "Không thể gửi góp ý lúc này. Vui lòng thử lại.",
    };
  }

  if (!currentUser) {
    return {
      status: "error",
      formError: "Bạn cần đăng nhập để gửi góp ý.",
    };
  }

  return {
    status: "success",
    formSuccess: "Cảm ơn bạn! Góp ý đã được ghi nhận.",
  };
}
