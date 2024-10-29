CREATE TABLE IF NOT EXISTS "userPlan" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"plan" integer NOT NULL,
	"limit" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "userPlanManagement";