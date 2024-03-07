/** @jest-environment jsdom */
import { saveUser, getUser, removeUser } from '../src/utils/user';

describe('userStorage functions', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("User is added into local storage", () => {
    const userStorageKey = "My user"; //Making it the same as in the file user.ts
    const user = { username: "testuser", token: "a bearer token", favorites: [] };
    const storedData = JSON.stringify({ username: "testuser", token: "a bearer token"});

    saveUser(user);
    expect(localStorage.getItem(userStorageKey)).toEqual(storedData);
  });
 
  it("User local storage gets overwritten", () => {
    const userStorageKey = "My user"; //Making it the same as in the file
    const userOld = { username: "testuser", token: "a bearer token", favorites: [] };
    const userNew = { username: "anewuser", token: "a new bearer token", favorites: [] };
    const storedDataOld = JSON.stringify({ username: "testuser", token: "a bearer token"});
    const storedDataNew = JSON.stringify({ username: "anewuser", token: "a new bearer token"});
    
    saveUser(userOld);
    expect(localStorage.getItem(userStorageKey)).toEqual(storedDataOld);

    saveUser(userNew);
    expect(localStorage.getItem(userStorageKey)).toEqual(storedDataNew);
  });

  it('getUser should return user data from localStorage', () => {
    const user = { username: 'testuser', token: 'a bearer token', favorites: [2,3,4] };
    const storedData = { username: "testuser", token: "a bearer token"};

    saveUser(user);
    expect(getUser()).toEqual(storedData);
  });

  it('getUser should return undefined if user data is not present in localStorage', () => {
    expect(getUser()).toBeUndefined();
  });

  it('removeUser should remove user data from localStorage', () => {
    const user = { username: 'testUser', token: 'testToken', favorites: [1,2,3] };
    saveUser(user);
    removeUser();
    expect(localStorage.getItem('My user')).toBeNull();
  });
});
