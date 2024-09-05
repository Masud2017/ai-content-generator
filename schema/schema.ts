import { pgTable, serial, varchar, json, timestamp } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  courseName: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  courseOutput: json("courseOutput").notNull(),
  isVideo: varchar("isVideo").notNull().default("Yes"),
  username: varchar("username"),
  userprofileimage: varchar("userprofileimage"),
  createdBy: varchar("createdBy"),
});
