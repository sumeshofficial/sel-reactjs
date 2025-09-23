import AddImage from "./AddImage";
import ProductField from "./ProductField";
import { useSellProductContext } from "../../Context/SellProductContext/SellProductContext";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { Loader } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellProductForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { reset, isSubmitting, handleSubmit } = useSellProductContext();
  const { currentUser } = useSelector( store => store.auth );
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (selectedFile) {
        const imageRef = ref(
          storage,
          `products/${Date.now()}-${selectedFile.name}`
        );
        await uploadBytes(imageRef, selectedFile);

        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "products"), {
        publishedBy: {
          userId: currentUser?.userId,
          fullname: currentUser?.fullname,
          email: currentUser?.email,
          userImg: currentUser?.userImg,
        },
        ...data,
        price: Number(data.price),
        image: imageUrl,
        createdAt: Date.now(),
      });

      reset();
      setSelectedFile(null);
      toast.success("Product Added");

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-11/12 bg-white rounded-2xl p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-2xl font-bold mb-2">Add Product</h1>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="border-2 border-gray-300 rounded-xl p-5 w-11/12">
              <AddImage
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>
            <div className="border-2 border-gray-300 rounded-xl p-5 w-11/12">
              <ProductField />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader className="w-8 h-8 rounded-full animate-spin" />
                Publishing...
              </div>
            ) : (
              "Publish Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellProductForm;
