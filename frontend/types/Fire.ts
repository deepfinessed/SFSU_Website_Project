
import County from "./County";
interface Fire {
  aqi: number;
  area: number;
  active: boolean;
  name: string;
  start_date: string;
  end_date?: string;
  EvacuationLevel: number;
  submitter_id: number;
  approved: boolean;
  county?: County
}

export default Fire;
