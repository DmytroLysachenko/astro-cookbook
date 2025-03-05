import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface BioEditorProps {
  initialBio: string;
}

const BioEditor: React.FC<BioEditorProps> = ({ initialBio }) => {
  const [bio, setBio] = useState(initialBio);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // TODO: Implement API call to save bio
    setIsEditing(false);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Bio</h3>
      {isEditing ? (
        <>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mb-2"
          />

          <Button onClick={handleSave} size="sm" className=" cursor-pointer">
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
    </div>
  );
};

export default BioEditor;
