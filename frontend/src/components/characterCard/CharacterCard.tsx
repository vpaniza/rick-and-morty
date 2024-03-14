import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCard.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useUserFavoritesMutation, useUserFavoritesQuery } from "../../hooks/useUser";
import { Character } from "../../models/character";

export const CharacterCard = ({data}: {data: Character}) => {
  const { favoritesMutation } = useUserFavoritesMutation();
  const { data: favorites } = useUserFavoritesQuery();

  const handleUpdateFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, characterId: string) => {
    e.stopPropagation();
    favoritesMutation(characterId)
  };
  return( 
    <div className="card-container">
      <h4>{data.name}</h4>
      <img src={data.image} alt={`Character ${data.name}`} />
      <button className="favorite" onClick={(e) => handleUpdateFav(e, data.id)}>
        <p>{favorites?.favorites.includes(data.id) ? "Remove favorite" : "Mark as favorite"}</p> 
        <FontAwesomeIcon icon={faStar} color={favorites?.favorites.includes(data.id) ? "yellow" : "gray"} />
      </button>
    </div>
  )
}