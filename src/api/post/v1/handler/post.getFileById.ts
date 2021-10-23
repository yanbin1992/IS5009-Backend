import { Post } from 'api/post/post.entity';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sendError from 'utils/error';
import { join } from 'path';

interface PostGetFileByIdParams {
  id: number;
}

export async function postGetFileByIdHandler(req: Request, res: Response, next: NextFunction) {
  const params: PostGetFileByIdParams = req.params as any;

  const post = await getRepository(Post).findOne({ id: params.id });
  if (!post) return sendError(404, 'post not found', next);
  try {
    res.status(200).sendFile(join(process.cwd(), post.attachment));
  } catch (err) {
    console.error(err);
  }
}
