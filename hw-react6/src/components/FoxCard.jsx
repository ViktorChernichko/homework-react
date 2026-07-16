function FoxCard({ image }) {
  return (
    <img
      src={image}
      alt="Fox"
      style={{
        width: "400px",
        borderRadius: "12px",
        boxShadow: "0 0 10px gray",
      }}
    />
  );
}

export default FoxCard;