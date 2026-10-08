import { z } from "zod";

const vietnamesePhoneNumber = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const feedbackSchema = z.object({
  content: z
    .string()
    .trim()
    .min(21, "Nội dung góp ý phải có trên 20 ký tự.")
    .max(1000, "Nội dung góp ý không được vượt quá 1000 ký tự."),
  phone: z
    .string()
    .trim()
    .regex(
      vietnamesePhoneNumber,
      "Số điện thoại phải đúng định dạng Việt Nam (ví dụ: 0912345678).",
    ),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
