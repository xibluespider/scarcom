import { db } from "@/lib/db";

async function getData() {
  const response = await db.execute("select version()");
  return response[0].version;
}

export default async function Page() {
  const data = await getData();
  return <>{data}</>;
}
