import React, { useState } from "react";
import useDataStore from "../../store/useDataStore";

interface UpdateGameModalProps {
  gameData: any;
  onClose: () => void;
}

const UpdateGameModal: React.FC<UpdateGameModalProps> = ({
  gameData,
  onClose,
}) => {
  const [title, setTitle] = useState(gameData.title);
  const [image, setImage] = useState(gameData.image);
  const [description, setDescription] = useState(gameData.description);
  const [publisher, setPublisher] = useState(gameData.publisher);
  const [bigImage, setBigImage] = useState(gameData.bigImage);

  const updateGame = useDataStore((state) => state.fetchData.updateGame);

  const handleUpdate = async () => {
    await updateGame(gameData.id, {
      title,
      image,
      description,
      publisher,
      bigImage,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Update Game</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Publisher:
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </label>
        <label>
          Big Image URL:
          <input
            type="text"
            value={bigImage}
            onChange={(e) => setBigImage(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UpdateGameModal;
