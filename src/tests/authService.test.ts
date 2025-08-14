import { authService } from "../services/AuthService";
import { db } from "../config/db";
import { IUser, UserRole } from "../models/IUser";

describe("AuthService", () => {
  let user: IUser;

  beforeAll(() => {
    user = {
      id: "test-id",
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      role: UserRole.ADMIN,
      createdAt: new Date(),
    };
    db.data.users = [user];
  });

  it("should authenticate and return a JWT token", async () => {
    const token = await authService.authenticate(user.email, user.password);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("should throw error for invalid credentials", async () => {
    await expect(
      authService.authenticate(user.email, "wrongpass")
    ).rejects.toThrow("Invalid credentials");
    await expect(
      authService.authenticate("wrong@example.com", user.password)
    ).rejects.toThrow("Invalid credentials");
  });

  it("should verify a valid token and return user", async () => {
    const token = await authService.authenticate(user.email, user.password);
    const verifiedUser = await authService.verifyToken(token);
    expect(verifiedUser.id).toBe(user.id);
    expect(verifiedUser.email).toBe(user.email);
  });

  it("should throw error for invalid token", async () => {
    await expect(authService.verifyToken("invalid.token.here")).rejects.toThrow(
      "Invalid token"
    );
  });

  it("should get user by id", async () => {
    const found = await authService.getUserById(user.id);
    expect(found).toBeDefined();
    expect(found?.email).toBe(user.email);
  });
});
