import ImageUploader from "./ImageUploader";

const AddImage = ({ selectedFile, setSelectedFile }) => {
  return (
    <div>
      <h2 className="mb-3">Add Image</h2>
      <ImageUploader
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
};

export default AddImage;
