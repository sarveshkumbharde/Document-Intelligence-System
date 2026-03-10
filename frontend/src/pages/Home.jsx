import DocumentsList from "../components/DocumentsList";
import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Personal Knowledge AI
        </h1>

        <UploadBox />

        <DocumentsList />

        <ChatBox />

      </div>

    </div>
  );
};