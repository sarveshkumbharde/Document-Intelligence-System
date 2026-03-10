import { useEffect, useState } from "react";
import { getDocuments, deleteDocument } from "../services/api";

const DocumentsList = () => {
  const [docs, setDocs] = useState([]);

  const fetchDocs = async () => {
    const res = await getDocuments();
    setDocs(res.data);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    await deleteDocument(id);
    fetchDocs();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">

      <h2 className="font-semibold mb-3">Documents</h2>

      {docs.map((doc) => (
        <div
          key={doc.id}
          className="flex justify-between border-b py-2"
        >
          <span>{doc.filename}</span>

          <button
            onClick={() => handleDelete(doc.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
};

export default DocumentsList;