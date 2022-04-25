import React, { useState } from "react";
import Card from "./Card";
import api from "../utils/Api";

export default function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getData()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    (async function () {
      try {
        const cardsData = await api.getInitialCards();
        if (cardsData) {
          setCards(cardsData);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />

          <button
            onClick={onEditAvatarClick}
            type="button"
            aria-label="edit-avatar-button"
            className="profile__avatar-edit-button"
          ></button>
        </div>

        <div className="profile__info">
          <div>
            <h1 className="profile__name">{userName}</h1>

            <button
              onClick={onEditProfileClick}
              aria-label="edit-button"
              type="button"
              className="profile__edit-button"
              name="edit"
            ></button>
          </div>

          <h2 className="profile__title">{userDescription}</h2>
        </div>

        <button
          onClick={onAddPlaceClick}
          type="button"
          aria-label="add-button"
          className="profile__add-button"
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((element) => (
            <Card card={element} key={element._id} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
