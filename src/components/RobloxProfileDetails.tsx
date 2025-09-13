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
import {
  UserIcon,
  Users,
  UserPlus,
  UserMinus,
  Link,
  Loader2,
} from "lucide-react"; // Import Loader2
import { Button } from "@/components/ui/button";

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

interface RobloxProfileDetailsProps {
  userId: number;
}

const RobloxProfileDetails: React.FC<RobloxProfileDetailsProps> = ({
  userId,
}) => {
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
        // Determine the base URL for Roblox API calls
        const isProduction = import.meta.env.PROD;
        const userApiBase = isProduction
          ? `/api/roblox/users`
          : `/roblox-api/v1/users`;
        const thumbnailsApiBase = isProduction
          ? `/api/roblox/thumbnails`
          : `/roblox-thumbnails-api/v1/users`;
        const friendsApiBase = isProduction
          ? `/api/roblox/friends`
          : `/roblox-friends-api/v1/users`;
        const catalogApiBase = isProduction
          ? `/api/roblox/catalog`
          : `/roblox-catalog-api/v1/catalog`;

        // Fetch user data
        const userResponse = await fetch(`${userApiBase}/${userId}`);
        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user data: ${userResponse.statusText}`
          );
        }
        const userData: RobloxUserData = await userResponse.json();
        setUserData(userData);

        // Fetch avatar data
        // NOTE: For production, you'll need to create a separate Vercel Serverless Function for thumbnails
        const avatarResponse = await fetch(
          `${thumbnailsApiBase}/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`
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
        // NOTE: For production, you'll need to create a separate Vercel Serverless Function for friends counts
        const followersResponse = await fetch(
          `${friendsApiBase}/${userId}/followers/count`
        );
        if (!followersResponse.ok) {
          throw new Error(
            `Failed to fetch followers count: ${followersResponse.statusText}`
          );
        }
        const followersData = await followersResponse.json();

        // Fetch followings count
        const followingsResponse = await fetch(
          `${friendsApiBase}/${userId}/followings/count`
        );
        if (!followingsResponse.ok) {
          throw new Error(
            `Failed to fetch followings count: ${followingsResponse.statusText}`
          );
        }
        const followingsData = await followingsResponse.json();

        // Fetch friends count
        const friendsResponse = await fetch(
          `${friendsApiBase}/${userId}/friends/count`
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
      <div className="flex flex-col items-center justify-center p-6 bg-portfolio-teal rounded-none border-4 border-portfolio-black min-h-[250px]">
        <Loader2 className="w-10 h-10 animate-spin text-always-black mb-4" />
        <p className="text-always-black text-lg font-semibold">
          Loading Roblox Profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-500 text-white rounded-none border-4 border-portfolio-black min-h-[250px]">
        <CardTitle className="text-xl font-bold mb-2">Error</CardTitle>
        <CardDescription className="text-center">{error}</CardDescription>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-portfolio-teal rounded-none border-4 border-portfolio-black min-h-[250px]">
        <CardTitle className="text-xl font-bold mb-2 text-always-black">
          No User Data
        </CardTitle>
        <CardDescription className="text-center text-always-black">
          Could not retrieve Roblox user data.
        </CardDescription>
      </div>
    );
  }

  const robloxProfileUrl = `https://www.roblox.com/users/${userId}/profile`;

  return (
    <div className="bg-portfolio-red-pink p-6 rounded-none">
      {" "}
      {/* Inner background for details */}
      <CardHeader className="flex flex-row items-center space-x-4 p-0 pb-4">
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
      <CardContent className="p-0 pt-4 border-t-2 border-portfolio-black">
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
          <a href={robloxProfileUrl} target="_blank" rel="noopener noreferrer">
            <Link className="w-6 h-6" />
            <span>Add Connection</span>
          </a>
        </Button>
      </CardContent>
    </div>
  );
};

export default RobloxProfileDetails;
