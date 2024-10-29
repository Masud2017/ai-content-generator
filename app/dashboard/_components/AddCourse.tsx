"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseList.context";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import {useState,useEffect} from "react";
import {doc, getDoc} from "firebase/firestore";
import { fireStoreClient } from "@/configs/firebase.config";


const AddCourse = () => {
  const { isSignedIn, user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);

  const [generationLimit, setGenerationLimit] = useState(0);

  useEffect(()=> {
    (async function(){
      let limit = await getCourseGenerationLimit();
      setGenerationLimit(limit);
    })();
  }, [generationLimit])

  const getCourseGenerationLimit = async ()=> {
    
    let username:string = user?.emailAddresses[0].emailAddress || "";

    let user_plan_doc = await getDoc(doc(fireStoreClient,"user_plans", username));
    if (user_plan_doc.exists()) {
      let data = user_plan_doc.data();
      return data["limit"]
    }
  }


  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl">
          Hello, <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-xs text-gray-500">
          Create new course with AI, share with friends and Earn some penny
        </p>
      </div>
      <Link href={userCourseList.length >= generationLimit ? "/dashboard/upgrade" : "/create-course"}>
        <Button className="gap-2">
          <FaWandMagicSparkles />
          Create AI course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
