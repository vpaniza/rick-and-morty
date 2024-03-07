import { useNavigate } from "react-router-dom";
import { useCharactersQuery } from "../../hooks/useCharacter"
import { CharacterCard, CharacterCardProps } from "../characterCard/CharacterCard";
import "./CardsWrapper.css";
import { Spinner } from "../spinner/Spinner";
import { useEffect, useState } from "react";

type SortBy =  "name-asc" | "name-desc" | "species";

export const CardsWrapper = () => {
  const { data: characters, isLoading, isFetching } = useCharactersQuery();
  const navigate = useNavigate();
  const [ sortedCharacters, setSortedCharacters ] = useState(characters);
  const [ sortBy, setSortBy ] = useState<SortBy>();

  useEffect(() => {
    setSortedCharacters(characters);
  }, [characters]);

  const handleSortBy = (sortKey: string) => {
    let sortedChars = characters;
    setSortBy(sortKey as SortBy)
    switch (sortKey) {
      case "name-asc":
        sortedChars.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedChars.sort((a: any, b:any) => b.name.localeCompare(a.name));
        break;
      case "species":
        sortedChars.sort((a:any, b:any) => a.species.localeCompare(b.species));
        break;
      default:
        break;
      };
      setSortedCharacters(sortedChars);
  };

  return(
    <div className="container">
      <div className="cards-section">
      {isLoading || isFetching ?
        <Spinner />
        :
        <>
          <div className="card-sorting">
            <label htmlFor="sorting">
              Sort by: 
            </label>
            <select 
              value={sortBy}
              id="sorting" 
              name="sorting" 
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <option value="name-asc">Name ASC</option>
              <option value="name-desc">Name DESC</option>
              <option value="species">Species</option>
            </select>
          </div>
          <div className="cards">
            {sortedCharacters?.map((ch: CharacterCardProps) => {
              return (
                <div key={`${ch.id}+${ch.name}`} onClick={() => navigate(`/character/${ch.id}`)} className="character-card">
                  <CharacterCard data={ch} />
                </div>
              )
            })}
          </div>
        </>
      }
      </div>
    </div>
  )
};