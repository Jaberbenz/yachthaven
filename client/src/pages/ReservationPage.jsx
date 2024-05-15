import { useParams } from "react-router-dom";

export default function ReservationPage() {
  const { id } = useParams();
  return <div>single reservation page {id} </div>;
}
