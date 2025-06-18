import type React from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentInputProps {
  recipeSlug: string;
  onCommentAdded: () => void;
}

const CommentInput = ({ recipeSlug, onCommentAdded }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("start submitting");
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeSlug,
          commentText,
        }),
      });

      if (response.ok) {
        setCommentText("");
        onCommentAdded(); // Trigger the update in the parent component
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={async (e) => await handleSubmit(e)} className="space-y-4">
      <Textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave a comment..."
        required
        className="w-full resize-none"
        disabled={isSubmitting}
        rows={5}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </Button>
    </form>
  );
};

export default CommentInput;
