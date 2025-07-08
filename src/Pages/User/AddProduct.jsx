import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tags, setTags] = useState([]);
  const delimiters = [188, 13]; // comma & enter

  const handleDelete = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const onSubmit = async (data) => {
    const imageFile = data.productImage[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbKey = import.meta.env.VITE_IMAGEBB_KEY;
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

    try {
      const imageRes = await fetch(imgbbUrl, {
        method: "POST",
        body: formData,
      });
      const imageData = await imageRes.json();

      if (!imageData.success) {
        toast.error("Image upload failed.");
        return;
      }

      const productImageUrl = imageData.data.url;

      const productData = {
        productName: data.productName,
        productImage: productImageUrl,
        description: data.description,
        externalLink: data.externalLink || "",
        tags: tags.map((tag) => tag.text),
        status: "pending",
        ownerName: user?.displayName,
        ownerEmail: user?.email,
        ownerImage: user?.photoURL,
        timestamp: new Date(),
      };

      const res = await axiosSecure.post("/products", productData);

      if (res.data.insertedId || res.data._id) {
        Swal.fire({
          title: "Success!",
          text: " Product added successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Go to My Products",
        }).then(() => {
          reset();
          setTags([]);
          navigate("/dashboard/my-products");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: " Failed to save product.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Add a New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("productName", { required: true })}
            type="text"
            className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">Product name is required</p>
          )}
        </div>

        {/* Product Image File */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Product Image <span className="text-red-500">*</span>
          </label>
          <input
            {...register("productImage", { required: true })}
            type="file"
            accept="image/*"
            className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
          />
          {errors.productImage && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            readOnly
            value={user?.displayName || ""}
            className="w-full border px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <input
            readOnly
            value={user?.email || ""}
            className="w-full border px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <input
            readOnly
            value={user?.photoURL || ""}
            className="w-full border px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1  text-white">Tags</label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            inputFieldPosition="bottom"
            placeholder="Press enter after each tag"
            classNames={{
              tags: "ReactTags__tags",
              tagInput: "w-full",
              tag: "inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 m-1",
              remove: "ml-1 text-red-500 cursor-pointer",
            }}
          />
        </div>

        {/* External Link */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            External Link
          </label>
          <input
            {...register("externalLink")}
            type="url"
            placeholder="https://example.com"
            className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
