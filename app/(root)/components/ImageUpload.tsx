"use client";

import { CldUploadWidget } from "next-cloudinary";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const ImageUpload = () => {
  const { setValue } = useFormContext();
  const [singleImage, setSingleImage] = useState("");

  const handleUpload = useCallback((result: any) => {
    setSingleImage(result.info.secure_url);
    setValue("image", result.info.secure_url);
  }, []);
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="unb4qhox"
      options={{ maxFiles: 6 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`w-[20%]
           text-neutral-600 relative cursor-pointer h-40 hover:opacity-70 transition border-dashed border-2 p-10 border-[#ccc] flex flex-col justify-center items-center gap-3`}
          >
            {singleImage !== "" ? (
              <Image
                alt="collection-img"
                src={singleImage}
                objectFit="contain"
                fill={true}
              />
            ) : (
              <>
                <p>Thêm ảnh</p>
              </>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
