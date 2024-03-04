import React from "react";
import AppContext from "./AppContext";
import Cook from "js-cookie";

const AppState = props => {
  const onChangeGeneric = (stateVar, stateModifier) => {
    return event => {
      stateModifier({ ...stateVar, [event.target.name]: event.target.value });
    };
  };

  const Cookies = Cook.withAttributes({
    path: "/",
    sameSite: "Strict",
    secure: true,
    expires: 7,
  });

  return (
    <AppContext.Provider value={{ onChangeGeneric, Cookies }}>{props.children}</AppContext.Provider>
  );
};

export default AppState;
