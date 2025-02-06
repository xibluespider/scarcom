import { db, schema, orm } from "@/lib/dbConfig";

export async function addMessageToGlobal(payload) {
	await db
		.insert(schema.globalMessages)
		.values(payload)
		.onConflictDoUpdate({
			target: schema.globalMessages.ringId,
			set: { ...payload, createdAt: orm.sql`NOW()` },
		});
}

export async function deleteGlobalMessage(messageId) {
	await db
		.delete(schema.globalMessages)
		.where(orm.eq(schema.globalMessages.messageId, messageId));
}

export async function getGlobalMessages() {
	const initialGlobalMessages = await db
		.select({
			username: schema.users.username,
			message: schema.globalMessages.message,
			messageId: schema.globalMessages.messageId,
			createdAt: schema.globalMessages.createdAt,
		})
		.from(schema.globalMessages)
		.innerJoin(
			schema.users,
			orm.eq(schema.globalMessages.userId, schema.users.id)
		)
		.orderBy(orm.asc(schema.globalMessages.createdAt));

	return initialGlobalMessages;
}
