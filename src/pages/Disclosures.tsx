import LegalDocument from '../components/legal/LegalDocument';
import { disclosures } from '../data/legal';

export default function Disclosures() {
  return <LegalDocument doc={disclosures} image="/images/legal/disclosures-logbook.webp" />;
}
