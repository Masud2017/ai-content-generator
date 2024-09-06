"use client";

import Image from "next/image";
import { CourseType } from "../page";
import { LuPuzzle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./_edit/EditCourseBasicInfo";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { uploadFilesToFirebase } from "../_utils/uploadFilesToFirebase";

type CourseBasicInfoProps = {
  courseInfo: CourseType | null;
  onRefresh: (refresh: boolean) => void;
};

const CourseBasicInfo = ({ courseInfo, onRefresh }: CourseBasicInfoProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    setSelectedImage(courseInfo?.courseBanner);
  }, [courseInfo]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) as Blob;
    setSelectedImage(URL.createObjectURL(file));
    uploadFilesToFirebase(file, courseInfo!);
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <h2 className="font-bold text-3xl">
            {courseInfo?.courseOutput.topic}
            <EditCourseBasicInfo
              courseInfo={courseInfo}
              onRefresh={() => onRefresh(true)}
            />
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {courseInfo?.courseOutput.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <LuPuzzle /> {courseInfo?.category}
          </h2>

          <Button className="w-full mt-5">Start</Button>
        </div>
        <div>
          <label htmlFor="image-upload">
            <Image
              src={selectedImage ? selectedImage : "/vercel.svg"}
              alt="image"
              width={200}
              height={200}
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
            />
          </label>
          <Input
            type="file"
            accept="image/*"
            id="image-upload"
            className="opacity-0"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
