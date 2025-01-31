import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, post_id, text } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./reply.json')) {
    console.log('sent test reply');
    payload = JSON.parse(fs.readFileSync('./reply.json', 'utf8'));
  }
  else {
    try {
      const client = new Client({ token });
      payload['token'] = await client.posts.reply(text, "1", post_id)
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}