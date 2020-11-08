interface Fire {
  aqi: number;
  area: number;
  active: boolean;
  name: string;
  start_date: string;
  end_date?: string;
  EvacuationLevel: number; 
}

export default Fire;
