import { CardsWrapper } from "../components/cardsWrapper/CardsWrapper";
import { Header } from "../components/header/Header";

export const HomePage = () => {
  return(
    <>
      <Header title="Rick and Morty's API" subtitle="Click on a character to get more details" color="#13e310" />
      <CardsWrapper />
    </>
  )
}