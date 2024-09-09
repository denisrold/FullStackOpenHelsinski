import { ContentProps  } from "../../types";

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <p>
                  <strong>{part.name}</strong> ({part.exerciseCount} exercises)
                </p>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <p>
                  <strong>{part.name}</strong> ({part.exerciseCount} exercises, {part.groupProjectCount} group projects)
                </p>
              </div>
            );
          case "background":
            return (
              <div key={index}>
                <p>
                  <strong>{part.name}</strong> ({part.exerciseCount} exercises)
                </p>
                <p>{part.description}</p>
                <p>
                  Background material:{" "}
                  <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                </p>
              </div>
            );
          default:
            return null; 
        }
      })}
    </>
  );
};

export default Content;