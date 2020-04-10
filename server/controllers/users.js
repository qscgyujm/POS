import bcrypt from 'bcryptjs';
import { pick, isEqual } from 'lodash';

import userModel from '../models/user';

import { getTime } from '../helper/time';

export async function findUserById(req, res) {
  const userId = pick(req.params, ['id']).id;

  const user = pick(await userModel.findById(userId), ['email', 'name', 'location']);
  res.json(
    user,
  );
}

export async function findUser(req, res) {
  const { userId } = req;

  try {
    const user = await userModel.findById(userId);
    const userInfo = pick(user, ['email', 'name', 'location', 'updatedAt']);

    res
      .status(200)
      .json({
        profile: userInfo,
      });
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function updateUser(req, res) {
  const { userId } = req;

  try {
    const user = await userModel.findById(userId);
    const inputSetting = pick(req.body, ['name', 'location']);

    const replacements = {
      ...pick(user, ['name', 'location']),
      ...inputSetting,
      id: userId,
      updatedAt: getTime(),
    };

    const updatedCount = await userModel.updateUser(replacements);

    if (updatedCount !== 1) {
      return res.sendStatus(404);
    }

    const newProfile = pick(
      await userModel.findById(userId),
      ['email', 'name', 'location', 'updatedAt'],
    );

    res
      .status(200)
      .json({
        profile: newProfile,
      });
  } catch (error) {
    res.sendStatus(401);
  }
}

export async function createUser(req, res) {
  const { password } = pick(req.body, ['password']);

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);

    const replacements = {
      ...req.body,
      password: hashedPassword,
    };

    const createCount = await userModel.createUser(replacements);

    if (createCount !== 1) {
      return res.sendStatus(401);
    }

    res.status(200).send();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function changePassword(req, res) {
  const { userId } = req;

  const placement = pick(req.body, ['password', 'newPassword', 'confirmPassword']);

  if (!isEqual(placement.newPassword, placement.confirmPassword)) {
    res.sendStatus(401);
  }

  try {
    const userInfo = pick(
      await userModel.findUser(userId),
      ['password'],
    );

    const isMatch = await bcrypt.compare(placement.password, userInfo.password);

    if (!isMatch) {
      res.sendStatus(400);
    }

    // const hashedPassword = bcrypt.hashSync(placement.newPassword, 8);

    // const user = await userModel.findUser(userId);

    // const replacements = {
    //   ...pick(user, ['id']),
    //   password: hashedPassword,
    // };

    // const updatedCount = await userModel.updatePassword(replacements);

    // if (updatedCount !== 1) {
    //   return res.sendStatus(404);
    // }

    res.sendStatus(201).send();
  } catch (error) {
    res.sendStatus(401).send();
  }
}
