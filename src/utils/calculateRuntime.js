import dateConvert from "./dateConvert";

export function calculateRuntime(start, end) {
  const runtime = new Date(end) - new Date(start);

  const newStartTime = new Date();
  const newEndTime = new Date(newStartTime.getTime() + runtime);

  const newStartLocal = dateConvert(newStartTime.toISOString(), "local");
  const newEndLocal = dateConvert(newEndTime.toISOString(), "local");

  return { newStartLocal, newEndLocal };
}
