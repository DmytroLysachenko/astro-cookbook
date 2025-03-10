import { useState } from "react";
import { MessageCircle } from "lucide-react";
import CommentInput from "./CommentInput";
import UserAvatar from "./UserAvatar";

interface Comment {
  id: string;
  commentText: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;
}

interface DynamicCommentsSectionProps {
  recipeSlug: string;
  initialComments: Comment[];
  isLoggedIn?: boolean;
}

export default function DynamicCommentsSection({
  recipeSlug,
  initialComments,
  isLoggedIn,
}: DynamicCommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?recipeSlug=${recipeSlug}`);
      if (response.ok) {
        const newComments = await response.json();
        setComments(newComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  return (
    <section className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4">
              <UserAvatar
                name={comment.user?.name ?? ""}
                avatar={comment.user?.avatar ?? ""}
                className="mt-8 size-14"
              />
              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">
                    {comment.user?.name || "Anonymous"}
                  </p>
                  <p className="mt-1">{comment.commentText}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            No comments yet
          </h3>
          <p className="mt-1 text-gray-500">
            Be the first to share your thoughts on this recipe!
          </p>
        </div>
      )}

      {isLoggedIn && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
          <CommentInput
            recipeSlug={recipeSlug}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}
    </section>
  );
}
