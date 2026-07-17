"use client";

import { useRef } from "react";

export default function ImageUploader({
  setColors,
  image,
  setImage,
}) {
  const imageRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleLoad = () => {
    const img = imageRef.current;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const map = {};

    for (let i = 0; i < data.length; i += 40) {
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i + 1] / 32) * 32;
      const b = Math.round(data[i + 2] / 32) * 32;

      const key = `${r},${g},${b}`;

      map[key] = (map[key] || 0) + 1;
    }

    const colors = Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([key]) => {
        const rgb = key.split(",").map(Number);

        return {
          rgb,
          hex:
            "#" +
            rgb
              .map((v) => v.toString(16).padStart(2, "0"))
              .join("")
              .toUpperCase(),
        };
      });

    setColors(colors);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {image && (
        <img
          ref={imageRef}
          src={image}
          alt="Зображення"
          className="preview"
          onLoad={handleLoad}
        />
      )}
    </>
  );
}