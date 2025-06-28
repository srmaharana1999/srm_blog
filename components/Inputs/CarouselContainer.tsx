import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IProps {
  children: React.ReactNode;
}

export function CarouselContainer({ children }: IProps) {
  return (
    <Carousel className="w-11/12 mx-auto">
      {" "}
      <CarouselContent className="mx-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-10 lg:basis-1/2">
            {children}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
