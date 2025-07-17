import { useState } from "react";
import fallbackImage from "../assets/images/fallback.png";
import LoadingAnimation from "./ui/loading";

const CardIdea = ({ idea }) => {
  const [loading, setLoading] = useState(true); // default true: belum load
  const [error, setError] = useState(false);

  if (!idea) return null;

  const title = idea.title || "No Title";
  const rawImageUrl = idea.medium_image?.[0]?.url || idea.small_image?.[0]?.url;

  const imageSrc = rawImageUrl
    ? (rawImageUrl.startsWith("http")
      ? `/media${new URL(rawImageUrl).pathname}`
      : `/api${rawImageUrl}`)
    : fallbackImage;

  return (
    <div className="rounded shadow bg-white overflow-hidden flex flex-col">
      {loading && !error ? (
        <LoadingAnimation />
      ) : null}

      <img
        src={imageSrc}
        alt={title}
        className={`w-full aspect-[4/3] object-cover ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
          setError(true);
          setLoading(false);
        }}
      />

      {!loading && (
        <div className="p-4 flex flex-col flex-grow justify-between">
          <p className="text-sm text-gray-500">{formatDate(idea.published_at)}</p>
          <div className="">
            <h2 className="font-semibold text-lg line-clamp-3">{title}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default CardIdea;
