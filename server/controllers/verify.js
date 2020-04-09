import sgMail from '@sendgrid/mail';
import { pick, isEmpty } from 'lodash';

import * as verificationModel from '../models/verification';
import * as userModel from '../models/user';

export async function sendCode(req, res) {
  const { email } = req.body;

  const verificationCode = Math.random().toString(36);

  // Avoid mailinator signup
  if (email.endsWith('@mailinator.com')) {
    return res.sendStatus(404);
  }

  const code = verificationCode.slice(verificationCode.length - 6);
  const replacements = ({
    email,
    code,
  });

  try {
    const userInfo = await userModel.findUserByEmail(email);

    if (userInfo.length > 1) {
      return res.sendStatus(404);
    }

    const createCount = await verificationModel.createVerificationCode(replacements);

    if (createCount !== 1) {
      return res.sendStatus(404);
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'POS@mail',
      subject: 'Verification Code',
      html: `<strong>Code: ${code}</strong>`,
    };

    const mailRes = await sgMail.send(msg);

    if (!mailRes) {
      return res.sendStatus(401);
    }

    res.status(200).send();
  } catch (error) {
    return res.sendStatus(404);
  }
}


export async function checkCode(req, res, next) {
  const { email, code } = pick(req.body, ['email', 'code']);

  try {
    const codeInfo = await verificationModel.findByEmail(email);

    if (isEmpty(codeInfo)) {
      return res.sendStatus(400);
    }

    const isCodeMatch = code === codeInfo[0].code;

    if (!isCodeMatch) {
      return res.sendStatus(401);
    }

    if (!await verificationModel.deleteByEmail(email)) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(402);
  }
}
