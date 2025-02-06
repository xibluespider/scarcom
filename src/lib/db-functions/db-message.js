import { db, schema, orm } from "@/lib/dbConfig";

export async function createMessage(channelId, userId, message) {
	const [newMessage] = await db
		.insert(schema.messages)
		.values({ channelId, userId, message })
		.returning();
	return newMessage;
}

export async function deleteMessage(messageId) {
	await db.delete(schema.messages).where(orm.eq(schema.messages.id, messageId));
}

export async function getMessages(channelId) {
	return await db
		.select()
		.from(schema.messages)
		.where(orm.eq(schema.messages.channelId, channelId))
		.orderBy(orm.asc(schema.messages.createdAt));
}
