import { useState } from "react";
import { MessageCircle } from "lucide-react";
import CommentInput from "./CommentInput";
import { Button } from "@/components/ui/button";
import UserAvatar from "../avatar/UserAvatar";
import { COMMENTS_PER_PAGE } from "@/constants";

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
  initialTotalComments: number;
  isLoggedIn?: boolean;
}

const DynamicCommentsSection = ({
  recipeSlug,
  initialComments,
  isLoggedIn,
  initialTotalComments,
}: DynamicCommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalComments, setTotalComments] = useState(initialTotalComments);

  const fetchComments = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/comments?recipeSlug=${recipeSlug}&page=${pageNumber}&limit=${COMMENTS_PER_PAGE}`,
      );
      if (response.ok) {
        const newComments = await response.json();
        if (pageNumber === 1) {
          setComments(newComments);
        } else {
          setComments((prevComments) => [...prevComments, ...newComments]);
        }
        setPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchComments(page + 1);
  };

  const handleCommentAdded = () => {
    fetchComments(1);
    setTotalComments(totalComments + 1);
  };

  const hasMoreComments = comments.length < totalComments;

  return (
    <section className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold">Comments ({totalComments})</h2>
      {isLoggedIn && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
          <CommentInput
            recipeSlug={recipeSlug}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}
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

      {hasMoreComments && (
        <div className="text-center">
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Comments"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default DynamicCommentsSection;
