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

export { db };

export { getUserByEmail, addUser, searchUser, getUserByUsername };

export { addMessageToGlobal, getGlobalMessages, deleteGlobalMessage };
