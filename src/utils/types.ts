import type { Image as SanityImage } from "sanity";
import { PortableTextBlock } from "@portabletext/types";
import { COLORS } from "./constants";

export type TColors = (typeof COLORS)[number];
export type TColorMode = "dark" | "light";

export type TSizes = "large" | "medium" | "small";

// Answer of https://stackoverflow.com/questions/67941433/convert-array-of-strings-to-object-keys-in-typescript
type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
  [K in T extends ReadonlyArray<infer U> ? U : never]: V;
};

type Slug = {
  current: string;
};

export type TSkill = {
  _id: string;
  name: string;
  slug: Slug;
  image: SanityImage;
};

export type TSkillGroup = {
  _id: string;
  title: string;
  slug: Slug;
  content: string;
  techs?: Array<TSkill>;
  language: string;
};

export type TProjectType = {
  slug: "featured" | "small" | "code-challenge";
  type: "Featured" | "Small" | "Code Challenge";
};

export type TProject = {
  _id: string;
  title: string;
  slug: Slug;
  githubRepo: string;
  website: string;
  builtWith: TSkill[];
  mainImage: SanityImage;
  isFeatured: boolean;
  finishDate: Date | string;
  description: string;
  content: PortableTextBlock[];
};

export type TContactFormValues = {
  fullName: string;
  email: string;
  message: string;
};

// Polimorfismo de componentes
// Fuente: https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/

// Prop as será cualquier tipo de Elemento React
type AsProp<C extends React.ElementType> = {
  as?: C;
};

// Intersección de las props que serán omitidas usando Omit
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// Extiende las propiedades del Componente
// agrega children y cualquier prop aceptada por "as"
// ejemplo: si as = a -> "href" será prop valida
// Nota: Si las props del Componente también son validas por la etiqueta HTML el type estará dado por la prop del Component
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

// Extendemos las props para que el component pueda aceptar una ref
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };
