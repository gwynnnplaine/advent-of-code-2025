type Enumerate<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type RotationNumber = Enumerate<100>;

export type Direction = "L" | "R";
export type Rotation = `${Direction}${RotationNumber}`
