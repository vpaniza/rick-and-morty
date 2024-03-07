import User from "../models/user";

export const markCharacterAsFavorite = async (userId: string, characterId: number) => {
  try{
    const user = await User.findOne({ username: userId });
    let response;
    if (!user) {
      throw new Error("User not found");
    }
    if (user.favorites.includes(characterId)) { //Remove from favorites
      user.favorites = user.favorites.filter((ch) => ch !== characterId);
      response = { success: true, message: "Character removed from favorites" };
    }else{
      user.favorites.push(characterId);
      response = { success: true, message: "Character marked as favorite"};
    }
    await user.save();
    return response;
  }catch(err: any) {
    console.error("Error marking character as favorite: ", err.message);
    return { success: false, message: err.message };
  }
}