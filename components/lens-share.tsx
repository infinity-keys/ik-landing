import LensIcon from "@components/svg/lens-svg";

interface LensShareProps {
  postBody: string;
  url?: string;
  hashtags?: string;
  buttonLabel?: string;
  icon?: boolean;
  preview?: boolean;
}

const LensShare = ({
  postBody,
  url = "https://www.infinitykeys.io/",
  // comma separated for multiple hashtags ("infinitykeys,hunt")
  hashtags = "infinitykeys",
  buttonLabel,
  icon = true,
  preview = true,
}: LensShareProps) => {
  const href = new URL(`https://lenster.xyz/?url=${url}`);
  href.searchParams.set("text", postBody);
  href.searchParams.set("via", "infinitykeys.lens");
  hashtags && href.searchParams.set("hashtags", hashtags);
  preview && href.searchParams.set("preview", "true");

  return (
    <a
      href={href.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className="social-share text-sm inline-flex items-center bg-[#00510e] px-3 py-1 rounded font-medium transition hover:bg-[#abfe2c] hover:text-[#00510e]"
    >
      {buttonLabel || "Share"}
      {icon && (
        <span className="ml-2 ">
          <LensIcon width={18} height={18} />
        </span>
      )}
    </a>
  );
};

export default LensShare;
