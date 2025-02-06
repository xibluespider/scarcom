import { db, schema, orm } from "@/lib/dbConfig";

async function findUserByUsername(tx, username) {
	const [user] = await tx
		.select()
		.from(schema.users)
		.where(orm.eq(schema.users.username, username))
		.limit(1);

	return user;
}

async function findCommonChannel(tx, user1Id, user2Id) {
	const cp1 = orm.aliasedTable(schema.channelParticipants, "cp1");
	const cp2 = orm.aliasedTable(schema.channelParticipants, "cp2");

	const commonChannel = await tx
		.select({ channelId: cp1.channelId })
		.from(cp1)
		.where(orm.eq(cp1.userId, user1Id))
		.innerJoin(
			cp2,
			orm.and(orm.eq(cp1.channelId, cp2.channelId), orm.eq(cp2.userId, user2Id))
		)
		.limit(1);

	return commonChannel[0]?.channelId || null;
}

async function createNewChannel(tx) {
	const [newChannel] = await tx.insert(schema.channels).values({}).returning();
	console.log(newChannel);
	return newChannel.id;
}

async function createChannelParticipants(tx, channelId, userIds) {
	const participants = userIds.map((userId) => ({
		channelId,
		userId,
	}));
	await tx.insert(schema.channelParticipants).values(participants);
}

export async function createChannel(userIds) {
	return db.transaction(async (tx) => {
		const channelId = await createNewChannel(tx);
		await createChannelParticipants(tx, channelId, userIds);
		return channelId;
	});
}

async function deleteChannelData(tx, channelId) {
	await tx
		.delete(schema.messages)
		.where(orm.eq(schema.messages.channelId, channelId));
	await tx
		.delete(schema.channelParticipants)
		.where(orm.eq(schema.channelParticipants.channelId, channelId));
	await tx.delete(schema.channels).where(orm.eq(schema.channels.id, channelId));
}

export async function deleteChannel(channelId) {
	return db.transaction((tx) => deleteChannelData(tx, channelId));
}

export async function getCommonChannel(username1, username2) {
	return db.transaction(async (tx) => {
		const user1 = await findUserByUsername(tx, username1);
		const user2 = await findUserByUsername(tx, username2);

		if (!user1) {
			throw new Error(`${username1} not found`);
		}

		if (!user2) {
			throw new Error(`${username2} not found`);
		}

		let channelId = await findCommonChannel(tx, user1.id, user2.id);

		if (!channelId) {
			channelId = await createNewChannel(tx);
			await createChannelParticipants(tx, channelId, [user1.id, user2.id]);
		}

		return channelId;
	});
}
