import {
  pgTable,
  serial,
  varchar,
  json,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

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
  courseBanner: varchar("courseBanner"),
  isPublished: boolean("isPublished").notNull().default(false),
});

export const CourseChapters = pgTable("courseChapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  chapterId: integer("chapterId").notNull(),
  content: json("content").notNull(),
  videoId: varchar("videoId").notNull(),
});



export const UserPlan = pgTable("userPlan", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull(),
  plan: integer("plan").notNull(), // 0 -> basic and 1 -> lifetime
  limit: integer("limit").notNull(), // for basic = 1, for lifetime = 20
});