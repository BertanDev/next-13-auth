-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification_uuid" TEXT,
    "email_checked" TEXT NOT NULL DEFAULT 'not_checked'
);
INSERT INTO "new_users" ("created_at", "email", "email_checked", "id", "name", "password", "verification_uuid") SELECT "created_at", "email", "email_checked", "id", "name", "password", "verification_uuid" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
