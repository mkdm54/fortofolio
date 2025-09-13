"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserIcon, Users, UserPlus, UserMinus, Link } from "lucide-react"; // Add Link icon
import { Button } from "@/components/ui/button"; // Import Button component

interface RobloxUserData {
  description: string;
  created: string;
  isBanned: boolean;
  externalAppDisplayName: string | null;
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
}

interface RobloxCounts {
  followers: number | null;
  followings: number | null;
  friends: number | null;
}

interface RobloxProfileCardProps {
  userId: number;
}

const RobloxProfileCard: React.FC<RobloxProfileCardProps> = ({ userId }) => {
  const [userData, setUserData] = useState<RobloxUserData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [counts, setCounts] = useState<RobloxCounts>({
    followers: null,
    followings: null,
    friends: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRobloxData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user data using the proxy
        const userResponse = await fetch(`/roblox-api/v1/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user data: ${userResponse.statusText}`
          );
        }
        const userData: RobloxUserData = await userResponse.json();
        setUserData(userData);

        // Fetch avatar data using the proxy
        const avatarResponse = await fetch(
          `/roblox-thumbnails-api/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`
        );
        if (!avatarResponse.ok) {
          throw new Error(
            `Failed to fetch avatar data: ${avatarResponse.statusText}`
          );
        }
        const avatarData = await avatarResponse.json();
        if (avatarData.data && avatarData.data.length > 0) {
          setAvatarUrl(avatarData.data[0].imageUrl);
        } else {
          setAvatarUrl(null); // No avatar found
        }

        // Fetch followers count
        const followersResponse = await fetch(
          `/roblox-friends-api/v1/users/${userId}/followers/count`
        );
        if (!followersResponse.ok) {
          throw new Error(
            `Failed to fetch followers count: ${followersResponse.statusText}`
          );
        }
        const followersData = await followersResponse.json();

        // Fetch followings count
        const followingsResponse = await fetch(
          `/roblox-friends-api/v1/users/${userId}/followings/count`
        );
        if (!followingsResponse.ok) {
          throw new Error(
            `Failed to fetch followings count: ${followingsResponse.statusText}`
          );
        }
        const followingsData = await followingsResponse.json();

        // Fetch friends count
        const friendsResponse = await fetch(
          `/roblox-friends-api/v1/users/${userId}/friends/count`
        );
        if (!friendsResponse.ok) {
          throw new Error(
            `Failed to fetch friends count: ${friendsResponse.statusText}`
          );
        }
        const friendsData = await friendsResponse.json();

        setCounts({
          followers: followersData.count,
          followings: followingsData.count,
          friends: friendsData.count,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRobloxData();
  }, [userId]);

  if (loading) {
    return (
      <div className="relative w-full max-w-sm mx-auto h-64">
        <div className="absolute top-2 left-2 w-full h-full bg-background rounded-none border-4 border-portfolio-black animate-pulse"></div>
        <Card className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-portfolio-teal p-6 flex flex-col items-center justify-center">
          <p className="text-always-black text-lg font-semibold">
            Loading Roblox Profile...
          </p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-sm mx-auto h-64">
        <div className="absolute top-2 left-2 w-full h-full bg-background rounded-none border-4 border-portfolio-black"></div>
        <Card className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-red-500 text-white p-6 flex flex-col items-center justify-center">
          <CardTitle className="text-xl font-bold mb-2">Error</CardTitle>
          <CardDescription className="text-center">{error}</CardDescription>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="relative w-full max-w-sm mx-auto h-64">
        <div className="absolute top-2 left-2 w-full h-full bg-background rounded-none border-4 border-portfolio-black"></div>
        <Card className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-portfolio-teal p-6 flex flex-col items-center justify-center">
          <CardTitle className="text-xl font-bold mb-2">No User Data</CardTitle>
          <CardDescription className="text-center">
            Could not retrieve Roblox user data.
          </CardDescription>
        </Card>
      </div>
    );
  }

  const robloxProfileUrl = `https://www.roblox.com/users/${userId}/profile`;

  return (
    <div className="relative w-full max-w-sm mx-auto min-h-[380px]">
      {" "}
      {/* Adjusted min-h here */}
      <div className="absolute top-2 left-2 w-full h-full bg-background rounded-none border-4 border-portfolio-black"></div>
      <Card
        className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-portfolio-red-pink
                   transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2 shadow-none"
      >
        <CardHeader className="flex flex-row items-center space-x-4 p-6 pb-2">
          <Avatar className="w-20 h-20 border-2 border-portfolio-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <AvatarImage
              src={avatarUrl || undefined}
              alt={userData.displayName}
            />
            <AvatarFallback className="bg-portfolio-teal text-white">
              <UserIcon className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold text-card-text-dark-mode">
              {userData.displayName}
            </CardTitle>
            <CardDescription className="text-md text-card-text-dark-mode">
              @{userData.name}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <p className="text-card-text-dark-mode mb-4">
            {userData.description || "No description provided."}
          </p>
          {userData.isBanned && (
            <Badge className="bg-destructive text-destructive-foreground border-2 border-portfolio-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
              Banned
            </Badge>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
            <div className="flex flex-col items-center">
              <Users className="w-6 h-6 text-card-text-dark-mode mb-1" />
              <span className="text-lg font-bold text-card-text-dark-mode">
                {counts.followers !== null ? counts.followers : "-"}
              </span>
              <span className="text-sm text-gray-600">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <UserPlus className="w-6 h-6 text-card-text-dark-mode mb-1" />
              <span className="text-lg font-bold text-card-text-dark-mode">
                {counts.followings !== null ? counts.followings : "-"}
              </span>
              <span className="text-sm text-gray-600">Following</span>
            </div>
            <div className="flex flex-col items-center">
              <UserMinus className="w-6 h-6 text-card-text-dark-mode mb-1" />
              <span className="text-lg font-bold text-card-text-dark-mode">
                {counts.friends !== null ? counts.friends : "-"}
              </span>
              <span className="text-sm text-gray-600">Friends</span>
            </div>
          </div>

          <Button
            asChild
            className="w-full bg-portfolio-yellow text-portfolio-black border-4 border-portfolio-black rounded-none px-8 py-4 text-xl font-bold hover:bg-portfolio-yellow/80 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2"
          >
            <a
              href={robloxProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link className="w-6 h-6" />
              <span>Add Connection</span>
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobloxProfileCard;
