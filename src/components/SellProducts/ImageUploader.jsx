import { CloseButton } from "@headlessui/react";
import { useRef, useState } from "react";
import { Upload, UploadCloud, X } from "react-feather";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onChooseFiles = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  }

  return (
    <div>
      {/* file input */}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {/* button/show */}

      {!selectedFile ? (
        <button
          className="w-11/12 h-70 text-2xl font-medium flex justify-center flex-col bg-gray-100 border-2 border-dashed border-blue-400 text-blue-500 cursor-pointer transition-all duration-300 ease-linear hover:text-blue-300 hover:bg-gray-50 rounded-2xl gap-1 items-center"
          onClick={onChooseFiles}
        >
          <span className="p-3 text-2xl flex items-center justify-center rounded-full bg-gray-300">
            <Upload className="w-6 h-6" />
          </span>
          Upload Image
        </button>
      ) : (
        <div className="w-11/12 sm:h-auto md:h-70 flex justify-center items-center rounded-2xl overflow-hidden">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="max-h-full max-w-full object-contain rounded-xl"
          />
        </div>
      )}

      {selectedFile && (
        <>
          <div className="w-10/12 mt-5 border-blue-300 rounded-2xl flex items-center gap-3 bg-white border-2 px-2 py-3">
            <span className="text-blue-500"><img className="w-8 h-8" src={URL.createObjectURL(selectedFile)}/></span>

            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1 w-0">
                <h6 className="flex text-base font-medium truncate">{selectedFile.name}</h6>
              </div>
              <button onClick={clearFileInput}>
                <span className="cursor-pointer">
                  <X />
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* {selectedFile && (
        <>
          <div className="w-10/12 mt-5 border-blue-300 rounded-2xl flex items-center gap-3 bg-white border-2 px-2 py-3">
            <span className="text-blue-500"><img src={selectedFile}/></span>

            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1 w-0">
                <h6 className="flex text-base font-medium truncate">{selectedFile.name}</h6>
                <div className="w-full h-1.5 bg-gray-300 rounded-2xl mt-2">
                  <div className="w-5/12 h-1.5 rounded-2xl bg-cyan-500 transition-[width] duration-500 ease-linear"></div>
                </div>
              </div>
              <button onClick={clearFileInput}>
                <span className="cursor-pointer">
                  <X />
                </span>
              </button>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

export default ImageUploader;
