import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export const runtime = 'edge'

export default async function handler(request, response) {

  if (request.method === "POST") {
      const hash = await bcrypt.hash(request.body.password, 10);
      request.body.password = hash;

      console.log(hash);

      let db = (await connectDB).db('IlHwakCheonGuem');
      await db.collection('users').insertOne(request.body);
      response.status(200).json('성공');
  }
};