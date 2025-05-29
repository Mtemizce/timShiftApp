// ✅ components/PersonnelPhotoUpload.jsx
import { useState, useRef, useEffect } from "react";

export default function PersonnelPhotoUpload({ defaultValue = "" }) {
  const [preview, setPreview] = useState(defaultValue);
  const inputRef = useRef();

  useEffect(() => {
    setPreview(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = "";
    setPreview("");
  };

  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">Profil Fotoğrafı</label>
      <div className="flex items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          name="image_file"
          accept="image/*"
          onChange={handleChange}
          className="input"
        />
        {preview && (
          <div className="flex items-center gap-2">
            <img
              src={preview}
              alt="Profil"
              className="w-12 h-12 object-cover rounded border border-gray-300 dark:border-gray-700"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-600 text-xs"
            >
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
