import { db, schema, orm } from "@/lib/dbConfig";

export async function getUserByEmail(email) {
	const iusers = await db
		.select()
		.from(schema.users)
		.where(orm.eq(schema.users.email, email));
	const [user] = iusers;
	return user;
}

export async function addUser(credentials) {
	await db.insert(schema.users).values(credentials);
}

export async function searchUser(query) {
	const iusers = await db
		.select({
			username: schema.users.username,
			email: schema.users.email,
		})
		.from(schema.users)
		.where(
			orm.or(
				orm.like(schema.users.username, `%${query}%`),
				orm.like(schema.users.email, `%${query}%`)
			)
		);

	return iusers;
}

export async function getUserByUsername(username) {
	const iusers = await db
		.select()
		.from(schema.users)
		.where(orm.eq(schema.users.username, username));
	const [user] = iusers;
	return user;
}
