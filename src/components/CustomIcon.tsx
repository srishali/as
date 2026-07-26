/**
 * CustomIcon — renders a custom SVG/PNG from a URL when provided,
 * falls back to a Lucide icon component on error or when empty.
 *
 * Behaviour:
 *   1. If `customIconUrl` is a non-empty string → render as <img>
 *   2. If the image load fails (invalid URL, 404, etc.) → show FallbackIcon
 *   3. If `customIconUrl` is empty or undefined → show FallbackIcon
 */
import { useState, type ComponentType } from "react";

interface CustomIconProps {
  customIconUrl?: string;
  FallbackIcon: ComponentType<{ className?: string }>;
  className?: string;
  /** Alt text for the custom image. */
  alt?: string;
}

export function CustomIcon({
  customIconUrl,
  FallbackIcon,
  className = "h-6 w-6",
  alt = "icon",
}: CustomIconProps) {
  const [failed, setFailed] = useState(false);

  if (!customIconUrl || failed) {
    return <FallbackIcon className={className} />;
  }

  return (
    <img
      src={customIconUrl}
      alt={alt}
      className={className + " object-contain"}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
