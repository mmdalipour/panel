export interface PieChartData {
  id?: string;
  label: string;
  value: number;
}
const data: PieChartData[] = [
  {
    id: 'Mouse',
    label: 'Mouse',
    value: 290,
  },
  {
    id: 'Headset',
    label: 'Headset',
    value: 200,
  },
  {
    id: 'Laptop',
    label: 'Laptop',
    value: 48,
  },
  {
    id: 'Playstation',
    label: 'Playstation',
    value: 56,
  },
];
export default data;
