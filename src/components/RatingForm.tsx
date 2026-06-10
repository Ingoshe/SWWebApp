import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import StarRating from "./StarRating";

interface Rating {
  id: string;
  stars: number;
  comment: string;
  created_at: string;
  user_id: string;
}

interface RatingFormProps {
  attractionId: string;
  isAuthenticated: boolean;
  onLoginRequest: () => void;
}

export default function RatingForm({
  attractionId,
  isAuthenticated,
  onLoginRequest,
}: RatingFormProps) {
  const [ratings, setRatings]     = useState<Rating[]>([]);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [stars, setStars]         = useState(0);
  const [comment, setComment]     = useState("");
  const [error, setError]         = useState<string | null>(null);
  const [success, setSuccess]     = useState(false);
  const [userRating, setUserRating] = useState<Rating | null>(null);

  /* ── Fetch ratings for this attraction ── */
  useEffect(() => {
    let active = true;
    setLoading(true);

    const fetchRatings = async () => {
      const { data, error } = await supabase
        .from("attraction_ratings")
        .select("id, stars, comment, created_at, user_id")
        .eq("attraction_id", attractionId)
        .order("created_at", { ascending: false });

      if (!active) return;
      if (!error && data) {
        setRatings(data as Rating[]);

        // Check if current user has already rated
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const existing = data.find((r: Rating) => r.user_id === user.id);
          if (existing) {
            setUserRating(existing as Rating);
            setStars(existing.stars);
            setComment(existing.comment);
          }
        }
      }
      setLoading(false);
    };

    fetchRatings();
    return () => { active = false; };
  }, [attractionId, success]);

  const avgRating =
    ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.stars, 0) / ratings.length
      : 0;

  const handleSubmit = async () => {
    if (stars === 0) { setError("Please select a star rating."); return; }
    if (comment.trim().length < 5) { setError("Please write at least a short comment."); return; }

    setSubmitting(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("You must be logged in."); setSubmitting(false); return; }

    const payload = {
      attraction_id: attractionId,
      user_id: user.id,
      stars,
      comment: comment.trim(),
    };

    const { error: upsertError } = userRating
      ? await supabase
          .from("attraction_ratings")
          .update({ stars, comment: comment.trim() })
          .eq("id", userRating.id)
      : await supabase
          .from("attraction_ratings")
          .insert(payload);

    if (upsertError) {
      setError(upsertError.message);
    } else {
      setSuccess((s) => !s); // toggle to re-trigger useEffect
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .rf-root { font-family: 'DM Sans', sans-serif; margin-top: 24px; }

        .rf-summary {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 0; border-bottom: 1px solid rgba(0,0,0,0.07);
          margin-bottom: 16px;
        }
        .rf-avg {
          font-size: 28px; font-weight: 600; color: #1a1a1a; line-height: 1;
        }
        .rf-count { font-size: 12px; color: #888; margin-top: 2px; }

        .rf-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }

        .rf-item {
          background: rgba(0,0,0,0.03);
          border-radius: 10px; padding: 12px 14px;
        }
        .rf-item-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 6px;
        }
        .rf-item-meta { font-size: 11px; color: #aaa; }
        .rf-item-comment { font-size: 13px; color: #444; line-height: 1.55; }

        .rf-form-heading {
          font-size: 13px; font-weight: 600; color: #333;
          letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 10px;
        }
        .rf-textarea {
          width: 100%; min-height: 80px; padding: 10px 12px;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          border: 1.5px solid rgba(0,0,0,0.12); border-radius: 10px;
          background: #fff; resize: vertical; outline: none;
          transition: border-color 0.18s; margin-top: 10px; color: #333;
        }
        .rf-textarea:focus { border-color: rgba(0,0,0,0.3); }

        .rf-error { font-size: 12px; color: #c0392b; margin: 8px 0; }

        .rf-submit {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; color: #fff; background: #1a1a1a;
          border: none; border-radius: 20px; padding: 9px 22px;
          cursor: pointer; margin-top: 10px;
          transition: background 0.18s, transform 0.15s;
        }
        .rf-submit:hover:not(:disabled) { background: #333; transform: translateY(-1px); }
        .rf-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .rf-login-prompt {
          background: rgba(0,0,0,0.04); border-radius: 10px;
          padding: 14px 16px; text-align: center;
          font-size: 13px; color: #666;
        }
        .rf-login-btn {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          color: #1a1a1a; background: none; border: 1.5px solid rgba(0,0,0,0.2);
          border-radius: 20px; padding: 6px 18px; cursor: pointer; margin-left: 8px;
          transition: background 0.18s;
        }
        .rf-login-btn:hover { background: rgba(0,0,0,0.06); }

        .rf-empty { font-size: 12px; color: #bbb; font-style: italic; margin-bottom: 16px; }
      `}</style>

      <div className="rf-root">
        {/* Average rating summary */}
        {ratings.length > 0 && (
          <div className="rf-summary">
            <span className="rf-avg">{avgRating.toFixed(1)}</span>
            <div>
              <StarRating value={avgRating} size={14} />
              <div className="rf-count">{ratings.length} review{ratings.length !== 1 ? "s" : ""}</div>
            </div>
          </div>
        )}

        {/* Existing reviews */}
        {loading ? (
          <div className="rf-empty">Loading reviews…</div>
        ) : ratings.length === 0 ? (
          <div className="rf-empty">No reviews yet. Be the first!</div>
        ) : (
          <div className="rf-list">
            {ratings.slice(0, 5).map((r) => (
              <div key={r.id} className="rf-item">
                <div className="rf-item-header">
                  <StarRating value={r.stars} size={12} />
                  <span className="rf-item-meta">
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                </div>
                <p className="rf-item-comment">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Submit form */}
        {isAuthenticated ? (
          <div>
            <div className="rf-form-heading">
              {userRating ? "Update your review" : "Write a review"}
            </div>
            <StarRating
              value={stars}
              interactive
              size={24}
              onChange={setStars}
            />
            <textarea
              className="rf-textarea"
              placeholder="Share your experience…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <div className="rf-error">{error}</div>}
            <button
              className="rf-submit"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : userRating ? "Update Review" : "Submit Review"}
            </button>
          </div>
        ) : (
          <div className="rf-login-prompt">
            Sign in to leave a review
            <button className="rf-login-btn" onClick={onLoginRequest}>Log in</button>
          </div>
        )}
      </div>
    </>
  );
}