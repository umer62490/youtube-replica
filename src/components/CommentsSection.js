import React from "react";
import { useSelector } from "react-redux";

const CommentsSection = () => {
    const { comments, loading, error } = useSelector((state) => state.comments);
  
    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!comments.length) return <p>No comments yet</p>;
  
    return (
      <div className="comments-section mt-4">
        {comments.map((c) => {
          const topComment = c.snippet.topLevelComment.snippet;
          const replies = c.replies?.comments || [];
  
          return (
            <div key={c.id} className="mb-4">
              {/* Top-level comment */}
              <div className="flex gap-2 mb-2">
                <img
                  src={topComment.authorProfileImageUrl}
                  alt={topComment.authorDisplayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{topComment.authorDisplayName}</p>
                  <p className="text-sm">{topComment.textDisplay}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(topComment.publishedAt).toLocaleString()}
                  </p>
                </div>
              </div>
  
              {/* Replies */}
              {replies.length > 0 && (
                <div className="ml-12 border-l border-gray-300 pl-4">
                  {replies.map((r) => {
                    const reply = r.snippet;
                    return (
                      <div key={r.id} className="flex gap-2 mb-2">
                        <img
                          src={reply.authorProfileImageUrl}
                          alt={reply.authorDisplayName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm">{reply.authorDisplayName}</p>
                          <p className="text-sm">{reply.textDisplay}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(reply.publishedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  

export default CommentsSection;
