CREATE TABLE warranties (
 id TEXT PRIMARY KEY NOT NULL,
 code TEXT NOT NULL UNIQUE,
 customer TEXT NOT NULL,
 phone TEXT NOT NULL,
 product TEXT NOT NULL,
 clinic TEXT NOT NULL,
 quantity INTEGER NOT NULL,
 positions TEXT NOT NULL DEFAULT '',
 start TEXT NOT NULL,
 end TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'active',
 notes TEXT NOT NULL DEFAULT '',
 updated_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE INDEX warranties_phone_idx ON warranties(phone);
--> statement-breakpoint
CREATE TABLE administrators (id TEXT PRIMARY KEY NOT NULL);
