import { Post } from 'api/post/post.entity';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sendError from 'utils/error';

interface PostPutByIdParams {
  id: number;
}

interface PostPutByIdBody {
  title: string;
  description: string;
  checkbox: boolean;
}

export async function postPutByIdHandler(req: Request, res: Response, next: NextFunction) {
  const params: PostPutByIdParams = req.params as any;

  const post = await getRepository(Post).findOne({ id: params.id });
  if (!post) return sendError(404, 'post not found', next);

  const body: PostPutByIdBody = req.body;
  console.log('postPutByIdHandler>>>>', body, req.file);
  post.title = body.title;
  post.description = body.description;
  post.checkbox = body.checkbox;
  post.attachment = req.file && req.file.path;
  await getRepository(Post).save(post);

  res.status(200).json({ id: post.id });
}
