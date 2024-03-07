/** @jest-environment jsdom */
import axios from "axios";
import { getFavorites, updateFavorites } from "../src/services/favorites";
import { saveUser } from '../src/utils/user';


jest.mock("axios");

describe("Favorites API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it("should fetch favorites successfully", async () => {
    const user = { username: "testuser", token: "a bearer token", favorites: [] };
    saveUser(user);
    const mockData = { favorites: ["1", "2"] };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData, status: 200 });

    const favorites = await getFavorites("testuser");

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BASE_URL_LOCAL}/user/testuser/favorite`,
      { headers: { Authorization: "a bearer token" } }
    );
    expect(favorites).toEqual(mockData);
  });

  it("should handle errors when user is not authenticated", async () => {
    const errorMessage = "Cannot read properties of undefined (reading 'token')";
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getFavorites("username")).rejects.toThrow(errorMessage);
  });

  it("should update favorites successfully", async () => {
    const user = { username: "testuser", token: "a bearer token", favorites: [] };
    saveUser(user);
    const characterId = "3";
    (axios.put as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const response = await updateFavorites("testuser", characterId);
    
    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BASE_URL_LOCAL}/user/testuser/favorite`,
      { data: { characterId } },
      { headers: { Authorization: "a bearer token" } }
      );
    expect(response).toEqual({ status: 200 });
  });

  it("should handle errors when updating favorites and not authorized", async () => {
    const characterId = "3";
    const errorMessage = "Cannot read properties of undefined (reading 'token')";
    (axios.put as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(updateFavorites("username", characterId)).rejects.toThrow(errorMessage);
  });
});
