
import type { ProfileInfoType } from "@/types/Api/ProfileInfoType";
import { useEffect, useState } from "react";

const API_URL: string = "/me";

export function useProfileInfo() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfoType>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProfileInfo)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  return [profileInfo, error, loading] as const;
}
