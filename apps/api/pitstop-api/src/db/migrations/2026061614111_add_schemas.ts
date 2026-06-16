import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createSchema("auth").execute();
	await db.schema.createSchema("pitstop").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropSchema("pitstop").execute();
	await db.schema.dropSchema("auth").execute();
}
