"use client"
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";
import { useUser } from '@clerk/clerk-react'


const page = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <div>
      <AddCourse />
      <UserCourseList />
    </div>
  );
};

export default page;
