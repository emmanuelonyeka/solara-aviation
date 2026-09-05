import LegalDocument from '../components/legal/LegalDocument';
import { cookies } from '../data/legal';

export default function Cookies() {
  return <LegalDocument doc={cookies} image="/images/journey_city.jpg" />;
}