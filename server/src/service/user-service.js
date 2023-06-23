const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const UserModel = require('../models/user-model');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password) {
    // проверяем есть ли user с таким email
    const candidate = await UserModel.findOne({ email });
    // если есть, выбросить ошибку
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с email ${ email } уже существует`);
    }
    // хешируем пароль
    const hashPassword = bcrypt.hashSync(password, 3);
    // создаем id
    const activationLink = uuid.v4();
    // создаем user
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    // вызываем функцию по отправке id на email
    await mailService.sendActivationMail(
      email,
      `${ process.env.API_URL }/api/activate/${ activationLink }`,
    );
    // создаем user без поля пароль
    const userDto = new UserDto(user);
    // создаем токены
    const tokens = tokenService.generateTokens(
      { ...userDto },
    );
    // создаем модель токена в бд или обновляем
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
    );

    return {
      ...tokens,
      user: userDto,
    };

  }

  async activate(activationLink) {
    // находим user в бд по activateLink
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активаци');
    }

    // если user есть меняем поле и сохраняем user
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    // ищем user в бд по email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь не был найден');
    }
    // сравним пароли
    const isPassEquals = bcrypt.compareSync(
      password,
      user.password,
    );
    if (!isPassEquals) {
      throw ApiError.BadRequest('Геверный пароль');
    }
    // убираем из модели все ненужное
    const userDto = new UserDto(user);
    // генерируем токены
    const tokens = tokenService.generateTokens(
      { ...userDto },
    );
    // создаем модель токена в бд или обновляем
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
    );

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(
      refreshToken,
    );
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(
      refreshToken,
    );
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);

    // убираем из модели все ненужное
    const userDto = new UserDto(user);
    // генерируем токены
    const tokens = tokenService.generateTokens(
      { ...userDto },
    );
    // создаем модель токена в бд или обновляем
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
    );

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async updateProfile(userId, email, name, password) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    if (email) {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw ApiError.BadRequest('Email already in use');
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = bcrypt.hashSync(password, 3);
    }

    await user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
