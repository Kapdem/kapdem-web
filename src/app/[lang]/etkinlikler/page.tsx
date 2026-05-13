import React from "react";
import Etkinlikler from "../../../views/Etkinlikler";
import { findPastEvents, findUpcomingEvents } from "../../../lib/posts/data";
import { getDictionary } from "../dictionaries";

type Props = {
  params: {
    lang: string;
  };
};

export default async function page({ params }: Props) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  const [pastEvents, upcomingEvents] = await Promise.all([
    findPastEvents(),
    findUpcomingEvents(),
  ]);

  const pastEventsArray = Array.isArray(pastEvents) ? pastEvents : [];
  const upcomingEventsArray = Array.isArray(upcomingEvents)
    ? upcomingEvents
    : [];

  return (
    <div className="mt-9">
      <Etkinlikler
        pastEvents1={pastEventsArray}
        upcomingEvents1={upcomingEventsArray}
        dict={dict}
        lang={awaitedParams.lang}
      />
    </div>
  );
}
