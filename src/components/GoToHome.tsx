"use client";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <button
      className={`bg-white px-5 py-2 text-black mt-5 rounded-lg`}
      onClick={() => {
        router.push("/");
      }}
    >
      Back
    </button>
  );
}
