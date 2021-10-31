import { Account } from 'api/account/account.entity';
import bcrypt from 'bcryptjs';
import { JWT_EXPIRE } from 'config/environments';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sendError from 'utils/error';
import { getTokenByIdAction } from '../action/account.getTokenById';

interface PostEntryTestBody {
  email: string
  level: {
    income: number,
    experience: number,
    risk: number
  }
}

export async function postEntryTestHandler(req: Request, res: Response, next: NextFunction) {
  console.log('.... in postEntryTestHandler')
  const body: PostEntryTestBody = req.body;
  const email = body.email
  const level = body.level;

  const oldAccount = await getRepository(Account).findOne({ email });

  const newAccount = { ...oldAccount, level }
  const account = await getRepository(Account).save(newAccount);
  console.log(account)
  res.status(200).json({ level });
}
