import { Post } from 'api/post/post.entity';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sendError from 'utils/error';


interface PostGetByIdParams {
  id: number;
}

export async function postGetByIdHandler(req: Request, res: Response, next: NextFunction) {
  const params: PostGetByIdParams = req.params as any;

  const post = await getRepository(Post).findOne({ id: params.id });
  if (!post) return sendError(404, 'post not found', next);

  res.status(200).json(post);
}
