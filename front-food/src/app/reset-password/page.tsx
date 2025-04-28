import { ResetPassword } from "@/components/ResetPassword";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
