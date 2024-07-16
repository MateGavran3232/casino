import React, { useState } from "react";
import useDataStore from "../../store/useDataStore";

const AddGameForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [bigImage, setBigImage] = useState("");

  const { fetchData } = useDataStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData.addGame({ title, image, description, publisher, bigImage });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        placeholder="Publisher"
        required
      />
      <input
        type="text"
        value={bigImage}
        onChange={(e) => setBigImage(e.target.value)}
        placeholder="Big Image URL"
        required
      />
      <button type="submit">Add Game</button>
    </form>
  );
};

export default AddGameForm;
