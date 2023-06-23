"use client";
import React, { useState } from "react";
import { User } from "@/models/user.model";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

async function getUsers(query: string): Promise<User[]> {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`
  );
  if (!response.ok) {
    throw new Error("Error occurred while fetching users");
  }
  const data = await response.json();
  return data.items;
}

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();
  const { data = [] } = useQuery<User[]>(
    ["users", debouncedSearchTerm],
    () => {
      return getUsers(debouncedSearchTerm);
    },
    {
      enabled: debouncedSearchTerm.length > 2, // Enable the query when the search term has more than 2 characters
      retry: 1,
    }
  );

  function navigateToUserDetails(user: User) {
    router.push(`/userdetails/${user.login}`);
  }

  return (
    <div className="px-10">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mt-2 outline-0 w-full bg-slate-800 border-solid border-2 border-white rounded-lg"
      />
      <ul>
        {data.map((user) => (
          <li
            key={user.login}
            className="flex items-center border-white border-solid border-2 rounded-lg mt-3 p-2 cursor-pointer"
            onClick={() => navigateToUserDetails(user)}
          >
            <Image
              alt={`image`}
              width={24}
              height={24}
              src={user.avatar_url}
              className="rounded-full h-12 w-12 object-cover"
            />
            <p className="ml-5">{user.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
