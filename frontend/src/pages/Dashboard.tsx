import { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TextIcon } from "../icons/TextIcon";
import Youtube from "../icons/Youtube";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

function Dashboard() {
  const timestamp = Date.now();
  const date = new Date(timestamp).toUTCString().split("2025")[0];
  const [modalOpen, setModalOpen] = useState(false);
  function openModalHandler() {
    setModalOpen((p) => !p);
  }
  const contents = useContent();
  return (
    <div className="">
      <Sidebar />
      <div className="ml-72">
        <ContentModal open={modalOpen} onClose={openModalHandler} />
        <div className="flex gap-2 m-5 justify-end">
          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<ShareIcon size="md" />}
            onClick={()=>{
                axios.post(`${BACKEND_URL}/api/v1/brain/share`,{share:true},{withCredentials:true})
                .then(response=>{
                    navigator.clipboard.writeText(`${BACKEND_URL}/api/v1/brain/${response.data.hash}`)
                })
            }}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            startIcon={<PlusIcon size="md" />}
            onClick={openModalHandler}
          />
        </div>
        <div className="flex gap-5 flex-wrap">
          {contents.map((item, idx) => (
            <Card
              key={idx}
              title={item.title}
              topText="Project Ideas"
              startIcon={<TextIcon />}
              date={date}
              shareLink={item.link}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
