import { db } from "@/lib/dbConfig";

import {
	getUserByEmail,
	addUser,
	searchUser,
	getUserByUsername,
} from "./db-functions/db-user";

import {
	addMessageToGlobal,
	getGlobalMessages,
	deleteGlobalMessage,
} from "./db-functions/db-global";

import {
	getCommonChannel,
	deleteChannel,
	createChannel,
} from "./db-functions/db-channel";

import {
	createMessage,
	deleteMessage,
	getMessages,
} from "./db-functions/db-message";

export { db };

export { getUserByEmail, addUser, searchUser, getUserByUsername };

export { addMessageToGlobal, getGlobalMessages, deleteGlobalMessage };

export { getCommonChannel, deleteChannel, createChannel };

export { createMessage, deleteMessage, getMessages };
