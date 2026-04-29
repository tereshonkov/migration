"use client";

import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/widgets/sign-in-form/SignInForm"), {
  ssr: false,
});

export default function SignInPage() {
  return <SignInForm />;
}
