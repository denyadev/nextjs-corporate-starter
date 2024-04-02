declare module "react-responsive-masonry" {
  import { ReactNode } from "react";

  interface MasonryProps {
    children: ReactNode;
    className?: string;
    columnsCount?: number;
    gutter?: string;
  }

  interface ResponsiveMasonryProps {
    children: ReactNode;
    columnsCountBreakPoints?: Record<number, number>;
  }

  const Masonry: (props: MasonryProps) => JSX.Element;
  const ResponsiveMasonry: (props: ResponsiveMasonryProps) => JSX.Element;

  export default Masonry;
  export { ResponsiveMasonry };
}
