// tests/authenticate.spec.ts

import axios from "axios";
import { login, signup } from "../src/services/authenticate";

jest.mock("axios");

describe("authenticate service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should login successfully", async () => {
      const mockData = { userId: "123", username: "testUser" };
      const username = "testUser";
      const password = "testPassword";
      const expectedResponse = { data: mockData, status: 200 };

      (axios.post as jest.Mock).mockResolvedValueOnce(expectedResponse);

      const result = await login(username, password);

      expect(result).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/user/login`,
        { username, password },
        { withCredentials: true }
      );
    });

    it("should throw an error for invalid credentials", async () => {
      const username = "testUser";
      const password = "testPassword";
      const expectedError = new Error("Invalid credentials");

      (axios.post as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(login(username, password)).rejects.toThrow(expectedError);
    });
  });

  describe("signup", () => {
    it("should signup successfully", async () => {
      const mockData = { userId: "123", username: "testUser" };
      const username = "testUser";
      const password = "testPassword";
      const expectedResponse = { data: mockData, status: 201 };

      (axios.post as jest.Mock).mockResolvedValueOnce(expectedResponse);

      const result = await signup(username, password);

      expect(result).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/user/register`,
        { username, password },
        { withCredentials: true }
      );
    });

    it("should throw an error for failed signup", async () => {
      const username = "testUser";
      const password = "testPassword";
      const expectedError = new Error("Error in creating user");

      (axios.post as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(signup(username, password)).rejects.toThrow(expectedError);
    });
  });
});
