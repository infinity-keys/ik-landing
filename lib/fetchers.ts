// Client
export const puzzlePost = async ({
  puzzleId,
  code,
}: {
  puzzleId: string;
  code: string;
}) => {
  const res = await fetch(`/api/check/code/${puzzleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return res;
};

export const formSubmit = async ({ data }: { data: unknown }) => {
  const res = await fetch("/api/submission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};
