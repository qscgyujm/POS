import { IncomingWebhook } from '@slack/webhook';

import userModel from '../models/user';

import { getTime, convertTime } from '../helper/time';

export default async (req, res, next) => {
  const webhook = new IncomingWebhook(process.env.SLACK_POS_BOT);

  const userInfo = await userModel.findByEmail(req.body.email);

  (async () => {
    await webhook.send({
      text: `
        Login: userId: ${userInfo.id} \n
          Name: ${userInfo.name} \n
          loginTime: ${convertTime(new Date(getTime()))} \n
          ip: ${req.ip}
      `,
      channel: '#pos-bot',
      username: 'webhookbot',
      icon_emoji: ':frog:',
    });
  })();

  next();
};
