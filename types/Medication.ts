export type Medication = {
  name: string;
  options: Option[];
  _id: string;
};

export type Option = {
  count: number;
  countUnit: string;
  size: string;
  _id: string;
  price: number;
};
