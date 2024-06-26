import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMapper } from './dto/user.mapper';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';
import { HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserLoginRequestDto } from './dto/user-login-request.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserController,
        {
          provide: UserService,
          useValue: {
            signupUser: jest.fn(),
            loginUser: jest.fn(),
            getAllUser: jest.fn(),
            getUserNickname: jest.fn(),
          },
        },
        {
          provide: UserMapper,
          useValue: {
            DtoFromEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userMapper = module.get<UserMapper>(UserMapper);
  });

  describe('signupUser (회원가입 API)', () => {
    it('should return the expected result', async () => {
      const signupResult = new User();
      signupResult.id = 1;
      signupResult.email = 'test@example.com';
      signupResult.password = 'test';
      signupResult.nickname = 'test';

      const mappedResult = {
        id: signupResult.id,
        email: signupResult.email,
        password: signupResult.password,
        nickname: signupResult.nickname,
      };

      jest.spyOn(userService, 'signupUser').mockResolvedValue(signupResult);
      jest.spyOn(userMapper, 'DtoFromEntity').mockReturnValue(mappedResult);

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const userSignupRequestDto: UserSignupRequestDto = {
        email: 'test@example.com',
        password: 'test',
        nickname: 'test',
      };

      await userController.signupUser(userSignupRequestDto, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith(mappedResult);
    });
  });

  describe('loginUser (로그인 API)', () => {
    it('should return the expected result', async () => {
      const loginResult = new User();
      loginResult.id = 1;
      loginResult.email = 'test@example.com';
      loginResult.password = 'test';
      loginResult.nickname = 'test';

      const mappedResult = {
        id: loginResult.id,
        email: loginResult.email,
        password: loginResult.password,
        nickname: loginResult.nickname,
      };

      jest.spyOn(userService, 'loginUser').mockResolvedValue(loginResult);
      jest.spyOn(userMapper, 'DtoFromEntity').mockReturnValue(mappedResult);

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const userLoginRequestDto: UserLoginRequestDto = {
        email: 'test@example.com',
        password: 'test',
      };

      await userController.loginUser(userLoginRequestDto, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(mappedResult);
      expect(userService.loginUser).toHaveBeenCalledWith(userLoginRequestDto);
    });
  });

  describe('getAllUser (회원 전체 조회 API)', () => {
    it('should return all users', async () => {
      const testUsers: User[] = [
        Object.assign(new User(), {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          email: 'test1@example.com',
          password: 'testPassword1',
          nickname: 'testUser1',
          isActive: true,
        }),
        Object.assign(new User(), {
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          email: 'test2@example.com',
          password: 'testPassword2',
          nickname: 'testUser2',
          isActive: true,
        }),
      ];

      jest.spyOn(userService, 'getAllUser').mockResolvedValue(testUsers);

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await userController.getAllUser(res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(testUsers);
    });
  });

  describe('getUserNickname (닉네임 반환 API)', () => {
    it('should return the nickname of the user', async () => {
      const testUserId = 1;
      const testNickname = 'testUser1';

      jest
        .spyOn(userService, 'getUserNickname')
        .mockResolvedValue({ nickname: testNickname });

      const result = await userController.getUserNickname(testUserId);

      expect(result).toEqual({ nickname: testNickname });
      expect(userService.getUserNickname).toHaveBeenCalledWith(testUserId);
    });
  });
});
