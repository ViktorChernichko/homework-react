export async function fetchRandomFox() {
  const response = await fetch("https://randomfox.ca/floof/");

  if (!response.ok) {
    throw new Error("Не вдалося отримати фото");
  }

  return await response.json();
}