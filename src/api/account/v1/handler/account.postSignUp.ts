import { Account } from 'api/account/account.entity';
import bcrypt from 'bcryptjs';
import { JWT_EXPIRE } from 'config/environments';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import sendError from 'utils/error';
import { getTokenByIdAction } from '../action/account.getTokenById';
import random from 'random';

interface PostSignUpBody {
  name: string;
  email: string;
  password: string;
  level: {
    income: number;
    experience: number;
    risk: number;
  };
  accountData: {
    balance: number;
    base: number;
    rewards: number;
    certificate: number;
  };
}

export async function postSignUpHandler(req: Request, res: Response, next: NextFunction) {
  const randomRoiRate = random.float(0.03, 0.15);
  const randomBase = random.float(0, 100000);
  const randomAccountData = {
    balance: randomBase * randomRoiRate,
    base: randomBase,
    rewards: random.int(0, 100),
    certificate: random.int(0, 75),
  };

  const body: PostSignUpBody = req.body;
  const name = body.name;
  const email = body.email;
  const level = body.level;

  const oldAccount = await getRepository(Account).findOne({ email });
  if (oldAccount) return sendError(400, 'email already in use', next);

  const password = await bcrypt.hash(body.password, 10);

  const newAccount = getRepository(Account).create({
    name,
    email,
    password,
    level,
    permissions: ['admin'],
    accountData: randomAccountData,
  });
  
  const account = await getRepository(Account).save(newAccount);

  const accessToken = await getTokenByIdAction(account.id);

  res.status(201).json({ access_token: accessToken, expires_in: JWT_EXPIRE });
}
