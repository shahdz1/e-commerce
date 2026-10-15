import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <BeatLoader color="#49d62b" />
    </div>
  );
}
