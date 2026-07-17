"use client";

import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import ColorsTable from "../components/ColorsTable";

export default function Home() {
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState("");

  return (
    <main>
      <h1>Таблиця кольорів</h1>

      <ImageUploader
        setColors={setColors}
        image={image}
        setImage={setImage}
      />

      <ColorsTable colors={colors} />
    </main>
  );
}