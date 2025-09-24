import AddImage from "./AddImage";
import ProductField from "./ProductField";
import { useSellProductContext } from "../../Context/SellProductContext/SellProductContext";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { Loader } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SellProductForm = () => {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const { reset, isSubmitting, handleSubmit, setValue } =
    useSellProductContext();
  const { currentUser } = useSelector((store) => store.auth);
  const { items } = useSelector((store) => store.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const product = items.find((product) => product.id === id);

    if (!product || product.publishedBy.userId !== currentUser?.userId) {
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const snap = await getDoc(productRef);

      if (snap.exists()) {
        const data = snap.data();
        setValue("productName", data.productName);
        setValue("category", data.category);
        setValue("price", data.price);
        setValue("description", data.description);
        setSelectedFile(data.image);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (selectedFile instanceof File) {
        const imageRef = ref(
          storage,
          `products/${Date.now()}-${selectedFile.name}`
        );
        await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(imageRef);
      } else if (typeof selectedFile === "string") {
        imageUrl = selectedFile;
      }

      if (id) {
        const productRef = doc(db, "products", id);

        await updateDoc(productRef, {
          ...data,
          price: Number(data.price),
          image: imageUrl,
          updatedAt: Date.now(),
        });

        toast.success("Product Updated");
      } else {
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
          sold: false,
          deleted: false,
        });

        toast.success("Product Added");
      }

      reset();
      setSelectedFile(null);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-11/12 bg-white rounded-2xl p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {id ? "Edit Product" : "Add Product"}
          </h1>
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
