import FoxCard from "./FoxCard";
import { useFox } from "../hooks/useFox";

function FoxPage() {
  const { foxUrl, isLoading, error, refetch } = useFox();

  if (isLoading) {
    return <h2>Завантаження...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Випадкова лисичка</h1>

      <FoxCard image={foxUrl} />

      <br />
      <br />

      <button onClick={refetch}>
        Наступна лисичка
      </button>
    </div>
  );
}

export default FoxPage;