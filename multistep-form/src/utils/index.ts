export function handleEnterDown(
  event: React.KeyboardEvent<HTMLDivElement>,
  onKeyDown: () => void
) {
  if (event.key !== "Enter") return;
  onKeyDown();
}
