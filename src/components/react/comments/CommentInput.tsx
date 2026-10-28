import { type SyntheticEvent, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentInputProps {
  recipeSlug: string;
  onCommentAdded: () => void;
}

const CommentInput = ({ recipeSlug, onCommentAdded }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
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
        setError("Your comment could not be posted. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Your comment could not be posted. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="comment-text" className="block font-medium">
        Your Comment
      </label>
      <Textarea
        id="comment-text"
        name="comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Share a cooking tip or question…"
        required
        className="w-full resize-none"
        disabled={isSubmitting}
        rows={5}
      />
      {error && (
        <p role="alert" className="text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting…" : "Post Comment"}
      </Button>
    </form>
  );
};

export default CommentInput;
