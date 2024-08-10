"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function Studio() {
  return (
    <div className="sanity-container">
      <NextStudio config={config} />
    </div>
  );
}
