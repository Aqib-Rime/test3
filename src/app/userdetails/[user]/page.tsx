import { UserDetails } from "@/models/user.model";
import Image from "next/image";
import GoBack from "@/components/GoToHome";

async function getUser(username: string): Promise<UserDetails> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Error occurred while fetching users");
  }
  return await response.json();
}

export default async function Page({ params }: { params: { user: string } }) {
  const userDetails = await getUser(params.user);
  return (
    <div className="mx-20 mt-5 bg-slate-800 p-10 rounded-lg flex flex-col items-center">
      <Image
        className="w-24 h-24 rounded-full"
        src={userDetails.avatar_url}
        alt={userDetails.login}
        width={24}
        height={24}
      />
      <p>{userDetails.bio}</p>
      <p>{userDetails.blog}</p>
      <p>{userDetails.name}</p>
      <GoBack />
    </div>
  );
}
