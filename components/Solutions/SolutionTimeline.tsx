"use client";

import { Solution } from "./solutionsData";
import Stepper from "../react-bits/Stepper";

interface Props {
  timeline: Solution["timeline"];
  accentFrom: string;
  accentTo: string;
}

const SolutionTimeline = ({ timeline, accentFrom, accentTo }: Props) => {
  const steps = timeline.map((step, idx) => ({
    title: step.phase,
    description: step.detail,
    label: `Phase ${idx + 1}`,
  }));

  return (
    <Stepper
      steps={steps}
      accentFrom={accentFrom}
      accentTo={accentTo}
      className="max-w-3xl"
    />
  );
};

export default SolutionTimeline;
