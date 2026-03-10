import { useState } from "react";
import { uploadDocument } from "../services/api";

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");

    try {
      const res = await uploadDocument(file);
      setStatus(`Indexed ${res.data.chunks} chunks`);
    } catch (err) {
      setStatus("Upload failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">

      <h2 className="font-semibold mb-3">Upload Document</h2>

      <div className="flex gap-3">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>

      </div>

      {status && (
        <p className="text-sm text-gray-600 mt-2">{status}</p>
      )}

    </div>
  );
};

export default UploadBox;