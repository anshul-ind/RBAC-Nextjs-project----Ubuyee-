import { redirect } from "next/navigation";

export default function UserPortalIndex() {
  redirect("/user/dashboard");
}
