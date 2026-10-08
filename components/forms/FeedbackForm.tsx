"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitFeedbackAction } from "@/app/actions/feedback";
import { FormAlert } from "@/components/ui/FormAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import {
  feedbackSchema,
  type FeedbackInput,
} from "@/lib/validations/feedback";

export function FeedbackForm() {
  const [formError, setFormError] = useState<string>();
  const [formSuccess, setFormSuccess] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { content: "", phone: "" },
  });

  const content = watch("content") ?? "";

  async function onSubmit(values: FeedbackInput) {
    setFormError(undefined);
    setFormSuccess(undefined);
    const result = await submitFeedbackAction(values);

    for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
      if (field in values && messages[0]) {
        setError(field as keyof FeedbackInput, {
          type: "server",
          message: messages[0],
        });
      }
    }

    if (result.status === "success") reset();
    setFormError(result.formError);
    setFormSuccess(result.formSuccess);
  }

  return (
    <section className="composer-card feedback-card" aria-labelledby="feedback-title">
      <div className="composer-heading">
        <div>
          <p className="eyebrow">Góp ý khách hàng</p>
          <h1 id="feedback-title">Chia sẻ ý kiến của bạn</h1>
        </div>
        <span className="character-count" aria-live="polite">
          {content.length}/1000
        </span>
      </div>

      <form className="stack-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormAlert message={formError} />
        <FormAlert message={formSuccess} variant="success" />

        <div className="field-group">
          <label htmlFor="feedback-content">Nội dung</label>
          <textarea
            id="feedback-content"
            rows={7}
            placeholder="Nhập góp ý của bạn (trên 20 ký tự)"
            aria-invalid={Boolean(errors.content)}
            aria-describedby={errors.content ? "feedback-content-error" : "feedback-content-hint"}
            {...register("content")}
          />
          <p id="feedback-content-hint" className="field-hint">
            Nội dung phải có trên 20 ký tự.
          </p>
          {errors.content && (
            <p id="feedback-content-error" className="field-error">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="feedback-phone">Số điện thoại</label>
          <input
            id="feedback-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0912345678"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "feedback-phone-error" : "feedback-phone-hint"}
            {...register("phone")}
          />
          <p id="feedback-phone-hint" className="field-hint">
            Ví dụ hợp lệ: 0912345678 hoặc +84912345678.
          </p>
          {errors.phone && (
            <p id="feedback-phone-error" className="field-error">
              {errors.phone.message}
            </p>
          )}
        </div>

        <SubmitButton isPending={isSubmitting} pendingLabel="Đang gửi…">
          Gửi góp ý
        </SubmitButton>
      </form>
    </section>
  );
}
