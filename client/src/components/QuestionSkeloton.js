import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles/SkelotonQuestion.css";

export default function QuestionSkeloton() {
  return (
    <div>
      <Skeleton className="skeloton-topic" />
      <Skeleton className="skeloton" />
      <Skeleton className="skeloton" />
      <Skeleton className="skeloton" />
      <Skeleton className="skeloton" />
    </div>
  );
}
