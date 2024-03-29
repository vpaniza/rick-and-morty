import { useNavigate } from "react-router-dom";
import { useCharactersMutation, useCharactersQuery } from "../../hooks/useCharacter"
import { CharacterCard } from "../characterCard/CharacterCard";
import ReactPaginate from 'react-paginate';
import "./CardsWrapper.css";
import { Spinner } from "../spinner/Spinner";
import { useEffect, useState } from "react";
import { Character } from "../../models/character";

type SortBy =  "name-asc" | "name-desc" | "species";

export const CardsWrapper = () => {
  const { data, isLoading, isFetching } = useCharactersQuery();
  const { mutate } = useCharactersMutation();
  const navigate = useNavigate();
  const [ sortedCharacters, setSortedCharacters ] = useState(data?.characters ?? []);
  const [ sortBy, setSortBy ] = useState<SortBy>();

  useEffect(() => {
    if(data) setSortedCharacters(data.characters);
  }, [data]);

  const handleSortBy = (sortKey: string) => {
    if(data){
      let sortedChars = data.characters;
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
    }
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
            {sortedCharacters?.map((ch: Character) => {
              return (
                <div key={`${ch.id}+${ch.name}`} onClick={() => navigate(`/character/${ch.id}`)} className="character-card">
                  <CharacterCard data={ch} />
                </div>
              )
            })}
          </div>
          {data && data.info &&
            <ReactPaginate
              breakLabel="..."
              onPageChange={(event) => mutate(event.selected + 1)}
              pageRangeDisplayed={1}
              pageCount={data.info.pages}
              nextLabel={data.info.next === null ? null : "Next >"}
              previousLabel={data.info.prev === null ? null : "< Previous"}
              renderOnZeroPageCount={null}
              className="pagination"
            />
          }
        </>
      }
      </div>
    </div>
  )
};