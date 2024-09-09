import { ContentProps  } from "../../types";
import Part from "../Part/Part";

const Content = ({courseParts}: ContentProps) => {
  return (
    <>
      <Part courseParts={courseParts}/>
    </>
  );
};

export default Content;