import { ContentProps } from "../../types";

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((c,i)=>(
        <p key={i}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </>
  );
};
export default Content;