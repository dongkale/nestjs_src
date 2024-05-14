export class UserWithoutPassword {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  hachRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
