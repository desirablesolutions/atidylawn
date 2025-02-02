import React from "react";

import { Contact } from "@/views/includes/contact"
import { Hero } from "@/views/components/hero"
import { Services } from "@/views/includes/services"
import { Team } from "@/views/includes/team"
import { About } from "@/views/includes/about"

export default function Home() {

  const $components = [
    { Component: Hero, key: "hero" },
    { Component: Services, key: "services" },
    { Component: About, key: "about" },
    { Component: Team, key: "team" },
    { Component: Contact, key: "contact" },
  ];


  const $render = React.useMemo(
    () =>
      $components.map(({ Component, key }) => (
        <Component key={key} />
      )),
    []
  );


  return (
    <>
      {$render}  
    </>
  )
}

