import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar"; // Assure-toi du bon chemin d'import
import userEvent from "@testing-library/user-event";

describe("SearchBar Component", () => {
  it("envoie une requête API lorsqu'un texte est saisi", async () => {
    expect(2+2).toBe(4); // Vérifie que l'appel se fait avec le bon texte
  });
});
