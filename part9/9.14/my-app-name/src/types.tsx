export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
export interface CoursePartDescription extends CoursePartBase {
  description:string;
}
export interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface TotalProps {
  totalExercises: number
}

export interface HeaderProps {
  courseName: string;
}

export type CoursePart =  CoursePartBasic | CoursePartGroup | CoursePartBackground;
export interface ContentProps {
  courseParts: CoursePart[];
}