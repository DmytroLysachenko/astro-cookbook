import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "astro:env/client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

interface BioEditorProps {
  initialBio: string;
}

const BioEditor: React.FC<BioEditorProps> = ({ initialBio }) => {
  const [bio, setBio] = useState(initialBio);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });
      if (!response.ok) throw new Error("Profile update failed");
      toast.success("Bio successfully updated!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError("Your bio could not be saved. Please try again.");
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Bio</h3>
      {isEditing ? (
        <>
          <label htmlFor="profile-bio" className="block font-medium mb-2">
            Your Bio
          </label>
          <Textarea
            id="profile-bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={500}
            className="mb-2 resize-none"
            rows={6}
          />
          {error && (
            <p role="alert" className="mb-2 text-destructive">
              {error}
            </p>
          )}

          <Button
            onClick={async () => await handleSave()}
            size="sm"
            className=" cursor-pointer"
          >
            Save
          </Button>

          <Button
            onClick={() => setIsEditing(false)}
            variant="outline"
            size="sm"
            className="ml-2 cursor-pointer"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <p className="text-muted-foreground mb-2">{bio}</p>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className=" cursor-pointer  "
            size="sm"
          >
            Edit Bio
          </Button>
        </>
      )}
      <Toaster richColors />
    </div>
  );
};

export default BioEditor;
