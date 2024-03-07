import { useParams } from "react-router-dom"
import { useCharacterQuery } from "../hooks/useCharacter";
import "./CharacterPage.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserFavoritesMutation, useUserFavoritesQuery } from "../hooks/useUser";

export const CharacterPage = () => {
  const { characterId } = useParams<{ characterId: string}>();
  const { data } = useCharacterQuery(characterId ?? "");
  const { favoritesMutation } = useUserFavoritesMutation();
  const { data: favorites } = useUserFavoritesQuery();

  const handleUpdateFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, characterId: string) => {
    e.stopPropagation();
    favoritesMutation(characterId)
  };

  return data && (
    <div className="character-page">
      <h1>{data.name}</h1>
      <div className="content">
        <img src={data.image} alt={data.name} />
        <div className="description">
          <div className="item">
            <p>Status: </p>
            <p>{data.status}</p>
          </div>
          <div className="item">
            <p>Species: </p>
            <p>{data.species}</p>
          </div>
          <div className="item">
            <p>Gender: </p>
            <p>{data.gender}</p>
          </div>
          {data.origin.name !== "unknown" &&
            <div className="item">
              <p>Origin: </p>
              <p>{data.origin.name}</p>
            </div>
          }
          <button className="favorite" onClick={(e) => handleUpdateFav(e, data.id)}>
            <p>{favorites?.favorites.includes(data.id) ? "Remove favorite" : "Mark as favorite"}</p> 
            <FontAwesomeIcon icon={faStar} color={favorites?.favorites.includes(data.id) ? "yellow" : "gray"} />
          </button>
        </div>
      </div>
    </div>
  )
}