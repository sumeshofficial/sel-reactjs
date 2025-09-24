import { useEffect, useRef } from "react";
import { Upload, X } from "react-feather";
import { useSellProductContext } from "../../Context/SellProductContext/SellProductContext";

const ImageUploader = ({ selectedFile, setSelectedFile }) => {
  const inputRef = useRef(null);
  const { register, errors, setValue } = useSellProductContext();

  useEffect(() => {
    if (selectedFile) {
      setValue("image", selectedFile, { shouldValidate: true });
    }
  }, [selectedFile, setValue]);

  const onChooseFiles = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedFile(null);
    setValue("image", null, { shouldValidate: true });
  };

  return (
    <div>
      {/* file input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        {...register("image", {
          validate: {
            required: (file) =>
              file instanceof File ||
              typeof file === "string" ||
              "Product image is required",
          },
        })}
        ref={(el) => {
          register("image").ref(el);
          inputRef.current = el;
        }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setSelectedFile(file);
            setValue("image", file, { shouldValidate: true });
          }
        }}
      />

      {/* button/show */}

      {!selectedFile ? (
        <>
          <button
            type="button"
            className="w-11/12 md:h-70 h-40 text-2xl font-medium flex justify-center flex-col bg-gray-100 border-2 border-dashed border-blue-400 text-blue-500 cursor-pointer transition-all duration-300 ease-linear hover:text-blue-300 hover:bg-gray-50 rounded-2xl gap-1 items-center"
            onClick={onChooseFiles}
          >
            <span className="p-3 text-2xl flex items-center justify-center rounded-full bg-gray-300">
              <Upload className="w-6 h-6" />
            </span>
            Upload Image
          </button>
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </>
      ) : (
        <div className="w-11/12 sm:h-auto md:h-70 flex justify-center items-center rounded-2xl overflow-hidden">
          <img
            src={
              selectedFile instanceof File
                ? URL.createObjectURL(selectedFile)
                : selectedFile
            }
            alt="Preview"
            className="max-h-full max-w-full object-contain rounded-xl"
          />
        </div>
      )}

      {selectedFile && (
        <>
          <div className="w-10/12 mt-5 border-blue-300 rounded-2xl flex items-center gap-3 bg-white border-2 px-2 py-3">
            <span className="text-blue-500">
              <img
                className="w-8 h-8"
                src={
                  selectedFile instanceof File
                    ? URL.createObjectURL(selectedFile)
                    : selectedFile
                }
              />
            </span>

            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1 w-0">
                <h6 className="flex text-base font-medium truncate">
                  {selectedFile instanceof File
                    ? selectedFile.name
                    : selectedFile.split("/").pop().split("?")[0]}
                </h6>
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
