export default function () {
  return (
    <input
      onChange={(e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
      }}
      type="file"
      accept="image/*"
      name="image"
    />
  );
}
